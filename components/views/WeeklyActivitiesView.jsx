import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { Icons } from '../common/Icons';
import { getSchoolDayNumber } from '../../utils/schoolDays';

const WeeklyActivitiesView = ({ user }) => {
    const navigate = useNavigate();
    const [weeklyProblems, setWeeklyProblems] = useState([]);
    const [problemStatuses, setProblemStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    const currentWeek = Math.floor((getSchoolDayNumber(new Date()) - 1) / 5) + 1;
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (user) {
            fetchWeeklyProblems();
            fetchProblemStatuses();
        }
    }, [user]);

    const fetchWeeklyProblems = async () => {
        setLoading(true);
        try {
            const problems = [];
            const weekStartDay = (currentWeek - 1) * 5 + 1;
            
            // 4 Weekly LeetCode problems (ordered by priority - complete in order)
            const weeklyLeetcode = [
                { title: "Same Tree", url: "https://leetcode.com/problems/same-tree/description/", difficulty: "Easy" },
                { title: "Minimum Depth of Binary Tree", url: "https://leetcode.com/problems/minimum-depth-of-binary-tree/description/", difficulty: "Easy" },
                { title: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/", difficulty: "Easy" },
                { title: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/description/", difficulty: "Easy" }
            ];

            weeklyLeetcode.forEach((leetcodeProblem, index) => {
                problems.push({
                    type: 'leetcode',
                    title: leetcodeProblem.title,
                    url: leetcodeProblem.url,
                    difficulty: leetcodeProblem.difficulty,
                    problemNumber: index + 1 // 1, 2, 3, 4 - indicates priority order
                });
            });

            // 3 Weekly USACO problems (all 3 for the week, not per day)
            const weekNum = Math.floor((weekStartDay - 1) / 5);
            const contestIndex = weekNum % USACO_POOL.length;
            const contest = USACO_POOL[contestIndex];
            contest.problems.forEach((usacoProblem, index) => {
                problems.push({
                    type: 'usaco',
                    title: usacoProblem.title,
                    url: usacoProblem.url,
                    day: weekStartDay, // All 3 problems are for the week
                    problemNumber: index + 1 // Problem 1, 2, or 3
                });
            });

            // Daily Codeforces problems (5 per week, one per day)
            // Using a simple pattern - you can customize this with actual Codeforces problems
            const codeforcesProblems = [
                { title: 'Problem A', url: 'https://codeforces.com/problemset/problem/1926/A' },
                { title: 'Problem B', url: 'https://codeforces.com/problemset/problem/1926/B' },
                { title: 'Problem C', url: 'https://codeforces.com/problemset/problem/1926/C' },
                { title: 'Problem D', url: 'https://codeforces.com/problemset/problem/1926/D' },
                { title: 'Problem E', url: 'https://codeforces.com/problemset/problem/1926/E' }
            ];
            
            for (let day = weekStartDay; day < weekStartDay + 5; day++) {
                const codeforcesIndex = (day - weekStartDay) % codeforcesProblems.length;
                const codeforcesProblem = codeforcesProblems[codeforcesIndex];
                problems.push({
                    type: 'codeforces',
                    title: codeforcesProblem.title,
                    url: codeforcesProblem.url,
                    day: day
                });
            }

            setWeeklyProblems(problems);
        } catch (error) {
            console.error('Error fetching weekly problems:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProblemStatuses = async () => {
        if (!user?.id) return;

        try {
            const { data, error } = await supabase
                .from('weekly_activities')
                .select('*')
                .eq('user_id', user.id)
                .eq('week_number', currentWeek)
                .eq('school_year', currentYear);

            if (error) {
                if (error.code === '42P01' || error.message?.includes('404')) {
                    console.warn('weekly_activities table does not exist yet. Run the SQL schema in Supabase.');
                    setProblemStatuses({});
                    return;
                }
                throw error;
            }

            const statusMap = {};
            if (data) {
                data.forEach(item => {
                    const key = `${item.problem_type}_${item.problem_title}`;
                    statusMap[key] = item.status;
                });
            }
            setProblemStatuses(statusMap);
        } catch (error) {
            console.error('Error fetching statuses:', error);
            setProblemStatuses({});
        }
    };

    const updateStatus = async (problem, status) => {
        if (!user?.id) return;

        const key = `${problem.type}_${problem.title}`;
        
        // Optimistic update
        setProblemStatuses(prev => ({ ...prev, [key]: status }));

        try {
            const { error } = await supabase
                .from('weekly_activities')
                .upsert({
                    user_id: user.id,
                    week_number: currentWeek,
                    school_year: currentYear,
                    problem_type: problem.type,
                    problem_title: problem.title,
                    problem_url: problem.url,
                    status: status,
                    updated_at: new Date().toISOString()
                }, { 
                    onConflict: 'user_id, week_number, school_year, problem_type, problem_title' 
                });

            if (error) {
                if (error.code === '42P01' || error.message?.includes('404')) {
                    console.warn('weekly_activities table does not exist yet.');
                    return;
                }
                throw error;
            }
        } catch (error) {
            console.error('Error updating status:', error);
            // Revert optimistic update on error
            setProblemStatuses(prev => {
                const newStatuses = { ...prev };
                delete newStatuses[key];
                return newStatuses;
            });
        }
    };

    const getStatusIcon = (problem) => {
        const key = `${problem.type}_${problem.title}`;
        const status = problemStatuses[key];

        if (status === 'completed') {
            return (
                <button
                    onClick={() => updateStatus(problem, 'not_attempted')}
                    className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                    title="Completed - Click to reset"
                >
                    ✓
                </button>
            );
        } else if (status === 'viewed') {
            return (
                <button
                    onClick={() => updateStatus(problem, 'completed')}
                    className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center hover:bg-yellow-600 transition-colors"
                    title="Viewed - Click to mark completed"
                >
                    👁
                </button>
            );
        } else {
            return (
                <button
                    onClick={() => updateStatus(problem, 'viewed')}
                    className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    title="Not attempted - Click to mark viewed"
                >
                    ✕
                </button>
            );
        }
    };

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                <h2 className="text-3xl font-bold text-gvcs-navy mb-4">Weekly Activities</h2>
                <p className="text-gray-600 mb-4">Please log in to view your weekly activities.</p>
            </div>
        );
    }

    const leetcodeProblems = weeklyProblems.filter(p => p.type === 'leetcode');
    const usacoProblems = weeklyProblems.filter(p => p.type === 'usaco');
    const codeforcesProblems = weeklyProblems.filter(p => p.type === 'codeforces');

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="mb-4 text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1"
                >
                    <Icons.ArrowRight className="rotate-180" /> Back to Dashboard
                </button>
                <h2 className="text-3xl font-bold text-gvcs-navy mb-2">Weekly Activities</h2>
                <p className="text-gray-600">Week {currentWeek} • Track your progress on this week's problems</p>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Loading problems...</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* LeetCode Section - 4 Ordered Problems */}
                    {leetcodeProblems.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                                <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                                    <Icons.Code className="w-6 h-6" /> LeetCode (4 Weekly Problems)
                                </h3>
                                <p className="text-sm text-green-700 mt-1">Complete in order - everyone starts with Problem 1</p>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {leetcodeProblems.map((problem, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold text-lg flex-shrink-0">
                                                {problem.problemNumber || i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <a
                                                    href={problem.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                                                >
                                                    {problem.title}
                                                </a>
                                                <div className="text-sm text-gray-500 mt-1">Problem {problem.problemNumber || i + 1} of 4 • {problem.difficulty || 'Easy'}</div>
                                            </div>
                                            {getStatusIcon(problem)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* USACO Section - 3 Weekly Problems */}
                    {usacoProblems.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
                                <h3 className="text-xl font-bold text-amber-800 flex items-center gap-2">
                                    <Icons.Brain className="w-6 h-6" /> USACO (3 Weekly Problems)
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {usacoProblems.map((problem, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="flex-1">
                                                <a
                                                    href={problem.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                                                >
                                                    {problem.title}
                                                </a>
                                                <div className="text-sm text-gray-500 mt-1">Problem {problem.problemNumber || i + 1} of 3</div>
                                            </div>
                                            {getStatusIcon(problem)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Codeforces Section */}
                    {codeforcesProblems.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                                <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                                    <Icons.Sparkles className="w-6 h-6" /> Codeforces
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {codeforcesProblems.map((problem, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="flex-1">
                                                <a
                                                    href={problem.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                                                >
                                                    {problem.title}
                                                </a>
                                                <div className="text-sm text-gray-500 mt-1">Day {problem.day}</div>
                                            </div>
                                            {getStatusIcon(problem)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {weeklyProblems.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <p className="text-gray-600">No problems available for this week.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WeeklyActivitiesView;
