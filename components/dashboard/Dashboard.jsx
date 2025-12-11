import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { supabase } from '../../utils/supabase';
import { getSchoolDayNumber } from '../../utils/schoolDays';
import { CURRICULUM_DATA } from '../../CurriculumData';
import { LEETCODE_POOL, USACO_POOL } from '../../ChallengeData';
import { Icons } from '../common/Icons';
import HackathonProgramView from '../hackathon/HackathonProgramView';
import AccountInfoSection from './AccountInfoSection';
import HackathonsSection from './HackathonsSection';
import WeekDetailView from './WeekDetailView';
import InteractiveWeekView from './InteractiveWeekView';

const Dashboard = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { showNotification, showConfirm } = useNotification();
    const [weeklyProgress, setWeeklyProgress] = useState(null);
    const [weeklyHistory, setWeeklyHistory] = useState([]);
    const [isWeeklyProgressExpanded, setIsWeeklyProgressExpanded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [hackathons, setHackathons] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedHackathon, setSelectedHackathon] = useState(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [expandedWeek, setExpandedWeek] = useState(null);
    
    // Check if user is Ellis (teacher)
    const isEllis = user?.email === 'ellis@gvsd.org' || user?.isTeacher;

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
        // Check for showHistory query param
        const params = new URLSearchParams(location.search);
        if (params.get('showHistory') === 'true') {
            setIsWeeklyProgressExpanded(true);
        }
    }, [user, location.search]);

    const fetchDashboardData = async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            // Fetch courses - if Ellis (teacher), fetch all courses; otherwise just user's courses
            const isEllis = user.email === 'ellis@gvsd.org' || user.isTeacher;
            let coursesQuery;
            
            if (isEllis) {
                // For Ellis, fetch all courses
                coursesQuery = supabase
                    .from('user_courses')
                    .select('*')
                    .order('created_at', { ascending: false });
            } else {
                // For regular users, just fetch their own courses
                coursesQuery = supabase
                    .from('user_courses')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });
            }
            
            const { data: coursesData, error: coursesError } = await coursesQuery;

            if (coursesError) throw coursesError;

            // If Ellis, fetch user profiles separately and match them
            let userProfilesMap = {};
            if (isEllis && coursesData && coursesData.length > 0) {
                const userIds = [...new Set(coursesData.map(c => c.user_id))];
                const { data: profilesData, error: profilesError } = await supabase
                    .from('user_profiles')
                    .select('user_id, display_name')
                    .in('user_id', userIds);
                
                if (!profilesError && profilesData) {
                    profilesData.forEach(profile => {
                        userProfilesMap[profile.user_id] = profile;
                    });
                }
            }

            // Merge database user progress with global curriculum data
            const transformedCourses = (coursesData || []).map(course => {
                const globalCourse = CURRICULUM_DATA[course.course_id] || {};
                const userProfile = userProfilesMap[course.user_id];

                if (!globalCourse || Object.keys(globalCourse).length === 0) {
                    return {
                        id: course.id,
                        courseTitle: course.course_title,
                        courseId: course.course_id,
                        addedDate: course.created_at,
                        weeks: (course.weeks || []).map(week => ({
                            ...week,
                            selectedActivity: week.selected_activity || week.selectedActivity || null
                        })),
                        progress: calculateCourseProgress(course.weeks || []),
                        mit_anchor: null,
                        // If Ellis is viewing, include student info
                        ...(isEllis ? {
                            studentName: userProfile?.display_name || 'Unknown Student',
                            studentId: course.user_id
                        } : {})
                    };
                }

                const userProgressByWeek = {};
                (course.weeks || []).forEach(progress => {
                    userProgressByWeek[progress.week] = progress;
                });

                const mergedWeeks = globalCourse.weeks.map(globalWeek => {
                    const userProgress = userProgressByWeek[globalWeek.week] || {};
                    return {
                        ...globalWeek,
                        selected_activity: userProgress.selected_activity || null,
                        selectedActivity: userProgress.selected_activity || userProgress.selectedActivity || null,
                        submissions: userProgress.submissions || {
                            builder: null,
                            academic: null,
                            communicator: null
                        }
                    };
                });

                return {
                    id: course.id,
                    courseTitle: course.course_title,
                    courseId: course.course_id,
                    addedDate: course.created_at,
                    weeks: mergedWeeks,
                    progress: calculateCourseProgress(mergedWeeks),
                    description: globalCourse.description,
                    prereqs: globalCourse.prereqs || [],
                    tier: globalCourse.tier,
                    mit_anchor: globalCourse.mit_anchor || null,
                    // If Ellis is viewing, include student info
                    ...(isEllis ? {
                        studentName: userProfilesMap[course.user_id]?.display_name || 'Unknown Student',
                        studentId: course.user_id
                    } : {})
                };
            });

            setCourses(transformedCourses);

            // Fetch weekly progress
            const currentWeek = Math.floor((getSchoolDayNumber(new Date()) - 1) / 5) + 1;
            const currentYear = new Date().getFullYear();
            const { data: weeklyData, error: weeklyError } = await supabase
                .from('weekly_activities')
                .select('*')
                .eq('user_id', user.id)
                .eq('week_number', currentWeek)
                .eq('school_year', currentYear);

            if (!weeklyError && weeklyData) {
                const completed = weeklyData.filter(a => a.status === 'completed').length;
                const viewed = weeklyData.filter(a => a.status === 'viewed').length;
                const total = weeklyData.length;
                setWeeklyProgress({
                    completed,
                    viewed,
                    total,
                    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
                });
            } else {
                setWeeklyProgress({ completed: 0, viewed: 0, total: 0, percentage: 0 });
            }

            // Fetch weekly history
            const { data: historyData, error: historyError } = await supabase
                .from('weekly_activities')
                .select('*')
                .eq('user_id', user.id)
                .eq('school_year', currentYear)
                .order('week_number', { ascending: false });

            if (!historyError && historyData) {
                const weekMap = {};
                historyData.forEach(activity => {
                    if (!weekMap[activity.week_number]) {
                        weekMap[activity.week_number] = [];
                    }
                    weekMap[activity.week_number].push(activity);
                });

                const allWeeks = new Set([...Object.keys(weekMap).map(Number), currentWeek]);
                const maxWeek = Math.max(...Array.from(allWeeks));

                const history = Array.from({ length: maxWeek }, (_, i) => {
                    const weekNum = maxWeek - i;
                    const weekActivities = weekMap[weekNum] || [];

                    const expectedLeetcode = [];
                    const expectedUsaco = [];

                    // 4 Weekly LeetCode problems (rotate through the pool based on week)
                    const leetcodeStartIndex = ((weekNum - 1) * 4) % LEETCODE_POOL.length;
                    for (let j = 0; j < 4; j++) {
                        const leetcodeProblem = LEETCODE_POOL[(leetcodeStartIndex + j) % LEETCODE_POOL.length];
                        const existing = weekActivities.find(a =>
                            a.problem_type === 'leetcode' && a.problem_title === leetcodeProblem.title
                        );
                        expectedLeetcode.push({
                            problem_title: leetcodeProblem.title,
                            problem_url: leetcodeProblem.url,
                            status: existing?.status || 'not_attempted'
                        });
                    }

                    // 3 Weekly USACO problems (rotate through contests)
                    const contestIndex = (weekNum - 1) % USACO_POOL.length;
                    const contest = USACO_POOL[contestIndex];
                    contest.problems.forEach((usacoProblem) => {
                        const existing = weekActivities.find(a =>
                            a.problem_type === 'usaco' && a.problem_title === usacoProblem.title
                        );
                        expectedUsaco.push({
                            problem_title: usacoProblem.title,
                            problem_url: usacoProblem.url,
                            status: existing?.status || 'not_attempted'
                        });
                    });

                    return {
                        weekNumber: weekNum,
                        leetcode: expectedLeetcode,
                        usaco: expectedUsaco,
                        total: expectedLeetcode.length + expectedUsaco.length,
                        completed: [...expectedLeetcode, ...expectedUsaco].filter(a => a.status === 'completed').length,
                        viewed: [...expectedLeetcode, ...expectedUsaco].filter(a => a.status === 'viewed').length,
                        notAttempted: [...expectedLeetcode, ...expectedUsaco].filter(a => a.status === 'not_attempted').length
                    };
                }).filter(week => week.weekNumber <= currentWeek);

                setWeeklyHistory(history);
            } else {
                setWeeklyHistory([]);
            }

            // Fetch hackathons
            const { data: hackathonsData, error: hackathonsError } = await supabase
                .from('hackathon_programs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (hackathonsError) {
                const errorStr = JSON.stringify(hackathonsError).toLowerCase();
                if (hackathonsError.code === '42P01' ||
                    hackathonsError.message?.includes('404') ||
                    errorStr.includes('404') ||
                    hackathonsError.message?.includes('relation') ||
                    hackathonsError.message?.includes('does not exist')) {
                    console.warn('hackathon_programs table does not exist yet.');
                    setHackathons([]);
                } else {
                    console.warn('Error fetching hackathons:', hackathonsError);
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
                .maybeSingle();

            if (profileError) {
                if (profileError.code === 'PGRST116' || profileError.code === '42P01' || profileError.code === '406') {
                    setProfile(null);
                } else {
                    console.warn('Error fetching profile:', profileError);
                    setProfile(null);
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

    const handleDeleteCourse = async (courseId, courseTitle, e) => {
        e.stopPropagation();
        showConfirm(
            `Are you sure you want to delete "${courseTitle}"? This will remove all your progress.`,
            async () => {
                try {
                    const { error } = await supabase
                        .from('user_courses')
                        .delete()
                        .eq('id', courseId)
                        .eq('user_id', user.id);

                    if (error) throw error;
                    setCourses(courses.filter(c => c.id !== courseId));
                    showNotification('Course deleted successfully!', 'success');
                } catch (error) {
                    console.error('Error deleting course:', error);
                    showNotification('Failed to delete course.', 'error');
                }
            }
        );
    };

    const handleUpdateCourse = async (updatedCourse) => {
        try {
            const supabaseWeeks = updatedCourse.weeks.map(w => ({
                week: w.week,
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
                onUpdateCourse={handleUpdateCourse}
            />
        );
    }

    // If viewing a specific course
    if (selectedCourse) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => setSelectedCourse(null)}
                        className="text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1"
                    >
                        <Icons.ArrowRight className="rotate-180" /> Back to Dashboard
                    </button>
                    <button
                        onClick={() => {
                            showConfirm(
                                `Are you sure you want to delete "${selectedCourse.courseTitle}"?`,
                                async () => {
                                    try {
                                        const { error } = await supabase
                                            .from('user_courses')
                                            .delete()
                                            .eq('id', selectedCourse.id)
                                            .eq('user_id', user.id);

                                        if (error) throw error;
                                        setCourses(courses.filter(c => c.id !== selectedCourse.id));
                                        setSelectedCourse(null);
                                        showNotification('Course deleted successfully!', 'success');
                                    } catch (error) {
                                        console.error('Error deleting course:', error);
                                        showNotification('Failed to delete course.', 'error');
                                    }
                                }
                            );
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Delete Course
                    </button>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gvcs-navy mb-2">{selectedCourse.courseTitle}</h2>
                    {selectedCourse.mit_anchor && (
                        <p className="text-sm text-blue-600 font-medium">
                            Based on: MIT {selectedCourse.mit_anchor}
                        </p>
                    )}
                    {selectedCourse.description && (
                        <p className="text-gray-600 mt-2">{selectedCourse.description}</p>
                    )}
                </div>

                <div className="space-y-4">
                    {selectedCourse.weeks.map((week, idx) => {
                        const hasSubmission = (type) => week.submissions && week.submissions[type];
                        const isExpanded = expandedWeek === idx;

                        return (
                            <div key={week.week} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                                            <div className="flex gap-2" title="Ellis Activities">
                                                <div className={`w-3 h-3 rounded-full ${hasSubmission('academic') ? 'bg-green-500' : 'bg-gray-300'}`} title="Academic"></div>
                                                <div className={`w-3 h-3 rounded-full ${hasSubmission('builder') ? 'bg-green-500' : 'bg-gray-300'}`} title="Builder"></div>
                                                <div className={`w-3 h-3 rounded-full ${hasSubmission('communicator') ? 'bg-green-500' : 'bg-gray-300'}`} title="Communicator"></div>
                                            </div>
                                            <Icons.ArrowRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <WeekDetailView
                                        week={week}
                                        weekIndex={idx}
                                        course={selectedCourse}
                                        onUpdateCourse={handleUpdateCourse}
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
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gvcs-navy mb-2">Dashboard</h1>
                <p className="text-gray-600">Manage your courses, hackathons, and profile</p>
            </div>

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
                            }, { onConflict: 'user_id' });

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

            {/* Weekly Progress Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gvcs-navy">Weekly Progress</h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsWeeklyProgressExpanded(!isWeeklyProgressExpanded)}
                            className="text-sm text-gray-600 hover:text-gray-800 font-semibold flex items-center gap-1"
                        >
                            {isWeeklyProgressExpanded ? 'Hide History' : 'View History'}
                            <Icons.ArrowRight className={`w-4 h-4 transition-transform ${isWeeklyProgressExpanded ? 'rotate-90' : ''}`} />
                        </button>
                        <button
                            onClick={() => navigate('/weekly-activities')}
                            className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                        >
                            View Details <Icons.ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                {weeklyProgress ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-green-600 h-4 rounded-full transition-all"
                                    style={{ width: `${weeklyProgress.percentage}%` }}
                                ></div>
                            </div>
                            <span className="text-lg font-bold text-gray-800">{weeklyProgress.percentage}%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-green-600">{weeklyProgress.completed}</div>
                                <div className="text-sm text-gray-600">Completed</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-yellow-600">{weeklyProgress.viewed}</div>
                                <div className="text-sm text-gray-600">Viewed</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-600">{weeklyProgress.total}</div>
                                <div className="text-sm text-gray-600">Total Problems</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">No weekly activities yet.</p>
                )}

                {isWeeklyProgressExpanded && weeklyHistory.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                        <h3 className="text-lg font-bold text-gvcs-navy">Weekly History</h3>
                        {weeklyHistory.map((week) => (
                            <div key={week.weekNumber} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-800">Week {week.weekNumber}</h4>
                                    <div className="text-sm text-gray-600">{week.completed}/{week.total} completed</div>
                                </div>
                                {[
                                    { key: 'leetcode', label: 'LeetCode', color: 'green' },
                                    { key: 'usaco', label: 'USACO', color: 'amber' }
                                ].map(({ key, label, color }) => (
                                    <div key={key}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">{label}</span>
                                            <span className="text-xs text-gray-500">
                                                {week[key].filter(a => a.status === 'completed').length}/{week[key].length}
                                            </span>
                                        </div>
                                        <div className="flex gap-1 h-6">
                                            {week[key].map((activity, i) => {
                                                let bgColor = 'bg-gray-300';
                                                if (activity.status === 'completed') bgColor = 'bg-green-500';
                                                else if (activity.status === 'viewed') bgColor = 'bg-yellow-500';
                                                return (
                                                    <a
                                                        key={i}
                                                        href={activity.problem_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`flex-1 rounded ${bgColor} border border-gray-400 hover:opacity-80 transition-opacity cursor-pointer`}
                                                        title={`${activity.problem_title}: ${activity.status}`}
                                                    ></a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* My Courses Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gvcs-navy">My Courses</h2>
                {courses.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-600 mb-4">You haven't added any courses yet.</p>
                        <p className="text-sm text-gray-500">Go to Curriculum Generator to get started!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {courses.map(course => {
                            const progress = calculateCourseProgress(course.weeks);
                            return (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer relative group"
                                    onClick={() => setSelectedCourse(course)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gvcs-navy mb-2">{course.courseTitle}</h3>
                                            {course.mit_anchor && (
                                                <p className="text-xs text-blue-600 mb-1 font-medium">
                                                    Based on: MIT {course.mit_anchor}
                                                </p>
                                            )}
                                            {isEllis && course.studentName && (
                                                <p className="text-xs text-gray-500 mb-1">
                                                    Student: {course.studentName}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-500 mb-3">
                                                Added {new Date(course.addedDate).toLocaleDateString()} - {course.weeks.length} weeks
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
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => handleDeleteCourse(course.id, course.courseTitle, e)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                                title="Delete course"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                            <Icons.ArrowRight className="w-6 h-6 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Hackathon Projects Section */}
            <HackathonsSection
                hackathons={hackathons}
                user={user}
                onSelect={(hackathon) => setSelectedHackathon(hackathon)}
                onRefresh={fetchDashboardData}
            />
        </div>
    );
};

export default Dashboard;
