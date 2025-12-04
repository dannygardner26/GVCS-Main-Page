import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CURRICULUM_DATA } from '../../CurriculumData';
import { GENERATE_PLAN_PROMPT, IDEA_GENERATION_PROMPT } from '../../Prompts';
import { supabase } from '../../utils/supabase';
import { Icons } from '../common/Icons';
import { useNotification } from '../context/NotificationContext';
import CurriculumMap from './CurriculumMap';
import { POTENTIAL_COURSES } from '../../utils/potentialCourses';

const EllisGenerator = ({ user, onLoginRequest }) => {
    const { showNotification, showConfirm } = useNotification();
    const [mode, setMode] = useState('select'); // 'select', 'manual', 'wizard', 'ideas_selection', 'results'
    const [topic, setTopic] = useState('');
    const [level, setLevel] = useState('Beginner');
    const [isGenerating, setIsGenerating] = useState(false);
    const [plan, setPlan] = useState(null);

    // Wizard State
    const [interestScores, setInterestScores] = useState({
        math: 5,
        art: 5,
        web: 5,
        games: 5,
        ai: 5,
        hardware: 5,
        data: 5
    });

    // Math Courses - Multi-select
    const [mathCourses, setMathCourses] = useState({
        "Precalc or less": false,
        "Calc": false,
        "Lin Alg": false,
        "Multivar": false,
        "Stat": false,
        "Discrete Math": false
    });

    const [apCsaScore, setApCsaScore] = useState('');
    const [satMath, setSatMath] = useState('');
    const [pastStudies, setPastStudies] = useState('');
    const [generatedIdeas, setGeneratedIdeas] = useState([]);

    const questions = [
        { id: 'math', text: "How much do you enjoy solving complex math problems?" },
        { id: 'art', text: "How much do you like creating visual art or designs?" },
        { id: 'web', text: "Are you interested in building websites and UIs?" },
        { id: 'games', text: "Do you want to make video games?" },
        { id: 'ai', text: "Are you curious about Artificial Intelligence?" },
        { id: 'hardware', text: "Do you like working with electronics or robotics?" },
        { id: 'data', text: "Are you interested in analyzing data and statistics?" },
    ];

    const handleScoreChange = (id, val) => {
        setInterestScores(prev => ({ ...prev, [id]: parseInt(val) }));
    };

    const handleMathChange = (course) => {
        setMathCourses(prev => ({ ...prev, [course]: !prev[course] }));
    };

    const generateIdeas = async () => {
        setIsGenerating(true);
        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const selectedMath = Object.keys(mathCourses).filter(k => mathCourses[k]).join(", ");

            const profile = `
        Student Profile:
        - Math Courses Taken: ${selectedMath || "None selected"}
        - AP CSA Score: ${apCsaScore || "Not Taken"}
        - SAT Math Score: ${satMath || "N/A"}
        - Past Independent Studies: ${pastStudies || "None"}
        - Interests (1-10):
          - Math: ${interestScores.math}
          - Art: ${interestScores.art}
          - Web: ${interestScores.web}
          - Games: ${interestScores.games}
          - AI: ${interestScores.ai}
          - Hardware: ${interestScores.hardware}
          - Data Science: ${interestScores.data}
      `;

            const availableCoursesList = POTENTIAL_COURSES.map(c =>
                `- ${c.title} (${c.difficulty}) [${c.type === 'premade' ? 'Ready to Start' : 'Needs Generation'}] - Tags: ${c.tags.join(', ')}`
            ).join('\n');

            const prompt = IDEA_GENERATION_PROMPT(profile, availableCoursesList);

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const ideas = JSON.parse(cleanJson);

            setGeneratedIdeas(ideas);
            setMode('ideas_selection');

        } catch (error) {
            console.error("AI Generation Error:", error);
            showNotification("Failed to generate ideas. Please try again.", 'error');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleIdeaSelection = async (selectedIdea) => {
        // If it's a premade course, load it directly
        if (selectedIdea.type === 'premade' && CURRICULUM_DATA[selectedIdea.title]) {
            const courseData = CURRICULUM_DATA[selectedIdea.title];
            // Transform weeks - keep deliverables as-is if they exist, otherwise transform ellis_activities
            const transformedWeeks = courseData.weeks.map(week => {
                const transformedWeek = { ...week };
                // If deliverables exist, keep them (new structure)
                // Otherwise, transform ellis_activities to activities format (old structure)
                if (!week.deliverables && week.ellis_activities) {
                    transformedWeek.activities = {
                        project: week.ellis_activities.builder?.description || week.ellis_activities.builder?.title || '',
                        test: week.ellis_activities.academic?.description || week.ellis_activities.academic?.title || '',
                        presentation: week.ellis_activities.communicator?.description || week.ellis_activities.communicator?.title || ''
                    };
                }
                return transformedWeek;
            });
            setPlan(transformedWeeks);
            setTopic(selectedIdea.title);
            setLevel(selectedIdea.difficulty || 'Advanced');
            setMode('results');
            return;
        }

        // Otherwise, generate it
        generatePlanFromIdea(selectedIdea);
    };

    const generatePlanFromIdea = async (selectedIdea) => {
        setIsGenerating(true);
        setTopic(selectedIdea.title);
        setLevel(selectedIdea.difficulty);

        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `
        Generate a 9-week independent study plan for a high school student learning: "${selectedIdea.title}".

        CRITICAL REQUIREMENT: All resources MUST be 100% FREE.
        - Prioritize high-quality YouTube playlists/videos.
        - Use official free documentation (MDN, Unity Docs, etc.).
        - NO paid courses (Udemy, Coursera paid tiers, etc.).

        The plan should be structured for a ${selectedIdea.difficulty} level student.

        Return ONLY a raw JSON object (no markdown) with this structure:
        {
          "title": "${selectedIdea.title}",
          "description": "Brief description of the course.",
          "weeks": [
            {
              "week": 1,
              "topic": "Topic Title",
              "description": "What they will learn",
              "deliverable": "What to build/show",
              "resources": [
                 { "title": "Resource Name", "url": "URL", "type": "Video/Article" }
              ]
            },
            ... (9 weeks total)
          ],
          "ellis_activities": {
             "builder": { "title": "...", "description": "..." },
             "academic": { "title": "...", "description": "..." },
             "communicator": { "title": "...", "description": "..." }
          }
        }
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const data = JSON.parse(cleanJson);

            setTopic(data.title || selectedIdea.title);
            setPlan(data.weeks);
            setMode('results');

        } catch (error) {
            console.error("AI Generation Error:", error);
            showNotification("Failed to generate plan. Please try again.", 'error');
        } finally {
            setIsGenerating(false);
        }
    };

    const generateManualPlan = async () => {
        if (!topic) return;
        setIsGenerating(true);

        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = GENERATE_PLAN_PROMPT(topic);

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const aiPlan = JSON.parse(cleanJson);

            setPlan(aiPlan);
            setMode('results');
        } catch (error) {
            console.error("AI Generation Error:", error);
            showNotification("Failed to generate plan. Please try again.", 'error');
        } finally {
            setIsGenerating(false);
        }
    };

    const reset = () => {
        setMode('select');
        setTopic('');
        setPlan(null);
        setGeneratedIdeas([]);
        setPastStudies('');
        setInterestScores({ math: 5, art: 5, web: 5, games: 5, ai: 5, hardware: 5, data: 5 });
        setMathCourses({
            "Precalc or less": false,
            "Calc": false,
            "Lin Alg": false,
            "Multivar": false,
            "Stat": false,
            "Discrete Math": false
        });
        setApCsaScore('');
        setSatMath('');
    };

    const savePlan = () => {
        if (!user) {
            onLoginRequest();
            return;
        }
        // Save to local storage for demo
        const savedPlans = JSON.parse(localStorage.getItem('gvcs_saved_plans') || '[]');
        savedPlans.push({
            id: Date.now(),
            topic,
            level,
            date: new Date().toLocaleDateString(),
            plan
        });
        localStorage.setItem('gvcs_saved_plans', JSON.stringify(savedPlans));
        showNotification("Plan saved successfully!", 'success');
    };

    const addToMyCourses = async () => {
        if (!user) {
            onLoginRequest();
            return;
        }

        try {
            // Use the course title as the course_id (key in CURRICULUM_DATA)
            // For AI-generated courses, use the topic as-is
            const courseId = topic;

            // Check if this is a premade course from CURRICULUM_DATA
            const globalCourse = CURRICULUM_DATA[topic];
            const numWeeks = globalCourse ? globalCourse.weeks.length : (plan ? plan.length : 0);

            // Store only user-specific progress data (not full course content)
            const userProgress = Array.from({ length: numWeeks }, (_, i) => ({
                week: i + 1,
                selected_activity: null,
                submissions: {
                    builder: null,
                    academic: null,
                    communicator: null
                }
            }));

            const courseData = {
                user_id: user.id,
                course_title: topic,
                course_id: courseId,
                weeks: userProgress // Only store user progress, not full course data
            };

            // Check if course already exists
            const { data: existingCourses, error: fetchError } = await supabase
                .from('user_courses')
                .select('id')
                .eq('user_id', user.id)
                .eq('course_id', courseId)
                .single();

            if (existingCourses) {
                showConfirm("You already have this course. Replace it?", async () => {
                    const { error: updateError } = await supabase
                        .from('user_courses')
                        .update({
                            course_title: courseData.course_title,
                            weeks: courseData.weeks,
                            updated_at: new Date().toISOString()
                        })
                        .eq('id', existingCourses.id);

                    if (updateError) throw updateError;
                    showNotification("Course updated!", 'success');
                });
            } else {
                const { error: insertError } = await supabase
                    .from('user_courses')
                    .insert([courseData]);

                if (insertError) throw insertError;
                showNotification("Course added to Dashboard!", 'success');
            }
        } catch (error) {
            console.error('Error adding course:', error);
            showNotification("Failed to add course. Please try again.", 'error');
        }
    };

    if (mode === 'results' && plan) {
        return (
            <div className="max-w-4xl mx-auto p-6 animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={reset} className="text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1">
                        <Icons.ArrowRight /> Back to Generator
                    </button>
                    {user && (
                        <button
                            onClick={addToMyCourses}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <Icons.Book /> Add to Dashboard
                        </button>
                    )}
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-gray-800">Marking Period Plan: {topic}</h3>
                            <span className="text-xs text-gray-500">Level: {level}</span>
                        </div>
                        <button className="text-sm text-blue-600 font-medium hover:underline">Download PDF</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-3 font-semibold">Week</th>
                                    <th className="px-6 py-3 font-semibold">Learning Target</th>
                                    <th className="px-6 py-3 font-semibold">Resource (Free)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {plan.map((week) => (
                                    <tr key={week.week} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm text-gray-500 align-top">Week {week.week}</td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="font-bold text-gray-800 mb-1">{week.topic || week.target}</div>
                                            <div className="text-xs text-gray-500">{week.description}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-blue-600 align-top">
                                            {week.resources ? (
                                                <ul className="space-y-1">
                                                    {week.resources.map((res, i) => (
                                                        <li key={i}>
                                                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                                                                <Icons.Link /> {res.title}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <a href={week.resource} target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer max-w-xs truncate block">
                                                    {week.resource}
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'ideas_selection') {
        return (
            <div className="max-w-5xl mx-auto p-6 animate-fade-in-up">
                <button onClick={() => setMode('wizard')} className="mb-6 text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1">
                    <Icons.ArrowRight /> Back to Profile
                </button>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gvcs-navy mb-2">We found some great ideas for you!</h2>
                    <p className="text-gray-600">Choose the one that excites you the most.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {generatedIdeas.map((idea, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all flex flex-col">
                            <div className="mb-4">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full
                                    ${idea.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                        idea.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'}`}>
                                    {idea.difficulty}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{idea.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-grow">{idea.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {idea.tags && idea.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">{tag}</span>
                                ))}
                            </div>

                            <button
                                onClick={() => handleIdeaSelection(idea)}
                                disabled={isGenerating}
                                className="w-full py-2 bg-gvcs-navy text-white rounded-lg font-bold hover:bg-blue-900 transition-colors flex justify-center items-center gap-2"
                            >
                                {isGenerating ? "Generating..." : (idea.type === 'premade' ? "View Course Plan" : "Generate Custom Plan")}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (mode === 'browse') {
        return (
            <div className="max-w-7xl mx-auto p-6 animate-fade-in-up">
                <button onClick={() => setMode('select')} className="mb-6 text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1">
                    <Icons.ArrowRight /> Back to Selection
                </button>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gvcs-navy mb-2">The GVCS "University-Standard" Curriculum</h2>
                    <p className="text-gray-600">Explore our hierarchical curriculum. Click any course to generate a plan.</p>
                </div>

                <CurriculumMap courses={POTENTIAL_COURSES} onSelect={handleIdeaSelection} />
            </div>
        );
    }

    if (mode === 'wizard') {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gvcs-navy px-8 py-6 text-white">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Icons.Lightbulb /> Idea Finder
                        </h2>
                        <p className="text-blue-100 opacity-90 text-sm">Tell us about yourself, and we'll build the perfect plan.</p>
                    </div>

                    <div className="p-8 space-y-8">

                        {/* Academic Stats */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Academic Background</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Math Courses Taken</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {Object.keys(mathCourses).map(course => (
                                            <label key={course} className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={mathCourses[course]}
                                                    onChange={() => handleMathChange(course)}
                                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{course}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">AP CSA Score (1-5)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={apCsaScore}
                                        onChange={(e) => setApCsaScore(e.target.value)}
                                        placeholder="e.g. 5"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">SAT Math Score</label>
                                    <input
                                        type="number"
                                        value={satMath}
                                        onChange={(e) => setSatMath(e.target.value)}
                                        placeholder="e.g. 750"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Previous Independent Studies</label>
                                    <textarea
                                        value={pastStudies}
                                        onChange={(e) => setPastStudies(e.target.value)}
                                        placeholder="e.g. Built a weather app in React, Made a Pong game in Python..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm h-20 resize-none"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">We'll use this to suggest something new and challenging.</p>
                                </div>
                            </div>
                        </section>

                        {/* Interests Sliders */}
                        <section className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Interests (1-10)</h3>
                            <div className="grid gap-6">
                                {questions.map((q) => (
                                    <div key={q.id}>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-medium text-gray-700">{q.text}</label>
                                            <span className="font-bold text-blue-600">{interestScores[q.id]}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={interestScores[q.id]}
                                            onChange={(e) => handleScoreChange(q.id, e.target.value)}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="pt-4 flex gap-4">
                            <button
                                onClick={() => setMode('select')}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={generateIdeas}
                                disabled={isGenerating}
                                className="flex-[2] py-3 bg-gvcs-navy text-white rounded-lg font-bold hover:bg-blue-900 transition-all shadow-lg flex justify-center items-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing Profile...
                                    </>
                                ) : (
                                    <>
                                        <Icons.Sparkles /> Find My Project
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'manual') {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-8">
                        <button onClick={() => setMode('select')} className="mb-6 text-sm text-gray-500 hover:text-gray-800">
                            ← Back
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Custom Plan</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Study Topic</label>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., Game Development with Unity"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <button
                                onClick={generateManualPlan}
                                disabled={!topic || isGenerating}
                                className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 mt-4
                  ${!topic || isGenerating ? 'bg-gray-300' : 'bg-gvcs-navy hover:bg-blue-900'}`}
                            >
                                {isGenerating ? "Generating..." : "Generate Plan"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gvcs-navy mb-3 flex items-center justify-center gap-3">
                    <Icons.Brain /> Curriculum Generator
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Need a plan for your independent study? We can help you build a compliant marking period schedule.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <button
                    onClick={() => setMode('wizard')}
                    className="bg-white p-8 rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-md transition-all group text-left"
                >
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icons.Lightbulb />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Help me find an idea</h3>
                    <p className="text-gray-500 text-sm">
                        Not sure what to study? Answer a few questions and we'll suggest some great projects for you.
                    </p>
                </button>

                <button
                    onClick={() => setMode('browse')}
                    className="bg-white p-8 rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-md transition-all group text-left"
                >
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icons.Book />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Browse Curriculum</h3>
                    <p className="text-gray-500 text-sm">
                        Explore our specialized tracks and pre-designed courses for mastery.
                    </p>
                </button>

                <button
                    onClick={() => setMode('manual')}
                    className="bg-white p-8 rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-md transition-all group text-left"
                >
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icons.Code />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">I have an idea</h3>
                    <p className="text-gray-500 text-sm">
                        Already know what you want to build? Enter your topic and we'll generate the schedule.
                    </p>
                </button>
            </div>
        </div>
    );
};

export default EllisGenerator;
