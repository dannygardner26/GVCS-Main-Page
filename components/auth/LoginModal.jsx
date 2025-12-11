import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Icons } from '../common/Icons';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!isOpen) return null;

    const handleDemoLogin = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const demoEmail = 'demo@gvcs.com';
            const demoPassword = 'demo123';

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
                // Ensure profile exists in user_profiles table
                const { error: profileError } = await supabase
                    .from('user_profiles')
                    .upsert({
                        user_id: authData.user.id,
                        display_name: authData.user.user_metadata?.name || "Demo Student",
                        grade_level: '10th',
                        graduation_year: 2027
                    }, { onConflict: 'user_id' });

                if (profileError) {
                    console.error('Error creating/updating demo profile:', profileError);
                }

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

    const handleEllisLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const ellisEmail = 'ellis@gvsd.org';
            const ellisPassword = 'Ellis123';

            // First, try to sign in
            let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: ellisEmail,
                password: ellisPassword
            });

            // If sign in fails, try to create the account
            if (authError) {
                // Try to sign up
                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: ellisEmail,
                    password: ellisPassword,
                    options: {
                        data: {
                            name: 'Ellis',
                            isTeacher: true,
                            isAdmin: true,
                            role: 'teacher'
                        },
                        emailRedirectTo: window.location.origin
                    }
                });

                if (signUpError && !signUpError.message.includes('already registered')) {
                    throw signUpError;
                }

                // If email confirmation is required and we don't have a session,
                // we need to handle this. For Ellis account, we'll use a workaround:
                // Try to sign in immediately after signup (some Supabase configs allow this)
                if (signUpData.user && !signUpData.session) {
                    // Wait a moment and try signing in
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
                        email: ellisEmail,
                        password: ellisPassword
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
                        email: ellisEmail,
                        password: ellisPassword
                    });

                    if (finalError) throw finalError;
                    authData = finalData;
                }
            }

            // If we have a session, log in
            if (authData?.session || authData?.user) {
                // Ensure profile exists in user_profiles table
                const { error: profileError } = await supabase
                    .from('user_profiles')
                    .upsert({
                        user_id: authData.user.id,
                        display_name: authData.user.user_metadata?.name || "Ellis",
                        grade_level: null,
                        graduation_year: null
                    }, { onConflict: 'user_id' });

                if (profileError) {
                    console.error('Error creating/updating Ellis profile:', profileError);
                }

                onLogin({
                    id: authData.user.id,
                    name: authData.user.user_metadata?.name || "Ellis",
                    email: authData.user.email,
                    isAdmin: true,
                    isTeacher: true
                });
                onClose();
            } else {
                throw new Error('Failed to create session');
            }
        } catch (err) {
            console.error('Ellis login error:', err);
            setError(err.message || 'Failed to login with Ellis account. Make sure email confirmation is disabled in Supabase settings.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdminLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const adminEmail = 'admin@gvcs.com';
            const adminPassword = 'admin123';

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
        setSuccess('');

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

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validation
        if (!displayName.trim()) {
            setError('Please enter your name');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: displayName.trim(),
                        isDemo: false
                    },
                    emailRedirectTo: window.location.origin
                }
            });

            if (error) throw error;

            // Check if email confirmation is required
            if (data.user && !data.session) {
                setSuccess('Account created! Please check your email to confirm your account before logging in.');
                setMode('login');
                setPassword('');
                setConfirmPassword('');
                setDisplayName('');
            } else if (data.session) {
                // Auto-logged in (email confirmation disabled)
                onLogin({
                    id: data.user.id,
                    name: data.user.user_metadata?.name || displayName,
                    email: data.user.email,
                    isDemo: false
                });
                onClose();
            }
        } catch (err) {
            if (err.message.includes('already registered')) {
                setError('An account with this email already exists. Please sign in instead.');
            } else {
                setError(err.message || 'Failed to create account');
            }
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setError('');
        setSuccess('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-fade-in">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gvcs-navy mb-2">
                    {mode === 'login' ? 'Student Login' : 'Create Account'}
                </h2>
                <p className="text-gray-500 mb-6">
                    {mode === 'login'
                        ? 'Access your saved plans and track progress.'
                        : 'Join GVCS to save your progress and access all features.'}
                </p>

                {success && (
                    <div className="text-green-600 text-sm bg-green-50 p-3 rounded mb-4">
                        {success}
                    </div>
                )}

                {mode === 'login' ? (
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
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
                ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password (min 6 characters)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                            minLength={6}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
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
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                )}

                <div className="text-center mt-4">
                    <button
                        onClick={switchMode}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {mode === 'login'
                            ? "Don't have an account? Sign up"
                            : 'Already have an account? Sign in'}
                    </button>
                </div>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Quick Access</span></div>
                </div>

                <button
                    onClick={handleDemoLogin}
                    disabled={loading}
                    className="w-full py-3 bg-green-50 text-green-700 border border-green-200 rounded-lg font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <Icons.Sparkles /> Try Demo Account
                </button>

                <button
                    onClick={handleEllisLogin}
                    disabled={loading}
                    className="w-full mt-3 py-3 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg font-bold hover:bg-orange-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <Icons.Sparkles /> Login as Ellis (Teacher)
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

export default LoginModal;
