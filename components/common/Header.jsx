import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ user, onLoginClick, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    
    // Check if user is admin or Ellis (teacher)
    const isAdmin = user?.email === 'admin@gvcs.com' || user?.isAdmin === true || 
                    user?.email === 'ellis@gvsd.org' || user?.isTeacher === true;

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <img
                            src="/images/logo.png"
                            alt="GVCS Logo"
                            className="relative w-10 h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-md"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                const fallback = e.target.parentElement.querySelector('.logo-fallback');
                                if (fallback) fallback.style.display = 'flex';
                            }}
                        />
                        <div className="logo-fallback w-8 h-8 bg-gvcs-navy rounded-lg hidden items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform absolute inset-0">
                            &lt;/&gt;
                        </div>
                    </div>
                    <span className="font-bold text-xl text-gvcs-navy tracking-tight drop-shadow-sm">GVCS</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'Weekly', path: '/weekly' },
                        { name: 'Curriculum', path: '/ellis' },
                        { name: 'Hackathons', path: '/hackathons' },
                        { name: 'Careers', path: '/careers' },
                        { name: 'Resources', path: '/resources' },
                        ...(isAdmin ? [{ name: 'Admin', path: '/admin' }] : [])
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

export default Header;
