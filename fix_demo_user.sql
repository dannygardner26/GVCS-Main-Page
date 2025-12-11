-- Quick fix: Ensure demo user profile exists
-- Run this in Supabase SQL Editor if demo user is not visible to Ellis

DO $$
DECLARE
    demo_user_id UUID;
BEGIN
    -- Find demo user from auth.users
    SELECT id INTO demo_user_id
    FROM auth.users
    WHERE email = 'demo@gvcs.com'
    LIMIT 1;

    IF demo_user_id IS NOT NULL THEN
        -- Create or update profile
        INSERT INTO user_profiles (user_id, display_name, grade_level, graduation_year)
        VALUES (demo_user_id, 'Demo Student', '10th', 2027)
        ON CONFLICT (user_id) DO UPDATE SET
            display_name = 'Demo Student',
            grade_level = COALESCE(user_profiles.grade_level, '10th'),
            graduation_year = COALESCE(user_profiles.graduation_year, 2027);

        RAISE NOTICE '✅ Demo user profile created/updated: %', demo_user_id;
    ELSE
        RAISE NOTICE '⚠️ Demo user not found. Log in as demo user first to create the account.';
    END IF;
END $$;

