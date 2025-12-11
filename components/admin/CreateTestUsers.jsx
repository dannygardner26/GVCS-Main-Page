import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useNotification } from '../context/NotificationContext';

const CreateTestUsers = ({ onComplete }) => {
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState('');

    const testUsers = [
        { email: 'student1@gvcs.com', password: 'test123', name: 'Alice Johnson', grade: '10th', year: 2027 },
        { email: 'student2@gvcs.com', password: 'test123', name: 'Bob Smith', grade: '11th', year: 2026 },
        { email: 'student3@gvcs.com', password: 'test123', name: 'Charlie Brown', grade: '9th', year: 2028 },
        { email: 'student4@gvcs.com', password: 'test123', name: 'Diana Prince', grade: '12th', year: 2025 },
        { email: 'student5@gvcs.com', password: 'test123', name: 'Eve Wilson', grade: '10th', year: 2027 },
        { email: 'student6@gvcs.com', password: 'test123', name: 'Frank Miller', grade: '11th', year: 2026 },
        { email: 'student7@gvcs.com', password: 'test123', name: 'Grace Lee', grade: '9th', year: 2028 },
        { email: 'student8@gvcs.com', password: 'test123', name: 'Henry Davis', grade: '12th', year: 2025 },
    ];

    const tagList = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'CS club officer', 'Independent study', 'Intro to Java', 'CSA', '2026', '2027', '2028', '2029'];

    const createUsersAndPopulate = async () => {
        setLoading(true);
        setProgress('Starting...');

        const createdUserIds = [];

        // Store current user to restore later
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        
        // Create users via signup (this will create auth users)
        // We'll use signUp which won't log us in, just create the account
        for (const userData of testUsers) {
            try {
                setProgress(`Creating ${userData.name}...`);
                
                // Try to sign up (will fail if user exists, which is fine - we'll check profiles)
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email: userData.email,
                    password: userData.password,
                    options: {
                        data: {
                            name: userData.name
                        },
                        emailRedirectTo: undefined // Don't redirect
                    }
                });

                let userId;
                if (authError) {
                    if (authError.message.includes('already registered') || authError.message.includes('User already registered')) {
                        // User exists - try to find their profile to get user_id
                        const { data: existingProfile } = await supabase
                            .from('user_profiles')
                            .select('user_id')
                            .eq('display_name', userData.name)
                            .limit(1)
                            .single();
                        
                        if (existingProfile) {
                            userId = existingProfile.user_id;
                            setProgress(`User ${userData.name} already exists, using existing...`);
                        } else {
                            // Can't find profile, skip
                            setProgress(`Skipping ${userData.email} (exists but no profile found)`);
                            continue;
                        }
                    } else {
                        setProgress(`Error: ${authError.message}`);
                        continue;
                    }
                } else {
                    userId = authData.user?.id;
                }

                if (!userId) {
                    setProgress(`Could not get user ID for ${userData.email}`);
                    continue;
                }

                createdUserIds.push(userId);

                // Create/update profile (this should work even if user was just created)
                const { error: profileError } = await supabase
                    .from('user_profiles')
                    .upsert({
                        user_id: userId,
                        display_name: userData.name,
                        grade_level: userData.grade,
                        graduation_year: userData.year
                    }, { onConflict: 'user_id' });

                if (profileError) {
                    setProgress(`Profile error for ${userData.name}: ${profileError.message}`);
                } else {
                    setProgress(`✓ Created/updated ${userData.name}`);
                }
            } catch (error) {
                setProgress(`Error with ${userData.email}: ${error.message}`);
            }
        }
        
        // Make sure we're still logged in as the original user (admin/Ellis)
        if (currentUser) {
            // We should still be logged in, but just in case
            const { data: { user: checkUser } } = await supabase.auth.getUser();
            if (!checkUser || checkUser.id !== currentUser.id) {
                setProgress('Warning: Session changed. Please log back in as admin/Ellis.');
            }
        }

        setProgress(`Created ${createdUserIds.length} users. Populating data...`);

        // Populate mock data using the SQL function
        for (let idx = 0; idx < createdUserIds.length; idx++) {
            const userId = createdUserIds[idx];
            const userData = testUsers[idx];
            
            try {
                setProgress(`Populating data for ${userData.name}...`);
                
                // Call the SQL function to populate data (runs with SECURITY DEFINER, so it can insert for any user)
                const { error: rpcError } = await supabase.rpc('populate_mock_data_for_user', {
                    target_user_id: userId
                });

                if (rpcError) {
                    setProgress(`Error calling function: ${rpcError.message}`);
                    // The function should work, but if it doesn't, the user can run the SQL script manually
                } else {
                    setProgress(`✓ Populated data for ${userData.name}`);
                }
            } catch (error) {
                setProgress(`Error populating ${userData.name}: ${error.message}`);
            }
        }

        setProgress('✅ Done! Refresh the admin panel to see the new users.');
        showNotification('Test users created and populated!', 'success');
        setLoading(false);
        
        if (onComplete) {
            setTimeout(() => onComplete(), 2000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gvcs-navy mb-4">Create Test Users</h2>
                <p className="text-gray-600 mb-6">
                    This will create 8 test students and populate them with mock data (tags, sessions, test attempts, cheating flags).
                </p>

                <button
                    onClick={createUsersAndPopulate}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Creating Users...' : 'Create Test Users & Populate Data'}
                </button>

                {progress && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{progress}</p>
                    </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-semibold mb-2">Test User Credentials:</p>
                    <div className="text-xs text-blue-700 space-y-1">
                        {testUsers.map(u => (
                            <div key={u.email}>{u.email} / {u.password}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTestUsers;

