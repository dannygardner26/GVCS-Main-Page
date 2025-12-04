import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { useNotification } from '../context/NotificationContext';
import { Icons } from '../common/Icons';

const HackathonHubView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showNotification, showConfirm } = useNotification();
    const [user, setUser] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [registrations, setRegistrations] = useState({});
    const [teams, setTeams] = useState({});
    const [userProfiles, setUserProfiles] = useState({});
    const [loading, setLoading] = useState(true);

    // Get user from auth
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || session.user.email,
                    email: session.user.email
                });
            }
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || session.user.email,
                    email: session.user.email
                });
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Fetch registrations and teams
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all registrations
                const { data: regs, error: regError } = await supabase
                    .from('hackathon_registrations')
                    .select('*');

                if (regError) throw regError;

                // Fetch all teams
                const { data: teamsData, error: teamsError } = await supabase
                    .from('hackathon_teams')
                    .select('*');

                if (teamsError) throw teamsError;

                // Fetch user profiles for display names
                const userIds = [...new Set([
                    ...(regs?.map(r => r.user_id) || []),
                    ...(teamsData?.map(t => t.created_by) || [])
                ])];

                const profilesMap = {};
                if (userIds.length > 0 && userIds.every(id => id)) {
                    try {
                        const { data: profiles, error: profilesError } = await supabase
                            .from('user_profiles')
                            .select('user_id, display_name')
                            .in('user_id', userIds);

                        if (!profilesError && profiles) {
                            profiles.forEach(p => {
                                if (p.display_name) {
                                    profilesMap[p.user_id] = p.display_name;
                                }
                            });
                        } else if (profilesError && profilesError.code !== 'PGRST116' && profilesError.code !== '42P01') {
                            console.warn('Error fetching user profiles:', profilesError);
                        }
                    } catch (err) {
                        console.warn('Error fetching user profiles:', err);
                    }
                }

                // For users without profiles, we'll use a fallback when displaying
                // We can't access other users' auth metadata without admin privileges

                // Organize registrations by hackathon name
                const regsByHackathon = {};
                regs?.forEach(reg => {
                    if (!regsByHackathon[reg.hackathon_name]) {
                        regsByHackathon[reg.hackathon_name] = [];
                    }
                    regsByHackathon[reg.hackathon_name].push(reg);
                });

                // Organize teams by hackathon name
                const teamsByHackathon = {};
                teamsData?.forEach(team => {
                    if (!teamsByHackathon[team.hackathon_name]) {
                        teamsByHackathon[team.hackathon_name] = [];
                    }
                    teamsByHackathon[team.hackathon_name].push(team);
                });

                setRegistrations(regsByHackathon);
                setTeams(teamsByHackathon);
                setUserProfiles(profilesMap);
            } catch (error) {
                console.error('Error fetching hackathon data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleRegister = async (hackathonName) => {
        if (!user) {
            alert('Please log in to register for a hackathon.');
            return;
        }

        try {
            const { error } = await supabase
                .from('hackathon_registrations')
                .insert([{
                    user_id: user.id,
                    hackathon_name: hackathonName,
                    user_name: user.name
                }]);

            if (error) throw error;

            // Refresh data
            const { data: regs } = await supabase
                .from('hackathon_registrations')
                .select('*');
            
            const regsByHackathon = {};
            regs?.forEach(reg => {
                if (!regsByHackathon[reg.hackathon_name]) {
                    regsByHackathon[reg.hackathon_name] = [];
                }
                regsByHackathon[reg.hackathon_name].push(reg);
            });
            setRegistrations(regsByHackathon);
        } catch (error) {
            console.error('Error registering:', error);
            alert('Failed to register. You may already be registered.');
        }
    };

    const handleCreateTeam = async (hackathonName, teamName, maxMembers = 4) => {
        if (!user) {
            alert('Please log in to create a team.');
            return;
        }

        try {
            // First, make sure user is registered
            const { data: existingReg } = await supabase
                .from('hackathon_registrations')
                .select('*')
                .eq('user_id', user.id)
                .eq('hackathon_name', hackathonName)
                .single();

            if (!existingReg) {
                // Register first
                await supabase
                    .from('hackathon_registrations')
                    .insert([{
                        user_id: user.id,
                        hackathon_name: hackathonName,
                        user_name: user.name
                    }]);
            }

            // Create team
            const { data: team, error: teamError } = await supabase
                .from('hackathon_teams')
                .insert([{
                    hackathon_name: hackathonName,
                    team_name: teamName || `${user.name}'s Team`,
                    max_members: maxMembers,
                    created_by: user.id
                }])
                .select()
                .single();

            if (teamError) throw teamError;

            // Update registration to join team
            await supabase
                .from('hackathon_registrations')
                .update({ team_id: team.id })
                .eq('user_id', user.id)
                .eq('hackathon_name', hackathonName);

            // Refresh data
            const { data: regs } = await supabase
                .from('hackathon_registrations')
                .select('*');
            
            const { data: teamsData } = await supabase
                .from('hackathon_teams')
                .select('*');

            const regsByHackathon = {};
            regs?.forEach(reg => {
                if (!regsByHackathon[reg.hackathon_name]) {
                    regsByHackathon[reg.hackathon_name] = [];
                }
                regsByHackathon[reg.hackathon_name].push(reg);
            });

            const teamsByHackathon = {};
            teamsData?.forEach(t => {
                if (!teamsByHackathon[t.hackathon_name]) {
                    teamsByHackathon[t.hackathon_name] = [];
                }
                teamsByHackathon[t.hackathon_name].push(t);
            });

            setRegistrations(regsByHackathon);
            setTeams(teamsByHackathon);
        } catch (error) {
            console.error('Error creating team:', error);
            alert('Failed to create team.');
        }
    };

    const handleJoinTeam = async (hackathonName, teamId) => {
        if (!user) {
            alert('Please log in to join a team.');
            return;
        }

        try {
            // Check if team has space
            const { data: team } = await supabase
                .from('hackathon_teams')
                .select('*')
                .eq('id', teamId)
                .single();

            if (!team) {
                alert('Team not found.');
                return;
            }

            // Count current members
            const { data: currentMembers } = await supabase
                .from('hackathon_registrations')
                .select('*')
                .eq('team_id', teamId);

            if (currentMembers && currentMembers.length >= team.max_members) {
                alert('This team is full.');
                return;
            }

            // Register if not already registered
            const { data: existingReg } = await supabase
                .from('hackathon_registrations')
                .select('*')
                .eq('user_id', user.id)
                .eq('hackathon_name', hackathonName)
                .single();

            if (existingReg) {
                // Update existing registration
                await supabase
                    .from('hackathon_registrations')
                    .update({ team_id: teamId })
                    .eq('user_id', user.id)
                    .eq('hackathon_name', hackathonName);
            } else {
                // Create new registration
                await supabase
                    .from('hackathon_registrations')
                    .insert([{
                        user_id: user.id,
                        hackathon_name: hackathonName,
                        team_id: teamId,
                        user_name: user.name
                    }]);
            }

            // Refresh data
            const { data: regs } = await supabase
                .from('hackathon_registrations')
                .select('*');
            
            const regsByHackathon = {};
            regs?.forEach(reg => {
                if (!regsByHackathon[reg.hackathon_name]) {
                    regsByHackathon[reg.hackathon_name] = [];
                }
                regsByHackathon[reg.hackathon_name].push(reg);
            });
            setRegistrations(regsByHackathon);
        } catch (error) {
            console.error('Error joining team:', error);
            showNotification('Failed to join team.', 'error');
        }
    };

    const getUserDisplayName = (userId, registration) => {
        // First try stored name from registration
        if (registration?.user_name) {
            return registration.user_name;
        }
        // Then try profile
        if (userProfiles[userId]) {
            return userProfiles[userId];
        }
        // If it's the current user, use their name
        if (user && userId === user.id) {
            return user.name;
        }
        // Fallback
        return 'Team Member';
    };

    const getTeamMembers = (hackathonName, teamId) => {
        return registrations[hackathonName]?.filter(r => r.team_id === teamId) || [];
    };

    const getEmptySpots = (team) => {
        const members = getTeamMembers(team.hackathon_name, team.id);
        return Math.max(0, team.max_members - members.length);
    };

    const isUserRegistered = (hackathonName) => {
        return user && registrations[hackathonName]?.some(r => r.user_id === user.id);
    };

    const getUserTeam = (hackathonName) => {
        if (!user) return null;
        const reg = registrations[hackathonName]?.find(r => r.user_id === user.id && r.team_id);
        if (!reg) return null;
        return teams[hackathonName]?.find(t => t.id === reg.team_id);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gvcs-navy mb-2">Hackathon Hub</h2>
                <p className="text-gray-600 mb-6">Your ultimate guide to winning competitions and building cool things.</p>
                {!isCreating && (
                    <>
                        <button
                            onClick={() => {
                                if (!user) {
                                    alert('Please log in to create a hackathon project.');
                                    return;
                                }
                                setIsCreating(true);
                            }}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            🚀 Start a Hackathon Project
                        </button>
                        <p className="text-xs text-gray-500 mt-2">Use our AI-powered wizard to organize your next hackathon</p>
                    </>
                )}
            </div>

            {isCreating && user && (
                <HackathonProgramWizard
                    user={user}
                    onComplete={async (hackathonData) => {
                        try {
                            const { error } = await supabase
                                .from('hackathon_programs')
                                .insert([hackathonData]);

                            if (error) throw error;
                            setIsCreating(false);
                            alert('Hackathon project created! You can view it in your Dashboard.');
                            navigate('/dashboard?tab=hackathons');
                        } catch (error) {
                            console.error('Error creating hackathon:', error);
                            alert('Failed to create hackathon project.');
                        }
                    }}
                    onCancel={() => setIsCreating(false)}
                />
            )}

            {!isCreating && (
                <>
            {/* Guides Section */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Algorithmic Competitions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            <Icons.Brain />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Algorithmic Competitions</h3>
                    </div>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        Focus on data structures, algorithms, and problem-solving speed. Great for technical interviews.
                        <br />
                        <span className="text-xs font-bold text-blue-600 mt-2 block">
                        💡 Check out the "Algorithms" track in the <span className="cursor-pointer underline" onClick={() => navigate('/ellis')}>Curriculum Generator</span> for a structured learning path.
                        </span>
                    </p>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-sm text-gray-800 mb-2 uppercase tracking-wider">Recommended Courses</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="https://usaco.guide" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                                        <span className="font-bold text-gray-700 group-hover:text-blue-700">USACO Guide</span>
                                        <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded text-gray-500">Free</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.coursera.org/learn/algorithms-part1" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                                        <span className="font-bold text-gray-700 group-hover:text-blue-700">Princeton Algorithms (Coursera)</span>
                                        <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded text-gray-500">Free Audit</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-gray-800 mb-2 uppercase tracking-wider">Practice Sites</h4>
                            <div className="flex gap-2">
                                <a href="https://leetcode.com" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium text-gray-700">LeetCode</a>
                                <a href="https://codeforces.com" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium text-gray-700">Codeforces</a>
                                <a href="https://cses.fi/problemset/" className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium text-gray-700">CSES</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Hackathons */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                            <Icons.Lightbulb />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">The AI Workflow</h3>
                    </div>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        Don't just code. Orchestrate. Use this pipeline to build winning projects in record time.
                    </p>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">1</div>
                            <div>
                                <h4 className="font-bold text-gray-900">Brainstorm with Perplexity</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    Use Perplexity or an LLM to research problems and brainstorm solutions. Validate your idea before you build.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
                            <div>
                                <h4 className="font-bold text-gray-900">Master Plan & Tasks</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    Feed your research into a strong LLM (Claude 3.5 Sonnet / GPT-4o). Ask it to generate a "Master Plan" and assign specific tasks to each team member.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">3</div>
                            <div>
                                <h4 className="font-bold text-gray-900">Prompt Engineering</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    Each member uses their own LLM to generate detailed prompts for their tasks. These prompts become the instructions for your coding tools.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">4</div>
                            <div>
                                <h4 className="font-bold text-gray-900">Execution</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    Feed your prompts into <strong>Cursor</strong> for backend/logic and <strong>Lovable</strong> for frontend. Assemble the pieces.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">5</div>
                            <div>
                                <h4 className="font-bold text-gray-900">The Pitch</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    Use <strong>Canva</strong> for the deck and <strong>Figma</strong> for high-fidelity mockups. The story sells the product.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Power Tools - Expanded */ }
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                        <Icons.Sparkles />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gvcs-navy">AI Power Tools</h3>
                        <p className="text-gray-500 text-sm">The modern stack for building fast.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            name: "Cursor",
                            tagline: "The AI Code Editor",
                            desc: "A fork of VS Code with AI built-in. It can write entire functions, refactor code, and fix bugs automatically.",
                            bestFor: "Writing code 10x faster",
                            price: "Free Tier",
                            url: "https://cursor.sh/"
                        },
                        {
                            name: "Lovable",
                            tagline: "Full Stack Generator",
                            desc: "Describe your app and get a full stack React/Node application generated. Great for starting the frontend.",
                            bestFor: "Frontend & Full Stack",
                            price: "Free Tier",
                            url: "https://lovable.dev/"
                        },
                        {
                            name: "Perplexity",
                            tagline: "AI Search Engine",
                            desc: "Like Google but it gives you answers. Great for finding libraries, debugging errors, and research.",
                            bestFor: "Brainstorming & Research",
                            price: "Free",
                            url: "https://perplexity.ai/"
                        },

                        {
                            name: "Figma",
                            tagline: "Interface Design",
                            desc: "The industry standard for UI/UX design. Map out your user flow before you write a single line of code.",
                            bestFor: "Wireframing & Pitch Decks",
                            price: "Free for Students",
                            url: "https://figma.com/"
                        },
                        {
                            name: "Canva",
                            tagline: "Design Made Easy",
                            desc: "Create stunning pitch decks and social media graphics in minutes. Essential for the final presentation.",
                            bestFor: "Pitch Decks",
                            price: "Free",
                            url: "https://canva.com/"
                        },
                        {
                            name: "Gemini / Claude / ChatGPT",
                            tagline: "LLM Assistants",
                            desc: "Use these for brainstorming ideas, writing pitch scripts, and generating dummy data for your app.",
                            bestFor: "Ideation & Copywriting",
                            price: "Free",
                            url: "https://gemini.google.com/"
                        }
                    ].map((tool, i) => (
                        <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">{tool.name}</h4>
                                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">{tool.tagline}</span>
                                </div>
                                <Icons.Link className="text-gray-300 group-hover:text-indigo-400" />
                            </div>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">{tool.desc}</p>
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded">Best for: {tool.bestFor}</span>
                                    <span className="text-gray-400">{tool.price}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

    {/* Upcoming Hackathons */ }
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                        <Icons.Clock />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Upcoming Hackathons</h3>
                </div>

                {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : (
                    <div className="space-y-6">
                        {[
                            {
                                name: "United Hacks V6",
                                date: "January 16-18, 2026",
                                location: "Online (Virtual)",
                                desc: "Student-led free hackathon for high school and college students. Builds tech and soft skills.",
                                status: "Register Now",
                                link: "https://www.hackunited.org/"
                            },
                            {
                                name: "Hack BI",
                                date: "January 17-18, 2026",
                                location: "Alexandria, Virginia",
                                desc: "High school and middle school hackathon. All skill levels welcome with workshops.",
                                status: "Register Now",
                                link: "https://mlh.io/minor-league/events"
                            },
                            {
                                name: "Hack the Ram",
                                date: "January 2026",
                                location: "Gibsonia, PA",
                                desc: "Free 12-hour invention marathon for 6th-12th graders. Great for beginners.",
                                status: "Coming Soon",
                                link: "https://www.joinsilicon.org/hackathons"
                            },
                            {
                                name: "ElleHacks",
                                date: "January 23-25, 2026",
                                location: "Toronto, Ontario",
                                desc: "Canada's largest hackathon for women and gender-diverse students. Beginner-friendly.",
                                status: "Register Now",
                                link: "https://mlh.io/events"
                            },
                            {
                                name: "HackHERS",
                                date: "February 21, 2026",
                                location: "New Brunswick, NJ",
                                desc: "Women-centric hackathon empowering female and non-binary students. Close to Philly.",
                                status: "Coming Soon",
                                link: "https://hackathonmap.com/"
                            },
                            {
                                name: "HenHacks",
                                date: "February 28, 2026",
                                location: "Newark, Delaware",
                                desc: "University of Delaware hackathon. Great for collegiate networking.",
                                status: "Coming Soon",
                                link: "https://hackathonmap.com/"
                            },
                            {
                                name: "MEGA Hackathon 2026",
                                date: "February 28 - March 1, 2026",
                                location: "Online",
                                desc: "Global hackathon integrating CS, STEM, economics. Advances human development.",
                                status: "Register Now",
                                link: "https://mega-hackathon-2026-students.devpost.com/"
                            },
                            {
                                name: "HackNA",
                                date: "March 2026",
                                location: "Wexford, PA",
                                desc: "High school hackathon at North Allegheny. Projects based on revealed theme.",
                                status: "Coming Soon",
                                link: "https://www.joinsilicon.org/hackathons"
                            },
                            {
                                name: "Bitcamp",
                                date: "April 10-12, 2026",
                                location: "College Park, Maryland",
                                desc: "University of Maryland's annual spring hackathon. 1000+ students expected.",
                                status: "Coming Soon",
                                link: "https://mlh.io/events"
                            },
                            {
                                name: "HackAmerica 2026",
                                date: "April 11-18, 2026",
                                location: "Online",
                                desc: "Virtual hackathon for high schoolers. Tackle social and environmental issues.",
                                status: "Register Now",
                                link: "https://netzerocompare.com/events/hackamerica-2026"
                            },
                            {
                                name: "Hudson Valley Digital Rally",
                                date: "May 18, 2026",
                                location: "Poughkeepsie, NY",
                                desc: "AI-focused hackathon for high school and college students. Theme: Using AI to serve the community.",
                                status: "Coming Soon",
                                link: "https://hvtechfest.com/2026/05/hackathon"
                            },
                            {
                                name: "Tech Innovation for Good",
                                date: "June 1-21, 2026",
                                location: "Online",
                                desc: "Three-week global innovation sprint. Challenges in AI, climate, and health.",
                                status: "Register Now",
                                link: "https://www.youthtechandethics.org/events"
                            },
                            {
                                name: "Hack the Land",
                                date: "July 25-26, 2026",
                                location: "Cleveland, Ohio",
                                desc: "High school hackathon. Turn ideas into reality over a weekend.",
                                status: "Coming Soon",
                                link: "https://www.joinsilicon.org/hackathons"
                            }
                        ].map((hack, i) => {
                            const hackRegistrations = registrations[hack.name] || [];
                            const hackTeams = teams[hack.name] || [];
                            const userRegistered = isUserRegistered(hack.name);
                            const userTeam = getUserTeam(hack.name);

                            return (
                                <div key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-bold text-lg text-gray-900">{hack.name}</h4>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${hack.status.includes('Open') || hack.status.includes('Register') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {hack.status}
                                                </span>
                                                {userRegistered && (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-100 text-purple-700">
                                                        Registered
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm font-bold text-gray-600 mb-1">{hack.date} • {hack.location}</div>
                                            <p className="text-sm text-gray-500 mb-3">{hack.desc}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {!userRegistered ? (
                                                <button
                                                    onClick={() => {
                                                        const teamName = prompt('Enter a team name (or leave blank for default):');
                                                        if (teamName !== null) {
                                                            if (teamName.trim()) {
                                                                handleCreateTeam(hack.name, teamName.trim());
                                                            } else {
                                                                handleRegister(hack.name);
                                                            }
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all text-sm whitespace-nowrap"
                                                >
                                                    Register
                                                </button>
                                            ) : !userTeam ? (
                                                <button
                                                    onClick={() => {
                                                        const teamName = prompt('Enter a team name:');
                                                        if (teamName && teamName.trim()) {
                                                            handleCreateTeam(hack.name, teamName.trim());
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all text-sm whitespace-nowrap"
                                                >
                                                    Create Team
                                                </button>
                                            ) : null}
                                            <a
                                                href={hack.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all text-sm whitespace-nowrap"
                                            >
                                                Visit Website
                                            </a>
                                        </div>
                                    </div>

                                    {/* Teams Section */}
                                    {hackRegistrations.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <h5 className="font-bold text-sm text-gray-700 mb-3">Club Members Registered ({hackRegistrations.length})</h5>
                                            <div className="space-y-3">
                                                {hackTeams.map((team) => {
                                                    const members = getTeamMembers(hack.name, team.id);
                                                    const emptySpots = getEmptySpots(team);
                                                    const isUserInTeam = user && members.some(m => m.user_id === user.id);
                                                    const canJoin = user && !userTeam && emptySpots > 0;

                                                    return (
                                                        <div key={team.id} className="p-3 bg-white rounded-lg border border-gray-200">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <div className="font-bold text-sm text-gray-900 mb-1">
                                                                        {team.team_name || 'Unnamed Team'}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 mb-2">
                                                                        Members: {members.length}/{team.max_members}
                                                                        {emptySpots > 0 && (
                                                                            <span className="ml-2 text-green-600 font-bold">
                                                                                ({emptySpots} spot{emptySpots !== 1 ? 's' : ''} available)
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {members.map((member) => (
                                                                            <span
                                                                                key={member.id}
                                                                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                                                                            >
                                                                                {getUserDisplayName(member.user_id, member)}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                {canJoin && (
                                                                    <button
                                                                        onClick={() => handleJoinTeam(hack.name, team.id)}
                                                                        className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition-colors whitespace-nowrap"
                                                                    >
                                                                        Join Team
                                                                    </button>
                                                                )}
                                                                {isUserInTeam && (
                                                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">
                                                                        Your Team
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                
                                                {/* Solo registrations (no team) */}
                                                {hackRegistrations.filter(r => !r.team_id).length > 0 && (
                                                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                                                        <div className="text-xs text-gray-500 mb-2 font-bold">Looking for Team:</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {hackRegistrations
                                                                .filter(r => !r.team_id)
                                                                .map((reg) => (
                                                                    <span
                                                                        key={reg.id}
                                                                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded"
                                                                    >
                                                                        {getUserDisplayName(reg.user_id, reg)}
                                                                    </span>
                                                                ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
                </>
            )}
        </div>
    );
};

export default HackathonHubView;
