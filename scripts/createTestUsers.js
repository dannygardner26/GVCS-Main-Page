// Script to create test users and populate mock data
// Run with: node scripts/createTestUsers.js

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to add this to .env

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials. Make sure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are in .env');
    process.exit(1);
}

// Use service role for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

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

async function createUsersAndPopulate() {
    console.log('Creating test users and populating mock data...\n');

    const createdUserIds = [];

    // Create auth users and profiles
    for (const userData of testUsers) {
        try {
            // Create auth user
            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email: userData.email,
                password: userData.password,
                email_confirm: true,
                user_metadata: {
                    name: userData.name
                }
            });

            if (authError) {
                if (authError.message.includes('already registered')) {
                    console.log(`User ${userData.email} already exists, skipping...`);
                    // Get existing user
                    const { data: existingUsers } = await supabase.auth.admin.listUsers();
                    const existingUser = existingUsers?.users.find(u => u.email === userData.email);
                    if (existingUser) {
                        createdUserIds.push(existingUser.id);
                    }
                    continue;
                } else {
                    console.error(`Error creating user ${userData.email}:`, authError);
                    continue;
                }
            }

            const userId = authData.user.id;
            createdUserIds.push(userId);

            // Create user profile
            const { error: profileError } = await supabase
                .from('user_profiles')
                .upsert({
                    user_id: userId,
                    display_name: userData.name,
                    grade_level: userData.grade,
                    graduation_year: userData.year
                }, {
                    onConflict: 'user_id'
                });

            if (profileError) {
                console.error(`Error creating profile for ${userData.email}:`, profileError);
            } else {
                console.log(`✓ Created user: ${userData.name} (${userData.email})`);
            }
        } catch (error) {
            console.error(`Error processing ${userData.email}:`, error);
        }
    }

    console.log(`\nCreated ${createdUserIds.length} users. Now populating mock data...\n`);

    // Populate mock data for each user
    for (const userId of createdUserIds) {
        try {
            // Add random tags (1-4 tags per user)
            const numTags = 1 + Math.floor(Math.random() * 3);
            const selectedTags = [];
            for (let i = 0; i < numTags; i++) {
                const tag = tagList[Math.floor(Math.random() * tagList.length)];
                if (!selectedTags.includes(tag)) {
                    selectedTags.push(tag);
                }
            }

            // Insert tags
            for (const tag of selectedTags) {
                await supabase
                    .from('user_tags')
                    .upsert({ user_id: userId, tag }, { onConflict: 'user_id,tag' });
            }

            // Create sessions (10-25 per user)
            const numSessions = 10 + Math.floor(Math.random() * 15);
            const sessions = [];
            for (let i = 0; i < numSessions; i++) {
                const daysAgo = Math.random() * 28;
                const sessionStart = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
                const durationMins = 10 + Math.floor(Math.random() * 120);
                const sessionEnd = new Date(sessionStart.getTime() + durationMins * 60 * 1000);
                
                const pages = ['/dashboard', '/ellis', '/weekly', '/hackathons', '/careers', '/'];
                const pagePath = pages[Math.floor(Math.random() * pages.length)];

                sessions.push({
                    user_id: userId,
                    session_start: sessionStart.toISOString(),
                    session_end: sessionEnd.toISOString(),
                    duration_minutes: durationMins,
                    page_path: pagePath
                });
            }

            await supabase.from('user_sessions').insert(sessions);

            // Create test attempts (3-8 per user)
            const numAttempts = 3 + Math.floor(Math.random() * 5);
            const attempts = [];
            for (let i = 0; i < numAttempts; i++) {
                const week = 1 + Math.floor(Math.random() * 13);
                const score = 60 + Math.floor(Math.random() * 40);
                attempts.push({
                    user_id: userId,
                    course_id: 'CS 102: Data Structures & Algorithms',
                    week: week,
                    answers: {
                        q1: Math.floor(Math.random() * 4),
                        q2: Math.floor(Math.random() * 4),
                        q3: 'Sample answer for question 3',
                        q4: Math.floor(Math.random() * 4),
                        q5: 'Another sample answer'
                    },
                    score: score,
                    total_points: 100,
                    percentage: score
                });
            }

            await supabase.from('test_attempts').insert(attempts);

            // Create cheating flags (30% chance)
            if (Math.random() > 0.7) {
                const week = 1 + Math.floor(Math.random() * 13);
                const activityTypes = ['academic', 'builder', 'communicator'];
                const flagTypes = ['copy_paste', 'tab_switch', 'suspicious_timing'];
                const severities = ['low', 'medium', 'high'];

                await supabase.from('cheating_flags').insert({
                    user_id: userId,
                    course_id: 'CS 102: Data Structures & Algorithms',
                    week: week,
                    activity_type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
                    flag_type: flagTypes[Math.floor(Math.random() * flagTypes.length)],
                    details: {
                        detected_at: new Date().toISOString(),
                        details: 'Mock flag for testing',
                        context: 'Test submission detected unusual patterns'
                    },
                    severity: severities[Math.floor(Math.random() * severities.length)]
                });
            }

            console.log(`✓ Populated data for user ${userId.substring(0, 8)}...`);
        } catch (error) {
            console.error(`Error populating data for ${userId}:`, error);
        }
    }

    console.log('\n✅ Done! All test users created and populated with mock data.');
    console.log('\nYou can now log in with any of these accounts:');
    testUsers.forEach(u => {
        console.log(`  - ${u.email} / ${u.password}`);
    });
}

createUsersAndPopulate().catch(console.error);

