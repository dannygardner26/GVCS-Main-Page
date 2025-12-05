import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Context and utilities
import { NotificationProvider, useNotification } from './components/context/NotificationContext';
import { supabase } from './utils/supabase';

// Layout components
import Header from './components/common/Header';
import LoginModal from './components/auth/LoginModal';

// View components
import HomeView from './components/views/HomeView';
import ResourcesView from './components/views/ResourcesView';
import MeetingArchiveView from './components/views/MeetingArchiveView';
import WeeklyActivitiesView from './components/views/WeeklyActivitiesView';
import HackathonHubView from './components/views/HackathonHubView';
import CareerPathwaysView from './components/views/CareerPathwaysView';

// Dashboard components
import Dashboard from './components/dashboard/Dashboard';
import MyPlans from './components/dashboard/MyPlans';
import AdminMeetingView from './components/dashboard/AdminMeetingView';

// Ellis components
import EllisGenerator from './components/ellis/EllisGenerator';

// Admin components
import AdminPanel from './components/admin/AdminPanel';

// Article components
import WhyZuhaadLikesRustArticle from './components/articles/WhyZuhaadLikesRustArticle';

const App = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
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
            showNotification("Incorrect Code", 'error');
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
                    <Route path="/weekly-activities" element={<WeeklyActivitiesView user={user} />} />
                    <Route path="/weekly" element={<WeeklyActivitiesView user={user} />} />
                    <Route path="/ellis/*" element={<EllisGenerator user={user} onLoginRequest={() => setIsLoginOpen(true)} />} />

                    <Route path="/hackathons" element={<HackathonHubView />} />
                    <Route path="/careers" element={<CareerPathwaysView />} />
                    <Route path="/archive" element={<MeetingArchiveView />} />
                    <Route path="/my-plans" element={<MyPlans user={user} />} />
                    <Route path="/dashboard" element={<Dashboard user={user} />} />
                    <Route path="/resources" element={<ResourcesView />} />
                    <Route path="/articles/why-zuhaad-likes-rust" element={<WhyZuhaadLikesRustArticle />} />
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

// Wrap App with NotificationProvider
const AppWithNotifications = () => {
    return (
        <NotificationProvider>
            <App />
        </NotificationProvider>
    );
};

export default AppWithNotifications;
