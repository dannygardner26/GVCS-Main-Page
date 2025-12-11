-- Migration: Add Admin Features (User Tags, Sessions, Test Attempts, Cheating Flags, Presentation Analyses)
-- Date: 2025-01-12

-- ===========================================
-- Update user_profiles: Make display_name required
-- ===========================================
-- First, set default values for any NULL display_names
UPDATE user_profiles 
SET display_name = COALESCE(display_name, 'User ' || SUBSTRING(user_id::text, 1, 8))
WHERE display_name IS NULL;

-- Now make it NOT NULL
ALTER TABLE user_profiles 
    ALTER COLUMN display_name SET NOT NULL;

-- ===========================================
-- User Tags System (Many-to-Many)
-- ===========================================
CREATE TABLE IF NOT EXISTS user_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tag TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, tag)
);

CREATE INDEX IF NOT EXISTS idx_user_tags_user_id ON user_tags(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tags_tag ON user_tags(tag);

ALTER TABLE user_tags ENABLE ROW LEVEL SECURITY;

-- Users can view their own tags
DROP POLICY IF EXISTS "Users can view their own tags" ON user_tags;
CREATE POLICY "Users can view their own tags"
    ON user_tags FOR SELECT
    USING (auth.uid() = user_id);

-- Admins and Ellis can view all tags
DROP POLICY IF EXISTS "Admins can view all tags" ON user_tags;
CREATE POLICY "Admins can view all tags"
    ON user_tags FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'admin@gvcs.com' OR
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );

-- Admins and Ellis can manage all tags
DROP POLICY IF EXISTS "Admins can manage all tags" ON user_tags;
CREATE POLICY "Admins can manage all tags"
    ON user_tags FOR ALL
    USING (
        (auth.jwt() ->> 'email')::text = 'admin@gvcs.com' OR
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );

-- ===========================================
-- User Sessions (Time Tracking)
-- ===========================================
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_start TIMESTAMPTZ NOT NULL,
    session_end TIMESTAMPTZ,
    duration_minutes INTEGER,
    page_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_start ON user_sessions(session_start);

ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own sessions
DROP POLICY IF EXISTS "Users can view their own sessions" ON user_sessions;
CREATE POLICY "Users can view their own sessions"
    ON user_sessions FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own sessions
DROP POLICY IF EXISTS "Users can insert their own sessions" ON user_sessions;
CREATE POLICY "Users can insert their own sessions"
    ON user_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own sessions
DROP POLICY IF EXISTS "Users can update their own sessions" ON user_sessions;
CREATE POLICY "Users can update their own sessions"
    ON user_sessions FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Admins and Ellis can view all sessions
DROP POLICY IF EXISTS "Admins can view all sessions" ON user_sessions;
CREATE POLICY "Admins can view all sessions"
    ON user_sessions FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'admin@gvcs.com' OR
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );

-- ===========================================
-- Test Attempts (Multiple Attempts Tracking)
-- ===========================================
CREATE TABLE IF NOT EXISTS test_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL,
    week INTEGER NOT NULL,
    answers JSONB NOT NULL,
    score INTEGER,
    total_points INTEGER,
    percentage INTEGER,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_test_attempts_user_id ON test_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_test_attempts_course_week ON test_attempts(course_id, week);

ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view their own test attempts
DROP POLICY IF EXISTS "Users can view their own test attempts" ON test_attempts;
CREATE POLICY "Users can view their own test attempts"
    ON test_attempts FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own test attempts
DROP POLICY IF EXISTS "Users can insert their own test attempts" ON test_attempts;
CREATE POLICY "Users can insert their own test attempts"
    ON test_attempts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Ellis can view all test attempts
DROP POLICY IF EXISTS "Ellis can view all test attempts" ON test_attempts;
CREATE POLICY "Ellis can view all test attempts"
    ON test_attempts FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );

-- ===========================================
-- Cheating Flags
-- ===========================================
CREATE TABLE IF NOT EXISTS cheating_flags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL,
    week INTEGER NOT NULL,
    activity_type TEXT NOT NULL CHECK (activity_type IN ('academic', 'builder', 'communicator', 'lecture_notes')),
    flag_type TEXT NOT NULL CHECK (flag_type IN ('copy_paste', 'tab_switch', 'suspicious_timing', 'pattern_detection')),
    details JSONB,
    severity TEXT DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cheating_flags_user_id ON cheating_flags(user_id);
CREATE INDEX IF NOT EXISTS idx_cheating_flags_course_week ON cheating_flags(course_id, week);

ALTER TABLE cheating_flags ENABLE ROW LEVEL SECURITY;

-- Only Ellis can view cheating flags
DROP POLICY IF EXISTS "Ellis can view all cheating flags" ON cheating_flags;
CREATE POLICY "Ellis can view all cheating flags"
    ON cheating_flags FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );

-- System can insert flags (via service role or function)
DROP POLICY IF EXISTS "System can insert cheating flags" ON cheating_flags;
CREATE POLICY "System can insert cheating flags"
    ON cheating_flags FOR INSERT
    WITH CHECK (true);

-- ===========================================
-- Presentation Analyses (Cached AI Results)
-- ===========================================
CREATE TABLE IF NOT EXISTS presentation_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL,
    week INTEGER NOT NULL,
    presentation_link TEXT NOT NULL,
    analysis JSONB NOT NULL,
    grade_breakdown JSONB,
    analyzed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id, week)
);

CREATE INDEX IF NOT EXISTS idx_presentation_analyses_user_id ON presentation_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_presentation_analyses_course_week ON presentation_analyses(course_id, week);

ALTER TABLE presentation_analyses ENABLE ROW LEVEL SECURITY;

-- Users can view their own analyses
DROP POLICY IF EXISTS "Users can view their own presentation analyses" ON presentation_analyses;
CREATE POLICY "Users can view their own presentation analyses"
    ON presentation_analyses FOR SELECT
    USING (auth.uid() = user_id);

-- Ellis can view all analyses
DROP POLICY IF EXISTS "Ellis can view all presentation analyses" ON presentation_analyses;
CREATE POLICY "Ellis can view all presentation analyses"
    ON presentation_analyses FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );

-- System can insert/update analyses
DROP POLICY IF EXISTS "System can manage presentation analyses" ON presentation_analyses;
CREATE POLICY "System can manage presentation analyses"
    ON presentation_analyses FOR ALL
    WITH CHECK (true);

