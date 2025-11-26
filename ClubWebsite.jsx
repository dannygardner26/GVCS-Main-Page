import React, { useState, useEffect } from 'react';
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
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CURRICULUM_DATA } from './CurriculumData';

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

// --- Icons ---
const Icons = {
    Clock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
    Location: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
    Book: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>,
    Code: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>,
    Chat: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>,
    Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>,
    Sparkles: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>,
    Brain: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>,
    Lightbulb: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>,
    ArrowRight: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>,
    Link: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
};

// --- Data Layer ---

const mockDb = {
    daily_problems: [],
    problem_stats: {}
};

const DAILY_PROBLEMS_POOL = [
    {
        usaco: { title: "Teleportation", difficulty: "Bronze", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=807" },
        leetcode: { title: "Two Sum", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/" }
    },
    {
        usaco: { title: "Word Processor", difficulty: "Bronze", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=987" },
        leetcode: { title: "Valid Parentheses", difficulty: "Easy", url: "https://leetcode.com/problems/valid-parentheses/" }
    },
    {
        usaco: { title: "Bucket List", difficulty: "Bronze", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=855" },
        leetcode: { title: "Merge Two Sorted Lists", difficulty: "Easy", url: "https://leetcode.com/problems/merge-two-sorted-lists/" }
    },
    {
        usaco: { title: "Mixing Milk", difficulty: "Bronze", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=855" },
        leetcode: { title: "Best Time to Buy and Sell Stock", difficulty: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" }
    },
    {
        usaco: { title: "Cow Signal", difficulty: "Bronze", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=665" },
        leetcode: { title: "Valid Palindrome", difficulty: "Easy", url: "https://leetcode.com/problems/valid-palindrome/" }
    }
];

const useDailyProblem = () => {
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [completionCount, setCompletionCount] = useState(0);

    useEffect(() => {
        // Deterministic daily problem based on date
        const today = new Date();
        const index = (today.getDate() + today.getMonth() * 31) % DAILY_PROBLEMS_POOL.length;
        const daily = DAILY_PROBLEMS_POOL[index];

        // Simulate loading
        setTimeout(() => {
            setProblem({ id: `daily-${index}`, ...daily });
            const isDone = localStorage.getItem(`gvcs_completed_daily-${index}`) === 'true';
            setCompleted(isDone);
            setLoading(false);
        }, 500);

    }, []);

    const markDone = async () => {
        if (!problem) return;
        setCompleted(true);
        localStorage.setItem(`gvcs_completed_${problem.id}`, 'true');
    };

    return { problem, loading, completed, completionCount, markDone };
};

const useAdminProblems = () => {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        if (IS_MOCK) {
            const fetchMock = () => {
                const sorted = [...mockDb.daily_problems].sort((a, b) => b.date - a.date).slice(0, 5);
                const withStats = sorted.map(p => ({
                    ...p,
                    solveCount: mockDb.problem_stats[p.id] || 0
                }));
                setProblems(withStats);
            };
            fetchMock();
            const interval = setInterval(fetchMock, 1000);
            return () => clearInterval(interval);
        }

        const q = query(collection(db, `${DATA_PATH}/daily_problems`), orderBy('date', 'desc'), limit(5));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const probs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProblems(probs);
        });
        return () => unsubscribe();
    }, []);

    const seedData = async () => {
        const mockProblems = [
            { title: "Milk Pails", concept: "Brute Force", link: "http://www.usaco.org/index.php?page=viewproblem2&cpid=615" },
            { title: "Diamond Collector", concept: "Sorting", link: "http://www.usaco.org/index.php?page=viewproblem2&cpid=639" },
            { title: "Cow Gymnastics", concept: "Consistency Search", link: "http://www.usaco.org/index.php?page=viewproblem2&cpid=963" },
            { title: "Blocked Billboard", concept: "Geometry", link: "http://www.usaco.org/index.php?page=viewproblem2&cpid=759" },
            { title: "Shell Game", concept: "Simulation", link: "http://www.usaco.org/index.php?page=viewproblem2&cpid=891" },
        ];

        if (IS_MOCK) {
            mockProblems.forEach((p, i) => {
                const id = "mock-prob-" + Date.now() + i;
                mockDb.daily_problems.push({
                    id,
                    ...p,
                    date: new Date(Date.now() - i * 86400000),
                    solutionLink: "#"
                });
                mockDb.problem_stats[id] = Math.floor(Math.random() * 15);
            });
            alert("Seeded 5 mock problems!");
            return;
        }

        for (const p of mockProblems) {
            await addDoc(collection(db, `${DATA_PATH}/daily_problems`), {
                ...p,
                date: serverTimestamp(),
                solutionLink: "#",
                solveCount: Math.floor(Math.random() * 5)
            });
        }
        alert("Seeded 5 mock problems!");
    };

    return { problems, seedData };
};

// --- Components ---

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-fade-in">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100">
                <h2 className="text-2xl font-bold text-gvcs-navy mb-2">Student Login</h2>
                <p className="text-gray-500 mb-6">Access your saved plans and track progress.</p>

                <div className="space-y-4">
                    <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />

                    <button className="w-full py-3 bg-gvcs-navy text-white rounded-lg font-bold hover:bg-blue-900 transition-colors">
                        Sign In
                    </button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or</span></div>
                    </div>

                    <button
                        onClick={() => {
                            onLogin({ name: "Demo Student", email: "demo@gvcs.edu", isDemo: true });
                            onClose();
                        }}
                        className="w-full py-3 bg-green-50 text-green-700 border border-green-200 rounded-lg font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                    >
                        <Icons.Sparkles /> Try Demo Account
                    </button>
                </div>

                <button onClick={onClose} className="mt-6 text-sm text-gray-500 hover:text-gray-800 w-full text-center">
                    Cancel
                </button>
            </div>
        </div>
    );
};

const Header = ({ currentView, onViewChange, user, onLoginClick, onLogout }) => {
    const tabs = [
        { id: 'home', label: 'Home' },
        { id: 'ellis', label: 'Ellis Generator' },
        { id: 'resources', label: 'Resources' },
        ...(user ? [{ id: 'my-plans', label: 'My Plans' }] : [])
    ];

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('home')}>
                    <img src="/images/logo.png" alt="GV Logo" className="h-10 w-auto" />
                    <span className="font-bold text-gray-800 text-lg hidden sm:block">CS Club</span>
                </div>

                <div className="flex items-center gap-6">
                    <nav className="flex h-full">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => onViewChange(tab.id)}
                                className={`px-4 h-16 text-sm font-medium transition-colors border-b-2 
                    ${currentView === tab.id
                                        ? 'border-gvcs-navy text-gvcs-navy'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    {user ? (
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <div className="text-xs text-gray-500">Welcome back,</div>
                                <div className="text-sm font-bold text-gvcs-navy">{user.name}</div>
                            </div>
                            <button onClick={onLogout} className="text-xs text-red-500 hover:underline">Logout</button>
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="px-5 py-2 bg-gvcs-navy text-white text-sm font-bold rounded-full hover:bg-blue-900 transition-colors shadow-sm"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

const DailyProblemSidebar = () => {
    const { problem, loading, completed, markDone } = useDailyProblem();

    if (loading) return <div className="animate-pulse h-32 bg-gray-100 rounded-xl"></div>;

    if (!problem) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="text-gray-400 mb-2 mx-auto flex justify-center"><Icons.Sparkles /></div>
                <h3 className="font-bold text-gray-800 mb-1">No Active Problem</h3>
                <p className="text-xs text-gray-500">Check back later!</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gvcs-navy px-4 py-3">
                <h3 className="text-white font-bold text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Daily Challenge
                </h3>
            </div>

            {/* USACO Problem */}
            <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 line-clamp-1">{problem.usaco.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-1 rounded whitespace-nowrap">
                        USACO {problem.usaco.difficulty}
                    </span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{problem.usaco.concept}</p>
                <a
                    href={problem.usaco.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Open USACO Problem ↗
                </a>
            </div>

            {/* LeetCode Problem */}
            <div className="p-5 bg-gray-50/50">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 line-clamp-1">{problem.leetcode.title}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded whitespace-nowrap
                        ${problem.leetcode.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            problem.leetcode.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {problem.leetcode.difficulty}
                    </span>
                </div>
                <a
                    href={problem.leetcode.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-3"
                >
                    Open LeetCode ↗
                </a>

                <button
                    onClick={markDone}
                    disabled={completed}
                    className={`block w-full py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2
            ${completed
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-gvcs-gold text-gvcs-navy hover:bg-yellow-400'
                        }`}
                >
                    {completed ? <><Icons.Check /> Completed Daily Set</> : "Mark Set Complete"}
                </button>
            </div>
        </div>
    );
};

const EventList = () => {
    const events = [
        { date: "Dec 15", name: "USACO December Contest", type: "Online", tag: "Major" },
        { date: "Jan 26", name: "USACO January Contest", type: "Online", tag: "Major" },
        { date: "Feb 16", name: "USACO February Contest", type: "Online", tag: "Major" },
        { date: "Mar 15", name: "Lockheed Martin CodeQuest", type: "In-Person", tag: "Trip" },
        { date: "Mar 23", name: "USACO US Open", type: "Online", tag: "Major" },
        { date: "Apr 12", name: "Local Hackathon", type: "Hybrid", tag: "Fun" },
        { date: "May 05", name: "AP Computer Science A Exam", type: "Exam", tag: "School" },
    ];

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
                            <h4 className="text-sm font-bold text-gray-900">{e.name}</h4>
                            <div className="flex gap-2 mt-1">
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{e.type}</span>
                                {e.tag === 'Major' && <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded">Critical</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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

            const prompt = `
        ${profile}
        
        Based on this student's profile and their past studies (avoid duplicates), suggest 3 DISTINCT independent study project ideas.
        
        Return ONLY a raw JSON array of objects (no markdown) with this structure:
        [
          {
            "title": "Project Title",
            "description": "A 2-sentence description of what they will build.",
            "difficulty": "Beginner/Intermediate/Advanced",
            "tags": ["Tag1", "Tag2"],
            "assessmentType": "project" // or "exam" if it is a theoretical course
          },
          ...
        ]
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const ideas = JSON.parse(cleanJson);



            // Logic: If Math interest is high (>= 8), inject DSA course
            if (interestScores.math >= 8) {
                ideas.unshift({
                    title: "Data Structures & Algorithms",
                    description: "Master the fundamental building blocks of computer science. Learn arrays, linked lists, trees, graphs, and sorting algorithms.",
                    difficulty: "Advanced",
                    tags: ["CS Theory", "Math", "Algorithms"],
                    assessmentType: "exam"
                });
                // Keep only 3 ideas if we added one, or maybe 4 is fine. Let's keep it to 3 distinct ones + DSA if applicable, or just add it to the top.
                // The user asked for 3 distinct ideas. Let's just slice to 3 if we want to be strict, or let it be 4. 
                // Let's keep it as an extra option if they really like math.
            }

            setGeneratedIdeas(ideas);
            setMode('ideas_selection');

        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("Failed to generate ideas. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const generatePlanFromIdea = async (selectedIdea) => {
        setIsGenerating(true);
        setTopic(selectedIdea.title);
        setLevel(selectedIdea.difficulty);

        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `
        Generate a 9-week independent study plan for a high school student building: "${selectedIdea.title}".
        Description: ${selectedIdea.description}
        
        CRITICAL REQUIREMENT: All resources MUST be 100% FREE.
        - Prioritize high-quality YouTube playlists/videos.
        - Use official free documentation (MDN, Unity Docs, etc.).
        - NO paid courses (Udemy, Coursera paid tiers, etc.).
        
        Assessment Type: ${selectedIdea.assessmentType || 'project'}
        If Assessment Type is "exam":
        - The final week (Week 9) MUST be a "Final Exam" or "End of Unit Test".
        - Deliverables for other weeks should include "Practice Problems" or "Mini-quizzes" where appropriate.
        If Assessment Type is "project":
        - The final week MUST be a "Final Project Submission".
        
        
        Return ONLY a raw JSON object (no markdown) with this structure:
        {
          "topic": "${selectedIdea.title}",
          "level": "${selectedIdea.difficulty}",
          "plan": [
            {
              "week": 1,
              "target": "Learning Goal",
              "deliverable": "What to build",
              "resource": "Real URL to a FREE resource (YouTube/Docs)"
            },
            ... (9 weeks total)
          ]
        }
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const data = JSON.parse(cleanJson);

            setPlan(data.plan);
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

            const prompt = `
        Generate a 9-week independent study plan for a high school student learning "${topic}".
        
        CRITICAL REQUIREMENT: All resources MUST be 100% FREE.
        - Prioritize high-quality YouTube playlists/videos.
        - Use official free documentation.
        - NO paid courses.

        Return ONLY a raw JSON array of objects (no markdown).
        Each object must have:
        - "week" (number)
        - "target" (string, learning goal)
        - "deliverable" (string, what they build/show)
        - "resource" (string, a real URL to a FREE resource)
      `;

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

    if (mode === 'results' && plan) {
        return (
            <div className="max-w-4xl mx-auto p-6 animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={reset} className="text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1">
                        <Icons.ArrowRight /> Back to Generator
                    </button>
                    <button onClick={savePlan} className="px-4 py-2 bg-gvcs-navy text-white text-sm font-bold rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-2">
                        <Icons.Book /> Save Plan
                    </button>
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
                                    <th className="px-6 py-3 font-semibold">Deliverable</th>
                                    <th className="px-6 py-3 font-semibold">Resource (Free)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {plan.map((week) => (
                                    <tr key={week.week} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm text-gray-500">Week {week.week}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{week.target}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <span className="inline-block px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-bold border border-green-100">
                                                {week.deliverable}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-blue-600 hover:underline cursor-pointer max-w-xs truncate">
                                            <a href={week.resource} target="_blank" rel="noopener noreferrer">
                                                {week.resource}
                                            </a>
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
                                onClick={() => generatePlanFromIdea(idea)}
                                disabled={isGenerating}
                                className="w-full py-2 bg-gvcs-navy text-white rounded-lg font-bold hover:bg-blue-900 transition-colors flex justify-center items-center gap-2"
                            >
                                {isGenerating ? "Generating..." : "Select This Project"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (mode === 'browse') {
        return (
            <div className="max-w-6xl mx-auto p-6 animate-fade-in-up">
                <button onClick={() => setMode('select')} className="mb-6 text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1">
                    <Icons.ArrowRight /> Back to Selection
                </button>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gvcs-navy mb-2">Explore Our Curriculum</h2>
                    <p className="text-gray-600">Browse pre-designed courses with week-by-week plans.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(CURRICULUM_DATA).map(([courseName, courseData]) => (
                        <div key={courseName} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all flex flex-col">
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {courseData.prereqs && courseData.prereqs.length > 0 ? (
                                        courseData.prereqs.map(p => (
                                            <span key={p} className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                Req: {p}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 px-2 py-1 rounded">
                                            No Prerequisites
                                        </span>
                                    )}
                                </div>
                                <h4 className="text-xl font-bold text-gvcs-navy mb-2">{courseName}</h4>
                                <p className="text-sm text-gray-600">{courseData.description}</p>
                            </div>

                            <div className="flex-grow mb-4">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">9-Week Plan</p>
                                <p className="text-xs text-gray-500">{courseData.weeks.length} weeks of structured learning</p>
                            </div>

                            <button
                                onClick={() => {
                                    setPlan({
                                        title: courseName,
                                        description: courseData.description,
                                        weeks: courseData.weeks,
                                        ellis_activities: courseData.ellis_activities
                                    });
                                    setMode('results');
                                }}
                                className="w-full py-2 bg-white border-2 border-gvcs-navy text-gvcs-navy rounded-lg font-bold hover:bg-gvcs-navy hover:text-white transition-colors"
                            >
                                View Full Plan
                            </button>
                        </div>
                    ))}
                </div>
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
                    <Icons.Brain /> Ellis Independent Study Generator
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

const HomeView = ({ onViewChange }) => {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="relative h-[500px] w-full overflow-hidden mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-gvcs-navy/90 to-blue-900/80 z-10"></div>
                <img
                    src="/images/hero.jpg"
                    alt="GVCS Club"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
                    <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
                        🚀 The Future of Coding is Here
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                        Code. Create. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            Compete.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-200 max-w-xl mb-8 leading-relaxed">
                        Join the Garnet Valley Computer Science Club. We build apps, solve complex algorithms, and win hackathons.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => onViewChange('ellis')}
                            className="bg-white text-gvcs-navy px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Start Learning
                        </button>
                        <button className="px-8 py-3.5 rounded-xl font-bold text-white border-2 border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm">
                            View Schedule
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">
                {/* Quick Stats / Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 -mt-24 relative z-30 mb-16">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform hover:-translate-y-1 transition-all">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <Icons.Clock />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Weekly Meetings</h3>
                        <p className="text-gray-500 text-sm">Tuesdays @ 3:00 PM in Room 101. Come code with us!</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform hover:-translate-y-1 transition-all">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <Icons.Code />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Daily Challenges</h3>
                        <p className="text-gray-500 text-sm">Sharpen your skills with a new algorithmic problem every day.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform hover:-translate-y-1 transition-all">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                            <Icons.Sparkles />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Hackathons</h3>
                        <p className="text-gray-500 text-sm">Team up and build amazing projects in 24-hour sprints.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Featured Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gvcs-navy flex items-center gap-2">
                                    <Icons.Sparkles /> What We Do
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group relative overflow-hidden rounded-2xl h-64 shadow-md cursor-pointer">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                    <img src="/images/gallery1.jpg" alt="Projects" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                                        <h3 className="font-bold text-xl mb-1">Student Projects</h3>
                                        <p className="text-sm text-gray-300">From web apps to robotics, see what our members are building.</p>
                                    </div>
                                </div>
                                <div className="group relative overflow-hidden rounded-2xl h-64 shadow-md cursor-pointer">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                    <img src="/images/gallery2.jpg" alt="Competitions" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
                                        <h3 className="font-bold text-xl mb-1">Competitions</h3>
                                        <p className="text-sm text-gray-300">We compete in USACO, CodeQuest, and local hackathons.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Events Section */}
                        <section>
                            <EventList />
                        </section>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">
                        <DailyProblemSidebar />

                        {/* Join Discord Widget */}
                        <div className="bg-[#5865F2] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:bg-[#4752C4] transition-colors">
                            <div className="relative z-10">
                                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                                    <Icons.Chat /> Join the Discord
                                </h3>
                                <p className="text-blue-100 text-sm mb-4">Get help, share memes, and hang out with other members.</p>
                                <button className="bg-white text-[#5865F2] px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
                                    Connect Now
                                </button>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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

// --- Main App Component ---

const ClubWebsite = () => {
    const [currentView, setCurrentView] = useState('home');
    const [user, setUser] = useState(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleAdminAccess = () => {
        const code = prompt("Enter Admin Access Code:");
        if (code === "GVCS") {
            setIsAdmin(true);
            setCurrentView('admin');
        } else if (code) {
            alert("Incorrect Code");
        }
    };

    const handleExitAdmin = () => {
        setIsAdmin(false);
        setCurrentView('home');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={(u) => setUser(u)}
            />

            <Header
                currentView={currentView}
                onViewChange={setCurrentView}
                user={user}
                onLoginClick={() => setIsLoginOpen(true)}
                onLogout={() => { setUser(null); setCurrentView('home'); }}
            />

            <div className="flex-grow">
                {currentView === 'home' && <HomeView onViewChange={setCurrentView} />}
                {currentView === 'ellis' && <EllisGenerator user={user} onLoginRequest={() => setIsLoginOpen(true)} />}
                {currentView === 'my-plans' && <MyPlans user={user} />}
                {currentView === 'resources' && <ResourcesView />}
                {currentView === 'admin' && isAdmin && <AdminMeetingView onExit={handleExitAdmin} />}
                {currentView === 'admin' && !isAdmin && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
                            <button onClick={handleAdminAccess} className="mt-4 text-blue-600 underline">Try Again</button>
                        </div>
                    </div>
                )}
            </div>

            <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-400 text-sm">
                <div className="mb-2">© {new Date().getFullYear()} GVCS Club</div>
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
