-- Migration: Populate Alice Johnson with fully completed CS 102 course
-- This creates a complete course with all weeks, all activities completed

DO $$
DECLARE
    alice_user_id UUID;
    course_id TEXT := 'CS 102: Data Structures & Algorithms';
    course_title TEXT := 'CS 102: Data Structures & Algorithms';
    week_num INTEGER;
    week_data JSONB;
    all_weeks JSONB := '[]'::JSONB;
BEGIN
    -- Find Alice Johnson's user_id
    SELECT user_id INTO alice_user_id
    FROM user_profiles
    WHERE display_name = 'Alice Johnson'
    LIMIT 1;

    IF alice_user_id IS NULL THEN
        RAISE NOTICE 'Alice Johnson not found. Please create the user first.';
        RETURN;
    END IF;

    RAISE NOTICE 'Found Alice Johnson: %', alice_user_id;

    -- Create 13 weeks of CS 102 with all activities completed
    FOR week_num IN 1..13 LOOP
        -- Create week data with all activities completed
        week_data := jsonb_build_object(
            'week', week_num,
            'topic', CASE week_num
                WHEN 1 THEN 'Asymptotic Analysis: Big-O Notation'
                WHEN 2 THEN 'Linear Structures: Dynamic Arrays and Linked Lists'
                WHEN 3 THEN 'Stacks, Queues, and Deques'
                WHEN 4 THEN 'Hash-Based Structures: HashMaps and HashSets'
                WHEN 5 THEN 'Trees: Binary Search Trees and Traversals'
                WHEN 6 THEN 'Self-Balancing Trees: AVL or Red-Black'
                WHEN 7 THEN 'Binary Heaps and Priority Queues'
                WHEN 8 THEN 'Graph Traversals: Breadth-First Search (BFS)'
                WHEN 9 THEN 'Graph Traversals: Depth-First Search (DFS)'
                WHEN 10 THEN 'Shortest Paths: Weighted Graphs and Introduction'
                WHEN 11 THEN 'Shortest Paths: Dijkstra''s Algorithm'
                WHEN 12 THEN 'Dynamic Programming Fundamentals'
                ELSE 'Final Assessment: Course Summary and Reflection'
            END,
            'description', 'Week ' || week_num || ' content',
            'selectedActivity', 'academic', -- All weeks have an activity selected
            'submissions', jsonb_build_object(
                'academic', jsonb_build_object(
                    'answers', jsonb_build_object('q1', 1, 'q2', 2, 'q3', 'Sample answer'),
                    'submittedDate', NOW() - (week_num || ' days')::INTERVAL,
                    'score', 85 + (week_num % 15), -- Scores between 85-99
                    'totalPoints', 100,
                    'percentage', 85 + (week_num % 15),
                    'grade', CASE 
                        WHEN (85 + (week_num % 15)) >= 90 THEN 'A'
                        WHEN (85 + (week_num % 15)) >= 80 THEN 'B'
                        ELSE 'C'
                    END,
                    'history', jsonb_build_array(
                        jsonb_build_object(
                            'score', 75 + (week_num % 20),
                            'totalPoints', 100,
                            'submittedDate', NOW() - (week_num || ' days')::INTERVAL
                        ),
                        jsonb_build_object(
                            'score', 85 + (week_num % 15),
                            'totalPoints', 100,
                            'submittedDate', NOW() - (week_num || ' days')::INTERVAL
                        )
                    )
                ),
                'builder', jsonb_build_object(
                    'fileName', 'Week' || week_num || '_Project.java',
                    'fileSize', 5000 + (week_num * 100),
                    'submittedDate', NOW() - (week_num || ' days')::INTERVAL,
                    'type', 'file',
                    'score', 38 + (week_num % 2),
                    'totalPoints', 40,
                    'percentage', 95 + (week_num % 5),
                    'grade', 'A',
                    'rubric', jsonb_build_array(
                        jsonb_build_object('criterion', 'Functionality', 'points', 38, 'maxPoints', 40, 'feedback', 'Excellent implementation'),
                        jsonb_build_object('criterion', 'Code Quality', 'points', 29, 'maxPoints', 30, 'feedback', 'Clean and well-structured'),
                        jsonb_build_object('criterion', 'Testing', 'points', 28, 'maxPoints', 30, 'feedback', 'Comprehensive test coverage')
                    )
                ),
                'communicator', jsonb_build_object(
                    'link', 'https://docs.google.com/presentation/d/week' || week_num || '_presentation',
                    'submittedDate', NOW() - (week_num || ' days')::INTERVAL,
                    'type', 'link',
                    'score', 95,
                    'totalPoints', 100,
                    'grade', 'A'
                ),
                'lecture_notes', jsonb_build_object(
                    'fileName', 'Week' || week_num || '_Notes.pdf',
                    'fileSize', 200000,
                    'submittedDate', NOW() - (week_num || ' days')::INTERVAL,
                    'feedback', jsonb_build_object(
                        'completeness', 9,
                        'accuracy', 9,
                        'organization', 8,
                        'overall', 'Excellent notes with good coverage of key concepts'
                    )
                )
            )
        );

        all_weeks := all_weeks || jsonb_build_array(week_data);
    END LOOP;

    -- Insert or update the course
    INSERT INTO user_courses (user_id, course_title, course_id, weeks)
    VALUES (alice_user_id, course_title, course_id, all_weeks)
    ON CONFLICT (user_id, course_id) 
    DO UPDATE SET 
        weeks = all_weeks,
        updated_at = NOW();

    RAISE NOTICE 'Created complete CS 102 course for Alice Johnson with 13 weeks';

    -- Also populate test attempts for each week
    FOR week_num IN 1..13 LOOP
        -- Insert 2-3 test attempts per week
        FOR i IN 1..(2 + (week_num % 2)) LOOP
            INSERT INTO test_attempts (user_id, course_id, week, answers, score, total_points, percentage, submitted_at)
            VALUES (
                alice_user_id,
                course_id,
                week_num,
                jsonb_build_object(
                    'q1', (week_num + i) % 4,
                    'q2', (week_num + i + 1) % 4,
                    'q3', 'Sample answer for week ' || week_num || ' attempt ' || i,
                    'q4', (week_num + i + 2) % 4,
                    'q5', 'Another answer'
                ),
                70 + (week_num % 20) + (i * 5), -- Scores improve with attempts
                100,
                70 + (week_num % 20) + (i * 5),
                NOW() - ((week_num * 7 + i) || ' days')::INTERVAL
            );
        END LOOP;
    END LOOP;

    RAISE NOTICE 'Populated test attempts for all weeks';

    -- Add some tags to Alice
    INSERT INTO user_tags (user_id, tag)
    VALUES 
        (alice_user_id, 'p7'),
        (alice_user_id, 'Independent study'),
        (alice_user_id, '2027')
    ON CONFLICT (user_id, tag) DO NOTHING;

    -- Create some sessions for Alice
    FOR i IN 1..30 LOOP
        INSERT INTO user_sessions (user_id, session_start, session_end, duration_minutes, page_path)
        VALUES (
            alice_user_id,
            NOW() - (random() * INTERVAL '28 days'),
            NOW() - (random() * INTERVAL '28 days') + (60 + random() * 120 || ' minutes')::INTERVAL,
            60 + floor(random() * 120)::INTEGER,
            CASE floor(random() * 3)::INTEGER
                WHEN 0 THEN '/dashboard'
                WHEN 1 THEN '/ellis'
                ELSE '/weekly'
            END
        )
        ;
    END LOOP;

    RAISE NOTICE 'Created session data for Alice';

    -- Create some cheating flags (just a couple for demonstration)
    INSERT INTO cheating_flags (user_id, course_id, week, activity_type, flag_type, details, severity)
    VALUES 
        (alice_user_id, course_id, 3, 'academic', 'tab_switch', jsonb_build_object('count', 2, 'details', 'Minor tab switching detected'), 'low'),
        (alice_user_id, course_id, 7, 'builder', 'suspicious_timing', jsonb_build_object('time_spent', 30000, 'details', 'Completed very quickly'), 'medium')
    ;

    RAISE NOTICE '✅ Alice Johnson course fully populated!';
END $$;

