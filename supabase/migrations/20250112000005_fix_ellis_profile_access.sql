-- Migration: Fix Ellis access to view all profiles

DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
CREATE POLICY "Admins can view all profiles"
    ON user_profiles FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'admin@gvcs.com' OR
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );



