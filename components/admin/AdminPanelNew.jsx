import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useNotification } from '../context/NotificationContext';
import { CURRICULUM_DATA } from '../../CurriculumData';
import { getOrAnalyzePresentation, analyzeCode, analyzeNotesAuthenticity } from '../../utils/aiAnalysis';
import CreateTestUsers from './CreateTestUsers';

// Predefined tags
const PREDEFINED_TAGS = [
    'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7',
    'CS club officer',
    'Independent study',
    'Intro to Java',
    'CSA',
    '2026', '2027', '2028', '2029'
];

const AdminPanelNew = ({ user, onBack }) => {
    const { showNotification } = useNotification();
    const [users, setUsers] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isEllis, setIsEllis] = useState(false);
    const [showCreateUsers, setShowCreateUsers] = useState(false);

    useEffect(() => {
        const checkEllis = () => {
            setIsEllis(user?.email === 'ellis@gvsd.org' || user?.isTeacher);
        };
        checkEllis();
        fetchAllData();
    }, [user]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            // Fetch all user profiles with tags
            const { data: profilesData, error: profilesError } = await supabase
                .from('user_profiles')
                .select('*')
                .order('display_name');

            if (profilesError) {
                console.error('Error fetching profiles:', profilesError);
                if (profilesError.code !== 'PGRST116' && profilesError.code !== '42P01') {
                    showNotification(`Error fetching profiles: ${profilesError.message}`, 'error');
                }
            }
            
            console.log('Fetched profiles:', profilesData?.length || 0);

            // Fetch all tags
            const { data: tagsData, error: tagsError } = await supabase
                .from('user_tags')
                .select('*');

            if (tagsError) {
                console.error('Error fetching tags:', tagsError);
                // Don't throw, just log - tags are optional
            }
            
            console.log('Fetched tags:', tagsData?.length || 0);

            // Fetch all courses (for stats)
            const { data: coursesData } = await supabase
                .from('user_courses')
                .select('*');

            // Fetch all hackathons
            const { data: hackathonsData } = await supabase
                .from('hackathon_programs')
                .select('*');

            // Fetch all problem statuses
            const { data: problemsData } = await supabase
                .from('user_problem_statuses')
                .select('*')
                .eq('status', 'solved');

            // Fetch all sessions for time tracking
            const { data: sessionsData } = await supabase
                .from('user_sessions')
                .select('*');

            // Build user list with aggregated data
            const usersList = (profilesData || []).map(profile => {
                const userTags = (tagsData || []).filter(t => t.user_id === profile.user_id).map(t => t.tag);
                const userCourses = (coursesData || []).filter(c => c.user_id === profile.user_id);
                const userHackathons = (hackathonsData || []).filter(h => h.user_id === profile.user_id);
                const userProblems = (problemsData || []).filter(p => p.user_id === profile.user_id);
                const userSessions = (sessionsData || []).filter(s => s.user_id === profile.user_id);

                // Calculate total time (rounded to nearest 10 minutes)
                const totalMinutes = userSessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
                const totalHours = Math.round(totalMinutes / 60 * 10) / 10;

                // Calculate completed courses
                const completedCourses = userCourses.filter(c => {
                    const weeks = c.weeks || [];
                    const hasActivityPerWeek = weeks.every(week => {
                        const activity = week.selectedActivity || week.selected_activity;
                        return activity && week.submissions && week.submissions[activity];
                    });
                    const testCount = weeks.filter(w => w.submissions?.academic).length;
                    const projectCount = weeks.filter(w => w.submissions?.builder).length;
                    const presentationCount = weeks.filter(w => w.submissions?.communicator).length;
                    return hasActivityPerWeek && testCount >= 4 && projectCount >= 4 && presentationCount >= 4;
                }).length;

                return {
                    ...profile,
                    tags: userTags,
                    courses: userCourses,
                    hackathons: userHackathons,
                    problems: userProblems,
                    sessions: userSessions,
                    totalCourses: userCourses.length,
                    completedCourses: completedCourses,
                    totalHackathons: userHackathons.length,
                    totalProblems: userProblems.length,
                    totalTimeHours: totalHours
                };
            });

            console.log('Built users list:', usersList.length);
            setUsers(usersList);
            
            // Get all unique tags
            const uniqueTags = [...new Set([
                ...PREDEFINED_TAGS,
                ...(tagsData || []).map(t => t.tag)
            ])];
            setAllTags(uniqueTags.sort());
            
            if (usersList.length === 0) {
                showNotification('No users found. Create test users to see data.', 'info');
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
            showNotification(`Failed to load admin data: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    // Filter users based on search and tags
    const filteredUsers = users.filter(u => {
        const matchesSearch = !searchQuery || 
            u.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.user_id?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesTags = selectedTags.length === 0 ||
            selectedTags.every(tag => u.tags?.includes(tag));
        
        return matchesSearch && matchesTags;
    });

    // Add/remove tag from user
    const toggleUserTag = async (userId, tag) => {
        try {
            const user = users.find(u => u.user_id === userId);
            const hasTag = user?.tags?.includes(tag);

            if (hasTag) {
                await supabase
                    .from('user_tags')
                    .delete()
                    .eq('user_id', userId)
                    .eq('tag', tag);
            } else {
                await supabase
                    .from('user_tags')
                    .insert({ user_id: userId, tag });
            }

            fetchAllData();
            showNotification(`Tag ${hasTag ? 'removed' : 'added'} successfully`, 'success');
        } catch (error) {
            console.error('Error toggling tag:', error);
            showNotification('Failed to update tag', 'error');
        }
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

    // If viewing a specific course, show course detail view (Ellis only)
    if (selectedCourse && isEllis) {
        return (
            <CourseDetailView
                user={selectedCourse.user}
                course={selectedCourse.course}
                onBack={() => setSelectedCourse(null)}
            />
        );
    }

    // If viewing a specific user, show user detail view
    if (selectedUser) {
        return (
            <UserDetailView
                user={selectedUser}
                isEllis={isEllis}
                onBack={() => setSelectedUser(null)}
                onViewCourse={(course) => setSelectedCourse({ user: selectedUser, course })}
            />
        );
    }

    // Show create users view
    if (showCreateUsers) {
        return (
            <CreateTestUsers 
                onComplete={() => {
                    setShowCreateUsers(false);
                    fetchAllData();
                }}
            />
        );
    }

    // Main users list view
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gvcs-navy mb-2">Admin Panel</h1>
                    <p className="text-gray-600">Manage users, tags, and view student progress</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowCreateUsers(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                    >
                        Create Test Users
                    </button>
                    <button
                        onClick={onBack}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or user ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gvcs-navy focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Tags:</label>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => {
                                    setSelectedTags(prev => 
                                        prev.includes(tag) 
                                            ? prev.filter(t => t !== tag)
                                            : [...prev, tag]
                                    );
                                }}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                    selectedTags.includes(tag)
                                        ? 'bg-gvcs-navy text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    {selectedTags.length > 0 && (
                        <button
                            onClick={() => setSelectedTags([])}
                            className="mt-2 text-sm text-red-600 hover:text-red-700"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            {/* Users List */}
            <div className="space-y-4">
                {filteredUsers.map(u => (
                    <div
                        key={u.user_id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{u.display_name || 'Unknown User'}</h3>
                                <p className="text-sm text-gray-500 mb-3">ID: {u.user_id.substring(0, 8)}...</p>
                                
                                <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                                    <div>
                                        <span className="text-gray-600">Courses: </span>
                                        <span className="font-bold text-purple-600">{u.totalCourses} ({u.completedCourses} completed)</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Hackathons: </span>
                                        <span className="font-bold text-green-600">{u.totalHackathons}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Problems: </span>
                                        <span className="font-bold text-blue-600">{u.totalProblems}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Time: </span>
                                        <span className="font-bold text-orange-600">{u.totalTimeHours}h</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {u.tags?.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedUser(u)}
                                className="px-4 py-2 bg-gvcs-navy text-white rounded-lg font-bold hover:bg-blue-900 transition-colors text-sm ml-4"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <p className="text-gray-600">No users found matching your filters.</p>
                </div>
            )}
        </div>
    );
};

// User Detail View Component
const UserDetailView = ({ user, isEllis, onBack, onViewCourse }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0); // 0 = current week, -1 = last week, etc.

    // Get the start of a week (Sunday) based on offset from current week
    const getWeekStart = (offset = 0) => {
        const today = new Date(2024, 11, 11); // December 11, 2024 (Thursday)
        const dayOfWeek = today.getDay(); // 0 = Sunday, 4 = Thursday
        const daysToSunday = dayOfWeek === 0 ? 0 : -dayOfWeek; // Days to go back to Sunday
        const currentWeekStart = new Date(today);
        currentWeekStart.setDate(today.getDate() + daysToSunday + (offset * 7));
        currentWeekStart.setHours(0, 0, 0, 0);
        return currentWeekStart;
    };

    // Get all days in the week (Sunday to Saturday)
    const getWeekDays = (weekStart) => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart);
            day.setDate(weekStart.getDate() + i);
            days.push(day);
        }
        return days;
    };

    // Calculate minutes for each day in the current week
    const getDailyTimeData = () => {
        const weekStart = getWeekStart(currentWeekOffset);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        
        const dailyData = {};
        const days = getWeekDays(weekStart);
        
        // Initialize all days to 0
        days.forEach(day => {
            const dayKey = day.toISOString().split('T')[0];
            dailyData[dayKey] = 0;
        });

        // Sum up sessions for each day
        user.sessions?.forEach(session => {
            if (session.session_start) {
                const sessionDate = new Date(session.session_start);
                const dayKey = sessionDate.toISOString().split('T')[0];
                
                // Check if this session is in the current week
                if (sessionDate >= weekStart && sessionDate < weekEnd) {
                    dailyData[dayKey] = (dailyData[dayKey] || 0) + (session.duration_minutes || 0);
                }
            }
        });

        // Round to nearest 10 minutes
        Object.keys(dailyData).forEach(key => {
            dailyData[key] = Math.round(dailyData[key] / 10) * 10;
        });

        return { dailyData, days };
    };

    const { dailyData, days } = getDailyTimeData();
    const maxMinutes = Math.max(...Object.values(dailyData), 1); // At least 1 to avoid division by zero

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getDayName = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    const getWeekLabel = () => {
        const weekStart = getWeekStart(currentWeekOffset);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        if (currentWeekOffset === 0) {
            return 'This Week';
        } else if (currentWeekOffset === -1) {
            return 'Last Week';
        } else {
            return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gvcs-navy mb-2">{user.display_name}</h1>
                    <p className="text-gray-600">User ID: {user.user_id}</p>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                    Back to Users
                </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="flex border-b border-gray-200">
                    {['overview', 'courses', 'hackathons', 'problems', 'time'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 font-bold transition-colors capitalize ${
                                activeTab === tab
                                    ? 'text-gvcs-navy border-b-2 border-gvcs-navy'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-purple-50 rounded-lg p-4">
                                <div className="text-2xl font-bold text-purple-600">{user.totalCourses}</div>
                                <div className="text-sm text-gray-600">Total Courses</div>
                                <div className="text-xs text-gray-500 mt-1">{user.completedCourses} completed</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4">
                                <div className="text-2xl font-bold text-green-600">{user.totalHackathons}</div>
                                <div className="text-sm text-gray-600">Hackathons</div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="text-2xl font-bold text-blue-600">{user.totalProblems}</div>
                                <div className="text-sm text-gray-600">Problems Solved</div>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-4">
                                <div className="text-2xl font-bold text-orange-600">{user.totalTimeHours}h</div>
                                <div className="text-sm text-gray-600">Total Time</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'courses' && (
                        <div className="space-y-4">
                            {user.courses?.map(course => (
                                <div
                                    key={course.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => isEllis && onViewCourse(course)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{course.course_title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {course.weeks?.length || 0} weeks • 
                                                {isEllis && ' Click to view details'}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            user.completedCourses > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            {user.completedCourses > 0 ? 'Completed' : 'In Progress'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'time' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-800 text-xl">{getWeekLabel()}</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                        title="Previous Week"
                                    >
                                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setCurrentWeekOffset(0)}
                                        className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Today
                                    </button>
                                    <button
                                        onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                        title="Next Week"
                                        disabled={currentWeekOffset >= 0}
                                    >
                                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex items-end justify-between gap-2 h-64">
                                    {days.map((day, index) => {
                                        const dayKey = day.toISOString().split('T')[0];
                                        const minutes = dailyData[dayKey] || 0;
                                        const heightPercent = maxMinutes > 0 ? (minutes / maxMinutes) * 100 : 0;
                                        const today = new Date(2024, 11, 11); // December 11, 2024
                                        const isToday = day.toDateString() === today.toDateString() && currentWeekOffset === 0;
                                        
                                        return (
                                            <div key={dayKey} className="flex-1 flex flex-col items-center gap-2">
                                                <div className="text-xs font-bold text-gray-600 mb-1">
                                                    {minutes}m
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '200px' }}>
                                                    <div
                                                        className={`w-full rounded-t-lg transition-all ${
                                                            isToday 
                                                                ? 'bg-blue-500' 
                                                                : minutes > 0 
                                                                    ? 'bg-orange-500' 
                                                                    : 'bg-gray-300'
                                                        }`}
                                                        style={{ 
                                                            height: `${heightPercent}%`,
                                                            minHeight: minutes > 0 ? '4px' : '0'
                                                        }}
                                                        title={`${getDayName(day)} ${formatDate(day)}: ${minutes} minutes`}
                                                    />
                                                </div>
                                                <div className={`text-xs font-bold ${isToday ? 'text-blue-600' : 'text-gray-600'}`}>
                                                    {getDayName(day)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {formatDate(day)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-4 text-center text-sm text-gray-600">
                                    Total for week: {Object.values(dailyData).reduce((sum, min) => sum + min, 0)} minutes
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Course Detail View (Ellis Only)
const CourseDetailView = ({ user, course, onBack }) => {
    const { showNotification } = useNotification();
    const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
    const [loadingAnalysis, setLoadingAnalysis] = useState(false);
    const [testAttempts, setTestAttempts] = useState([]);
    const [cheatingFlags, setCheatingFlags] = useState([]);

    const globalCourse = CURRICULUM_DATA[course.course_id] || {};
    const weeks = course.weeks || globalCourse.weeks || [];
    const selectedWeek = weeks[selectedWeekIndex];

    useEffect(() => {
        if (selectedWeek) {
            fetchWeekData();
        }
    }, [selectedWeekIndex, course.course_id, selectedWeek?.week]);

    const fetchWeekData = async () => {
        if (!selectedWeek) return;

        setLoadingAnalysis(true);
        try {
            // Fetch test attempts
            const { data: attempts } = await supabase
                .from('test_attempts')
                .select('*')
                .eq('user_id', user.user_id)
                .eq('course_id', course.course_id)
                .eq('week', selectedWeek.week)
                .order('submitted_at', { ascending: false });

            setTestAttempts(attempts || []);

            // Fetch cheating flags
            const { data: flags } = await supabase
                .from('cheating_flags')
                .select('*')
                .eq('user_id', user.user_id)
                .eq('course_id', course.course_id)
                .eq('week', selectedWeek.week);

            setCheatingFlags(flags || []);
        } catch (error) {
            console.error('Error fetching week data:', error);
        } finally {
            setLoadingAnalysis(false);
        }
    };

    const handleAnalyzePresentation = async () => {
        if (!selectedWeek?.submissions?.communicator?.link) return;
        
        setLoadingAnalysis(true);
        try {
            const rubric = selectedWeek.deliverables?.communicator?.guidelines || [];
            const analysis = await getOrAnalyzePresentation(
                user.user_id,
                course.course_id,
                selectedWeek.week,
                selectedWeek.submissions.communicator.link,
                rubric,
                selectedWeek.topic
            );
            // Analysis is cached in DB, will be fetched on next load
            showNotification('Presentation analysis complete', 'success');
        } catch (error) {
            console.error('Error analyzing presentation:', error);
            showNotification('Failed to analyze presentation', 'error');
        } finally {
            setLoadingAnalysis(false);
        }
    };

    if (!selectedWeek) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <p className="text-gray-600">No weeks available for this course.</p>
                <button onClick={onBack} className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">Back</button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gvcs-navy mb-2">{course.course_title}</h1>
                    <p className="text-gray-600">Student: {user.display_name} • Week {selectedWeek.week}: {selectedWeek.topic}</p>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                    Back
                </button>
            </div>

            {/* Week Selector */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex gap-2 overflow-x-auto">
                    {weeks.map((week, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedWeekIndex(idx)}
                            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                                idx === selectedWeekIndex
                                    ? 'bg-gvcs-navy text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Week {week.week}
                        </button>
                    ))}
                </div>
            </div>

            {/* Week Activities */}
            <div className="space-y-6">
                {/* Academic (Test) */}
                {selectedWeek.submissions?.academic && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-purple-600 mb-4">🎓 Academic: Test</h3>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                Best Score: {selectedWeek.submissions.academic.score}/{selectedWeek.submissions.academic.totalPoints} 
                                ({selectedWeek.submissions.academic.grade})
                            </p>
                        </div>
                        {testAttempts.length > 0 && (
                            <div>
                                <h4 className="font-bold mb-2">All Attempts ({testAttempts.length})</h4>
                                <div className="space-y-2">
                                    {testAttempts.map((attempt, idx) => (
                                        <div
                                            key={attempt.id}
                                            className={`p-3 rounded-lg border ${
                                                attempt.score === Math.max(...testAttempts.map(a => a.score))
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm">
                                                    Attempt {testAttempts.length - idx}: {attempt.score}/{attempt.total_points} ({attempt.percentage}%)
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(attempt.submitted_at).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Builder (Project) */}
                {selectedWeek.submissions?.builder && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-blue-600 mb-4">🔨 Builder: Project</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Score: {selectedWeek.submissions.builder.score}/{selectedWeek.submissions.builder.totalPoints}
                        </p>
                        {/* Code analysis would go here - would need to fetch code from submission */}
                    </div>
                )}

                {/* Communicator (Presentation) */}
                {selectedWeek.submissions?.communicator && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-orange-600 mb-4">🎤 Communicator: Presentation</h3>
                        <div className="mb-4">
                            <a
                                href={selectedWeek.submissions.communicator.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                View Presentation
                            </a>
                        </div>
                        <button
                            onClick={handleAnalyzePresentation}
                            disabled={loadingAnalysis}
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50"
                        >
                            {loadingAnalysis ? 'Analyzing...' : 'Analyze with AI'}
                        </button>
                    </div>
                )}

                {/* Lecture Notes */}
                {selectedWeek.submissions?.lecture_notes && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-green-600 mb-4">📝 Lecture Notes</h3>
                        <p className="text-sm text-gray-600">Notes submitted and feedback provided.</p>
                    </div>
                )}

                {/* Cheating Flags */}
                {cheatingFlags.length > 0 && (
                    <div className="bg-red-50 rounded-xl shadow-sm border border-red-200 p-6">
                        <h3 className="text-xl font-bold text-red-600 mb-4">⚠️ Cheating Flags</h3>
                        <div className="space-y-2">
                            {cheatingFlags.map(flag => (
                                <div key={flag.id} className="bg-white p-3 rounded-lg border border-red-200">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-red-700">{flag.flag_type.replace('_', ' ')}</p>
                                            <p className="text-sm text-gray-600">{flag.activity_type}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(flag.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            flag.severity === 'high' ? 'bg-red-600 text-white' :
                                            flag.severity === 'medium' ? 'bg-yellow-600 text-white' :
                                            'bg-gray-600 text-white'
                                        }`}>
                                            {flag.severity}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanelNew;

