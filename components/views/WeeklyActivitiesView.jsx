import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import { Icons } from '../common/Icons';
import { getSchoolDayNumber } from '../../utils/schoolDays';
import { LEETCODE_POOL, USACO_POOL } from '../../ChallengeData';

const WeeklyActivitiesView = ({ user }) => {
    const navigate = useNavigate();
    const [weeklyProblems, setWeeklyProblems] = useState([]);
    const [problemStatuses, setProblemStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    const currentWeek = Math.floor((getSchoolDayNumber(new Date()) - 1) / 5) + 1;
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        fetchWeeklyProblems();
        if (user) {
            fetchProblemStatuses();
        }
    }, [user]);

    const fetchWeeklyProblems = async () => {
        setLoading(true);
        try {
            const problems = [];

            // 4 Weekly LeetCode problems (rotate through the pool based on week)
            const leetcodeStartIndex = ((currentWeek - 1) * 4) % LEETCODE_POOL.length;
            for (let i = 0; i < 4; i++) {
                const leetcodeProblem = LEETCODE_POOL[(leetcodeStartIndex + i) % LEETCODE_POOL.length];
                problems.push({
                    type: 'leetcode',
                    title: leetcodeProblem.title,
                    url: leetcodeProblem.url,
                    difficulty: leetcodeProblem.difficulty,
                    problemNumber: i + 1
                });
            }

            // 3 Weekly USACO problems (rotate through contests)
            const contestIndex = (currentWeek - 1) % USACO_POOL.length;
            const contest = USACO_POOL[contestIndex];
            contest.problems.forEach((usacoProblem, index) => {
                problems.push({
                    type: 'usaco',
                    title: usacoProblem.title,
                    url: usacoProblem.url,
                    difficulty: usacoProblem.difficulty,
                    problemNumber: index + 1,
                    contest: contest.contest
                });
            });

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

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1"
                    >
                        <Icons.ArrowRight className="rotate-180" /> Back to Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/dashboard?showHistory=true')}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                        <Icons.Clock className="w-4 h-4" /> View All History
                    </button>
                </div>
                <h2 className="text-3xl font-bold text-gvcs-navy mb-2">Weekly Activities</h2>
                <p className="text-gray-600">Week {currentWeek} • Track your progress on this week's problems</p>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Loading problems...</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Daily LeetCode Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-orange-50 px-6 py-4 border-b border-orange-100">
                            <h3 className="text-xl font-bold text-orange-800 flex items-center gap-2">
                                <Icons.Clock className="w-6 h-6" /> Daily LeetCode
                            </h3>
                            <p className="text-sm text-orange-700 mt-1">A new problem every day - complete for bonus practice!</p>
                        </div>
                        <div className="p-6">
                            <a
                                href="https://leetcodepotd.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors">
                                    <Icons.Sparkles className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                                        Today's LeetCode Problem of the Day
                                    </span>
                                    <div className="text-sm text-gray-500 mt-1">Click to view today's challenge on LeetCode POTD</div>
                                </div>
                                <div className="text-orange-500 group-hover:translate-x-1 transition-transform">
                                    <Icons.ArrowRight className="w-5 h-5" />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* LeetCode Section - 4 Ordered Problems */}
                    {leetcodeProblems.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                                <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                                    <Icons.Code className="w-6 h-6" /> Weekly LeetCode (4 Problems)
                                </h3>
                                <p className="text-sm text-green-700 mt-1">Complete these 4 problems this week</p>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {leetcodeProblems.map((problem, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold text-lg flex-shrink-0">
                                                {problem.problemNumber}
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
                                                <div className="text-sm text-gray-500 mt-1">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                        {problem.difficulty}
                                                    </span>
                                                </div>
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
                                    <Icons.Brain className="w-6 h-6" /> Weekly USACO (3 Problems)
                                </h3>
                                <p className="text-sm text-amber-700 mt-1">
                                    {usacoProblems[0]?.contest && `From ${usacoProblems[0].contest} Contest`}
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {usacoProblems.map((problem, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-lg flex-shrink-0">
                                                {problem.problemNumber}
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
                                                <div className="text-sm text-gray-500 mt-1">
                                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
                                                        {problem.difficulty || 'Bronze'}
                                                    </span>
                                                </div>
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
