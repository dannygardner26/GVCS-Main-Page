import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
    doc,
    updateDoc,
    increment
} from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CURRICULUM_DATA } from './CurriculumData';
import { GENERATE_PLAN_PROMPT, IDEA_GENERATION_PROMPT } from './Prompts';

// --- Configuration & Mock Detection ---
const IS_MOCK = !window.__app_id;
const APP_ID = window.__app_id || "mock-app-id";
const DATA_PATH = `artifacts/${APP_ID}/public/data`;

// --- Firebase Initialization (Conditional) ---
let db;
if (!IS_MOCK) {
    const app = initializeApp(window.__firebase_config);
    db = getFirestore(app);
} else {
    console.warn("Running in MOCK MODE. Firebase is disabled.");
}

// --- Supabase Initialization ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Icons ---
const Icons = {
    Clock: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
    Location: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
    Book: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>,
    Code: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>,
    Chat: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>,
    Check: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>,
    Sparkles: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>,
    Brain: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>,
    Lightbulb: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>,
    ArrowRight: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>,
    Link: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>,
    GradCap: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v7"></path></svg>,
    Shield: (props) => <svg {...props} className={`w-5 h-5 ${props.className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
};

// --- Data Layer ---

const mockDb = {
    daily_problems: [],
    problem_stats: {}
};

import { LEETCODE_POOL, USACO_POOL } from './ChallengeData';

// Helper to calculate school day number (1-based index of weekdays since Sept 2, 2025)
const SCHOOL_START_DATE = new Date('2025-09-02T00:00:00'); // Tuesday after Labor Day 2025

const getSchoolDayNumber = (date) => {
    let count = 0;
    let current = new Date(SCHOOL_START_DATE);
    const target = new Date(date);

    // Reset hours to compare dates only
    current.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    if (target < current) return 0; // Before school starts

    while (current <= target) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) { // Skip weekends
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    return count;
};

const getDateFromSchoolDay = (dayNumber) => {
    let count = 0;
    let current = new Date(SCHOOL_START_DATE);
    current.setHours(0, 0, 0, 0);

    while (count < dayNumber) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
            count++;
        }
        if (count < dayNumber) {
            current.setDate(current.getDate() + 1);
        }
    }
    return current;
};

const useDailyProblem = (dayNumber) => {
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

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleDemoLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const demoEmail = 'demo@gvcs.com';
            const demoPassword = 'demo123456';

            // First, try to sign in
            let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: demoEmail,
                password: demoPassword
            });

            // If sign in fails, try to create the account
            if (authError) {
                // Try to sign up
                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: demoEmail,
                    password: demoPassword,
                    options: {
                        data: {
                            name: 'Demo Student',
                            isDemo: true
                        },
                        emailRedirectTo: window.location.origin
                    }
                });

                if (signUpError && !signUpError.message.includes('already registered')) {
                    throw signUpError;
                }

                // If email confirmation is required and we don't have a session, 
                // we need to handle this. For demo accounts, we'll use a workaround:
                // Try to sign in immediately after signup (some Supabase configs allow this)
                if (signUpData.user && !signUpData.session) {
                    // Wait a moment and try signing in
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
                        email: demoEmail,
                        password: demoPassword
                    });

                    if (retryError) {
                        // If still failing due to email confirmation, show helpful message
                        if (retryError.message.includes('Email not confirmed') || retryError.message.includes('confirm')) {
                            setError('Email confirmation is required. Please disable "Enable email confirmations" in Supabase Dashboard → Authentication → Settings, or check your email to confirm the account.');
                            setLoading(false);
                            return;
                        }
                        throw retryError;
                    }

                    authData = retryData;
                } else if (signUpData.session) {
                    authData = signUpData;
                } else {
                    // Try one more time to sign in
                    const { data: finalData, error: finalError } = await supabase.auth.signInWithPassword({
                        email: demoEmail,
                        password: demoPassword
                    });

                    if (finalError) throw finalError;
                    authData = finalData;
                }
            }

            // If we have a session, log in
            if (authData?.session || authData?.user) {
                onLogin({
                    id: authData.user.id,
                    name: authData.user.user_metadata?.name || "Demo Student",
                    email: authData.user.email,
                    isDemo: true
                });
                onClose();
            } else {
                throw new Error('Failed to create session');
            }
        } catch (err) {
            console.error('Demo login error:', err);
            setError(err.message || 'Failed to login with demo account. Make sure email confirmation is disabled in Supabase settings.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdminLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const adminEmail = 'admin@gvcs.com';
            const adminPassword = 'admin123456';

            // First, try to sign in
            let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: adminEmail,
                password: adminPassword
            });

            // If sign in fails, try to create the account
            if (authError) {
                // Try to sign up
                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: adminEmail,
                    password: adminPassword,
                    options: {
                        data: {
                            name: 'Admin',
                            isAdmin: true,
                            role: 'admin'
                        },
                        emailRedirectTo: window.location.origin
                    }
                });

                if (signUpError && !signUpError.message.includes('already registered')) {
                    throw signUpError;
                }

                // If email confirmation is required and we don't have a session, 
                // we need to handle this. For admin accounts, we'll use a workaround:
                // Try to sign in immediately after signup (some Supabase configs allow this)
                if (signUpData.user && !signUpData.session) {
                    // Wait a moment and try signing in
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
                        email: adminEmail,
                        password: adminPassword
                    });

                    if (retryError) {
                        // If still failing due to email confirmation, show helpful message
                        if (retryError.message.includes('Email not confirmed') || retryError.message.includes('confirm')) {
                            setError('Email confirmation is required. Please disable "Enable email confirmations" in Supabase Dashboard → Authentication → Settings, or check your email to confirm the account.');
                            setLoading(false);
                            return;
                        }
                        throw retryError;
                    }

                    authData = retryData;
                } else if (signUpData.session) {
                    authData = signUpData;
                } else {
                    // Try one more time to sign in
                    const { data: finalData, error: finalError } = await supabase.auth.signInWithPassword({
                        email: adminEmail,
                        password: adminPassword
                    });

                    if (finalError) throw finalError;
                    authData = finalData;
                }
            }

            // If we have a session, log in
            if (authData?.session || authData?.user) {
                onLogin({
                    id: authData.user.id,
                    name: authData.user.user_metadata?.name || "Admin",
                    email: authData.user.email,
                    isAdmin: true
                });
                onClose();
            } else {
                throw new Error('Failed to create session');
            }
        } catch (err) {
            console.error('Admin login error:', err);
            setError(err.message || 'Failed to login with admin account. Make sure email confirmation is disabled in Supabase settings.');
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            onLogin({
                id: data.user.id,
                name: data.user.user_metadata?.name || data.user.email,
                email: data.user.email,
                isDemo: false
            });
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-fade-in">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100">
                <h2 className="text-2xl font-bold text-gvcs-navy mb-2">Student Login</h2>
                <p className="text-gray-500 mb-6">Access your saved plans and track progress.</p>

                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gvcs-navy text-white rounded-lg font-bold hover:bg-blue-900 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or</span></div>
                </div>

                <button
                    onClick={handleDemoLogin}
                    disabled={loading}
                    className="w-full py-3 bg-green-50 text-green-700 border border-green-200 rounded-lg font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <Icons.Sparkles /> Try Demo Account
                </button>

                <button
                    onClick={handleAdminLogin}
                    disabled={loading}
                    className="w-full mt-3 py-3 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg font-bold hover:bg-purple-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <Icons.Sparkles /> Login as Admin
                </button>

                <button onClick={onClose} className="mt-6 text-sm text-gray-500 hover:text-gray-800 w-full text-center">
                    Cancel
                </button>
            </div>
        </div>
    );
};

const EventList = () => {
    const events = [
        // --- Local / Train Distance (Philly, NYC, DC, NJ) ---
        { date: "Dec 05", name: "ImpactX '25", type: "Virtual", tag: "Major", url: "https://code4hope.org" },
        { date: "Dec 10", name: "AI Summit NY Hackathon", type: "In-Person", tag: "Trip", url: "https://theaisummit.com/newyork/hackathon" },
        { date: "Dec 12", name: "Agentic AI Hackathon", type: "In-Person", tag: "Trip", url: "https://odsc.com/new-york/hackathon/" },
        { date: "Dec 12", name: "MLH & DigitalOcean AI", type: "In-Person", tag: "Trip", url: "https://organize.mlh.io/participants/events/11388-ai-hackathon-hosted-by-mlh-digitalocean" },
        { date: "Jan 10", name: "DeltaHacks 12", type: "In-Person", tag: "Major", url: "https://deltahacks.com/" }, // Hamilton is a bit far but popular
        { date: "Jan 17", name: "Hack BI", type: "In-Person", tag: "Local", url: "https://hackbi.org/" }, // Alexandria VA
        { date: "Jan 23", name: "Hoya Hacks 2026", type: "In-Person", tag: "Trip", url: "https://hoyahacks.georgetown.domains/" },
        { date: "Jan 2026", name: "DragonHacks XII", type: "In-Person", tag: "Local", url: "https://dragonhacks.org/" }, // Philly
        { date: "Feb 07", name: "DevFest NYC", type: "In-Person", tag: "Trip", url: "https://mlh.io/seasons/2026/events" },
        { date: "Feb 28", name: "Code Quest NJ", type: "In-Person", tag: "Local", url: "https://www.lmcodequestacademy.com/" },
        { date: "Mar 07", name: "HackNJIT", type: "In-Person", tag: "Local", url: "https://hacknjit.org/" },

        // --- Other Major Events ---
        { date: "Dec 06", name: "East Bay Hackers", type: "In-Person", tag: "Fun", url: "https://eastbayhackers.club/" },
        { date: "Dec 07", name: "CrabHacks 2025", type: "In-Person", tag: "Fun", url: "https://crabhacks.org/" },
        { date: "Dec 08", name: "CodeFest 2025", type: "Virtual", tag: "Fun", url: "https://codefesthack2025.vercel.app/" },
        { date: "Dec 12", name: "Global Hack Week: AI/ML", type: "Virtual", tag: "Major", url: "https://hack.mlh.io/" },
        { date: "Jan 16", name: "CruzHacks 2026", type: "In-Person", tag: "Major", url: "https://cruzhacks.com/" },
        { date: "Jan 17", name: "nwHacks 2026", type: "In-Person", tag: "Major", url: "https://www.nwhacks.io/" },
        { date: "Jan 17", name: "McHacks 13", type: "In-Person", tag: "Major", url: "https://mchacks.ca/" },
        { date: "Jan 30", name: "ElleHacks 2026", type: "In-Person", tag: "Major", url: "https://ellehacks.com/" },

        // --- Exams ---
        { date: "May 05", name: "AP Computer Science A Exam", type: "Exam", tag: "School", url: "https://apstudents.collegeboard.org/courses/ap-computer-science-a/assessment" },
    ].sort((a, b) => {
        // Simple date sorter for "Month Day" format assuming upcoming year
        const getMonthIdx = (m) => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(m);
        const [mA, dA] = a.date.split(' ');
        const [mB, dB] = b.date.split(' ');

        // Handle "Jan 2026" vs "Jan 10"
        const dayA = parseInt(dA) || 1;
        const dayB = parseInt(dB) || 1;

        // Adjust for year boundary (Dec is 2025, Jan+ is 2026)
        const yearA = getMonthIdx(mA) >= 11 ? 2025 : 2026;
        const yearB = getMonthIdx(mB) >= 11 ? 2025 : 2026;

        if (yearA !== yearB) return yearA - yearB;
        if (getMonthIdx(mA) !== getMonthIdx(mB)) return getMonthIdx(mA) - getMonthIdx(mB);
        return dayA - dayB;
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Upcoming Events</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{events.length} Events</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                {events.map((e, i) => (
                    <div key={i} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                        <div className="text-center min-w-[60px]">
                            <div className="text-xs font-bold text-blue-600 uppercase">{e.date.split(' ')[0]}</div>
                            <div className="text-lg font-bold text-gray-800">{e.date.split(' ')[1]}</div>
                        </div>
                        <div className="flex-1">
                            {e.url ? (
                                <a
                                    href={e.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-bold text-gray-900 hover:text-blue-600 hover:underline flex items-center gap-1"
                                >
                                    {e.name}
                                    <Icons.Link className="w-3 h-3 text-gray-400" />
                                </a>
                            ) : (
                                <h4 className="text-sm font-bold text-gray-900">{e.name}</h4>
                            )}
                            <div className="flex gap-2 mt-1">
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{e.type}</span>
                                {e.tag === 'Major' && <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded">Critical</span>}
                                {e.tag === 'Local' && <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">Local</span>}
                                {e.tag === 'Trip' && <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">Trip</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Generate POTENTIAL_COURSES from CURRICULUM_DATA
const POTENTIAL_COURSES = Object.keys(CURRICULUM_DATA).map(title => {
    const course = CURRICULUM_DATA[title];
    return {
        title,
        type: "premade",
        difficulty: course.tier === 1 ? "Intermediate" : course.tier === 2 ? "Advanced" : "Expert",
        tags: course.track ? [course.track] : [],
        tier: course.tier,
        track: course.track,
        description: course.description,
        prereqs: course.prereqs || []
    };
});

const CurriculumMap = ({ courses, onSelect }) => {
    // Organize courses by tier
    const tier1Courses = courses.filter(c => c.tier === 1);
    const tier2Courses = courses.filter(c => c.tier === 2);
    const tier3Courses = courses.filter(c => c.tier === 3);

    // Organize Tier 3 by track
    const trackA = tier3Courses.filter(c => c.track === "Artificial Intelligence");
    const trackB = tier3Courses.filter(c => c.track === "Systems & Data");
    const trackC = tier3Courses.filter(c => c.track === "Languages & Theory");
    const trackD = tier3Courses.filter(c => c.track === "Cybersecurity");
    const trackE = tier3Courses.filter(c => c.track === "Game Design & Simulation");
    const trackF = tier3Courses.filter(c => c.track === "Futurist Electives");

    const getCourse = (title) => courses.find(c => c.title === title) || { title, difficulty: "Unknown", tags: [], description: "" };

    const CourseCard = ({ course, tier, track }) => {
        const courseData = getCourse(course.title);
        const fullCourseData = CURRICULUM_DATA[course.title] || {};
        const tierColors = {
            1: {
                bg: "bg-blue-500/10", border: "border-blue-500/50", hover: "hover:border-blue-400", glow: "bg-blue-500",
                label: "Tier 1: Gatekeeper", labelBg: "bg-blue-500"
            },
            2: {
                bg: "bg-purple-500/10", border: "border-purple-500/50", hover: "hover:border-purple-400", glow: "bg-purple-500",
                label: "Tier 2: Core", labelBg: "bg-purple-500"
            },
            3: {
                bg: "bg-emerald-500/10", border: "border-emerald-500/50", hover: "hover:border-emerald-400", glow: "bg-emerald-500",
                label: "Tier 3: Specialization", labelBg: "bg-emerald-500"
            }
        };
        const colors = tierColors[tier] || tierColors[3];
        const description = fullCourseData.description || courseData.description || course.description || "";

        return (
            <div
                className={`relative group/card ${colors.bg} ${colors.border} border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${colors.hover} hover:shadow-2xl hover:scale-105`}
                onClick={() => onSelect(courseData)}
            >
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-xl blur-xl opacity-0 group-hover/card:opacity-30 transition-opacity duration-500 ${colors.glow}`}></div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Tier Label */}
                    <div className={`${colors.labelBg} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full inline-block mb-3`}>
                        {colors.label}
                    </div>

                    {/* Course Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover/card:text-blue-300 transition-colors">
                        {course.title}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                            {description}
                        </p>
                    )}

                    {/* Prerequisites */}
                    {(fullCourseData.prereqs || courseData.prereqs) && (fullCourseData.prereqs || courseData.prereqs).length > 0 && (
                        <div className="mb-3">
                            <div className="text-xs text-gray-500 mb-1">Prerequisites:</div>
                            <div className="flex flex-wrap gap-1">
                                {(fullCourseData.prereqs || courseData.prereqs).slice(0, 2).map((prereq, i) => (
                                    <span key={i} className="text-xs bg-slate-700/50 text-gray-300 px-2 py-0.5 rounded">
                                        {prereq}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Track Badge (Tier 3 only) */}
                    {track && (
                        <div className="mt-3">
                            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded">
                                Track: {track}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-[#0B1120] to-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
            <div className="p-8 space-y-12">
                {/* TIER 1: The Gatekeepers */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="w-1 h-8 bg-blue-500 rounded"></span>
                            TIER 1: The Gatekeepers
                        </h2>
                        <p className="text-gray-400 text-sm ml-4">Freshman Spring / Sophomore Fall • Non-negotiable pillars</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {tier1Courses.map((course, i) => (
                            <CourseCard key={i} course={course} tier={1} />
                        ))}
                    </div>
                </section>

                {/* TIER 2: The Core */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="w-1 h-8 bg-purple-500 rounded"></span>
                            TIER 2: The Core
                        </h2>
                        <p className="text-gray-400 text-sm ml-4">Sophomore Spring / Junior Fall • Rigorous center of CS degree</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {tier2Courses.map((course, i) => (
                            <CourseCard key={i} course={course} tier={2} />
                        ))}
                    </div>
                </section>

                {/* TIER 3: Senior Tracks / Specializations */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="w-1 h-8 bg-emerald-500 rounded"></span>
                            TIER 3: Senior Tracks / Specializations
                        </h2>
                        <p className="text-gray-400 text-sm ml-4">Junior Spring / Senior Year • Pick one track to specialize</p>
                    </div>

                    <div className="space-y-8">
                        {/* Track A: Artificial Intelligence */}
                        <div>
                            <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                Track A: Artificial Intelligence
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {trackA.map((course, i) => (
                                    <CourseCard key={i} course={course} tier={3} track="Artificial Intelligence" />
                                ))}
                            </div>
                        </div>

                        {/* Track B: Systems & Data */}
                        <div>
                            <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                Track B: Systems & Data
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {trackB.map((course, i) => (
                                    <CourseCard key={i} course={course} tier={3} track="Systems & Data" />
                                ))}
                            </div>
                        </div>

                        {/* Track C: Languages & Theory */}
                        <div>
                            <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                Track C: Languages & Theory
                            </h3>
                            <div className="grid md:grid-cols-1 gap-6 max-w-2xl">
                                {trackC.map((course, i) => (
                                    <CourseCard key={i} course={course} tier={3} track="Languages & Theory" />
                                ))}
                            </div>
                        </div>

                        {/* Track D: Cybersecurity */}
                        <div>
                            <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                Track D: Cybersecurity
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {trackD.map((course, i) => (
                                    <CourseCard key={i} course={course} tier={3} track="Cybersecurity" />
                                ))}
                            </div>
                        </div>

                        {/* Track E: Game Design & Simulation */}
                        <div>
                            <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                Track E: Game Design & Simulation
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {trackE.map((course, i) => (
                                    <CourseCard key={i} course={course} tier={3} track="Game Design & Simulation" />
                                ))}
                            </div>
                        </div>

                        {/* Track F: Futurist Electives */}
                        <div>
                            <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                Track F: Futurist Electives
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {trackF.map((course, i) => (
                                    <CourseCard key={i} course={course} tier={3} track="Futurist Electives" />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

// Ellis Activity Card Component (Collapsible)
const EllisActivityCard = ({ type, title, description, guidelines }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const colors = {
        builder: { border: 'border-blue-500', bg: 'bg-blue-50/50', badge: 'bg-blue-500', text: 'text-blue-700' },
        academic: { border: 'border-purple-500', bg: 'bg-purple-50/50', badge: 'bg-purple-500', text: 'text-purple-700' },
        communicator: { border: 'border-orange-500', bg: 'bg-orange-50/50', badge: 'bg-orange-500', text: 'text-orange-700' }
    };

    const color = colors[type] || colors.builder;
    const typeLabel = type === 'builder' ? 'Builder' : type === 'academic' ? 'Academic' : 'Communicator';

    return (
        <div className={`border-l-4 ${color.border} pl-3 py-2 ${color.bg} rounded-r-lg`}>
            <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold ${color.badge} text-white px-2 py-0.5 rounded uppercase tracking-wider`}>
                        {typeLabel}
                    </span>
                    <span className="text-xs text-gray-500 italic">Choose One</span>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                    {isExpanded ? 'Less' : 'Learn More'}
                    <Icons.ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
            </div>
            <div className="text-sm font-bold text-gray-800 mb-1">{title}</div>
            {isExpanded && (
                <div className="mt-2 space-y-2">
                    <div className="text-xs text-gray-700 leading-relaxed">{description}</div>
                    {guidelines && guidelines.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className={`text-[10px] font-semibold ${color.text} uppercase tracking-wider mb-1`}>
                                Guidelines:
                            </div>
                            <ul className="text-xs text-gray-600 space-y-1">
                                {guidelines.map((g, i) => (
                                    <li key={i} className="flex items-start gap-1">
                                        <span className={`${color.text} mt-0.5`}>•</span>
                                        <span>{g}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const EllisGenerator = ({ user, onLoginRequest }) => {
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
            alert("Failed to generate ideas. Please try again.");
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

            setPlan(data.weeks); // The existing UI expects 'plan' to be the array of weeks, but let's check 'results' view
            // Actually the 'results' view uses 'plan' as an array of weeks in the table.
            // But wait, the 'browse' mode sets 'plan' to an object with title, description, weeks.
            // Let's standardize.

            // If I look at 'results' mode:
            // if (mode === 'results' && plan) { ... }
            // It accesses plan.map... so 'plan' is expected to be an array?
            // Let's check the 'browse' mode setter:
            // setPlan({ title: ..., weeks: ... })
            // AND the 'results' view:
            // <h3 ...>{topic}</h3> ... {plan.map(...)}
            // Wait, if plan is an object, plan.map will fail.
            // Let's check the 'results' render logic again.

            // Ah, in the original code:
            // if (mode === 'results' && plan) { ... {plan.map(...)} }
            // So 'plan' IS just the array of weeks in the original code.
            // BUT in 'browse' mode (lines 787-792):
            // setPlan({ title: ..., weeks: ... })
            // This would BREAK the results view if it expects an array.

            // Let's look at the 'results' view implementation in the file I read (lines 649+):
            // It uses {plan.map((week) => ...)}
            // So 'plan' MUST be an array.

            // The 'browse' mode setter in the original code (lines 787+) sets an OBJECT.
            // This implies the 'browse' mode might be broken or I misread the 'results' view.
            // Let's look at line 663: <h3 ...>{topic}</h3>
            // 'topic' is a state variable.

            // So for 'browse' mode to work, it must set 'topic' state as well.
            // The original code:
            // setPlan({ title: ..., weeks: ... }) -> This looks suspicious if 'results' expects an array.
            // Let's fix this standardization now.

            // I will set 'topic' and 'plan' (as weeks array) separately.

            setTopic(data.title || selectedIdea.title);
            setPlan(data.weeks);
            setMode('results');

        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("Failed to generate plan. Please try again.");
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
            alert("Failed to generate plan. Please try again.");
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
        alert("Plan saved successfully!");
    };

    const addToMyCourses = async () => {
        if (!user) {
            onLoginRequest();
            return;
        }

        try {
            // Generate course_id from topic
            const courseId = topic.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').toUpperCase();

            const courseData = {
                user_id: user.id,
                course_title: topic,
                course_id: courseId,
                weeks: plan.map(week => ({
                    week: week.week,
                    topic: week.topic,
                    description: week.description,
                    resources: week.resources,
                    deliverables: week.deliverables,
                    selected_activity: null,
                    submissions: {
                        builder: null,
                        academic: null,
                        communicator: null
                    }
                }))
            };

            // Check if course already exists
            const { data: existingCourses, error: fetchError } = await supabase
                .from('user_courses')
                .select('id')
                .eq('user_id', user.id)
                .eq('course_id', courseId)
                .single();

            if (existingCourses) {
                if (confirm("You already have this course. Replace it?")) {
                    const { error: updateError } = await supabase
                        .from('user_courses')
                        .update({
                            course_title: courseData.course_title,
                            weeks: courseData.weeks,
                            updated_at: new Date().toISOString()
                        })
                        .eq('id', existingCourses.id);

                    if (updateError) throw updateError;
                    alert("Course updated!");
                }
            } else {
                const { error: insertError } = await supabase
                    .from('user_courses')
                    .insert([courseData]);

                if (insertError) throw insertError;
                alert("Course added to Dashboard!");
            }
        } catch (error) {
            console.error('Error adding course:', error);
            alert("Failed to add course. Please try again.");
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

const ResourcesView = () => {
    const resources = [
        {
            category: "Learn to Code",
            items: [
                { name: "Codecademy", url: "https://www.codecademy.com", desc: "Interactive coding lessons" },
                { name: "freeCodeCamp", url: "https://www.freecodecamp.org", desc: "Free certifications and projects" },
                { name: "CS50", url: "https://cs50.harvard.edu/x/", desc: "Harvard's Intro to CS" },
            ]
        },
        {
            category: "Competitive Programming",
            items: [
                { name: "USACO Guide", url: "https://usaco.guide", desc: "Comprehensive training curriculum" },
                { name: "Codeforces", url: "https://codeforces.com", desc: "Weekly contests and problem sets" },
                { name: "LeetCode", url: "https://leetcode.com", desc: "Interview prep and challenges" },
            ]
        },
        {
            category: "Game Development",
            items: [
                { name: "Unity Learn", url: "https://learn.unity.com", desc: "Official Unity tutorials" },
                { name: "Godot Docs", url: "https://docs.godotengine.org", desc: "Open source engine documentation" },
            ]
        },
        {
            category: "Web Development",
            items: [
                { name: "MDN Web Docs", url: "https://developer.mozilla.org", desc: "The bible of web development" },
                { name: "CSS-Tricks", url: "https://css-tricks.com", desc: "Deep dives into CSS" },
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gvcs-navy mb-8">Learning Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {resources.map((cat, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">{cat.category}</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {cat.items.map((item, j) => (
                                <a
                                    key={j}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-6 py-4 hover:bg-blue-50 transition-colors group"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-blue-600 group-hover:underline">{item.name}</span>
                                        <Icons.Link />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const WeeklyActivitiesView = ({ user }) => {
    const { problems } = useDailyProblem(1); // Reusing hook for demo data
    const [problemStatuses, setProblemStatuses] = useState({});

    useEffect(() => {
        if (user) {
            fetchProblemStatuses();
        }
    }, [user]);

    const fetchProblemStatuses = async () => {
        try {
            const { data, error } = await supabase
                .from('user_problem_statuses')
                .select('*')
                .eq('user_id', user.id);

            if (error) {
                // If table doesn't exist, ignore error and set empty status map
                if (error.code === '42P01' || error.message?.includes('404')) {
                    console.warn('user_problem_statuses table does not exist yet. Run the SQL schema in Supabase.');
                    setProblemStatuses({});
                    return;
                }
                throw error;
            }

            const statusMap = {};
            if (data) {
                data.forEach(item => {
                    statusMap[item.problem_url] = item.status;
                });
            }
            setProblemStatuses(statusMap);
        } catch (error) {
            console.error('Error fetching statuses:', error);
            setProblemStatuses({}); // Set empty map on error
        }
    };

    const updateStatus = async (url, status) => {
        if (!user) return;

        // Optimistic update
        setProblemStatuses(prev => ({ ...prev, [url]: status }));

        try {
            const { error } = await supabase
                .from('user_problem_statuses')
                .upsert({
                    user_id: user.id,
                    problem_url: url,
                    status: status,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id, problem_url' });

            if (error) {
                // If table doesn't exist, ignore error for demo purposes
                if (error.code === '42P01' || error.message?.includes('404')) {
                    console.warn('user_problem_statuses table does not exist yet. Run the SQL schema in Supabase.');
                    return;
                }
                throw error;
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleProblemClick = (url) => {
        if (!problemStatuses[url]) {
            updateStatus(url, 'attempted');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'solved': return 'bg-green-50 border-green-200';
            case 'dnf': return 'bg-red-50 border-red-200';
            case 'attempted': return 'bg-yellow-50 border-yellow-200';
            default: return 'bg-gray-50 border-transparent';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gvcs-navy mb-2">Weekly Activities</h2>
                <p className="text-gray-600">Sharpen your skills with this week's curated challenges.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* USACO Column */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="bg-amber-50 px-4 py-3 border-b border-amber-100 flex justify-between items-center">
                        <h3 className="font-bold text-amber-800">USACO Bronze</h3>
                        <Icons.Brain className="text-amber-600 w-5 h-5" />
                    </div>
                    <div className="p-4 flex-grow space-y-4">
                        <div className="space-y-2">
                            {[
                                { name: 'Candy Cane Feast', url: 'http://www.usaco.org/index.php?page=viewproblem2&cpid=1347' },
                                { name: 'Cowntact Tracing 2', url: 'http://usaco.org/index.php?page=viewproblem2&cpid=1348' },
                                { name: 'Farmer John Actually Farms', url: 'http://usaco.org/index.php?page=viewproblem2&cpid=1349' }
                            ].map((p, i) => (
                                <div key={i} className={`rounded-lg border transition-all ${getStatusColor(problemStatuses[p.url])}`}>
                                    <a
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleProblemClick(p.url)}
                                        className="block p-3 hover:opacity-80"
                                    >
                                        <div className="text-sm font-bold text-gray-800">{p.name}</div>
                                        {problemStatuses[p.url] && (
                                            <div className="text-xs font-bold uppercase mt-1 flex items-center gap-1">
                                                {problemStatuses[p.url] === 'solved' && <span className="text-green-700">✓ Solved</span>}
                                                {problemStatuses[p.url] === 'dnf' && <span className="text-red-700">✕ DNF</span>}
                                                {problemStatuses[p.url] === 'attempted' && <span className="text-yellow-700">⚠ Attempted</span>}
                                            </div>
                                        )}
                                    </a>
                                    {problemStatuses[p.url] && problemStatuses[p.url] !== 'solved' && (
                                        <div className="flex border-t border-gray-200 divide-x divide-gray-200">
                                            <button
                                                onClick={() => updateStatus(p.url, 'solved')}
                                                className="flex-1 py-1 text-xs font-bold text-green-600 hover:bg-green-100 transition-colors"
                                            >
                                                Solved
                                            </button>
                                            <button
                                                onClick={() => updateStatus(p.url, 'dnf')}
                                                className="flex-1 py-1 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors"
                                            >
                                                DNF
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* LeetCode Column */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="bg-green-50 px-4 py-3 border-b border-green-100 flex justify-between items-center">
                        <h3 className="font-bold text-green-800">LeetCode Daily</h3>
                        <Icons.Code className="text-green-600 w-5 h-5" />
                    </div>
                    <div className="p-4 flex-grow space-y-4">
                        <div className="p-4 bg-green-50/50 rounded-xl border border-green-100 text-center">
                            <div className="text-2xl font-bold text-green-700 mb-1">Day 12</div>
                            <div className="text-sm font-medium text-green-800">Two Sum II</div>
                            <a
                                href="https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 block w-full py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
                            >
                                Solve Now
                            </a>
                        </div>
                        <div className="text-xs text-center text-gray-400">Streak: 12 Days 🔥</div>
                    </div>
                </div>

                {/* Codeforces Column */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex justify-between items-center">
                        <h3 className="font-bold text-blue-800">Codeforces</h3>
                        <Icons.Sparkles className="text-blue-600 w-5 h-5" />
                    </div>
                    <div className="p-4 flex-grow space-y-4">
                        <div className="text-sm text-gray-600">Contest: <span className="font-bold">Div 3 #921</span></div>
                        <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Virtual Contest</div>
                            <div className="text-sm font-bold text-gray-800 mb-1">Round #921 (Div. 3)</div>
                            <div className="text-xs text-gray-500 mb-3">7 Problems • 2 Hours</div>
                            <a
                                href="https://codeforces.com/contest/1926"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors text-center"
                            >
                                Start Virtual
                            </a>
                        </div>
                    </div>
                </div>

                {/* GV Project Column */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="bg-purple-50 px-4 py-3 border-b border-purple-100 flex justify-between items-center">
                        <h3 className="font-bold text-purple-800">GV Project</h3>
                        <Icons.Lightbulb className="text-purple-600 w-5 h-5" />
                    </div>
                    <div className="p-4 flex-grow space-y-4">
                        <div className="text-sm text-gray-600">Theme: <span className="font-bold">Club Platform</span></div>
                        <div className="p-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl text-white">
                            <div className="text-xs font-bold opacity-75 uppercase tracking-wider mb-2">Active Sprint</div>
                            <div className="font-bold text-lg mb-2">Finalize Contest Platform</div>
                            <p className="text-xs opacity-90 leading-relaxed mb-4">
                                We are building our own competitive programming platform. Help us ship v1.0!
                            </p>
                            <a
                                href="https://github.com/Archontas123/GVCS-Website"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-bold transition-colors text-center backdrop-blur-sm"
                            >
                                Contribute
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// Account Info Component
const AccountInfoSection = ({ user, profile, isEditing, onEdit, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        display_name: profile?.display_name || user?.name || '',
        bio: profile?.bio || '',
        grade_level: profile?.grade_level || '',
        graduation_year: profile?.graduation_year || '',
        interests: profile?.interests || [],
        skills: profile?.skills || []
    });

    if (isEditing) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gvcs-navy mb-4">Edit Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Display Name</label>
                        <input
                            type="text"
                            value={formData.display_name}
                            onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="3"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Grade Level</label>
                            <select
                                value={formData.grade_level}
                                onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select...</option>
                                <option value="9">9th Grade</option>
                                <option value="10">10th Grade</option>
                                <option value="11">11th Grade</option>
                                <option value="12">12th Grade</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Graduation Year</label>
                            <input
                                type="number"
                                value={formData.graduation_year}
                                onChange={(e) => setFormData({ ...formData, graduation_year: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="2026"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onSave(formData)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gvcs-navy">Account Info</h2>
                <button
                    onClick={onEdit}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Edit
                </button>
            </div>
            <div className="space-y-3">
                <div>
                    <span className="text-sm text-gray-500">Name:</span>
                    <p className="font-semibold text-gray-800">{formData.display_name || user?.name || 'Not set'}</p>
                </div>
                <div>
                    <span className="text-sm text-gray-500">Email:</span>
                    <p className="font-semibold text-gray-800">{user?.email}</p>
                </div>
                {formData.bio && (
                    <div>
                        <span className="text-sm text-gray-500">Bio:</span>
                        <p className="text-gray-800">{formData.bio}</p>
                    </div>
                )}
                {(formData.grade_level || formData.graduation_year) && (
                    <div>
                        <span className="text-sm text-gray-500">Grade:</span>
                        <p className="font-semibold text-gray-800">
                            {formData.grade_level ? `Grade ${formData.grade_level}` : ''}
                            {formData.graduation_year && ` • Class of ${formData.graduation_year}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Hackathon Project Wizard Component
const HackathonProgramWizard = ({ user, onComplete, onCancel }) => {
    const [step, setStep] = useState(0);
    const [hackathonData, setHackathonData] = useState({
        hackathon_name: '',
        hackathon_date: '',
        tracks: [], // Prize categories
        team_members: [],
        current_step: 0,
        finalized_idea: '',
        master_document: '',
        ideation_prompt: '',
        master_document_prompt: ''
    });
    const [teamMemberInput, setTeamMemberInput] = useState('');
    const [trackInput, setTrackInput] = useState('');
    const [hackathonInfo, setHackathonInfo] = useState({
        theme: '',
        tool_specific_awards: '',
        context: '',
        sponsors: '',
        judge_demographic: ''
    });

    const steps = [
        { title: 'Download Tools', description: 'Get required software' },
        { title: 'Ideation', description: 'Brainstorm with LLM' },
        { title: 'Master Document', description: 'Create execution plan' },
        { title: 'Individual Setup', description: 'Set up personal LLM' },
        { title: 'Execution', description: 'Build the project' },
        { title: 'Pitch & Submit', description: 'Create presentation' }
    ];

    // Memoize ideation prompt to avoid re-renders
    const ideationPromptPreview = useMemo(() => {
        return `I'm participating in a hackathon and need help brainstorming project ideas.

HACKATHON DETAILS:
- Event Name: ${hackathonData.hackathon_name || '[INSERT HACKATHON NAME]'}
- Theme: ${hackathonInfo.theme || '[INSERT THEME, e.g., Education, Healthcare, Sustainability, or leave blank if open]'}
- Tool-Specific Awards: ${hackathonInfo.tool_specific_awards || '[INSERT TOOL-SPECIFIC AWARDS, e.g., Best Use of Twilio API, Best Use of AWS, Best Mobile App, etc.]'}
- Sponsors: ${hackathonInfo.sponsors || '[INSERT ALL SPONSORS FOR THE EVENT]'}
- Judge Demographic: ${hackathonInfo.judge_demographic || '[INSERT JUDGE DEMOGRAPHIC, e.g., Industry professionals, VCs, University professors, etc.]'}

AVAILABLE PRIZE CATEGORIES:
${hackathonData.tracks.length > 0 ? hackathonData.tracks.map(t => `- ${t}`).join('\n') : '[INSERT ALL PRIZE CATEGORIES, e.g., Best Overall, Best Design, Best Education Hack, Best AI/ML Hack, etc.]'}

TEAM SIZE: ${hackathonData.team_members.length || '[INSERT NUMBER]'} members

ADDITIONAL CONTEXT:
${hackathonInfo.context || '[PASTE RELEVANT CONTEXT HERE - e.g., CTRL+A of the hackathon website, important rules, special requirements, etc.]'}

INSTRUCTIONS:
Please help me brainstorm creative, feasible hackathon project ideas using a TWO-STEP PROCESS:

STEP 1: Generate the core project idea first
- Focus on solving a real problem or addressing the theme
- Consider what prize categories we have a good shot at (pick ones that aren't too competitive)
- Leverage our team's interests and skills
- Ensure it has clear impact and potential for a demo

STEP 2: Incorporate tool-specific awards
- After generating the core idea, creatively incorporate any tool-specific award requirements
- For example: If the core idea is an auditing tool and there's a "Best Messaging App" award, find a way to incorporate messaging features (e.g., real-time notifications, team chat, etc.)
- The tool-specific award should enhance the project, not force a complete pivot

For each idea, provide:
- Project name
- Brief description
- Problem it solves
- Key features
- Suggested tech stack
- Which prize categories it targets (and why we have a good shot)
- How tool-specific awards are incorporated
- Why it's feasible for a hackathon

Let's iterate and refine these ideas together!`;
    }, [hackathonData.hackathon_name, hackathonData.tracks, hackathonData.team_members, hackathonInfo.theme, hackathonInfo.tool_specific_awards, hackathonInfo.context, hackathonInfo.sponsors, hackathonInfo.judge_demographic]);

    // Memoize master document prompt to avoid re-renders
    const masterDocumentPromptPreview = useMemo(() => {
        const ideaSummary = hackathonData.finalized_idea || '[PASTE YOUR FINALIZED IDEA HERE]';
        return `I need you to create an EXTREMELY DETAILED and COMPREHENSIVE master execution document for our hackathon project. This document will be used by a TEAM working together, and each team member will use their own AI coding assistant (Cursor, Claude Code, etc.) to implement their tasks.

CRITICAL: This is a TEAM PROJECT. The document must emphasize coordination, context sharing, and synchronization between team members and their AI assistants.

FINALIZED PROJECT IDEA:
${ideaSummary}

TEAM MEMBERS:
${hackathonData.team_members.length > 0 ? hackathonData.team_members.map(m => `- ${m}`).join('\n') : '[INSERT TEAM MEMBER NAMES]'}

HACKATHON CONTEXT:
- Theme: ${hackathonInfo.theme || 'Open'}
- Tool-Specific Awards: ${hackathonInfo.tool_specific_awards || 'None'}

Create a MASTER EXECUTION DOCUMENT with the following structure:

1. PROJECT OVERVIEW (Brief - 1-2 paragraphs)
   - Complete project description
   - Problem statement
   - Solution approach
   - Target users
   - Success metrics

2. TECHNICAL ARCHITECTURE (Detailed)
   - System architecture diagram (describe in detail)
   - Technology stack with versions
   - Database schema (if applicable)
   - API endpoints (if applicable)
   - File/folder structure
   - Dependencies and packages needed
   - Environment variables and configuration

3. TEAM COORDINATION PROTOCOL (CRITICAL - NEW SECTION)
   IMPORTANT: This section must be included and emphasized throughout the document.
   
   - TEAM AWARENESS: All AI coding assistants (Cursor, Claude Code, etc.) must understand that this is a collaborative team project. They are NOT working in isolation.
   
   - CONTEXT SHARING MECHANISM:
     * Each team member's AI assistant should periodically (every 30-60 minutes or after completing a task) generate a "context update" from their current branch
     * This context update should include:
       - What files they've created/modified
       - What functions/features they've implemented
       - Current state of their branch
       - Any API contracts, data structures, or interfaces they've defined
       - Dependencies they've added
       - Any blockers or questions
     
   - CONTEXT DISTRIBUTION:
     * Team members should share these context updates with each other (via Discord, shared doc, etc.)
     * Each person should paste their teammates' context updates into their own AI assistant
     * AI assistants should use this shared context to ensure code compatibility and alignment
   
   - CHECK-IN SCHEDULE:
     * Every 2-3 hours, team members should do a "sync check-in"
     * During check-ins:
       - Pull latest changes from main branch
       - Review teammates' context updates
       - Update your AI assistant with latest project state
       - Identify and resolve any conflicts or misalignments
       - Adjust your tasks if needed based on team progress
   
   - BRANCH CONTEXT GENERATION:
     * When a team member completes a task or makes significant progress, their AI assistant should:
       - Analyze the current branch state
       - Generate a summary of changes
       - Identify what other team members need to know
       - Create a context snippet to share
   
   - ALIGNMENT VERIFICATION:
     * Before implementing new features, AI assistants should:
       - Check if any teammates have implemented related code
       - Verify API contracts match
       - Ensure data structures are compatible
       - Confirm naming conventions are consistent

4. STEP-BY-STEP TASKS FOR EACH TEAM MEMBER (CRITICAL - MAIN FOCUS)
   For EACH team member, create an EXTREMELY DETAILED step-by-step task list:
   
   === TEAM MEMBER: [MEMBER NAME] ===
   Role: [Frontend/Backend/Full-stack/Design/etc]
   
   TASKS (Numbered, in order of execution):
   
   Task 1: [Task Name]
   - Description: [What exactly needs to be done]
   - Step 1: [First specific action]
   - Step 2: [Second specific action]
   - Step 3: [Third specific action]
   - ... (continue for all steps)
   - Files to create: [Exact file paths, e.g., src/components/LoginForm.jsx]
   - Files to modify: [Exact file paths and what to change]
   - Functions to create: [Function names and signatures]
   - Dependencies needed: [What they need from teammates]
   - Git branch: [Branch name, e.g., feature/login-form]
   - Testing: [How to test this task]
   - Integration points: [How this connects to other tasks]
   - Estimated time: [Time estimate]
   
   Task 2: [Task Name]
   - [Same detailed structure as Task 1]
   
   Task 3: [Task Name]
   - [Same detailed structure as Task 1]
   
   ... (Continue for all tasks for this team member)
   
   DEPENDENCIES:
   - Waiting for: [What they need from other team members]
   - Providing to: [What they're creating for others]
   
   CHECK-IN POINTS:
   - After Task 1: [What to share with team]
   - After Task 2: [What to share with team]
   - ... (Continue for each task)
   
   Repeat this entire section for EACH team member.

5. GIT WORKFLOW & BRANCH STRATEGY
   - Branch naming: [Convention, e.g., feature/team-member-name/task-name]
   - Main branch protection: [Rules]
   - Merge process: [How to merge]
   - Conflict resolution: [Process]
   - Commit message format: [Format]

6. DEPLOYMENT PLAN
   - Hosting platform
   - Environment variables needed
   - Build commands
   - Deployment steps

7. DEMO PREPARATION
   - Demo script
   - Key features to showcase
   - Potential issues and solutions

CRITICAL REQUIREMENTS FOR THIS DOCUMENT:
- Focus HEAVILY on step-by-step tasks for each person (Section 4 should be the longest section)
- Emphasize team coordination and context sharing throughout
- Include specific file paths, function names, API endpoints, database tables
- Make it clear that AI assistants must be aware of team collaboration
- Include check-in points and context sharing instructions
- Ensure tasks are broken down into the smallest possible actionable steps
- Every team member should be able to follow their tasks without asking questions

This document will be used by each team member with their own AI coding assistant. The assistants must understand they're part of a coordinated team effort.`;
    }, [hackathonData.finalized_idea, hackathonData.team_members, hackathonInfo.theme, hackathonInfo.tool_specific_awards]);

    // Generate ideation prompt template
    const generateIdeationPrompt = () => {
        const prompt = `I'm participating in a hackathon and need help brainstorming project ideas.

HACKATHON DETAILS:
- Event Name: ${hackathonData.hackathon_name || '[INSERT HACKATHON NAME]'}
- Theme: ${hackathonInfo.theme || '[INSERT THEME, e.g., Education, Healthcare, Sustainability, or leave blank if open]'}
- Tool-Specific Awards: ${hackathonInfo.tool_specific_awards || '[INSERT TOOL-SPECIFIC AWARDS, e.g., Best Use of Twilio API, Best Use of AWS, Best Mobile App, etc.]'}
- Sponsors: ${hackathonInfo.sponsors || '[INSERT ALL SPONSORS FOR THE EVENT]'}
- Judge Demographic: ${hackathonInfo.judge_demographic || '[INSERT JUDGE DEMOGRAPHIC, e.g., Industry professionals, VCs, University professors, etc.]'}

AVAILABLE PRIZE CATEGORIES:
${hackathonData.tracks.length > 0 ? hackathonData.tracks.map(t => `- ${t}`).join('\n') : '[INSERT ALL PRIZE CATEGORIES, e.g., Best Overall, Best Design, Best Education Hack, Best AI/ML Hack, etc.]'}

TEAM SIZE: ${hackathonData.team_members.length || '[INSERT NUMBER]'} members

ADDITIONAL CONTEXT:
${hackathonInfo.context || '[PASTE RELEVANT CONTEXT HERE - e.g., CTRL+A of the hackathon website, important rules, special requirements, etc.]'}

INSTRUCTIONS:
Please help me brainstorm creative, feasible hackathon project ideas using a TWO-STEP PROCESS:

STEP 1: Generate the core project idea first
- Focus on solving a real problem or addressing the theme
- Consider what prize categories we have a good shot at (pick ones that aren't too competitive)
- Leverage our team's interests and skills
- Ensure it has clear impact and potential for a demo

STEP 2: Incorporate tool-specific awards
- After generating the core idea, creatively incorporate any tool-specific award requirements
- For example: If the core idea is an auditing tool and there's a "Best Messaging App" award, find a way to incorporate messaging features (e.g., real-time notifications, team chat, etc.)
- The tool-specific award should enhance the project, not force a complete pivot

For each idea, provide:
- Project name
- Brief description
- Problem it solves
- Key features
- Suggested tech stack
- Which prize categories it targets (and why we have a good shot)
- How tool-specific awards are incorporated
- Why it's feasible for a hackathon

Let's iterate and refine these ideas together!`;

        return prompt;
    };

    // Generate master document prompt template
    const generateMasterDocumentPrompt = () => {
        const ideaSummary = hackathonData.finalized_idea || '[PASTE YOUR FINALIZED IDEA HERE]';

        const prompt = `I need you to create an EXTREMELY DETAILED and COMPREHENSIVE master execution document for our hackathon project. This document will be used by a TEAM working together, and each team member will use their own AI coding assistant (Cursor, Claude Code, etc.) to implement their tasks.

CRITICAL: This is a TEAM PROJECT. The document must emphasize coordination, context sharing, and synchronization between team members and their AI assistants.

FINALIZED PROJECT IDEA:
${ideaSummary}

TEAM MEMBERS:
${hackathonData.team_members.length > 0 ? hackathonData.team_members.map(m => `- ${m}`).join('\n') : '[INSERT TEAM MEMBER NAMES]'}

HACKATHON CONTEXT:
- Theme: ${hackathonInfo.theme || 'Open'}
- Tool-Specific Awards: ${hackathonInfo.tool_specific_awards || 'None'}

Create a MASTER EXECUTION DOCUMENT with the following structure:

1. PROJECT OVERVIEW (Brief - 1-2 paragraphs)
   - Complete project description
   - Problem statement
   - Solution approach
   - Target users
   - Success metrics

2. TECHNICAL ARCHITECTURE (Detailed)
   - System architecture diagram (describe in detail)
   - Technology stack with versions
   - Database schema (if applicable)
   - API endpoints (if applicable)
   - File/folder structure
   - Dependencies and packages needed
   - Environment variables and configuration

3. TEAM COORDINATION PROTOCOL (CRITICAL - NEW SECTION)
   IMPORTANT: This section must be included and emphasized throughout the document.
   
   - TEAM AWARENESS: All AI coding assistants (Cursor, Claude Code, etc.) must understand that this is a collaborative team project. They are NOT working in isolation.
   
   - CONTEXT SHARING MECHANISM:
     * Each team member's AI assistant should periodically (every 30-60 minutes or after completing a task) generate a "context update" from their current branch
     * This context update should include:
       - What files they've created/modified
       - What functions/features they've implemented
       - Current state of their branch
       - Any API contracts, data structures, or interfaces they've defined
       - Dependencies they've added
       - Any blockers or questions
     
   - CONTEXT DISTRIBUTION:
     * Team members should share these context updates with each other (via Discord, shared doc, etc.)
     * Each person should paste their teammates' context updates into their own AI assistant
     * AI assistants should use this shared context to ensure code compatibility and alignment
   
   - CHECK-IN SCHEDULE:
     * Every 2-3 hours, team members should do a "sync check-in"
     * During check-ins:
       - Pull latest changes from main branch
       - Review teammates' context updates
       - Update your AI assistant with latest project state
       - Identify and resolve any conflicts or misalignments
       - Adjust your tasks if needed based on team progress
   
   - BRANCH CONTEXT GENERATION:
     * When a team member completes a task or makes significant progress, their AI assistant should:
       - Analyze the current branch state
       - Generate a summary of changes
       - Identify what other team members need to know
       - Create a context snippet to share
   
   - ALIGNMENT VERIFICATION:
     * Before implementing new features, AI assistants should:
       - Check if any teammates have implemented related code
       - Verify API contracts match
       - Ensure data structures are compatible
       - Confirm naming conventions are consistent

4. STEP-BY-STEP TASKS FOR EACH TEAM MEMBER (CRITICAL - MAIN FOCUS)
   For EACH team member, create an EXTREMELY DETAILED step-by-step task list:
   
   === TEAM MEMBER: [MEMBER NAME] ===
   Role: [Frontend/Backend/Full-stack/Design/etc]
   
   TASKS (Numbered, in order of execution):
   
   Task 1: [Task Name]
   - Description: [What exactly needs to be done]
   - Step 1: [First specific action]
   - Step 2: [Second specific action]
   - Step 3: [Third specific action]
   - ... (continue for all steps)
   - Files to create: [Exact file paths, e.g., src/components/LoginForm.jsx]
   - Files to modify: [Exact file paths and what to change]
   - Functions to create: [Function names and signatures]
   - Dependencies needed: [What they need from teammates]
   - Git branch: [Branch name, e.g., feature/login-form]
   - Testing: [How to test this task]
   - Integration points: [How this connects to other tasks]
   - Estimated time: [Time estimate]
   
   Task 2: [Task Name]
   - [Same detailed structure as Task 1]
   
   Task 3: [Task Name]
   - [Same detailed structure as Task 1]
   
   ... (Continue for all tasks for this team member)
   
   DEPENDENCIES:
   - Waiting for: [What they need from other team members]
   - Providing to: [What they're creating for others]
   
   CHECK-IN POINTS:
   - After Task 1: [What to share with team]
   - After Task 2: [What to share with team]
   - ... (Continue for each task)
   
   Repeat this entire section for EACH team member.

5. GIT WORKFLOW & BRANCH STRATEGY
   - Branch naming: [Convention, e.g., feature/team-member-name/task-name]
   - Main branch protection: [Rules]
   - Merge process: [How to merge]
   - Conflict resolution: [Process]
   - Commit message format: [Format]

6. DEPLOYMENT PLAN
   - Hosting platform
   - Environment variables needed
   - Build commands
   - Deployment steps

7. DEMO PREPARATION
   - Demo script
   - Key features to showcase
   - Potential issues and solutions

CRITICAL REQUIREMENTS FOR THIS DOCUMENT:
- Focus HEAVILY on step-by-step tasks for each person (Section 4 should be the longest section)
- Emphasize team coordination and context sharing throughout
- Include specific file paths, function names, API endpoints, database tables
- Make it clear that AI assistants must be aware of team collaboration
- Include check-in points and context sharing instructions
- Ensure tasks are broken down into the smallest possible actionable steps
- Every team member should be able to follow their tasks without asking questions

This document will be used by each team member with their own AI coding assistant. The assistants must understand they're part of a coordinated team effort.`;

        return prompt;
    };

    const handleStep1 = () => {
        // Just move to next step - tools download is informational
        setStep(1);
    };

    const handleStep2 = () => {
        if (!hackathonData.finalized_idea || hackathonData.finalized_idea.trim() === '') {
            alert('Please paste your finalized idea before proceeding.');
            return;
        }
        generateMasterDocumentPrompt();
        setStep(2);
    };

    const handleStep3 = () => {
        if (!hackathonData.master_document || hackathonData.master_document.trim() === '') {
            alert('Please paste your master document before proceeding.');
            return;
        }
        setStep(3);
    };

    const handleStep4 = () => {
        setStep(4);
    };

    const handleStep5 = () => {
        setStep(5);
    };

    const handleComplete = () => {
        const finalData = {
            user_id: user.id,
            ...hackathonData,
            current_step: 5, // Last step (Pitch & Submit)
            hackathon_date: hackathonData.hackathon_date || null
        };
        onComplete(finalData);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gvcs-navy">Hackathon Project Wizard</h2>
                    <p className="text-sm text-gray-500">Step {step + 1} of {steps.length}: {steps[step].title}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        {steps.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setStep(i)}
                                className={`px-2 py-1 text-xs rounded transition-colors ${i === step
                                        ? 'bg-purple-600 text-white font-bold'
                                        : i < step
                                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                                title={s.title}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">Cancel</button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between mb-2">
                    {steps.map((s, i) => (
                        <div key={i} className={`flex-1 ${i < steps.length - 1 ? 'border-t-2' : ''} ${i <= step ? 'border-purple-600' : 'border-gray-200'}`}></div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                    {steps.map((s, i) => (
                        <span key={i} className={i <= step ? 'text-purple-600 font-bold' : ''}>{s.title}</span>
                    ))}
                </div>
            </div>

            {/* Step 0: Download Tools */}
            {step === 0 && (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Step 1: Download Required Tools</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Everyone on your team must download these tools before starting the hackathon.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <h4 className="font-bold text-blue-900 mb-3">Required Downloads (Everyone):</h4>
                            <ul className="text-sm text-blue-800 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span>
                                    <div>
                                        <span className="font-semibold">Discord</span> - Team communication
                                        <span className="text-blue-600 ml-2">(Free)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span>
                                    <div>
                                        <span className="font-semibold">Git</span> - Version control
                                        <span className="text-blue-600 ml-2">(Free)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span>
                                    <div>
                                        <span className="font-semibold">Node.js</span> - JavaScript runtime
                                        <span className="text-blue-600 ml-2">(Free)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span>
                                    <div>
                                        <span className="font-semibold">VS Code</span> - Code editor
                                        <span className="text-blue-600 ml-2">(Free)</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                            <h4 className="font-bold text-purple-900 mb-3">Choose One AI Build Tool (Required):</h4>
                            <p className="text-xs text-purple-700 mb-3">Each team member should pick one AI coding assistant. Compare pricing below:</p>
                            <div className="space-y-3">
                                <div className="bg-white rounded-lg p-3 border-2 border-green-500 border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h5 className="font-bold text-gray-900">Cursor</h5>
                                                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">⭐ Recommended</span>
                                            </div>
                                            <p className="text-xs text-gray-600">AI-powered code editor (VS Code fork)</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">Free + $20/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free tier: Limited requests. Pro: Unlimited AI requests, $20/month</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">GitHub Copilot</h5>
                                            <p className="text-xs text-gray-600">AI pair programmer by Microsoft</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">$10/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free for students/teachers. Individual: $10/month, Business: $19/user/month</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border-2 border-green-500 border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h5 className="font-bold text-gray-900">Claude Code (via Cline)</h5>
                                                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">⭐ Recommended</span>
                                            </div>
                                            <p className="text-xs text-gray-600">VS Code extension using Claude AI</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">$20/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Requires Anthropic API key. Claude 3.5 Sonnet: ~$3/million tokens</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">Codeium</h5>
                                            <p className="text-xs text-gray-600">Free AI coding assistant</p>
                                        </div>
                                        <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">Free</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free tier: Unlimited basic completions. Pro: $12/month for advanced features</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">Tabnine</h5>
                                            <p className="text-xs text-gray-600">AI code completion</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">Free + $12/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free tier: Limited. Pro: $12/month, Team: $15/user/month</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">Aider</h5>
                                            <p className="text-xs text-gray-600">AI pair programming in terminal</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">$20/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Requires OpenAI API key. GPT-4: ~$30/million tokens input, $60/million output</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">Continue.dev</h5>
                                            <p className="text-xs text-gray-600">Open source AI coding assistant</p>
                                        </div>
                                        <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">Free</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free and open source. Requires API key (OpenAI, Anthropic, etc.)</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border-2 border-green-500 border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h5 className="font-bold text-gray-900">Antigravity</h5>
                                                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">⭐ Recommended</span>
                                            </div>
                                            <p className="text-xs text-gray-600">AI code generation tool</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">$15/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Subscription-based AI coding assistant</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">Sourcegraph Cody</h5>
                                            <p className="text-xs text-gray-600">AI coding assistant</p>
                                        </div>
                                        <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">Free</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free tier available. Pro: $9/month</p>
                                </div>
                            </div>
                            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                                <strong>💡 Tip:</strong> For hackathons, Codeium or Continue.dev offer great free options. Cursor Pro is popular for teams that need unlimited requests.
                            </div>
                        </div>

                        <button
                            onClick={handleStep1}
                            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Step 1: Ideation */}
            {step === 1 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 2: Ideation</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Fill out the hackathon details below, then use the generated prompt with your LLM to brainstorm ideas.
                    </p>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Team Members</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={teamMemberInput}
                                onChange={(e) => setTeamMemberInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && teamMemberInput.trim()) {
                                        setHackathonData({
                                            ...hackathonData,
                                            team_members: [...hackathonData.team_members, teamMemberInput.trim()]
                                        });
                                        setTeamMemberInput('');
                                    }
                                }}
                                placeholder="Enter name and press Enter"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {hackathonData.team_members.map((member, i) => (
                                <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                                    {member}
                                    <button
                                        onClick={() => setHackathonData({
                                            ...hackathonData,
                                            team_members: hackathonData.team_members.filter((_, idx) => idx !== i)
                                        })}
                                        className="text-purple-700 hover:text-purple-900"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Prize Categories</label>
                        <p className="text-xs text-gray-500 mb-2">List all available prize categories. The AI will help you pick ones you have a good shot at.</p>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={trackInput}
                                onChange={(e) => setTrackInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && trackInput.trim()) {
                                        setHackathonData({
                                            ...hackathonData,
                                            tracks: [...hackathonData.tracks, trackInput.trim()]
                                        });
                                        setTrackInput('');
                                    }
                                }}
                                placeholder="e.g., Best Overall, Best Design, Best Education Hack, etc."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {hackathonData.tracks.map((track, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                                    {track}
                                    <button
                                        onClick={() => setHackathonData({
                                            ...hackathonData,
                                            tracks: hackathonData.tracks.filter((_, idx) => idx !== i)
                                        })}
                                        className="text-blue-700 hover:text-blue-900"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Hackathon Name</label>
                        <input
                            type="text"
                            value={hackathonData.hackathon_name}
                            onChange={(e) => setHackathonData({ ...hackathonData, hackathon_name: e.target.value })}
                            placeholder="e.g., PennApps, HackMIT"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Theme (optional)</label>
                        <input
                            type="text"
                            value={hackathonInfo.theme}
                            onChange={(e) => setHackathonInfo({ ...hackathonInfo, theme: e.target.value })}
                            placeholder="e.g., Education, Healthcare"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tool-Specific Awards</label>
                        <p className="text-xs text-gray-500 mb-2">Awards that require using specific tools/APIs (e.g., Best Use of Twilio, Best AWS Integration)</p>
                        <textarea
                            value={hackathonInfo.tool_specific_awards}
                            onChange={(e) => setHackathonInfo({ ...hackathonInfo, tool_specific_awards: e.target.value })}
                            placeholder="e.g., Best Use of Twilio API, Best Mobile App, Best AWS Integration"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Sponsors</label>
                        <textarea
                            value={hackathonInfo.sponsors}
                            onChange={(e) => setHackathonInfo({ ...hackathonInfo, sponsors: e.target.value })}
                            placeholder="List all sponsors for the event"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="3"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Judge Demographic</label>
                        <input
                            type="text"
                            value={hackathonInfo.judge_demographic}
                            onChange={(e) => setHackathonInfo({ ...hackathonInfo, judge_demographic: e.target.value })}
                            placeholder="e.g., Industry professionals, VCs, University professors"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Context</label>
                        <p className="text-xs text-gray-500 mb-2">Paste relevant context (e.g., CTRL+A of hackathon website, important rules, special requirements)</p>
                        <textarea
                            value={hackathonInfo.context}
                            onChange={(e) => setHackathonInfo({ ...hackathonInfo, context: e.target.value })}
                            placeholder="Paste hackathon website content, rules, requirements, etc."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="6"
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-gray-800">Live Ideation Prompt Preview</label>
                            <button
                                onClick={() => {
                                    const prompt = generateIdeationPrompt();
                                    setHackathonData({ ...hackathonData, ideation_prompt: prompt });
                                    navigator.clipboard.writeText(prompt);
                                    alert('Prompt copied to clipboard!');
                                }}
                                className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Copy Prompt
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">This prompt updates automatically as you fill out the form above. Use it with Perplexity, Claude, GPT-4, or your preferred LLM to brainstorm ideas.</p>
                        <textarea
                            value={hackathonData.ideation_prompt || ideationPromptPreview}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs bg-gray-50"
                            rows="15"
                        />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-blue-900 mb-2">Instructions:</h4>
                        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                            <li>Fill out all the hackathon details above</li>
                            <li>Review the generated prompt preview</li>
                            <li>Click "Copy Prompt" to copy it to your clipboard</li>
                            <li>Paste it into Perplexity, Claude, GPT-4, or your preferred LLM</li>
                            <li>Have your team discuss and iterate with the LLM to refine ideas</li>
                            <li>Once you've finalized an idea, paste it in the text area below</li>
                        </ol>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Finalized Idea *</label>
                        <p className="text-xs text-gray-500 mb-2">Paste your finalized project idea here after brainstorming with your team and LLM:</p>
                        <textarea
                            value={hackathonData.finalized_idea}
                            onChange={(e) => setHackathonData({ ...hackathonData, finalized_idea: e.target.value })}
                            placeholder="Paste your finalized project idea here. Include: project name, description, problem it solves, key features, and tech stack..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="8"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(0)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleStep2}
                            disabled={!hackathonData.finalized_idea || hackathonData.finalized_idea.trim() === ''}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Master Document */}
            {step === 2 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 3: Create Master Document</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Create an extremely detailed master execution document that will guide your entire team. This document should be comprehensive and clear enough for each team member to work independently.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-blue-900 mb-2">Instructions:</h4>
                        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                            <li>First, paste your finalized idea into a prompt to get a summary/context</li>
                            <li>Then, use the "Master Document Prompt" below with your LLM to generate the comprehensive execution plan</li>
                            <li>The master document should be EXTREMELY LONG and DETAILED - include specific file paths, function names, API endpoints, etc.</li>
                            <li>Paste the complete master document below once generated</li>
                        </ol>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-gray-700">Master Document Prompt Template</label>
                            <button
                                onClick={() => {
                                    const prompt = generateMasterDocumentPrompt();
                                    setHackathonData({ ...hackathonData, master_document_prompt: prompt });
                                    navigator.clipboard.writeText(prompt);
                                    alert('Prompt copied to clipboard!');
                                }}
                                className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Generate & Copy
                            </button>
                        </div>
                        <textarea
                            value={hackathonData.master_document_prompt || masterDocumentPromptPreview}
                            onChange={(e) => setHackathonData({ ...hackathonData, master_document_prompt: e.target.value })}
                            placeholder="Click 'Generate & Copy' to create your master document prompt..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs"
                            rows="20"
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Master Document *</label>
                        <p className="text-xs text-gray-500 mb-3">Upload a file or paste your complete master execution document below:</p>

                        {/* File Upload Option */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-600 mb-2">Option 1: Upload File</label>
                            <input
                                type="file"
                                accept=".txt,.md,.doc,.docx"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            setHackathonData({ ...hackathonData, master_document: event.target.result });
                                        };
                                        reader.readAsText(file);
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            <p className="text-xs text-gray-400 mt-1">Supported formats: .txt, .md, .doc, .docx</p>
                        </div>

                        {/* Text Box Option */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-2">Option 2: Paste Text</label>
                            <textarea
                                value={hackathonData.master_document}
                                onChange={(e) => setHackathonData({ ...hackathonData, master_document: e.target.value })}
                                placeholder="Paste your complete master document here. It should include: project overview, technical architecture, step-by-step tasks for each team member, team coordination protocol, git workflow, deployment plan, and demo preparation..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs"
                                rows="25"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(1)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleStep3}
                            disabled={!hackathonData.master_document || hackathonData.master_document.trim() === ''}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Individual Setup */}
            {step === 3 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 4: Individual LLM Setup</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Each team member should set up their personal LLM (web-based) to act as their context/AI/prompt engineer.
                    </p>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-purple-900 mb-3">For Each Team Member:</h4>
                        <ol className="text-sm text-purple-800 space-y-2 list-decimal list-inside">
                            <li>Open a web-based LLM (Claude, GPT-4, Perplexity, etc.)</li>
                            <li>Paste the ENTIRE master document into the LLM</li>
                            <li>Provide your name and ask: "What do I need to do?"</li>
                            <li>The LLM will guide you through your specific batch of tasks</li>
                            <li>Use the LLM to create prompts for your in-house coding agent (Cursor, Claude Code, etc.)</li>
                        </ol>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-gray-900 mb-2">Example Prompt for Your LLM:</h4>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                            <p className="mb-2">Here is our complete hackathon project master document:</p>
                            <p className="mb-2">[PASTE ENTIRE MASTER DOCUMENT HERE]</p>
                            <p className="mb-2">My name is: [YOUR NAME]</p>
                            <p>What do I need to do? Please guide me through my specific tasks and help me create prompts for my coding agent.</p>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-bold text-yellow-900 mb-2">💡 Tips:</h4>
                        <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                            <li>Keep the master document in context throughout the hackathon</li>
                            <li>Ask your LLM to break down complex tasks into smaller steps</li>
                            <li>Have your LLM create specific, actionable prompts for your coding agent</li>
                            <li>Update your LLM when dependencies are ready or blockers occur</li>
                        </ul>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(2)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleStep4}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Step 4: Execution */}
            {step === 4 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 5: Execution</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Work through your tasks following your LLM's guidance and using your coding agent.
                    </p>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-green-900 mb-3">Execution Workflow:</h4>
                        <ol className="text-sm text-green-800 space-y-2 list-decimal list-inside">
                            <li>Follow your LLM's instructions step-by-step</li>
                            <li>Use your LLM to create prompts for your in-house coding agent (Cursor, Claude Code, etc.)</li>
                            <li>Implement features according to your batch in the master document</li>
                            <li>Push your code to Git when you complete tasks</li>
                            <li>Pull latest changes from teammates regularly</li>
                            <li>Wait for dependencies if needed (communicate in Discord)</li>
                            <li>Test your work and integrate with teammates' code</li>
                            <li>Continue iterating until all features are complete</li>
                        </ol>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-gray-900 mb-2">Git Workflow Reminder:</h4>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                            <li>Create feature branches: <code className="bg-gray-100 px-1 rounded">git checkout -b feature/your-feature</code></li>
                            <li>Commit frequently: <code className="bg-gray-100 px-1 rounded">git commit -m "descriptive message"</code></li>
                            <li>Push your branch: <code className="bg-gray-100 px-1 rounded">git push origin feature/your-feature</code></li>
                            <li>Pull latest changes: <code className="bg-gray-100 px-1 rounded">git pull origin main</code></li>
                            <li>Merge conflicts? Ask your LLM for help resolving them</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-bold text-blue-900 mb-2">Communication:</h4>
                        <p className="text-sm text-blue-800">
                            Keep your team updated in Discord. Share progress, blockers, and when dependencies are ready.
                            Use your LLM to help communicate technical details clearly.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(3)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleStep5}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Step 5: Pitch & Submit */}
            {step === 5 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 6: Pitch Deck & DevPost</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Create your presentation and submit to DevPost before the deadline.
                    </p>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-purple-900 mb-3">Pitch Deck Creation:</h4>
                        <ol className="text-sm text-purple-800 space-y-2 list-decimal list-inside">
                            <li>Assign someone (or multiple people) to create the pitch deck</li>
                            <li>Use Canva, Figma, or Google Slides</li>
                            <li>Include: Problem, Solution, Demo, Impact, Tech Stack, Team</li>
                            <li>Keep it concise - usually 3-5 minutes for presentation</li>
                            <li>Practice the pitch with your team</li>
                        </ol>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-blue-900 mb-3">DevPost Submission:</h4>
                        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                            <li>Create account on DevPost (if not already done)</li>
                            <li>Fill out project details: name, description, problem, solution</li>
                            <li>Add screenshots/demo video</li>
                            <li>List technologies used</li>
                            <li>Add team members</li>
                            <li>Include GitHub repository link</li>
                            <li>Submit before the deadline!</li>
                        </ol>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-yellow-900 mb-2">Demo Preparation:</h4>
                        <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                            <li>Test your demo thoroughly before presenting</li>
                            <li>Have a backup plan if live demo fails (recorded video)</li>
                            <li>Prepare answers to common questions</li>
                            <li>Highlight your best features</li>
                            <li>Show the problem you're solving clearly</li>
                        </ul>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(4)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleComplete}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                        >
                            Complete Setup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Hackathon Project View Component
const HackathonProgramView = ({ hackathon, user, onBack, onUpdate }) => {
    const [currentStep, setCurrentStep] = useState(hackathon.current_step || 0);

    const steps = [
        'Download Tools',
        'Ideation',
        'Master Document',
        'Individual Setup',
        'Execution',
        'Pitch & Submit'
    ];

    const updateStep = async (newStep) => {
        try {
            const { error } = await supabase
                .from('hackathon_programs')
                .update({
                    current_step: newStep,
                    updated_at: new Date().toISOString()
                })
                .eq('id', hackathon.id);

            if (error) throw error;
            setCurrentStep(newStep);
            onUpdate();
        } catch (error) {
            console.error('Error updating step:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <button
                onClick={onBack}
                className="mb-4 text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1"
            >
                <Icons.ArrowRight /> Back to Dashboard
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-gvcs-navy mb-2">{hackathon.hackathon_name}</h2>
                <p className="text-gray-600">
                    {hackathon.hackathon_date ? new Date(hackathon.hackathon_date).toLocaleDateString() : 'Date TBD'}
                </p>

                {/* Progress */}
                <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>Step {currentStep + 1} of {steps.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Step Navigation */}
            <div className="grid grid-cols-6 gap-2 mb-6">
                {steps.map((step, i) => (
                    <button
                        key={i}
                        onClick={() => updateStep(i)}
                        className={`p-3 rounded-lg text-xs font-semibold transition-all ${i === currentStep
                            ? 'bg-purple-600 text-white'
                            : i < currentStep
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">{steps[currentStep]}</h3>

                {currentStep === 0 && (
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Discord Link</h4>
                            <a href={hackathon.discord_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {hackathon.discord_link}
                            </a>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Team Members</h4>
                            <div className="flex flex-wrap gap-2">
                                {hackathon.team_members?.map((member, i) => (
                                    <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                        {member}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Tracks</h4>
                            <div className="flex flex-wrap gap-2">
                                {hackathon.tracks?.map((track, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                        {track}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 1 && hackathon.finalized_idea && (
                    <div>
                        <h4 className="font-semibold mb-2">Finalized Idea</h4>
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap">{hackathon.finalized_idea}</pre>
                        </div>
                    </div>
                )}

                {currentStep === 2 && hackathon.master_document && (
                    <div>
                        <h4 className="font-semibold mb-2">Master Document</h4>
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                            <pre className="text-xs text-gray-700 whitespace-pre-wrap">{hackathon.master_document}</pre>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">Individual LLM Setup</h4>
                        <p className="text-gray-600">Each team member should:</p>
                        <ol className="list-decimal list-inside text-gray-700 space-y-2">
                            <li>Open a web-based LLM (Claude, GPT-4, Perplexity, etc.)</li>
                            <li>Paste the entire master document</li>
                            <li>Provide your name and ask what you need to do</li>
                            <li>Use the LLM to create prompts for your coding agent</li>
                        </ol>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">Execution Phase</h4>
                        <p className="text-gray-600">Work through your tasks:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Follow your LLM's instructions step-by-step</li>
                            <li>Use your LLM to create prompts for your coding agent</li>
                            <li>Push/pull code regularly</li>
                            <li>Communicate with your team in Discord</li>
                            <li>Test and integrate your work</li>
                        </ul>
                    </div>
                )}

                {currentStep === 5 && (
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">Pitch Deck & DevPost</h4>
                        <p className="text-gray-600">Final steps:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Create your pitch deck (Canva, Figma, or Google Slides)</li>
                            <li>Submit to DevPost before the deadline</li>
                            <li>Prepare your demo</li>
                            <li>Practice your presentation</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// Hackathons Section Component
const HackathonsSection = ({ hackathons, user, onSelect, onRefresh }) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gvcs-navy">Hackathon Projects</h2>
                <button
                    onClick={() => navigate('/hackathons')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 flex items-center gap-2"
                >
                    <Icons.Sparkles /> Start New Project
                </button>
            </div>

            {hackathons.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-600 mb-4">You haven't created any hackathon projects yet.</p>
                    <button
                        onClick={() => navigate('/hackathons')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                    >
                        Start Your First Project
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {hackathons.map(hackathon => (
                        <div
                            key={hackathon.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => onSelect(hackathon)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-gvcs-navy mb-1">{hackathon.hackathon_name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {hackathon.hackathon_date ? new Date(hackathon.hackathon_date).toLocaleDateString() : 'Date TBD'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                                            <div
                                                className="bg-purple-600 h-2 rounded-full transition-all"
                                                style={{ width: `${((hackathon.current_step + 1) / 6) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-600">Step {hackathon.current_step + 1}/6</span>
                                    </div>
                                </div>
                                <Icons.ArrowRight className="w-6 h-6 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Admin Panel Component
const AdminPanel = ({ user, onBack }) => {
    const [users, setUsers] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [allHackathons, setAllHackathons] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
    const [allProblemStatuses, setAllProblemStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState('users'); // 'users', 'courses', 'hackathons', 'problems'

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            // Fetch all users from auth (we'll get them via courses/hackathons user_ids)
            // Fetch all courses
            const { data: coursesData, error: coursesError } = await supabase
                .from('user_courses')
                .select('*, user_id')
                .order('created_at', { ascending: false });

            if (coursesError) throw coursesError;
            setAllCourses(coursesData || []);

            // Fetch all hackathons
            const { data: hackathonsData, error: hackathonsError } = await supabase
                .from('hackathon_programs')
                .select('*, user_id')
                .order('created_at', { ascending: false });

            if (hackathonsError && hackathonsError.code !== '42P01') throw hackathonsError;
            setAllHackathons(hackathonsData || []);

            // Fetch all profiles
            const { data: profilesData, error: profilesError } = await supabase
                .from('user_profiles')
                .select('*, user_id')
                .order('created_at', { ascending: false });

            if (profilesError && profilesError.code !== 'PGRST116' && profilesError.code !== '42P01') throw profilesError;
            setAllProfiles(profilesData || []);

            // Fetch all problem statuses
            const { data: problemStatusesData, error: problemStatusesError } = await supabase
                .from('user_problem_statuses')
                .select('*, user_id')
                .order('created_at', { ascending: false });

            if (problemStatusesError && problemStatusesError.code !== '42P01') throw problemStatusesError;
            setAllProblemStatuses(problemStatusesData || []);

            // Get unique user IDs and create user list
            const userIds = new Set();
            coursesData?.forEach(c => userIds.add(c.user_id));
            hackathonsData?.forEach(h => userIds.add(h.user_id));
            profilesData?.forEach(p => userIds.add(p.user_id));
            problemStatusesData?.forEach(ps => userIds.add(ps.user_id));

            // Create user objects with aggregated data
            const usersList = Array.from(userIds).map(userId => {
                const userCourses = coursesData?.filter(c => c.user_id === userId) || [];
                const userHackathons = hackathonsData?.filter(h => h.user_id === userId) || [];
                const userProfile = profilesData?.find(p => p.user_id === userId);
                const userProblems = problemStatusesData?.filter(ps => ps.user_id === userId) || [];

                return {
                    id: userId,
                    email: userProfile?.display_name || `User ${userId.substring(0, 8)}`,
                    courses: userCourses,
                    hackathons: userHackathons,
                    profile: userProfile,
                    problemStatuses: userProblems,
                    totalCourses: userCourses.length,
                    totalHackathons: userHackathons.length,
                    totalProblems: userProblems.length
                };
            });

            setUsers(usersList);
        } catch (error) {
            console.error('Error fetching admin data:', error);
            alert('Failed to load admin data. Make sure you have admin permissions.');
        } finally {
            setLoading(false);
        }
    };

    const calculateCourseProgress = (weeks) => {
        if (!weeks || weeks.length === 0) return 0;
        const completed = weeks.filter(w => w.submissions && w.submissions[w.selectedActivity || w.selected_activity]).length;
        return Math.round((completed / weeks.length) * 100);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gvcs-navy mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading admin data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gvcs-navy mb-2">Admin Panel</h1>
                    <p className="text-gray-600">View all users, courses, hackathons, and progress</p>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                    Back to Dashboard
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="text-3xl font-bold text-gvcs-navy mb-1">{users.length}</div>
                    <div className="text-sm text-gray-600">Total Users</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{allCourses.length}</div>
                    <div className="text-sm text-gray-600">Total Courses</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="text-3xl font-bold text-green-600 mb-1">{allHackathons.length}</div>
                    <div className="text-sm text-gray-600">Total Hackathons</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{allProblemStatuses.length}</div>
                    <div className="text-sm text-gray-600">Problem Attempts</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-4 font-bold transition-colors ${activeTab === 'users' ? 'text-gvcs-navy border-b-2 border-gvcs-navy' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Users ({users.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`px-6 py-4 font-bold transition-colors ${activeTab === 'courses' ? 'text-gvcs-navy border-b-2 border-gvcs-navy' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        All Courses ({allCourses.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('hackathons')}
                        className={`px-6 py-4 font-bold transition-colors ${activeTab === 'hackathons' ? 'text-gvcs-navy border-b-2 border-gvcs-navy' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        All Hackathons ({allHackathons.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('problems')}
                        className={`px-6 py-4 font-bold transition-colors ${activeTab === 'problems' ? 'text-gvcs-navy border-b-2 border-gvcs-navy' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Problem Statuses ({allProblemStatuses.length})
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'users' && (
                        <div className="space-y-4">
                            {users.map(user => (
                                <div
                                    key={user.id}
                                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{user.email}</h3>
                                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-600">Courses: </span>
                                                    <span className="font-bold text-purple-600">{user.totalCourses}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Hackathons: </span>
                                                    <span className="font-bold text-green-600">{user.totalHackathons}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Problems: </span>
                                                    <span className="font-bold text-blue-600">{user.totalProblems}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                                            className="px-4 py-2 bg-gvcs-navy text-white rounded-lg font-bold hover:bg-blue-900 transition-colors text-sm"
                                        >
                                            {selectedUser?.id === user.id ? 'Hide Details' : 'View Details'}
                                        </button>
                                    </div>

                                    {selectedUser?.id === user.id && (
                                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                                            {/* User Courses */}
                                            {user.courses.length > 0 && (
                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-2">Courses:</h4>
                                                    <div className="space-y-2">
                                                        {user.courses.map(course => (
                                                            <div key={course.id} className="bg-gray-50 p-3 rounded-lg">
                                                                <div className="font-bold text-gray-900">{course.course_title}</div>
                                                                <div className="text-sm text-gray-600">
                                                                    Progress: {calculateCourseProgress(course.weeks)}% •
                                                                    Weeks: {course.weeks?.length || 0}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* User Hackathons */}
                                            {user.hackathons.length > 0 && (
                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-2">Hackathons:</h4>
                                                    <div className="space-y-2">
                                                        {user.hackathons.map(hackathon => (
                                                            <div key={hackathon.id} className="bg-gray-50 p-3 rounded-lg">
                                                                <div className="font-bold text-gray-900">{hackathon.hackathon_name}</div>
                                                                <div className="text-sm text-gray-600">
                                                                    Date: {hackathon.hackathon_date ? new Date(hackathon.hackathon_date).toLocaleDateString() : 'TBD'} •
                                                                    Step: {hackathon.current_step + 1}/6
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* User Profile */}
                                            {user.profile && (
                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-2">Profile:</h4>
                                                    <div className="bg-gray-50 p-3 rounded-lg">
                                                        <div className="text-sm text-gray-600">
                                                            Grade: {user.profile.grade_level || 'N/A'} •
                                                            Graduation: {user.profile.graduation_year || 'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'courses' && (
                        <div className="space-y-4">
                            {allCourses.map(course => (
                                <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="font-bold text-gray-900 mb-1">{course.course_title}</div>
                                    <div className="text-sm text-gray-600">
                                        User ID: {course.user_id.substring(0, 8)}... •
                                        Progress: {calculateCourseProgress(course.weeks)}% •
                                        Created: {new Date(course.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'hackathons' && (
                        <div className="space-y-4">
                            {allHackathons.map(hackathon => (
                                <div key={hackathon.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="font-bold text-gray-900 mb-1">{hackathon.hackathon_name}</div>
                                    <div className="text-sm text-gray-600">
                                        User ID: {hackathon.user_id.substring(0, 8)}... •
                                        Date: {hackathon.hackathon_date ? new Date(hackathon.hackathon_date).toLocaleDateString() : 'TBD'} •
                                        Step: {hackathon.current_step + 1}/6 •
                                        Created: {new Date(hackathon.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'problems' && (
                        <div className="space-y-4">
                            {allProblemStatuses.map(problem => (
                                <div key={problem.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="font-bold text-gray-900 mb-1">
                                        {problem.problem_url.substring(0, 60)}...
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        User ID: {problem.user_id.substring(0, 8)}... •
                                        Status: <span className={`font-bold ${problem.status === 'solved' ? 'text-green-600' :
                                                problem.status === 'attempted' ? 'text-yellow-600' : 'text-red-600'
                                            }`}>{problem.status}</span> •
                                        Updated: {new Date(problem.updated_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Dashboard = ({ user }) => {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState('courses'); // 'courses' or 'hackathons'

    // Check URL for tab parameter (for navigation from hackathon hub)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab === 'hackathons') {
            setActiveSection('hackathons');
        }
    }, [location.search]);
    const [courses, setCourses] = useState([]);
    const [hackathons, setHackathons] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedHackathon, setSelectedHackathon] = useState(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [expandedWeek, setExpandedWeek] = useState(null);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            // Fetch courses
            const { data: coursesData, error: coursesError } = await supabase
                .from('user_courses')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (coursesError) throw coursesError;

            const transformedCourses = (coursesData || []).map(course => ({
                id: course.id,
                courseTitle: course.course_title,
                courseId: course.course_id,
                addedDate: course.created_at,
                weeks: (course.weeks || []).map(week => ({
                    ...week,
                    selectedActivity: week.selected_activity || week.selectedActivity || null
                })),
                progress: calculateCourseProgress(course.weeks || [])
            }));

            setCourses(transformedCourses);

            // Fetch hackathons
            const { data: hackathonsData, error: hackathonsError } = await supabase
                .from('hackathon_programs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            // If table doesn't exist (404), just set empty array
            if (hackathonsError) {
                const errorStr = JSON.stringify(hackathonsError).toLowerCase();
                if (hackathonsError.code === '42P01' ||
                    hackathonsError.message?.includes('404') ||
                    errorStr.includes('404') ||
                    hackathonsError.message?.includes('relation') ||
                    hackathonsError.message?.includes('does not exist')) {
                    console.warn('hackathon_programs table does not exist yet. Run the SQL schema in Supabase.');
                    setHackathons([]);
                } else {
                    // Don't throw - just log and set empty array to prevent dashboard from breaking
                    console.warn('Error fetching hackathons (non-critical):', hackathonsError);
                    setHackathons([]);
                }
            } else {
                setHackathons(hackathonsData || []);
            }

            // Fetch profile
            const { data: profileData, error: profileError } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', user.id)
                .single();

            // If table doesn't exist or no profile found, set to null
            if (profileError) {
                if (profileError.code === 'PGRST116' || profileError.code === '42P01' || profileError.message?.includes('404')) {
                    if (profileError.code !== 'PGRST116') {
                        console.warn('user_profiles table does not exist yet. Run the SQL schema in Supabase.');
                    }
                    setProfile(null);
                } else {
                    throw profileError;
                }
            } else {
                setProfile(profileData);
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            alert('Failed to load dashboard. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const calculateCourseProgress = (weeks) => {
        if (!weeks || weeks.length === 0) return { completed: 0, total: 0, percentage: 0 };
        const completed = weeks.filter(w => w.submissions && w.submissions[w.selectedActivity || w.selected_activity]).length;
        return {
            completed,
            total: weeks.length,
            percentage: Math.round((completed / weeks.length) * 100)
        };
    };

    if (!user) {
        return (
            <div className="max-w-6xl mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold text-gvcs-navy mb-4">Dashboard</h2>
                <p className="text-gray-600 mb-4">Please log in to view your dashboard.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <h2 className="text-2xl font-bold text-gvcs-navy mb-6">Dashboard</h2>
                <div className="text-center py-12">
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If viewing a specific course week
    if (selectedCourse && selectedWeek !== null) {
        const week = selectedCourse.weeks[selectedWeek];
        return (
            <InteractiveWeekView
                course={selectedCourse}
                week={week}
                weekIndex={selectedWeek}
                onBack={() => setSelectedWeek(null)}
                onUpdateCourse={async (updatedCourse) => {
                    try {
                        const supabaseWeeks = updatedCourse.weeks.map(w => ({
                            week: w.week,
                            topic: w.topic,
                            description: w.description,
                            resources: w.resources,
                            deliverables: w.deliverables,
                            selected_activity: w.selectedActivity || w.selected_activity || null,
                            submissions: w.submissions || { builder: null, academic: null, communicator: null }
                        }));

                        const { error } = await supabase
                            .from('user_courses')
                            .update({
                                weeks: supabaseWeeks,
                                updated_at: new Date().toISOString()
                            })
                            .eq('id', updatedCourse.id);

                        if (error) throw error;

                        const updated = courses.map(c =>
                            c.id === updatedCourse.id ? updatedCourse : c
                        );
                        setCourses(updated);
                        setSelectedCourse(updatedCourse);
                        fetchDashboardData(); // Refresh to update progress
                    } catch (error) {
                        console.error('Error updating course:', error);
                        alert('Failed to save changes. Please try again.');
                    }
                }}
            />
        );
    }

    // If viewing a specific course
    if (selectedCourse) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <button
                    onClick={() => setSelectedCourse(null)}
                    className="mb-4 text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1"
                >
                    <Icons.ArrowRight /> Back to Dashboard
                </button>
                <h2 className="text-2xl font-bold text-gvcs-navy mb-6">{selectedCourse.courseTitle}</h2>

                <div className="space-y-4">
                    {selectedCourse.weeks.map((week, idx) => {
                        const hasSubmission = (type) => week.submissions && week.submissions && week.submissions[type];
                        const isExpanded = expandedWeek === idx;

                        return (
                            <div key={week.week} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {/* Week Header */}
                                <div
                                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => setExpandedWeek(isExpanded ? null : idx)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 text-lg">
                                                Week {week.week}: {week.topic}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">{week.description}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {/* Activity Status Indicators */}
                                            <div className="flex gap-2" title="Ellis Activities: Academic, Builder, Communicator">
                                                <div className={`w-3 h-3 rounded-full ${hasSubmission('academic') ? 'bg-green-500' : 'bg-gray-300'
                                                    }`} title="Academic"></div>
                                                <div className={`w-3 h-3 rounded-full ${hasSubmission('builder') ? 'bg-green-500' : 'bg-gray-300'
                                                    }`} title="Builder"></div>
                                                <div className={`w-3 h-3 rounded-full ${hasSubmission('communicator') ? 'bg-green-500' : 'bg-gray-300'
                                                    }`} title="Communicator"></div>
                                            </div>
                                            <Icons.ArrowRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''
                                                }`} />
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Week Content */}
                                {isExpanded && (
                                    <WeekDetailView
                                        week={week}
                                        weekIndex={idx}
                                        course={selectedCourse}
                                        onUpdateCourse={async (updatedCourse) => {
                                            try {
                                                const supabaseWeeks = updatedCourse.weeks.map(w => ({
                                                    week: w.week,
                                                    topic: w.topic,
                                                    description: w.description,
                                                    resources: w.resources,
                                                    deliverables: w.deliverables,
                                                    selected_activity: w.selectedActivity || w.selected_activity || null,
                                                    submissions: w.submissions || { builder: null, academic: null, communicator: null }
                                                }));

                                                const { error } = await supabase
                                                    .from('user_courses')
                                                    .update({
                                                        weeks: supabaseWeeks,
                                                        updated_at: new Date().toISOString()
                                                    })
                                                    .eq('id', updatedCourse.id);

                                                if (error) throw error;

                                                const updated = courses.map(c =>
                                                    c.id === updatedCourse.id ? updatedCourse : c
                                                );
                                                setCourses(updated);
                                                setSelectedCourse(updatedCourse);
                                                fetchDashboardData();
                                            } catch (error) {
                                                console.error('Error updating course:', error);
                                                alert('Failed to save changes. Please try again.');
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // If viewing a specific hackathon
    if (selectedHackathon) {
        return (
            <HackathonProgramView
                hackathon={selectedHackathon}
                user={user}
                onBack={() => setSelectedHackathon(null)}
                onUpdate={fetchDashboardData}
            />
        );
    }

    // Main Dashboard View
    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gvcs-navy mb-2">Dashboard</h1>
                <p className="text-gray-600">Manage your courses, hackathons, and profile</p>
            </div>

            {/* Account Info Section */}
            <div className="mb-8">
                <AccountInfoSection
                    user={user}
                    profile={profile}
                    isEditing={isEditingProfile}
                    onEdit={() => setIsEditingProfile(true)}
                    onSave={async (updatedProfile) => {
                        try {
                            const { error } = await supabase
                                .from('user_profiles')
                                .upsert({
                                    user_id: user.id,
                                    ...updatedProfile,
                                    updated_at: new Date().toISOString()
                                }, {
                                    onConflict: 'user_id'
                                });

                            if (error) throw error;
                            setProfile({ ...profile, ...updatedProfile });
                            setIsEditingProfile(false);
                            alert('Profile updated!');
                        } catch (error) {
                            console.error('Error updating profile:', error);
                            alert('Failed to update profile.');
                        }
                    }}
                    onCancel={() => setIsEditingProfile(false)}
                />
            </div>

            {/* Section Navigation */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveSection('courses')}
                    className={`px-4 py-2 font-semibold transition-colors ${activeSection === 'courses'
                        ? 'text-gvcs-navy border-b-2 border-gvcs-navy'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    My Courses
                </button>
                <button
                    onClick={() => setActiveSection('hackathons')}
                    className={`px-4 py-2 font-semibold transition-colors ${activeSection === 'hackathons'
                        ? 'text-gvcs-navy border-b-2 border-gvcs-navy'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Hackathon Projects
                </button>
            </div>

            {/* My Courses Section */}
            {activeSection === 'courses' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gvcs-navy">My Courses</h2>
                    </div>
                    {courses.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <p className="text-gray-600 mb-4">You haven't added any courses yet.</p>
                            <p className="text-sm text-gray-500">Go to Curriculum Generator and add a course to get started!</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {courses.map(course => {
                                const progress = calculateCourseProgress(course.weeks);
                                return (
                                    <div
                                        key={course.id}
                                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => setSelectedCourse(course)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gvcs-navy mb-2">{course.courseTitle}</h3>
                                                <p className="text-sm text-gray-500 mb-3">
                                                    Added {new Date(course.addedDate).toLocaleDateString()} • {course.weeks.length} weeks
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                                                        <div
                                                            className="bg-green-600 h-2 rounded-full transition-all"
                                                            style={{ width: `${progress.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-gray-600 font-semibold">
                                                        {progress.completed}/{progress.total} weeks
                                                    </span>
                                                    {progress.percentage === 100 && (
                                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Icons.ArrowRight className="w-6 h-6 text-gray-400" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Hackathon Projects Section */}
            {activeSection === 'hackathons' && (
                <HackathonsSection
                    hackathons={hackathons}
                    user={user}
                    onSelect={(hackathon) => setSelectedHackathon(hackathon)}
                    onRefresh={fetchDashboardData}
                />
            )}
        </div>
    );
};

// Week Detail View Component
const WeekDetailView = ({ week, weekIndex, course, onUpdateCourse }) => {
    const [activeSection, setActiveSection] = useState('learning'); // 'learning', 'academic', 'builder', 'communicator'

    return (
        <div className="border-t border-gray-200">
            {/* Section Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50">
                <button
                    onClick={() => setActiveSection('learning')}
                    className={`px-4 py-3 text-sm font-semibold transition-colors ${activeSection === 'learning'
                            ? 'text-gvcs-navy border-b-2 border-gvcs-navy bg-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    📚 Learning Resources
                </button>
                <button
                    onClick={() => setActiveSection('academic')}
                    className={`px-4 py-3 text-sm font-semibold transition-colors relative ${activeSection === 'academic'
                            ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    🎓 Academic: Test
                    {week.submissions?.academic && (
                        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    )}
                </button>
                <button
                    onClick={() => setActiveSection('builder')}
                    className={`px-4 py-3 text-sm font-semibold transition-colors relative ${activeSection === 'builder'
                            ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    🔨 Builder: Project
                    {week.submissions?.builder && (
                        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    )}
                </button>
                <button
                    onClick={() => setActiveSection('communicator')}
                    className={`px-4 py-3 text-sm font-semibold transition-colors relative ${activeSection === 'communicator'
                            ? 'text-orange-600 border-b-2 border-orange-600 bg-white'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    🎤 Communicator: Presentation
                    {week.submissions?.communicator && (
                        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    )}
                </button>
            </div>

            {/* Section Content */}
            <div className="p-6">
                {activeSection === 'learning' && (
                    <LearningResourcesSection week={week} />
                )}

                {activeSection === 'academic' && (
                    <AcademicTestSection
                        week={week}
                        weekIndex={weekIndex}
                        course={course}
                        onUpdateCourse={onUpdateCourse}
                    />
                )}

                {activeSection === 'builder' && (
                    <BuilderProjectSection
                        week={week}
                        weekIndex={weekIndex}
                        course={course}
                        onUpdateCourse={onUpdateCourse}
                    />
                )}

                {activeSection === 'communicator' && (
                    <CommunicatorPresentationSection
                        week={week}
                        weekIndex={weekIndex}
                        course={course}
                        onUpdateCourse={onUpdateCourse}
                    />
                )}
            </div>
        </div>
    );
};

// Learning Resources Section
const LearningResourcesSection = ({ week }) => {
    return (
        <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> These resources are optional learning materials to help you understand the week's content before completing your Ellis activities. You don't need to complete them, but they're recommended!
                </p>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-4">Learning Resources</h3>

            {week.resources && week.resources.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                    {week.resources.map((resource, idx) => (
                        <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${resource.type === 'Video' ? 'bg-red-100 text-red-600' :
                                        resource.type === 'Article' ? 'bg-blue-100 text-blue-600' :
                                            'bg-green-100 text-green-600'
                                    }`}>
                                    {resource.type === 'Video' ? '▶' : '📄'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 mb-1">{resource.title}</h4>
                                    <p className="text-xs text-gray-500">{resource.type}</p>
                                </div>
                                <Icons.Link className="w-4 h-4 text-gray-400" />
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm">No resources available for this week.</p>
            )}
        </div>
    );
};

// Academic Test Section
const AcademicTestSection = ({ week, weekIndex, course, onUpdateCourse }) => {
    const [testAnswers, setTestAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [testHistory, setTestHistory] = useState(week.submissions?.academic?.history || []);
    const currentSubmission = week.submissions?.academic;

    // Generate test questions based on week topic
    const generateTestQuestions = (week) => {
        const questions = {
            "Asymptotic Analysis: Big-O Notation": {
                mcq: [
                    {
                        id: 'q1',
                        question: "What is the time complexity of the following code snippet?\n\n```python\nfor i in range(n):\n    for j in range(i):\n        print(i, j)\n```",
                        type: 'mcq',
                        options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(2ⁿ)'],
                        correct: 1,
                        points: 2
                    },
                    {
                        id: 'q2',
                        question: "What is the time complexity of accessing an element in an array by index?",
                        type: 'mcq',
                        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                        correct: 0,
                        points: 2
                    },
                    {
                        id: 'q3',
                        question: "Which of the following best describes Big-O notation?",
                        type: 'mcq',
                        options: ['Exact runtime', 'Upper bound on growth rate', 'Lower bound on growth rate', 'Average case complexity'],
                        correct: 1,
                        points: 2
                    },
                    {
                        id: 'q4',
                        question: "What is the time complexity of binary search on a sorted array?",
                        type: 'mcq',
                        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
                        correct: 2,
                        points: 2
                    },
                    {
                        id: 'q5',
                        question: "What is the space complexity of merge sort?",
                        type: 'mcq',
                        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
                        correct: 1,
                        points: 2
                    },
                    {
                        id: 'q6',
                        question: "Which sorting algorithm has the best average time complexity?",
                        type: 'mcq',
                        options: ['Bubble sort', 'Insertion sort', 'Quick sort', 'Selection sort'],
                        correct: 2,
                        points: 2
                    },
                    {
                        id: 'q7',
                        question: "What is the time complexity of finding an element in an unsorted array?",
                        type: 'mcq',
                        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                        correct: 2,
                        points: 2
                    },
                    {
                        id: 'q8',
                        question: "Which data structure allows O(1) average time complexity for insert, delete, and search?",
                        type: 'mcq',
                        options: ['Array', 'Linked List', 'Hash Table', 'Binary Search Tree'],
                        correct: 2,
                        points: 2
                    },
                    {
                        id: 'q9',
                        question: "What is the time complexity of the following operation: finding the maximum element in an unsorted array?",
                        type: 'mcq',
                        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                        correct: 2,
                        points: 2
                    },
                    {
                        id: 'q10',
                        question: "Which notation describes the tight bound (both upper and lower bound)?",
                        type: 'mcq',
                        options: ['Big-O', 'Big-Ω (Omega)', 'Big-Θ (Theta)', 'Little-o'],
                        correct: 2,
                        points: 2
                    }
                ],
                fillblank: [
                    {
                        id: 'q11',
                        question: "The time complexity of binary search is O(___).",
                        type: 'fillblank',
                        points: 3
                    },
                    {
                        id: 'q12',
                        question: "Big-O notation describes the ___ bound on the growth rate of an algorithm.",
                        type: 'fillblank',
                        points: 2
                    }
                ],
                saq: [
                    {
                        id: 'q13',
                        question: "Explain the difference between Big-O, Big-Θ (Theta), and Big-Ω (Omega) notation. Provide an example for each.",
                        type: 'text',
                        points: 15
                    },
                    {
                        id: 'q14',
                        question: "Analyze the time complexity of binary search. Show your work step-by-step and explain why it is O(log n).",
                        type: 'text',
                        points: 15
                    }
                ]
            },
            "Linear Structures: Dynamic Arrays and Linked Lists": {
                mcq: [
                    {
                        id: 'q1',
                        question: "What is the time complexity of inserting an element at the beginning of a dynamic array?",
                        type: 'mcq',
                        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                        correct: 1,
                        points: 2
                    },
                    {
                        id: 'q2',
                        question: "What is the time complexity of inserting an element at the beginning of a linked list?",
                        type: 'mcq',
                        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                        correct: 0,
                        points: 2
                    },
                    {
                        id: 'q3',
                        question: "What is the amortized time complexity of appending to a dynamic array?",
                        type: 'mcq',
                        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
                        correct: 0,
                        points: 2
                    },
                    {
                        id: 'q4',
                        question: "Which data structure uses contiguous memory allocation?",
                        type: 'mcq',
                        options: ['Linked List', 'Dynamic Array', 'Both', 'Neither'],
                        correct: 1,
                        points: 2
                    },
                    {
                        id: 'q5',
                        question: "What happens when a dynamic array needs to grow beyond its current capacity?",
                        type: 'mcq',
                        options: ['It fails', 'It automatically resizes', 'It overwrites existing elements', 'It uses linked list internally'],
                        correct: 1,
                        points: 2
                    },
                    {
                        id: 'q6',
                        question: "What is the time complexity of accessing an element by index in a linked list?",
                        type: 'mcq',
                        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                        correct: 1,
                        points: 2
                    },
                    {
                        id: 'q7',
                        question: "Which operation is more efficient in a dynamic array compared to a linked list?",
                        type: 'mcq',
                        options: ['Insertion at beginning', 'Random access by index', 'Deletion at beginning', 'All of the above'],
                        correct: 1,
                        points: 2
                    },
                    {
                        id: 'q8',
                        question: "What is the typical resizing strategy for dynamic arrays?",
                        type: 'mcq',
                        options: ['Add 1 element', 'Double the size', 'Triple the size', 'Add 10 elements'],
                        correct: 1,
                        points: 2
                    },
                    {
                        id: 'q9',
                        question: "Which data structure has better cache locality?",
                        type: 'mcq',
                        options: ['Linked List', 'Dynamic Array', 'Both are equal', 'Depends on implementation'],
                        correct: 1,
                        points: 2
                    },
                    {
                        id: 'q10',
                        question: "What is the space overhead per element in a linked list (assuming pointers)?",
                        type: 'mcq',
                        options: ['O(1)', 'O(n)', 'O(log n)', 'Depends on data size'],
                        correct: 0,
                        points: 2
                    }
                ],
                fillblank: [
                    {
                        id: 'q11',
                        question: "Inserting an element at the beginning of a dynamic array has time complexity O(___).",
                        type: 'fillblank',
                        points: 2
                    },
                    {
                        id: 'q12',
                        question: "The amortized time complexity of appending to a dynamic array is O(___).",
                        type: 'fillblank',
                        points: 2
                    }
                ],
                saq: [
                    {
                        id: 'q13',
                        question: "Describe the resizing strategy for dynamic arrays. What happens when the array needs to grow? What is the amortized time complexity?",
                        type: 'text',
                        points: 15
                    },
                    {
                        id: 'q14',
                        question: "Compare the space complexity of arrays vs linked lists. Include overhead in your analysis. When would you choose a dynamic array over a linked list?",
                        type: 'text',
                        points: 15
                    }
                ]
            }
        };

        const topicQuestions = questions[week.topic];
        if (topicQuestions) {
            return [...topicQuestions.mcq, ...(topicQuestions.fillblank || []), ...topicQuestions.saq];
        }

        // Default fallback
        return [
            {
                id: 'q1',
                question: `Explain the key concepts covered in "${week.topic}". Provide examples.`,
                type: 'text',
                points: 25
            },
            {
                id: 'q2',
                question: `Analyze the time and space complexity of the main algorithms/data structures in "${week.topic}".`,
                type: 'text',
                points: 25
            }
        ];
    };

    const questions = generateTestQuestions(week);
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const hasSubmission = week.submissions?.academic;
    const mcqQuestions = questions.filter(q => q.type === 'mcq');
    const fillblankQuestions = questions.filter(q => q.type === 'fillblank');
    const saqQuestions = questions.filter(q => q.type === 'text');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Calculate score (hardcoded for now - in future, this would be auto-graded)
        const score = Math.floor(Math.random() * 20) + 80; // Random score 80-100 for demo

        const submission = {
            answers: testAnswers,
            submittedDate: new Date().toISOString(),
            score: score,
            totalPoints: totalPoints,
            grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D'
        };

        const updated = { ...course };
        if (!updated.weeks[weekIndex].submissions) {
            updated.weeks[weekIndex].submissions = { builder: null, academic: null, communicator: null };
        }

        // Add to history
        const newHistory = [...testHistory, submission];
        updated.weeks[weekIndex].submissions.academic = {
            ...submission,
            history: newHistory
        };

        setTestHistory(newHistory);
        onUpdateCourse(updated);
        setIsSubmitting(false);
        setQuizStarted(false);
        setTestAnswers({});
        alert(`Test submitted! Score: ${score}/${totalPoints} (${submission.grade})`);
    };

    if (currentSubmission && !quizStarted && !showHistory) {
        return (
            <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-green-800">✓ Latest Test Completed</h3>
                        <span className="text-lg font-bold text-green-700">
                            Score: {currentSubmission.score}/{currentSubmission.totalPoints} ({currentSubmission.grade})
                        </span>
                    </div>
                    <p className="text-sm text-green-600">
                        Submitted {new Date(currentSubmission.submittedDate).toISOString().split('T')[0]}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setShowHistory(true)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                    >
                        View History ({testHistory.length} attempts)
                    </button>
                    <button
                        onClick={() => {
                            setQuizStarted(true);
                            setTestAnswers({});
                        }}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
                    >
                        Retake Test
                    </button>
                </div>
            </div>
        );
    }

    if (showHistory && !quizStarted) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Test History</h3>
                    <button
                        onClick={() => setShowHistory(false)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
                    >
                        Back
                    </button>
                </div>

                <div className="space-y-4">
                    {testHistory.map((attempt, attemptIdx) => (
                        <div key={attemptIdx} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className="font-bold text-gray-800">Attempt #{testHistory.length - attemptIdx}</h4>
                                    <p className="text-sm text-gray-600">
                                        {new Date(attempt.submittedDate).toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-gray-800">
                                        {attempt.score}/{attempt.totalPoints} ({attempt.grade})
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {questions.map((q, qIdx) => (
                                    <div key={q.id} className="border-b border-gray-100 pb-2 last:border-0">
                                        <p className="text-xs font-semibold text-gray-700 mb-1">
                                            Q{qIdx + 1} ({q.points} pts)
                                        </p>
                                        <div className="text-xs text-gray-600">
                                            {q.type === 'mcq' ? (
                                                <span>Selected: {attempt.answers[q.id] !== undefined ? q.options[attempt.answers[q.id]] : 'No answer'}</span>
                                            ) : q.type === 'fillblank' ? (
                                                <span>Answer: {attempt.answers[q.id] || 'No answer'}</span>
                                            ) : (
                                                <span className="line-clamp-2">{attempt.answers[q.id] || 'No answer'}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => {
                        setQuizStarted(true);
                        setShowHistory(false);
                        setTestAnswers({});
                    }}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
                >
                    Start New Attempt
                </button>
            </div>
        );
    }

    if (!quizStarted) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {week.deliverables?.academic?.title || 'Academic Assessment'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        {week.deliverables?.academic?.description || 'Complete this assessment to demonstrate your understanding.'}
                    </p>

                    {week.deliverables?.academic?.guidelines && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                            <h4 className="font-semibold text-purple-900 mb-2">Guidelines:</h4>
                            <ul className="text-sm text-purple-800 space-y-1 list-disc list-inside">
                                {week.deliverables.academic.guidelines.map((g, i) => (
                                    <li key={i}>{g}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                        <strong>Total Points:</strong> {totalPoints} | <strong>Time Limit:</strong> None |
                        <strong> Attempts:</strong> Unlimited
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Format:</strong> {mcqQuestions.length} Multiple Choice Questions ({mcqQuestions.reduce((sum, q) => sum + q.points, 0)} points) |
                        {questions.filter(q => q.type === 'fillblank').length} Fill-in-the-Blank ({questions.filter(q => q.type === 'fillblank').reduce((sum, q) => sum + q.points, 0)} points) |
                        {saqQuestions.length} Short Answer Questions ({saqQuestions.reduce((sum, q) => sum + q.points, 0)} points)
                    </p>
                </div>

                <button
                    onClick={() => setQuizStarted(true)}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                >
                    Take Quiz
                </button>

                <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
                    <h4 className="font-bold mb-3">Preview Questions</h4>
                    <div className="space-y-3">
                        {questions.map((q, idx) => (
                            <div key={q.id} className="border-b border-gray-200 pb-3 last:border-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h5 className="font-semibold text-gray-800 text-sm">Question {idx + 1} ({q.points} points)</h5>
                                    <span className="text-xs text-gray-500">{q.type === 'mcq' ? 'MCQ' : q.type === 'fillblank' ? 'Fill-in-Blank' : 'SAQ'}</span>
                                </div>
                                <p className="text-xs text-gray-600 line-clamp-2">{q.question}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {week.deliverables?.academic?.title || 'Academic Assessment'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    {week.deliverables?.academic?.description || 'Complete this assessment to demonstrate your understanding.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">
                        <strong>Total Points:</strong> {totalPoints} | <strong>Time Limit:</strong> None |
                        <strong> Attempts:</strong> Unlimited
                    </p>
                </div>

                {questions.map((q, idx) => (
                    <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-gray-800">Question {idx + 1}</h4>
                            <span className="text-sm text-gray-500">{q.points} points</span>
                        </div>
                        <div className="mb-3">
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                                {q.question}
                            </pre>
                        </div>
                        {q.type === 'mcq' ? (
                            <div className="space-y-2">
                                {q.options.map((option, optIdx) => (
                                    <label key={optIdx} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={q.id}
                                            value={optIdx}
                                            checked={testAnswers[q.id] === optIdx}
                                            onChange={(e) => setTestAnswers({ ...testAnswers, [q.id]: parseInt(e.target.value) })}
                                            className="w-4 h-4"
                                            required
                                        />
                                        <span className="text-sm text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        ) : q.type === 'fillblank' ? (
                            <div className="space-y-2">
                                <div className="text-sm text-gray-700 whitespace-pre-wrap mb-2">
                                    {q.question.split('___').map((part, partIdx, parts) => (
                                        <span key={partIdx}>
                                            {part}
                                            {partIdx < parts.length - 1 && (
                                                <input
                                                    type="text"
                                                    value={testAnswers[q.id] || ''}
                                                    onChange={(e) => setTestAnswers({ ...testAnswers, [q.id]: e.target.value })}
                                                    className="inline-block mx-1 px-2 py-1 border-b-2 border-purple-500 focus:outline-none focus:border-purple-700 min-w-[100px]"
                                                    placeholder="fill in"
                                                    required
                                                />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <textarea
                                value={testAnswers[q.id] || ''}
                                onChange={(e) => setTestAnswers({ ...testAnswers, [q.id]: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                rows="6"
                                placeholder="Type your answer here..."
                                required
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Test'}
                </button>
            </form>
        </div>
    );
};

// Builder Project Section
const BuilderProjectSection = ({ week, weekIndex, course, onUpdateCourse }) => {
    const fileInputRef = React.useRef(null);
    const [submissionType, setSubmissionType] = useState('file'); // 'file' or 'github'
    const [githubRepo, setGithubRepo] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hasSubmission = week.submissions?.builder;

    // Check if this is CS 102 DS course (template-based builder)
    const isCS102DS = course?.title?.includes('CS 102') || course?.title?.includes('Data Structures');

    // Hardcoded rubric
    const rubric = [
        { criterion: "Functionality", maxPoints: 30, description: "Code works correctly and meets all requirements" },
        { criterion: "Code Quality", maxPoints: 20, description: "Clean, readable, well-documented code" },
        { criterion: "Testing", maxPoints: 20, description: "Comprehensive test cases and edge cases covered" },
        { criterion: "Documentation", maxPoints: 15, description: "README, comments, and usage instructions" },
        { criterion: "Creativity/Extra Features", maxPoints: 15, description: "Additional features beyond requirements" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submissionType === 'file') {
            const file = fileInputRef.current?.files?.[0];
            if (!file) {
                alert('Please select a file to submit');
                return;
            }
        } else {
            if (!githubRepo.trim()) {
                alert('Please enter a GitHub repository URL');
                return;
            }
            // Validate GitHub URL
            const githubUrlPattern = /^https?:\/\/(www\.)?(github\.com|github\.io)\/.+/;
            if (!githubUrlPattern.test(githubRepo.trim())) {
                alert('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)');
                return;
            }
        }

        setIsSubmitting(true);

        // Hardcoded grading (for now)
        const grades = rubric.map(r => ({
            criterion: r.criterion,
            points: Math.floor(Math.random() * (r.maxPoints - r.maxPoints * 0.7)) + Math.floor(r.maxPoints * 0.7),
            maxPoints: r.maxPoints,
            feedback: `Good work on ${r.criterion.toLowerCase()}. ${r.description}`
        }));

        const totalScore = grades.reduce((sum, g) => sum + g.points, 0);
        const totalMax = grades.reduce((sum, g) => sum + g.maxPoints, 0);
        const percentage = Math.round((totalScore / totalMax) * 100);

        const updated = { ...course };
        if (!updated.weeks[weekIndex].submissions) {
            updated.weeks[weekIndex].submissions = { builder: null, academic: null, communicator: null };
        }

        const submissionData = {
            submittedDate: new Date().toISOString(),
            rubric: grades,
            score: totalScore,
            totalPoints: totalMax,
            percentage: percentage,
            grade: percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : 'D'
        };

        if (submissionType === 'file') {
            const file = fileInputRef.current?.files?.[0];
            submissionData.fileName = file.name;
            submissionData.fileSize = file.size;
            submissionData.type = 'file';
        } else {
            submissionData.githubRepo = githubRepo.trim();
            submissionData.type = 'github';
        }

        updated.weeks[weekIndex].submissions.builder = submissionData;

        onUpdateCourse(updated);
        setIsSubmitting(false);
        alert(`Project submitted! Score: ${totalScore}/${totalMax} (${updated.weeks[weekIndex].submissions.builder.grade})`);
    };

    if (hasSubmission) {
        return (
            <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-green-800">✓ Project Submitted</h3>
                        <span className="text-lg font-bold text-green-700">
                            Score: {hasSubmission.score}/{hasSubmission.totalPoints} ({hasSubmission.grade})
                        </span>
                    </div>
                    {hasSubmission.type === 'file' && (
                        <p className="text-sm text-green-600 mb-2">
                            File: {hasSubmission.fileName} ({Math.round(hasSubmission.fileSize / 1024)} KB)
                        </p>
                    )}
                    {hasSubmission.type === 'github' && (
                        <p className="text-sm text-green-600 mb-2">
                            <a href={hasSubmission.githubRepo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                GitHub Repository: {hasSubmission.githubRepo}
                            </a>
                        </p>
                    )}
                    <p className="text-sm text-green-600">
                        Submitted {new Date(hasSubmission.submittedDate).toLocaleDateString()}
                    </p>
                </div>

                {hasSubmission.rubric && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-bold mb-3">Grading Rubric</h4>
                        <div className="space-y-3">
                            {hasSubmission.rubric.map((item, idx) => (
                                <div key={idx} className="border-b border-gray-200 pb-3 last:border-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-800">{item.criterion}</span>
                                        <span className="text-sm text-gray-600">
                                            {item.points}/{item.maxPoints} points
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">{item.feedback}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Template-based builder for CS 102 DS
    if (isCS102DS) {
        const templateFileName = `${week.topic?.replace(/[^a-zA-Z0-9]/g, '_')}_template.java`;

        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {week.deliverables?.builder?.title || 'Complete the Template'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Download the template file below. Fill in the missing code sections (marked with TODO comments) to complete the data structure implementation.
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Instructions:</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                        <li>Download the template file</li>
                        <li>Open it in your IDE</li>
                        <li>Find all TODO comments and fill in the missing code</li>
                        <li>Test your implementation</li>
                        <li>Upload your completed file</li>
                    </ol>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                    <button
                        onClick={() => {
                            // Create a simple template file content
                            const templateContent = `public class ${week.topic?.replace(/[^a-zA-Z0-9]/g, '') || 'DataStructure'} {
    // TODO: Add necessary instance variables
    
    // TODO: Implement constructor
    
    // TODO: Implement required methods
    
    // Example method structure:
    public void exampleMethod() {
        // TODO: Fill in implementation
    }
}`;

                            const blob = new Blob([templateContent], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = templateFileName;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        }}
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                        <Icons.Link className="w-5 h-5" />
                        Download Template File
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        {templateFileName}
                    </p>
                </div>

                {hasSubmission ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-green-800">✓ Template Completed</h3>
                            <span className="text-lg font-bold text-green-700">
                                Score: {hasSubmission.score}/{hasSubmission.totalPoints} ({hasSubmission.grade})
                            </span>
                        </div>
                        <p className="text-sm text-green-600">
                            Submitted {new Date(hasSubmission.submittedDate).toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Upload Completed Template File
                            </label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept=".java,.py,.cpp,.c"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Upload your completed template file (.java, .py, .cpp, or .c)
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Completed Template'}
                        </button>
                    </form>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {week.deliverables?.builder?.title || 'Builder Project'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    {week.deliverables?.builder?.description || 'Complete this project to demonstrate your building skills.'}
                </p>

                {week.deliverables?.builder?.guidelines && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Guidelines:</h4>
                        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                            {week.deliverables.builder.guidelines.map((g, i) => (
                                <li key={i}>{g}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-3">Grading Rubric</h4>
                <div className="space-y-2">
                    {rubric.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{item.criterion}</span>
                            <span className="text-gray-500">{item.maxPoints} points</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                    Total: {rubric.reduce((sum, r) => sum + r.maxPoints, 0)} points
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Submission Type
                    </label>
                    <div className="flex gap-4 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="submissionType"
                                value="file"
                                checked={submissionType === 'file'}
                                onChange={(e) => setSubmissionType(e.target.value)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm">File Upload</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="submissionType"
                                value="github"
                                checked={submissionType === 'github'}
                                onChange={(e) => setSubmissionType(e.target.value)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm">GitHub Repository</span>
                        </label>
                    </div>
                </div>

                {submissionType === 'file' ? (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Upload Project File
                        </label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required={submissionType === 'file'}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Acceptable formats: .zip, .tar.gz, or any project archive file
                        </p>
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            GitHub Repository URL
                        </label>
                        <input
                            type="url"
                            value={githubRepo}
                            onChange={(e) => setGithubRepo(e.target.value)}
                            placeholder="https://github.com/username/repository"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required={submissionType === 'github'}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Enter the full URL to your GitHub repository
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Project'}
                </button>
            </form>
        </div>
    );
};

// Communicator Presentation Section
const CommunicatorPresentationSection = ({ week, weekIndex, course, onUpdateCourse }) => {
    const fileInputRef = React.useRef(null);
    const [presentationLink, setPresentationLink] = useState('');
    const [submissionType, setSubmissionType] = useState('file'); // 'file' or 'link'
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hasSubmission = week.submissions?.communicator;

    // Hardcoded rubric
    const rubric = [
        { criterion: "Content Quality", maxPoints: 30, description: "Accurate, comprehensive, well-researched content" },
        { criterion: "Clarity & Organization", maxPoints: 25, description: "Clear structure, logical flow, easy to follow" },
        { criterion: "Visual Aids", maxPoints: 20, description: "Effective use of slides, diagrams, or visuals" },
        { criterion: "Delivery", maxPoints: 15, description: "Clear speaking, appropriate pace, engagement" },
        { criterion: "Examples & Demonstrations", maxPoints: 10, description: "Relevant examples and practical demonstrations" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submissionType === 'file') {
            const file = fileInputRef.current?.files?.[0];
            if (!file) {
                alert('Please select a presentation file to submit');
                return;
            }
        } else {
            if (!presentationLink.trim()) {
                alert('Please enter a presentation link');
                return;
            }
        }

        setIsSubmitting(true);

        // Hardcoded grading (for now)
        const grades = rubric.map(r => ({
            criterion: r.criterion,
            points: Math.floor(Math.random() * (r.maxPoints - r.maxPoints * 0.7)) + Math.floor(r.maxPoints * 0.7),
            maxPoints: r.maxPoints,
            feedback: `Good work on ${r.criterion.toLowerCase()}. ${r.description}`
        }));

        const totalScore = grades.reduce((sum, g) => sum + g.points, 0);
        const totalMax = grades.reduce((sum, g) => sum + g.maxPoints, 0);
        const percentage = Math.round((totalScore / totalMax) * 100);

        const updated = { ...course };
        if (!updated.weeks[weekIndex].submissions) {
            updated.weeks[weekIndex].submissions = { builder: null, academic: null, communicator: null };
        }

        const submissionData = {
            submittedDate: new Date().toISOString(),
            rubric: grades,
            score: totalScore,
            totalPoints: totalMax,
            percentage: percentage,
            grade: percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : 'D',
            type: submissionType
        };

        if (submissionType === 'file') {
            const file = fileInputRef.current?.files?.[0];
            submissionData.fileName = file.name;
            submissionData.fileSize = file.size;
        } else {
            submissionData.link = presentationLink;
        }

        updated.weeks[weekIndex].submissions.communicator = submissionData;

        onUpdateCourse(updated);
        setIsSubmitting(false);
        alert(`Presentation submitted! Score: ${totalScore}/${totalMax} (${updated.weeks[weekIndex].submissions.communicator.grade})`);
    };

    if (hasSubmission) {
        return (
            <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-green-800">✓ Presentation Submitted</h3>
                        <span className="text-lg font-bold text-green-700">
                            Score: {hasSubmission.score}/{hasSubmission.totalPoints} ({hasSubmission.grade})
                        </span>
                    </div>
                    {hasSubmission.type === 'file' && (
                        <p className="text-sm text-green-600 mb-2">
                            File: {hasSubmission.fileName} ({Math.round(hasSubmission.fileSize / 1024)} KB)
                        </p>
                    )}
                    {hasSubmission.type === 'link' && hasSubmission.link && (
                        <a
                            href={hasSubmission.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm block mb-2"
                        >
                            {hasSubmission.link}
                        </a>
                    )}
                    <p className="text-sm text-green-600">
                        Submitted {new Date(hasSubmission.submittedDate).toLocaleDateString()}
                    </p>
                </div>

                {hasSubmission.rubric && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-bold mb-3">Grading Rubric</h4>
                        <div className="space-y-3">
                            {hasSubmission.rubric.map((item, idx) => (
                                <div key={idx} className="border-b border-gray-200 pb-3 last:border-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-800">{item.criterion}</span>
                                        <span className="text-sm text-gray-600">
                                            {item.points}/{item.maxPoints} points
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">{item.feedback}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {week.deliverables?.communicator?.title || 'Communicator Presentation'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    {week.deliverables?.communicator?.description || 'Create a presentation to demonstrate your communication skills.'}
                </p>

                {week.deliverables?.communicator?.guidelines && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-orange-900 mb-2">Guidelines:</h4>
                        <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
                            {week.deliverables.communicator.guidelines.map((g, i) => (
                                <li key={i}>{g}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-3">Grading Rubric</h4>
                <div className="space-y-2">
                    {rubric.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{item.criterion}</span>
                            <span className="text-gray-500">{item.maxPoints} points</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                    Total: {rubric.reduce((sum, r) => sum + r.maxPoints, 0)} points
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Submission Type
                    </label>
                    <div className="flex gap-4 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="presentationType"
                                value="file"
                                checked={submissionType === 'file'}
                                onChange={(e) => setSubmissionType(e.target.value)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm">Upload File</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="presentationType"
                                value="link"
                                checked={submissionType === 'link'}
                                onChange={(e) => setSubmissionType(e.target.value)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm">Link (Google Slides, YouTube, etc.)</span>
                        </label>
                    </div>
                </div>

                {submissionType === 'file' ? (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Upload Presentation File
                        </label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept=".pptx,.ppt,.pdf,.key"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required={submissionType === 'file'}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Acceptable formats: .pptx, .ppt, .pdf, .key (PowerPoint, PDF, Keynote)
                        </p>
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Presentation Link
                        </label>
                        <input
                            type="url"
                            value={presentationLink}
                            onChange={(e) => setPresentationLink(e.target.value)}
                            placeholder="https://docs.google.com/presentation/... or YouTube link"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required={submissionType === 'link'}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Provide a link to Google Slides, PowerPoint Online, YouTube video, or similar
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Presentation'}
                </button>
            </form>
        </div>
    );
};

const InteractiveWeekView = ({ course, week, weekIndex, onBack, onUpdateCourse }) => {
    const [selectedActivityType, setSelectedActivityType] = useState(week.selectedActivity);
    const fileInputRef = React.useRef(null);
    const [testAnswers, setTestAnswers] = useState({});
    const [presentationLink, setPresentationLink] = useState('');

    const handleActivitySelect = (activityType) => {
        setSelectedActivityType(activityType);
        const updated = { ...course };
        updated.weeks[weekIndex].selectedActivity = activityType;
        onUpdateCourse(updated);
    };

    const handleFileSubmit = (e) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            const updated = { ...course };
            updated.weeks[weekIndex].submissions.builder = {
                fileName: file.name,
                fileSize: file.size,
                submittedDate: new Date().toISOString()
            };
            onUpdateCourse(updated);
            alert("File submitted successfully!");
        }
    };

    const handleTestSubmit = (e) => {
        e.preventDefault();
        const updated = { ...course };
        updated.weeks[weekIndex].submissions.academic = {
            answers: testAnswers,
            submittedDate: new Date().toISOString()
        };
        onUpdateCourse(updated);
        alert("Test submitted successfully!");
    };

    const handlePresentationSubmit = (e) => {
        e.preventDefault();
        if (presentationLink) {
            const updated = { ...course };
            updated.weeks[weekIndex].submissions.communicator = {
                link: presentationLink,
                submittedDate: new Date().toISOString()
            };
            onUpdateCourse(updated);
            alert("Presentation submitted successfully!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button
                onClick={onBack}
                className="mb-4 text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1"
            >
                <Icons.ArrowRight /> Back to Course
            </button>

            <h2 className="text-2xl font-bold text-gvcs-navy mb-2">Week {week.week}: {week.topic}</h2>
            <p className="text-gray-600 mb-6">{week.description}</p>

            {/* Activity Selection */}
            {!selectedActivityType ? (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h3 className="font-bold text-gray-800 mb-4">Choose Your Ellis Activity</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {week.deliverables && Object.entries(week.deliverables).map(([type, data]) => (
                            <button
                                key={type}
                                onClick={() => handleActivitySelect(type)}
                                className={`p-4 rounded-lg border-2 text-left transition-all ${type === 'builder' ? 'border-blue-500 hover:bg-blue-50' :
                                    type === 'academic' ? 'border-purple-500 hover:bg-purple-50' :
                                        'border-orange-500 hover:bg-orange-50'
                                    }`}
                            >
                                <div className={`text-xs font-bold mb-2 ${type === 'builder' ? 'text-blue-600' :
                                    type === 'academic' ? 'text-purple-600' :
                                        'text-orange-600'
                                    }`}>
                                    {type === 'builder' ? 'BUILDER' : type === 'academic' ? 'ACADEMIC' : 'COMMUNICATOR'}
                                </div>
                                <div className="font-bold text-gray-800">{data.title}</div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Selected Activity Info */}
                    <div className={`p-4 rounded-lg border-l-4 ${selectedActivityType === 'builder' ? 'border-blue-500 bg-blue-50' :
                        selectedActivityType === 'academic' ? 'border-purple-500 bg-purple-50' :
                            'border-orange-500 bg-orange-50'
                        }`}>
                        <h3 className="font-bold text-gray-800 mb-2">
                            {week.deliverables[selectedActivityType].title}
                        </h3>
                        <p className="text-sm text-gray-700">{week.deliverables[selectedActivityType].description}</p>
                        <button
                            onClick={() => handleActivitySelect(null)}
                            className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                        >
                            Change Activity
                        </button>
                    </div>

                    {/* Submission Forms */}
                    {selectedActivityType === 'builder' && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Submit Your Project</h3>
                            {week.submissions.builder ? (
                                <div className="bg-green-50 border border-green-200 rounded p-4">
                                    <p className="text-green-700 font-semibold">✓ Submitted</p>
                                    <p className="text-sm text-green-600 mt-1">
                                        {week.submissions.builder.fileName}
                                        ({Math.round(week.submissions.builder.fileSize / 1024)} KB)
                                    </p>
                                    <p className="text-xs text-green-600 mt-1">
                                        Submitted {new Date(week.submissions.builder.submittedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleFileSubmit}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="mb-4"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Submit File
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {selectedActivityType === 'academic' && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Take Assessment</h3>
                            {week.submissions.academic ? (
                                <div className="bg-green-50 border border-green-200 rounded p-4">
                                    <p className="text-green-700 font-semibold">✓ Test Completed</p>
                                    <p className="text-xs text-green-600 mt-1">
                                        Submitted {new Date(week.submissions.academic.submittedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleTestSubmit}>
                                    <div className="space-y-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Question 1</label>
                                            <textarea
                                                className="w-full p-2 border rounded"
                                                rows="3"
                                                placeholder="Your answer..."
                                                value={testAnswers.q1 || ''}
                                                onChange={(e) => setTestAnswers({ ...testAnswers, q1: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Question 2</label>
                                            <textarea
                                                className="w-full p-2 border rounded"
                                                rows="3"
                                                placeholder="Your answer..."
                                                value={testAnswers.q2 || ''}
                                                onChange={(e) => setTestAnswers({ ...testAnswers, q2: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        Submit Test
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {selectedActivityType === 'communicator' && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Submit Presentation</h3>
                            {week.submissions.communicator ? (
                                <div className="bg-green-50 border border-green-200 rounded p-4">
                                    <p className="text-green-700 font-semibold">✓ Presentation Submitted</p>
                                    <a
                                        href={week.submissions.communicator.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        {week.submissions.communicator.link}
                                    </a>
                                    <p className="text-xs text-green-600 mt-1">
                                        Submitted {new Date(week.submissions.communicator.submittedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handlePresentationSubmit}>
                                    <input
                                        type="url"
                                        placeholder="Enter presentation link (Google Slides, YouTube, etc.)"
                                        className="w-full p-2 border rounded mb-4"
                                        value={presentationLink}
                                        onChange={(e) => setPresentationLink(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                    >
                                        Submit Presentation
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const HackathonHubView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

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

        <div className="space-y-4">
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
            ].map((hack, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200 gap-4 hover:border-green-300 transition-colors">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-lg text-gray-900">{hack.name}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${hack.status.includes('Open') || hack.status.includes('Register') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                {hack.status}
                            </span>
                        </div>
                        <div className="text-sm font-bold text-gray-600 mb-1">{hack.date} • {hack.location}</div>
                        <p className="text-sm text-gray-500">{hack.desc}</p>
                    </div>
                    <a
                        href={hack.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all text-center whitespace-nowrap"
                    >
                        Visit Website
                    </a>
                </div>
            ))}
        </div>
    </section>
                </>
            )}
        </div>
    );
};

const MeetingArchiveView = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gvcs-navy mb-2">Meeting Archive</h2>
                <p className="text-gray-600">Missed a meeting? Catch up on slides, code, and recordings.</p>
            </div>

            <div className="space-y-4">
                {[
                    { date: "Nov 20, 2024", title: "Intro to Dynamic Programming", type: "Lecture", resources: ["Slides", "Recording", "Problem Set"] },
                    { date: "Nov 13, 2024", title: "Git & GitHub Workshop", type: "Workshop", resources: ["Cheatsheet", "Recording"] },
                    { date: "Nov 06, 2024", title: "Guest Speaker: Google Engineer", type: "Event", resources: ["Recording"] },
                    { date: "Oct 30, 2024", title: "Hackathon Prep Night", type: "Activity", resources: ["Team Sheet"] },
                ].map((meeting, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-300 transition-colors">
                        <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{meeting.date} • {meeting.type}</div>
                            <h3 className="text-lg font-bold text-gray-900">{meeting.title}</h3>
                        </div>
                        <div className="flex gap-2">
                            {meeting.resources.map((res, j) => (
                                <button key={j} className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 rounded-lg text-xs font-bold transition-colors">
                                    {res}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};



const HomeView = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section - Royal Blue & White */}
            <section className="relative pt-20 pb-32 px-4 text-center overflow-hidden bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-70"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-block mb-6 px-4 py-1 border border-blue-100 rounded-full bg-blue-50">
                        <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">Est. 2024 • Garnet Valley</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                        Great Valley <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Computer Science
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                        A community of builders, scholars, and innovators. Home of <span className="font-bold text-slate-800">The Code Academy</span>.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/weekly')}
                            className="group relative px-8 py-4 bg-slate-900 text-white font-bold text-lg rounded-full overflow-hidden shadow-xl hover:shadow-blue-500/20 transition-all hover:-translate-y-1"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                This Week's Problems <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                        <button
                            onClick={() => navigate('/ellis')}
                            className="px-8 py-4 bg-white text-slate-700 font-bold text-lg rounded-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                        >
                            Plan Your Study
                        </button>
                    </div>
                </div>
            </section>

            {/* Tech Radar Section */}
            <section className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Icons.Sparkles className="text-blue-600" /> Tech Radar
                        </h2>
                        <span className="text-sm text-slate-500">What we're exploring this month</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Why we like Rust", tag: "Languages", desc: "Memory safety without garbage collection. Is it the future of systems programming?", color: "bg-orange-50 text-orange-700 border-orange-200" },
                            { title: "Intro to Svelte 5", tag: "Web", desc: "Rethinking reactivity. Less boilerplate, more performance.", color: "bg-red-50 text-red-700 border-red-200" },
                            { title: "Agentic AI Workflows", tag: "AI", desc: "Moving beyond chatbots to autonomous agents that can use tools.", color: "bg-purple-50 text-purple-700 border-purple-200" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${item.color} border`}>{item.tag}</span>
                                    <Icons.ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Futuristic Pillars Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Three Pillars</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Our curriculum is built on three core disciplines, designed to forge complete computer scientists.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Builder",
                            icon: <Icons.Code />,
                            desc: "Architects of the digital world. We build apps, websites, and tools that solve real problems.",
                            color: "from-blue-500 to-cyan-500"
                        },
                        {
                            title: "Scholar",
                            icon: <Icons.Book />,
                            desc: "Seekers of deep knowledge. We study algorithms, theory, and the fundamental laws of computation.",
                            color: "from-purple-500 to-pink-500"
                        },
                        {
                            title: "Orator",
                            icon: <Icons.Chat />,
                            desc: "Voices of clarity. We communicate complex ideas with precision and persuasion.",
                            color: "from-amber-500 to-orange-500"
                        }
                    ].map((pillar, i) => (
                        <div key={i} className="group relative p-1 rounded-2xl bg-gradient-to-b from-slate-100 to-white hover:from-blue-500 hover:to-purple-600 transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-2">
                            <div className="bg-white rounded-xl p-8 h-full relative z-10 flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    {pillar.desc}
                                </p>
                                <div className={`mt-auto h-1 w-12 rounded-full bg-gradient-to-r ${pillar.color} opacity-50 group-hover:w-full transition-all duration-500`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* What We Do - Gallery Section */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Life at The Academy</h2>
                        <p className="text-slate-600">More than just code. A community of innovators.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96 md:h-[600px]">
                        {/* Placeholder images - using gradients/colors for now as placeholders, 
                            but structured for images. In a real app, these would be <img> tags. */}
                        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-4xl group-hover:scale-110 transition-transform duration-700">HACKATHONS</div>
                            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                                <span className="text-white font-bold">Hackathons</span>
                            </div>
                        </div>
                        <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600"></div>
                            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/60 to-transparent w-full">
                                <span className="text-white text-sm font-bold">Workshops</span>
                            </div>
                        </div>
                        <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative group shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-700"></div>
                            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/60 to-transparent w-full">
                                <span className="text-white text-sm font-bold">Collaboration</span>
                            </div>
                        </div>
                        <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500"></div>
                            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/60 to-transparent w-full">
                                <span className="text-white text-sm font-bold">Guest Speakers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const useAdminProblems = () => {
    const [problems, setProblems] = useState([]);

    const seedData = () => {
        const mockProblems = [
            { id: '1', title: 'Binary Tree Level Order Traversal', concept: 'BFS', date: new Date(), solveCount: 12 },
            { id: '2', title: 'Merge K Sorted Lists', concept: 'Heaps', date: new Date(Date.now() - 86400000), solveCount: 8 },
            { id: '3', title: 'Valid Parentheses', concept: 'Stack', date: new Date(Date.now() - 172800000), solveCount: 25 }
        ];
        setProblems(mockProblems);
    };

    return { problems, seedData };
};

const AdminMeetingView = ({ onExit }) => {
    const { problems, seedData } = useAdminProblems();

    return (
        <main className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gvcs-navy">Problem Archive (Admin)</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage and review recent challenges</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={seedData}
                        className="text-sm bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium shadow-sm"
                    >
                        + Seed Mock Data
                    </button>
                    <button
                        onClick={onExit}
                        className="text-sm bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-100 transition-all font-medium shadow-sm"
                    >
                        Exit Admin
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {problems.map((p) => (
                    <div key={p.id} className="group bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition-colors">{p.title}</h3>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                    {p.concept}
                                </span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">
                                Posted {p.date?.toDate ? p.date.toDate().toLocaleDateString() : 'Just now'}
                            </span>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-center min-w-[80px]">
                                <div className="text-2xl font-bold text-gvcs-navy">{p.solveCount || 0}</div>
                                <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Solves</div>
                            </div>
                        </div>
                    </div>
                ))}
                {problems.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <div className="text-4xl mb-3">📭</div>
                        <p className="text-gray-500 font-medium">No problems found in the archive.</p>
                        <p className="text-gray-400 text-sm">Use the seed button to generate some test data.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

const MyPlans = ({ user }) => {
    const [academicRecord, setAcademicRecord] = useState({
        "2024-2025": { 1: null, 2: null, 3: null, 4: null }
    });
    const [savedPlans, setSavedPlans] = useState([]);
    const [isSelectorOpen, setIsSelectorOpen] = useState(null); // {year, mp}

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('gvcs_saved_plans') || '[]');
        setSavedPlans(saved);

        const record = JSON.parse(localStorage.getItem('gvcs_academic_record') || 'null');
        if (record) setAcademicRecord(record);
    }, []);

    const assignPlan = (year, mp, plan) => {
        const newRecord = { ...academicRecord };
        if (!newRecord[year]) newRecord[year] = { 1: null, 2: null, 3: null, 4: null };
        newRecord[year][mp] = plan;
        setAcademicRecord(newRecord);
        localStorage.setItem('gvcs_academic_record', JSON.stringify(newRecord));
        setIsSelectorOpen(null);
    };

    const clearSlot = (year, mp) => {
        if (!confirm("Are you sure you want to remove this plan from your schedule?")) return;
        const newRecord = { ...academicRecord };
        newRecord[year][mp] = null;
        setAcademicRecord(newRecord);
        localStorage.setItem('gvcs_academic_record', JSON.stringify(newRecord));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gvcs-navy flex items-center gap-3">
                    <Icons.Book /> My Academic Record
                </h2>
                <p className="text-gray-600">Manage your independent study curriculum for the year.</p>
            </div>

            {Object.entries(academicRecord).sort().reverse().map(([year, mps]) => (
                <div key={year} className="mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{year} School Year</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(mp => {
                            const plan = mps[mp];
                            return (
                                <div key={mp} className={`relative rounded-xl border-2 transition-all min-h-[200px] flex flex-col
                                    ${plan ? 'border-gvcs-navy bg-white shadow-sm' : 'border-dashed border-gray-300 bg-gray-50 hover:border-gray-400'}`}>

                                    <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-t-lg border-b border-gray-200 flex justify-between items-center">
                                        Marking Period {mp}
                                        {plan && <button onClick={() => clearSlot(year, mp)} className="text-red-400 hover:text-red-600">×</button>}
                                    </div>

                                    {plan ? (
                                        <div className="p-4 flex-grow flex flex-col">
                                            <h4 className="font-bold text-gvcs-navy mb-1 line-clamp-2">{plan.topic || plan.title}</h4>
                                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded self-start mb-2">{plan.level || "Standard"}</span>
                                            <div className="mt-auto pt-4">
                                                <button className="w-full py-1.5 text-xs font-bold text-gvcs-navy border border-gvcs-navy rounded hover:bg-gvcs-navy hover:text-white transition-colors">
                                                    View Plan
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-4 flex-grow flex flex-col items-center justify-center text-center">
                                            {isSelectorOpen?.year === year && isSelectorOpen?.mp === mp ? (
                                                <div className="absolute inset-0 bg-white z-10 p-2 overflow-y-auto rounded-xl">
                                                    <div className="text-xs font-bold text-gray-400 mb-2">Select a Saved Plan:</div>
                                                    {savedPlans.length === 0 && <div className="text-xs text-red-500">No saved plans found. Go to Curriculum Generator to create one!</div>}
                                                    {savedPlans.map(p => (
                                                        <button
                                                            key={p.id}
                                                            onClick={() => assignPlan(year, mp, p)}
                                                            className="w-full text-left p-2 hover:bg-blue-50 rounded text-xs border-b border-gray-100 last:border-0"
                                                        >
                                                            <div className="font-bold text-gvcs-navy">{p.topic}</div>
                                                            <div className="text-gray-400">{p.date}</div>
                                                        </button>
                                                    ))}
                                                    <button
                                                        onClick={() => setIsSelectorOpen(null)}
                                                        className="w-full mt-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setIsSelectorOpen({ year, mp })}
                                                    className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gvcs-navy transition-colors"
                                                >
                                                    <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-lg font-bold">+</div>
                                                    <span className="text-sm font-medium">Assign Plan</span>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const CareerPathwaysView = () => {
    const pathways = [
        {
            title: "Quantitative Finance & Fintech",
            icon: <Icons.Sparkles className="w-6 h-6 text-yellow-600" />,
            description: "Combine advanced mathematics, algorithms, and finance to build high-frequency trading systems and financial models.",
            color: "bg-yellow-50 border-yellow-100",
            textColor: "text-yellow-800",
            details: {
                ap: ["AP Calculus BC", "AP Statistics", "AP CSA", "AP Macro/Micro Economics"],
                codecademy: ["Data Science Path", "Python for Finance", "C++"],
                majors: ["CS + Math", "Financial Engineering", "Statistics", "Finance"],
                jobs: ["Quant Researcher", "Algorithmic Trader", "Fintech Developer"],
                ecs: ["Investment Club", "Math Competitions (AMC/AIME)", "USACO (Algorithmic Skills)"]
            }
        },
        {
            title: "STEM Education",
            icon: <Icons.Lightbulb className="w-6 h-6 text-green-600" />,
            description: "Inspire the next generation of innovators by combining technical expertise with pedagogy.",
            color: "bg-green-50 border-green-100",
            textColor: "text-green-800",
            details: {
                ap: ["AP CSA", "AP Psychology (Learning Science)", "AP Seminar"],
                codecademy: ["Learn Python (Basics)", "Web Development Path"],
                majors: ["CS Education", "Mathematics", "Education", "Cognitive Science"],
                jobs: ["CS Teacher", "Curriculum Developer", "EdTech Specialist", "Professor"],
                ecs: ["Peer Tutoring", "TA for CS Classes", "Starting a Coding Club", "Summer Camp Counselor"]
            }
        },
        {
            title: "Software Engineering",
            icon: <Icons.Code className="w-6 h-6 text-blue-600" />,
            description: "Build the applications and systems that power the modern world, from mobile apps to cloud infrastructure.",
            color: "bg-blue-50 border-blue-100",
            textColor: "text-blue-800",
            details: {
                ap: ["AP CSA", "AP CSP", "AP Physics C"],
                codecademy: ["Full Stack Engineer Path", "Java", "React", "Go"],
                majors: ["Computer Science", "Software Engineering", "Computer Engineering"],
                jobs: ["Full Stack Developer", "Mobile App Dev", "DevOps Engineer", "System Architect"],
                ecs: ["Hackathons", "Personal Projects", "Open Source Contributions", "Robotics"]
            }
        },
        {
            title: "Data Science & AI",
            icon: <Icons.Brain className="w-6 h-6 text-purple-600" />,
            description: "Extract insights from data and build intelligent systems that learn and adapt.",
            color: "bg-purple-50 border-purple-100",
            textColor: "text-purple-800",
            details: {
                ap: ["AP Statistics", "AP Calculus BC", "AP CSA"],
                codecademy: ["Data Scientist Path", "Machine Learning", "SQL", "Python"],
                majors: ["Data Science", "CS (AI Focus)", "Statistics", "Applied Math"],
                jobs: ["Data Scientist", "ML Engineer", "AI Researcher", "Data Analyst"],
                ecs: ["Kaggle Competitions", "Research Projects", "AI Club", "Science Fair"]
            }
        },
        {
            title: "Cybersecurity",
            icon: <Icons.Shield className="w-6 h-6 text-red-600" />,
            description: "Protect systems, networks, and data from digital attacks and unauthorized access.",
            color: "bg-red-50 border-red-100",
            textColor: "text-red-800",
            details: {
                ap: ["AP CSA", "AP CSP"],
                codecademy: ["Cybersecurity Path", "Linux", "Networks"],
                majors: ["Cybersecurity", "Information Security", "Computer Science"],
                jobs: ["Security Analyst", "Penetration Tester", "Security Engineer", "Cryptographer"],
                ecs: ["CTF Competitions (PicoCTF)", "CyberPatriot", "Ethical Hacking", "System Admin"]
            }
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gvcs-navy mb-4">Career Pathways</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore different directions your CS journey can take. We've curated roadmaps including courses, majors, and extracurriculars to help you get there.
                </p>
            </div>

            <div className="grid gap-8">
                {pathways.map((path, i) => (
                    <div key={i} className={`rounded-2xl border ${path.color.replace('bg-', 'border-')} overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow`}>
                        <div className={`p-6 ${path.color} border-b ${path.color.replace('bg-', 'border-')} flex items-start gap-4`}>
                            <div className="p-3 bg-white rounded-xl shadow-sm">
                                {path.icon}
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold ${path.textColor}`}>{path.title}</h3>
                                <p className="text-gray-600 mt-1">{path.description}</p>
                            </div>
                        </div>
                        <div className="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Icons.Book className="w-4 h-4 text-gray-400" /> Recommended APs
                                </h4>
                                <ul className="space-y-1">
                                    {path.details.ap.map((item, j) => (
                                        <li key={j} className="text-sm text-gray-600">• {item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Icons.Code className="w-4 h-4 text-gray-400" /> Codecademy
                                </h4>
                                <ul className="space-y-1">
                                    {path.details.codecademy.map((item, j) => (
                                        <li key={j} className="text-sm text-gray-600">• {item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Icons.GradCap className="w-4 h-4 text-gray-400" /> Majors & Jobs
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Majors</div>
                                        <ul className="space-y-1">
                                            {path.details.majors.map((item, j) => (
                                                <li key={j} className="text-sm text-gray-600">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Careers</div>
                                        <ul className="space-y-1">
                                            {path.details.jobs.map((item, j) => (
                                                <li key={j} className="text-sm text-gray-600">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Icons.Sparkles className="w-4 h-4 text-gray-400" /> Extracurriculars
                                </h4>
                                <ul className="space-y-1">
                                    {path.details.ecs.map((item, j) => (
                                        <li key={j} className="text-sm text-gray-600">• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Header = ({ user, onLoginClick, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <div className="w-8 h-8 bg-gvcs-navy rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
                        &lt;/&gt;
                    </div>
                    <span className="font-bold text-xl text-gvcs-navy tracking-tight">GVCS</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'Weekly', path: '/weekly' },
                        { name: 'Curriculum', path: '/ellis' },
                        { name: 'Hackathons', path: '/hackathons' },
                        { name: 'Careers', path: '/careers' },
                        { name: 'Resources', path: '/resources' }
                    ].map(item => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                            ${isActive(item.path)
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-gray-900">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Dashboard
                            </button>
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                {user.name[0]}
                            </div>
                            <button
                                onClick={onLogout}
                                className="text-xs text-red-500 hover:text-red-700 font-medium"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="px-5 py-2 bg-gvcs-navy text-white text-sm font-bold rounded-full hover:bg-blue-900 transition-all shadow-sm hover:shadow-md"
                        >
                            Student Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

const ClubWebsite = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const isAdminUser = session.user.email === 'admin@gvcs.com' ||
                    session.user.user_metadata?.isAdmin === true ||
                    session.user.user_metadata?.role === 'admin';
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || session.user.email,
                    email: session.user.email,
                    isDemo: session.user.user_metadata?.isDemo || false,
                    isAdmin: isAdminUser
                });
                setIsAdmin(isAdminUser);
            }
        };
        checkSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                const isAdminUser = session.user.email === 'admin@gvcs.com' ||
                    session.user.user_metadata?.isAdmin === true ||
                    session.user.user_metadata?.role === 'admin';
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || session.user.email,
                    email: session.user.email,
                    isDemo: session.user.user_metadata?.isDemo || false,
                    isAdmin: isAdminUser
                });
                setIsAdmin(isAdminUser);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleAdminAccess = () => {
        const code = prompt("Enter Admin Access Code:");
        if (code === "GVCS") {
            setIsAdmin(true);
            navigate('/admin');
        } else if (code) {
            alert("Incorrect Code");
        }
    };

    const handleExitAdmin = () => {
        setIsAdmin(false);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={(u) => {
                    setUser(u);
                    const isAdminUser = u.email === 'admin@gvcs.com' || u.isAdmin === true;
                    setIsAdmin(isAdminUser);
                }}
            />

            <Header
                user={user}
                onLoginClick={() => setIsLoginOpen(true)}
                onLogout={async () => {
                    await supabase.auth.signOut();
                    setUser(null);
                    navigate('/');
                }}
            />

            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/weekly" element={<WeeklyActivitiesView user={user} />} />
                    <Route path="/ellis/*" element={<EllisGenerator user={user} onLoginRequest={() => setIsLoginOpen(true)} />} />

                    <Route path="/hackathons" element={<HackathonHubView />} />
                    <Route path="/careers" element={<CareerPathwaysView />} />
                    <Route path="/archive" element={<MeetingArchiveView />} />
                    <Route path="/my-plans" element={<MyPlans user={user} />} />
                    <Route path="/dashboard" element={<Dashboard user={user} />} />
                    <Route path="/resources" element={<ResourcesView />} />
                    <Route path="/admin" element={
                        isAdmin ? <AdminMeetingView onExit={handleExitAdmin} /> : (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
                                    <button onClick={handleAdminAccess} className="mt-4 text-blue-600 underline">Try Again</button>
                                </div>
                            </div>
                        )
                    } />
                    <Route path="/admin-panel" element={
                        user?.isAdmin ? <AdminPanel user={user} onBack={() => navigate('/dashboard')} /> : (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
                                    <p className="text-gray-600 mt-2">Admin access required</p>
                                    <button onClick={() => navigate('/dashboard')} className="mt-4 text-blue-600 underline">Back to Dashboard</button>
                                </div>
                            </div>
                        )
                    } />
                </Routes>
            </div>

            <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-400 text-sm">
                <div className="mb-2">© {new Date().getFullYear()} GVCS Club</div>
                <div className="flex justify-center gap-4 mb-4">
                    <button onClick={() => navigate('/archive')} className="hover:text-gray-600">Meeting Archive</button>
                    <button onClick={() => navigate('/resources')} className="hover:text-gray-600">Resources</button>
                </div>
                <button
                    onClick={handleAdminAccess}
                    className="text-xs text-gray-300 hover:text-gray-500 transition-colors"
                >
                    Admin Access
                </button>
            </footer>
        </div>
    );
};

export default ClubWebsite;
