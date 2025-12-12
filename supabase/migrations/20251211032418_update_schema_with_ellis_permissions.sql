-- Fix user_problem_statuses table structure if it exists with problem_id
DO $$
BEGIN
    -- If table exists with problem_id column, rename it to problem_url
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_problem_statuses' 
        AND column_name = 'problem_id'
    ) THEN
        ALTER TABLE user_problem_statuses RENAME COLUMN problem_id TO problem_url;
    END IF;
END $$;

-- Add Ellis (Teacher) permissions to view all courses
DROP POLICY IF EXISTS "Ellis can view all courses" ON user_courses;
CREATE POLICY "Ellis can view all courses"
    ON user_courses FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true OR
        (auth.jwt() -> 'user_metadata' ->> 'role')::text = 'teacher'
    );


