import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { logCheatingFlagWithContext } from '../../utils/cheatingDetection';

const AcademicTestSection = ({ week, weekIndex, course, onUpdateCourse }) => {
    const [testAnswers, setTestAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [testHistory, setTestHistory] = useState(week.submissions?.academic?.history || []);
    const [testStartTime, setTestStartTime] = useState(null);
    const currentSubmission = week.submissions?.academic;

    // Track test start time
    useEffect(() => {
        if (quizStarted && !testStartTime) {
            setTestStartTime(Date.now());
        }
    }, [quizStarted, testStartTime]);

    const generateTestQuestions = (week) => {
        const questions = {
            "Asymptotic Analysis: Big-O Notation": {
                mcq: [
                    { id: 'q1', question: "What is the time complexity of the following code snippet?\n\n```python\nfor i in range(n):\n    for j in range(i):\n        print(i, j)\n```", type: 'mcq', options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(2ⁿ)'], correct: 1, points: 2 },
                    { id: 'q2', question: "What is the time complexity of accessing an element in an array by index?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 0, points: 2 },
                    { id: 'q3', question: "Which of the following best describes Big-O notation?", type: 'mcq', options: ['Exact runtime', 'Upper bound on growth rate', 'Lower bound on growth rate', 'Average case complexity'], correct: 1, points: 2 },
                    { id: 'q4', question: "What is the time complexity of binary search on a sorted array?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correct: 2, points: 2 },
                    { id: 'q5', question: "What is the space complexity of merge sort?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correct: 1, points: 2 },
                    { id: 'q6', question: "Which sorting algorithm has the best average time complexity?", type: 'mcq', options: ['Bubble sort', 'Insertion sort', 'Quick sort', 'Selection sort'], correct: 2, points: 2 },
                    { id: 'q7', question: "What is the time complexity of finding an element in an unsorted array?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 2, points: 2 },
                    { id: 'q8', question: "Which data structure allows O(1) average time complexity for insert, delete, and search?", type: 'mcq', options: ['Array', 'Linked List', 'Hash Table', 'Binary Search Tree'], correct: 2, points: 2 },
                    { id: 'q9', question: "What is the time complexity of the following operation: finding the maximum element in an unsorted array?", type: 'mcq', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct: 2, points: 2 },
                    { id: 'q10', question: "Which notation describes the tight bound (both upper and lower bound)?", type: 'mcq', options: ['Big-O', 'Big-Ω (Omega)', 'Big-Θ (Theta)', 'Little-o'], correct: 2, points: 2 }
                ],
                fillblank: [
                    { id: 'q11', question: "The time complexity of binary search is O(___).", type: 'fillblank', points: 3 },
                    { id: 'q12', question: "Big-O notation describes the ___ bound on the growth rate of an algorithm.", type: 'fillblank', points: 2 }
                ],
                saq: [
                    { id: 'q13', question: "Explain the difference between Big-O, Big-Θ (Theta), and Big-Ω (Omega) notation. Provide an example for each.", type: 'text', points: 15 },
                    { id: 'q14', question: "Analyze the time complexity of binary search. Show your work step-by-step and explain why it is O(log n).", type: 'text', points: 15 }
                ]
            },
            "Linear Structures: Dynamic Arrays and Linked Lists": {
                mcq: [
                    { id: 'q1', question: "What is the time complexity of inserting an element at the beginning of a dynamic array?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 1, points: 2 },
                    { id: 'q2', question: "What is the time complexity of inserting an element at the beginning of a linked list?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 0, points: 2 },
                    { id: 'q3', question: "What is the amortized time complexity of appending to a dynamic array?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correct: 0, points: 2 },
                    { id: 'q4', question: "Which data structure uses contiguous memory allocation?", type: 'mcq', options: ['Linked List', 'Dynamic Array', 'Both', 'Neither'], correct: 1, points: 2 },
                    { id: 'q5', question: "What happens when a dynamic array needs to grow beyond its current capacity?", type: 'mcq', options: ['It fails', 'It automatically resizes', 'It overwrites existing elements', 'It uses linked list internally'], correct: 1, points: 2 },
                    { id: 'q6', question: "What is the time complexity of accessing an element by index in a linked list?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 1, points: 2 },
                    { id: 'q7', question: "Which operation is more efficient in a dynamic array compared to a linked list?", type: 'mcq', options: ['Insertion at beginning', 'Random access by index', 'Deletion at beginning', 'All of the above'], correct: 1, points: 2 },
                    { id: 'q8', question: "What is the typical resizing strategy for dynamic arrays?", type: 'mcq', options: ['Add 1 element', 'Double the size', 'Triple the size', 'Add 10 elements'], correct: 1, points: 2 },
                    { id: 'q9', question: "Which data structure has better cache locality?", type: 'mcq', options: ['Linked List', 'Dynamic Array', 'Both are equal', 'Depends on implementation'], correct: 1, points: 2 },
                    { id: 'q10', question: "What is the space overhead per element in a linked list (assuming pointers)?", type: 'mcq', options: ['O(1)', 'O(n)', 'O(log n)', 'Depends on data size'], correct: 0, points: 2 }
                ],
                fillblank: [
                    { id: 'q11', question: "Inserting an element at the beginning of a dynamic array has time complexity O(___).", type: 'fillblank', points: 2 },
                    { id: 'q12', question: "The amortized time complexity of appending to a dynamic array is O(___).", type: 'fillblank', points: 2 }
                ],
                saq: [
                    { id: 'q13', question: "Describe the resizing strategy for dynamic arrays. What happens when the array needs to grow? What is the amortized time complexity?", type: 'text', points: 15 },
                    { id: 'q14', question: "Compare the space complexity of arrays vs linked lists. Include overhead in your analysis. When would you choose a dynamic array over a linked list?", type: 'text', points: 15 }
                ]
            }
        };

        const topicQuestions = questions[week.topic];
        if (topicQuestions) {
            return [...topicQuestions.mcq, ...(topicQuestions.fillblank || []), ...topicQuestions.saq];
        }

        return [
            { id: 'q1', question: `Explain the key concepts covered in "${week.topic}". Provide examples.`, type: 'text', points: 25 },
            { id: 'q2', question: `Analyze the time and space complexity of the main algorithms/data structures in "${week.topic}".`, type: 'text', points: 25 }
        ];
    };

    const questions = generateTestQuestions(week);
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const mcqQuestions = questions.filter(q => q.type === 'mcq');
    const saqQuestions = questions.filter(q => q.type === 'text');

    // Calculate score from answers
    const calculateScore = (answers, questions) => {
        let score = 0;
        questions.forEach(q => {
            if (q.type === 'mcq') {
                if (answers[q.id] === q.correct) {
                    score += q.points;
                }
            } else if (q.type === 'fillblank') {
                // Simple keyword matching for fill-in-the-blank
                const answer = (answers[q.id] || '').toLowerCase().trim();
                const correctAnswers = q.correctAnswers || [q.correctAnswer?.toLowerCase().trim()].filter(Boolean);
                if (correctAnswers.some(correct => answer.includes(correct) || correct.includes(answer))) {
                    score += q.points;
                }
            } else {
                // SAQ - give partial credit (will need manual grading, but auto-give 50% for now)
                if (answers[q.id] && answers[q.id].length > 20) {
                    score += Math.floor(q.points * 0.5);
                }
            }
        });
        return score;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const questions = generateTestQuestions(week);
        const score = calculateScore(testAnswers, questions);
        const percentage = Math.round((score / totalPoints) * 100);
        const grade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : 'D';

        const submission = {
            answers: testAnswers,
            submittedDate: new Date().toISOString(),
            score: score,
            totalPoints: totalPoints,
            percentage: percentage,
            grade: grade
        };

        // Save to test_attempts table
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await supabase
                    .from('test_attempts')
                    .insert({
                        user_id: user.id,
                        course_id: course.courseId || course.course_id,
                        week: week.week,
                        answers: testAnswers,
                        score: score,
                        total_points: totalPoints,
                        percentage: percentage
                    });
            }
        } catch (error) {
            console.error('Error saving test attempt:', error);
        }

        // Track time spent (if available)
        if (testStartTime) {
            const timeSpent = Date.now() - testStartTime;
            // Log suspicious timing if too fast
            if (timeSpent < 60000) { // Less than 1 minute for entire test
                logCheatingFlagWithContext(
                    course.courseId || course.course_id,
                    week.week,
                    'academic',
                    'suspicious_timing',
                    { time_spent_ms: timeSpent, total_questions: questions.length },
                    'high'
                );
            }
        }

        const updated = { ...course };
        if (!updated.weeks[weekIndex].submissions) {
            updated.weeks[weekIndex].submissions = { builder: null, academic: null, communicator: null };
        }

        // Keep only the highest score in submissions.academic
        const currentBest = updated.weeks[weekIndex].submissions.academic;
        const newHistory = [...testHistory, submission];
        
        if (!currentBest || score > (currentBest.score || 0)) {
            updated.weeks[weekIndex].submissions.academic = {
                ...submission,
                history: newHistory
            };
        } else {
            // Update history but keep best score
            updated.weeks[weekIndex].submissions.academic = {
                ...currentBest,
                history: newHistory
            };
        }

        setTestHistory(newHistory);
        onUpdateCourse(updated);
        setIsSubmitting(false);
        setQuizStarted(false);
        setTestAnswers({});
        setTestStartTime(null);
        alert(`Test submitted! Score: ${score}/${totalPoints} (${grade}). Note: Only your highest score counts, but all attempts are saved for review.`);
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

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-800">
                        <strong>Current Best Score:</strong> {currentSubmission.score}/{currentSubmission.totalPoints} ({currentSubmission.grade})
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                        You can retake this test to improve your score. Only your highest score counts.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => setShowHistory(true)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200">
                        View History ({testHistory.length} attempts)
                    </button>
                    <button onClick={() => { setQuizStarted(true); setTestAnswers({}); }} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
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
                    <button onClick={() => setShowHistory(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200">Back</button>
                </div>

                <div className="space-y-4">
                    {testHistory.map((attempt, attemptIdx) => (
                        <div key={attemptIdx} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className="font-bold text-gray-800">Attempt #{testHistory.length - attemptIdx}</h4>
                                    <p className="text-sm text-gray-600">{new Date(attempt.submittedDate).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-gray-800">{attempt.score}/{attempt.totalPoints} ({attempt.grade})</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={() => { setQuizStarted(true); setShowHistory(false); setTestAnswers({}); }} className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                    Start New Attempt
                </button>
            </div>
        );
    }

    if (!quizStarted) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{week.deliverables?.academic?.title || 'Academic Assessment'}</h3>
                    <p className="text-sm text-gray-600 mb-4">{week.deliverables?.academic?.description || 'Complete this assessment to demonstrate your understanding.'}</p>

                    {week.deliverables?.academic?.guidelines && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                            <h4 className="font-semibold text-purple-900 mb-2">Assessment Guidelines:</h4>
                            <ol className="text-sm text-purple-800 space-y-2 list-decimal list-inside">
                                {week.deliverables.academic.guidelines.map((g, i) => (<li key={i} className="ml-2">{g}</li>))}
                            </ol>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                        <strong>Total Points:</strong> {totalPoints} | <strong>Time Limit:</strong> None | <strong>Attempts:</strong> Unlimited
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Format:</strong> {mcqQuestions.length} MCQ | {questions.filter(q => q.type === 'fillblank').length} Fill-in-Blank | {saqQuestions.length} SAQ
                    </p>
                </div>

                <button onClick={() => setQuizStarted(true)} className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700">Take Quiz</button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{week.deliverables?.academic?.title || 'Academic Assessment'}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                        <strong>Note:</strong> You can take this test multiple times. Only your <strong>highest score</strong> will count toward your grade, but all attempts are saved for review.
                    </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600"><strong>Total Points:</strong> {totalPoints}</p>
                </div>

                {questions.map((q, idx) => (
                    <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-gray-800">Question {idx + 1}</h4>
                            <span className="text-sm text-gray-500">{q.points} points</span>
                        </div>
                        <div className="mb-3">
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">{q.question}</pre>
                        </div>
                        {q.type === 'mcq' ? (
                            <div className="space-y-2">
                                {q.options.map((option, optIdx) => (
                                    <label key={optIdx} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                                        <input type="radio" name={q.id} value={optIdx} checked={testAnswers[q.id] === optIdx} onChange={(e) => setTestAnswers({ ...testAnswers, [q.id]: parseInt(e.target.value) })} className="w-4 h-4" required />
                                        <span className="text-sm text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        ) : q.type === 'fillblank' ? (
                            <input type="text" value={testAnswers[q.id] || ''} onChange={(e) => setTestAnswers({ ...testAnswers, [q.id]: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Your answer..." required />
                        ) : (
                            <textarea value={testAnswers[q.id] || ''} onChange={(e) => setTestAnswers({ ...testAnswers, [q.id]: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg" rows="6" placeholder="Type your answer here..." required />
                        )}
                    </div>
                ))}

                <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Submit Test'}
                </button>
            </form>
        </div>
    );
};

export default AcademicTestSection;
