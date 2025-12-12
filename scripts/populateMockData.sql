-- Script to populate mock data for existing users
-- Run this in Supabase SQL Editor after creating some test users
-- To create test users: Use the app's login system or Supabase Auth UI

-- This script will:
-- 1. Add random tags to all existing users
-- 2. Create session data (time tracking)
-- 3. Create test attempts
-- 4. Create some cheating flags for demonstration

DO $$
DECLARE
    user_record RECORD;
    user_count INTEGER := 0;
    tag_list TEXT[] := ARRAY['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'CS club officer', 'Independent study', 'Intro to Java', 'CSA', '2026', '2027', '2028', '2029'];
    selected_tags TEXT[];
    tag_item TEXT;
    i INTEGER;
    session_start TIMESTAMPTZ;
    session_end TIMESTAMPTZ;
    duration_mins INTEGER;
    week_num INTEGER;
    course_id TEXT := 'CS 102: Data Structures & Algorithms';
BEGIN
    -- Get all existing users
    FOR user_record IN 
        SELECT user_id, display_name 
        FROM user_profiles 
        LIMIT 20
    LOOP
        user_count := user_count + 1;
        
        -- Add random tags (1-4 tags per user)
        selected_tags := ARRAY[]::TEXT[];
        FOR i IN 1..(1 + floor(random() * 3)::INTEGER) LOOP
            selected_tags := array_append(selected_tags, tag_list[1 + floor(random() * array_length(tag_list, 1))::INTEGER]);
        END LOOP;
        
        -- Remove duplicates and insert tags
        FOREACH tag_item IN ARRAY (SELECT array_agg(DISTINCT tag) FROM unnest(selected_tags) AS tag)
        LOOP
            INSERT INTO user_tags (user_id, tag)
            VALUES (user_record.user_id, tag_item)
            ON CONFLICT (user_id, tag) DO NOTHING;
        END LOOP;
        
        -- Create 10-25 sessions per user (spread over last 4 weeks)
        FOR i IN 1..(10 + floor(random() * 15)::INTEGER) LOOP
            session_start := NOW() - (random() * INTERVAL '28 days');
            duration_mins := 10 + floor(random() * 120)::INTEGER; -- 10-130 minutes
            session_end := session_start + (duration_mins || ' minutes')::INTERVAL;
            
            INSERT INTO user_sessions (user_id, session_start, session_end, duration_minutes, page_path)
            VALUES (
                user_record.user_id,
                session_start,
                session_end,
                duration_mins,
                CASE floor(random() * 6)::INTEGER
                    WHEN 0 THEN '/dashboard'
                    WHEN 1 THEN '/ellis'
                    WHEN 2 THEN '/weekly'
                    WHEN 3 THEN '/hackathons'
                    WHEN 4 THEN '/careers'
                    ELSE '/'
                END
            )
            ON CONFLICT DO NOTHING;
        END LOOP;
        
        -- Create test attempts for different weeks (3-8 attempts per user)
        FOR i IN 1..(3 + floor(random() * 5)::INTEGER) LOOP
            week_num := 1 + floor(random() * 13)::INTEGER;
            INSERT INTO test_attempts (user_id, course_id, week, answers, score, total_points, percentage)
            VALUES (
                user_record.user_id,
                course_id,
                week_num,
                jsonb_build_object(
                    'q1', floor(random() * 4)::INTEGER,
                    'q2', floor(random() * 4)::INTEGER,
                    'q3', 'Sample answer for question 3',
                    'q4', floor(random() * 4)::INTEGER,
                    'q5', 'Another sample answer'
                ),
                60 + floor(random() * 40)::INTEGER, -- Score between 60-100
                100,
                60 + floor(random() * 40)::INTEGER
            )
            ON CONFLICT DO NOTHING;
        END LOOP;
        
        -- Create some cheating flags (30% chance per user)
        IF random() > 0.7 THEN
            week_num := 1 + floor(random() * 13)::INTEGER;
            INSERT INTO cheating_flags (user_id, course_id, week, activity_type, flag_type, details, severity)
            VALUES (
                user_record.user_id,
                course_id,
                week_num,
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
                    'details', 'Mock flag for testing - ' || user_record.display_name,
                    'context', 'Test submission detected unusual patterns'
                ),
                CASE floor(random() * 3)::INTEGER
                    WHEN 0 THEN 'low'
                    WHEN 1 THEN 'medium'
                    ELSE 'high'
                END
            )
            ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;
    
    RAISE NOTICE 'Populated mock data for % users', user_count;
    
    IF user_count = 0 THEN
        RAISE NOTICE 'No users found. Please create some test users first via the app login system.';
    END IF;
END $$;


