-- Migration: Add Mock Data for Testing
-- Date: 2025-01-12

-- First, let's create some mock user profiles
-- Note: These will reference auth.users, so we need to create auth users first
-- For now, we'll insert into user_profiles with placeholder user_ids
-- In production, these would be real auth.users

-- Create mock user profiles (assuming some auth users exist)
-- We'll use a function to create users if they don't exist, or just insert profiles for existing users

-- Insert mock user profiles (you'll need to replace these UUIDs with actual user IDs from auth.users)
-- For demonstration, I'll create a script that works with existing users

-- Let's create a function to populate mock data for existing users
DO $$
DECLARE
    user_record RECORD;
    user_count INTEGER := 0;
    tag_list TEXT[] := ARRAY['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'CS club officer', 'Independent study', 'Intro to Java', 'CSA', '2026', '2027', '2028', '2029'];
    selected_tags TEXT[];
    i INTEGER;
    session_start TIMESTAMPTZ;
    session_end TIMESTAMPTZ;
    duration_mins INTEGER;
BEGIN
    -- Get all existing users from auth.users (via user_profiles)
    FOR user_record IN 
        SELECT user_id, display_name 
        FROM user_profiles 
        LIMIT 10
    LOOP
        user_count := user_count + 1;
        
        -- Add random tags (1-4 tags per user)
        selected_tags := ARRAY[]::TEXT[];
        FOR i IN 1..(1 + floor(random() * 3)::INTEGER) LOOP
            selected_tags := array_append(selected_tags, tag_list[1 + floor(random() * array_length(tag_list, 1))::INTEGER]);
        END LOOP;
        
        -- Remove duplicates
        SELECT array_agg(DISTINCT tag) INTO selected_tags FROM unnest(selected_tags) AS tag;
        
        -- Insert tags
        FOREACH i IN ARRAY selected_tags
        LOOP
            INSERT INTO user_tags (user_id, tag)
            VALUES (user_record.user_id, i)
            ON CONFLICT (user_id, tag) DO NOTHING;
        END LOOP;
        
        -- Create 5-15 sessions per user (spread over last 4 weeks)
        FOR i IN 1..(5 + floor(random() * 10)::INTEGER) LOOP
            session_start := NOW() - (random() * INTERVAL '28 days');
            duration_mins := 10 + floor(random() * 120)::INTEGER; -- 10-130 minutes
            session_end := session_start + (duration_mins || ' minutes')::INTERVAL;
            
            INSERT INTO user_sessions (user_id, session_start, session_end, duration_minutes, page_path)
            VALUES (
                user_record.user_id,
                session_start,
                session_end,
                duration_mins,
                CASE floor(random() * 5)::INTEGER
                    WHEN 0 THEN '/dashboard'
                    WHEN 1 THEN '/ellis'
                    WHEN 2 THEN '/weekly'
                    WHEN 3 THEN '/hackathons'
                    ELSE '/'
                END
            );
        END LOOP;
        
        -- Create some test attempts (if user has courses)
        -- This would require checking user_courses, but for now we'll create generic attempts
        FOR i IN 1..(2 + floor(random() * 5)::INTEGER) LOOP
            INSERT INTO test_attempts (user_id, course_id, week, answers, score, total_points, percentage)
            VALUES (
                user_record.user_id,
                'CS 102: Data Structures & Algorithms',
                1 + floor(random() * 13)::INTEGER,
                jsonb_build_object(
                    'q1', floor(random() * 4)::INTEGER,
                    'q2', floor(random() * 4)::INTEGER,
                    'q3', 'Sample answer text'
                ),
                60 + floor(random() * 40)::INTEGER, -- Score between 60-100
                100,
                60 + floor(random() * 40)::INTEGER
            )
            ON CONFLICT DO NOTHING;
        END LOOP;
        
        -- Create some cheating flags (for demonstration)
        IF random() > 0.7 THEN -- 30% chance
            INSERT INTO cheating_flags (user_id, course_id, week, activity_type, flag_type, details, severity)
            VALUES (
                user_record.user_id,
                'CS 102: Data Structures & Algorithms',
                1 + floor(random() * 13)::INTEGER,
                CASE floor(random() * 3)::INTEGER
                    WHEN 0 THEN 'academic'
                    WHEN 1 THEN 'builder'
                    ELSE 'communicator'
                END,
                CASE floor(random() * 3)::INTEGER
                    WHEN 0 THEN 'copy_paste'
                    WHEN 1 THEN 'tab_switch'
                    ELSE 'suspicious_timing'
                END,
                jsonb_build_object(
                    'detected_at', NOW() - (random() * INTERVAL '7 days'),
                    'details', 'Mock flag for testing'
                ),
                CASE floor(random() * 3)::INTEGER
                    WHEN 0 THEN 'low'
                    WHEN 1 THEN 'medium'
                    ELSE 'high'
                END
            );
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Populated mock data for % users', user_count;
END $$;

-- Create comprehensive mock data for all existing users
-- This will populate tags, sessions, test attempts, and flags for any users that exist

-- Note: To create new test users, use the Supabase Auth UI or create them via the app's login system
-- This migration will automatically populate mock data for any existing users

