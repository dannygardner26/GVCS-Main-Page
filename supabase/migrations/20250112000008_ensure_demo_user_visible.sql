-- Migration: Ensure demo user is visible to admins/Ellis
-- This ensures the demo user profile exists and is accessible

DO $$
DECLARE
    demo_user_id UUID;
BEGIN
    -- Try to find demo user from auth.users
    SELECT id INTO demo_user_id
    FROM auth.users
    WHERE email = 'demo@gvcs.com'
    LIMIT 1;

    IF demo_user_id IS NOT NULL THEN
        -- Ensure profile exists
        INSERT INTO user_profiles (user_id, display_name, grade_level, graduation_year)
        VALUES (demo_user_id, 'Demo Student', '10th', 2027)
        ON CONFLICT (user_id) DO UPDATE SET
            display_name = 'Demo Student',
            grade_level = COALESCE(user_profiles.grade_level, '10th'),
            graduation_year = COALESCE(user_profiles.graduation_year, 2027);

        RAISE NOTICE 'Demo user profile ensured: %', demo_user_id;
    ELSE
        RAISE NOTICE 'Demo user not found in auth.users. Will be created when demo login is used.';
    END IF;
END $$;


