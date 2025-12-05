import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useNotification } from '../context/NotificationContext';

const AdminPanel = ({ user, onBack }) => {
    const { showNotification, showConfirm } = useNotification();
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

            // Handle 406 and other errors gracefully
            if (profilesError) {
                if (profilesError.code === 'PGRST116' || profilesError.code === '42P01' || profilesError.code === '406') {
                    console.warn('user_profiles table not accessible:', profilesError.code);
                    setAllProfiles([]);
                } else {
                    console.error('Error fetching profiles:', profilesError);
                    setAllProfiles([]);
                }
            } else {
                setAllProfiles(profilesData || []);
            }

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
        const completed = weeks.filter(w => {
            const activity = w.selectedActivity || w.selected_activity;
            return activity && w.submissions && w.submissions[activity];
        }).length;
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
                            {users.map(u => (
                                <div
                                    key={u.id}
                                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{u.email}</h3>
                                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-600">Courses: </span>
                                                    <span className="font-bold text-purple-600">{u.totalCourses}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Hackathons: </span>
                                                    <span className="font-bold text-green-600">{u.totalHackathons}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Problems: </span>
                                                    <span className="font-bold text-blue-600">{u.totalProblems}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedUser(selectedUser?.id === u.id ? null : u)}
                                            className="px-4 py-2 bg-gvcs-navy text-white rounded-lg font-bold hover:bg-blue-900 transition-colors text-sm"
                                        >
                                            {selectedUser?.id === u.id ? 'Hide Details' : 'View Details'}
                                        </button>
                                    </div>

                                    {selectedUser?.id === u.id && (
                                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                                            {/* User Courses */}
                                            {u.courses.length > 0 && (
                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-2">Courses:</h4>
                                                    <div className="space-y-2">
                                                        {u.courses.map(course => (
                                                            <div key={course.id} className="bg-gray-50 p-3 rounded-lg">
                                                                <div className="font-bold text-gray-900">{course.course_title}</div>
                                                                <div className="text-sm text-gray-600">
                                                                    Progress: {calculateCourseProgress(course.weeks)}% -
                                                                    Weeks: {course.weeks?.length || 0}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* User Hackathons */}
                                            {u.hackathons.length > 0 && (
                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-2">Hackathons:</h4>
                                                    <div className="space-y-2">
                                                        {u.hackathons.map(hackathon => (
                                                            <div key={hackathon.id} className="bg-gray-50 p-3 rounded-lg">
                                                                <div className="font-bold text-gray-900">{hackathon.hackathon_name}</div>
                                                                <div className="text-sm text-gray-600">
                                                                    Date: {hackathon.hackathon_date ? new Date(hackathon.hackathon_date).toLocaleDateString() : 'TBD'} -
                                                                    Step: {hackathon.current_step + 1}/6
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* User Profile */}
                                            {u.profile && (
                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-2">Profile:</h4>
                                                    <div className="bg-gray-50 p-3 rounded-lg">
                                                        <div className="text-sm text-gray-600">
                                                            Grade: {u.profile.grade_level || 'N/A'} -
                                                            Graduation: {u.profile.graduation_year || 'N/A'}
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
                                        User ID: {course.user_id.substring(0, 8)}... -
                                        Progress: {calculateCourseProgress(course.weeks)}% -
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
                                        User ID: {hackathon.user_id.substring(0, 8)}... -
                                        Date: {hackathon.hackathon_date ? new Date(hackathon.hackathon_date).toLocaleDateString() : 'TBD'} -
                                        Step: {hackathon.current_step + 1}/6 -
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
                                        User ID: {problem.user_id.substring(0, 8)}... -
                                        Status: <span className={`font-bold ${problem.status === 'solved' ? 'text-green-600' :
                                                problem.status === 'attempted' ? 'text-yellow-600' : 'text-red-600'
                                            }`}>{problem.status}</span> -
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

export default AdminPanel;
