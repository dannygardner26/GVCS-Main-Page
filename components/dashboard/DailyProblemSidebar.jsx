import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';
import { getSchoolDayNumber, getDateFromSchoolDay } from '../../utils/schoolDays';
import { LEETCODE_POOL, USACO_POOL } from '../../ChallengeData';

// Custom hook for daily problems
export const useDailyProblem = (dayNumber) => {
    const [problems, setProblems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [attempts, setAttempts] = useState({ usaco: false, leetcode: false });
    const [counts, setCounts] = useState({ usaco: 0, leetcode: 0 });

    useEffect(() => {
        setLoading(true);

        if (dayNumber <= 0) {
            setLoading(false);
            return;
        }

        const targetDate = getDateFromSchoolDay(dayNumber);

        // LeetCode: Deterministic based on day number
        const leetcodeIndex = (dayNumber - 1) % LEETCODE_POOL.length;
        const leetcodeProblem = LEETCODE_POOL[leetcodeIndex];

        // USACO: 3 problems per week
        // Week number (0-indexed)
        const weekNum = Math.floor((dayNumber - 1) / 5);
        const contestIndex = weekNum % USACO_POOL.length;
        const contest = USACO_POOL[contestIndex];

        // Problem index within the week (0, 1, or 2)
        // Days 1-2 -> Prob 0, Days 3-4 -> Prob 1, Day 5 -> Prob 2
        const dayOfWeekIndex = (dayNumber - 1) % 5; // 0..4
        let problemIndex = 0;
        if (dayOfWeekIndex < 2) problemIndex = 0;      // Mon, Tue
        else if (dayOfWeekIndex < 4) problemIndex = 1; // Wed, Thu
        else problemIndex = 2;                         // Fri

        const usacoProblem = contest.problems[problemIndex];

        // Simulate fetching "global" counts
        const mockUsacoCount = Math.floor(Math.random() * 5) + (localStorage.getItem(`gvcs_attempt_usaco_${usacoProblem.title}`) ? 1 : 0);
        const mockLeetcodeCount = Math.floor(Math.random() * 15) + (localStorage.getItem(`gvcs_attempt_leetcode_${leetcodeProblem.title}`) ? 1 : 0);

        setTimeout(() => {
            setProblems({
                usaco: { ...usacoProblem, id: `usaco-${contestIndex}-${problemIndex}` },
                leetcode: { ...leetcodeProblem, id: `leetcode-${leetcodeIndex}` },
                date: targetDate
            });

            setAttempts({
                usaco: !!localStorage.getItem(`gvcs_attempt_usaco_${usacoProblem.title}`),
                leetcode: !!localStorage.getItem(`gvcs_attempt_leetcode_${leetcodeProblem.title}`)
            });

            setCounts({
                usaco: mockUsacoCount,
                leetcode: mockLeetcodeCount
            });

            setLoading(false);
        }, 300);

    }, [dayNumber]);

    const markAttempted = (type) => {
        if (!problems) return;
        const problemTitle = type === 'usaco' ? problems.usaco.title : problems.leetcode.title;
        const key = `gvcs_attempt_${type}_${problemTitle}`;

        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, 'true');
            setAttempts(prev => ({ ...prev, [type]: true }));
            setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
        }
    };

    return { problems, loading, attempts, counts, markAttempted };
};

const DailyProblemSidebar = () => {
    // Initialize with today's school day number
    const today = new Date();
    const currentSchoolDay = getSchoolDayNumber(today);
    const [selectedDay, setSelectedDay] = useState(currentSchoolDay);

    const { problems, loading, attempts, counts, markAttempted } = useDailyProblem(selectedDay);

    const handlePrev = () => {
        if (selectedDay > 1) setSelectedDay(d => d - 1);
    };

    const handleNext = () => {
        if (selectedDay < currentSchoolDay) setSelectedDay(d => d + 1);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gvcs-navy px-4 py-3 flex justify-between items-center">
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Daily Challenge
                </h3>
                {/* Navigation */}
                <div className="flex items-center gap-2 bg-blue-900/50 rounded-lg p-1">
                    <button
                        onClick={handlePrev}
                        disabled={selectedDay <= 1}
                        className="text-white hover:text-blue-200 disabled:opacity-30 disabled:cursor-not-allowed px-1"
                    >
                        <Icons.ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                    <span className="text-xs font-bold text-white min-w-[50px] text-center">
                        Day #{selectedDay}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={selectedDay >= currentSchoolDay}
                        className="text-white hover:text-blue-200 disabled:opacity-30 disabled:cursor-not-allowed px-1"
                    >
                        <Icons.ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="p-6 space-y-4 animate-pulse">
                    <div className="h-20 bg-gray-100 rounded-lg"></div>
                    <div className="h-20 bg-gray-100 rounded-lg"></div>
                </div>
            ) : problems ? (
                <>
                    {/* Date Header */}
                    <div className="bg-gray-50 px-4 py-1.5 text-xs text-gray-500 text-center border-b border-gray-100 font-medium flex justify-center items-center gap-2">
                        <Icons.Clock />
                        {problems.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </div>

                    {/* USACO Problem */}
                    <div className="p-5 border-b border-gray-100 relative group">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900 line-clamp-1">{problems.usaco.title}</h4>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-1 rounded whitespace-nowrap">
                                USACO {problems.usaco.difficulty}
                            </span>
                        </div>
                        <a
                            href={problems.usaco.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-3"
                        >
                            Open Problem ↗
                        </a>

                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => markAttempted('usaco')}
                                disabled={attempts.usaco}
                                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors flex items-center gap-1
                                    ${attempts.usaco
                                        ? 'bg-green-100 text-green-700 cursor-default'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {attempts.usaco ? <><Icons.Check /> Attempted</> : "Mark Attempted"}
                            </button>
                            <div className="text-xs text-gray-400 font-medium flex items-center gap-1" title="Students attempting this">
                                <Icons.Brain /> {counts.usaco}
                            </div>
                        </div>
                    </div>

                    {/* LeetCode Problem */}
                    <div className="p-5 bg-gray-50/50">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900 line-clamp-1">{problems.leetcode.title}</h4>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded whitespace-nowrap
                                ${problems.leetcode.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                    problems.leetcode.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                {problems.leetcode.difficulty}
                            </span>
                        </div>
                        <a
                            href={problems.leetcode.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-3"
                        >
                            Open LeetCode ↗
                        </a>

                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => markAttempted('leetcode')}
                                disabled={attempts.leetcode}
                                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors flex items-center gap-1
                                    ${attempts.leetcode
                                        ? 'bg-green-100 text-green-700 cursor-default'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {attempts.leetcode ? <><Icons.Check /> Attempted</> : "Mark Attempted"}
                            </button>
                            <div className="text-xs text-gray-400 font-medium flex items-center gap-1" title="Students attempting this">
                                <Icons.Brain /> {counts.leetcode}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="p-6 text-center text-gray-500">No problems found.</div>
            )}
        </div>
    );
};

export default DailyProblemSidebar;
