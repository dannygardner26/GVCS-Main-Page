-- Supabase Database Schema for GVCS My Courses

-- Create user_courses table
CREATE TABLE IF NOT EXISTS user_courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_title TEXT NOT NULL,
    course_id TEXT NOT NULL,
    weeks JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_course_id ON user_courses(course_id);

-- Enable Row Level Security
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Users can view their own courses" ON user_courses;
DROP POLICY IF EXISTS "Users can insert their own courses" ON user_courses;
DROP POLICY IF EXISTS "Users can update their own courses" ON user_courses;
DROP POLICY IF EXISTS "Users can delete their own courses" ON user_courses;

-- Create policy: Users can only see their own courses
CREATE POLICY "Users can view their own courses"
    ON user_courses FOR SELECT
    USING (auth.uid() = user_id);

-- Create policy: Users can insert their own courses
CREATE POLICY "Users can insert their own courses"
    ON user_courses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own courses
CREATE POLICY "Users can update their own courses"
    ON user_courses FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can delete their own courses
CREATE POLICY "Users can delete their own courses"
    ON user_courses FOR DELETE
    USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_user_courses_updated_at ON user_courses;
CREATE TRIGGER update_user_courses_updated_at
    BEFORE UPDATE ON user_courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add hackathon_programs table
CREATE TABLE IF NOT EXISTS hackathon_programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    hackathon_name TEXT NOT NULL,
    hackathon_date DATE,
    tracks TEXT[],
    team_members TEXT[],
    discord_link TEXT,
    current_step INTEGER DEFAULT 0,
    finalized_idea TEXT,
    master_document TEXT,
    ideation_prompt TEXT,
    master_document_prompt TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hackathon_programs_user_id ON hackathon_programs(user_id);

ALTER TABLE hackathon_programs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Users can view their own hackathons" ON hackathon_programs;
DROP POLICY IF EXISTS "Users can insert their own hackathons" ON hackathon_programs;
DROP POLICY IF EXISTS "Users can update their own hackathons" ON hackathon_programs;
DROP POLICY IF EXISTS "Users can delete their own hackathons" ON hackathon_programs;

CREATE POLICY "Users can view their own hackathons"
    ON hackathon_programs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own hackathons"
    ON hackathon_programs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own hackathons"
    ON hackathon_programs FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own hackathons"
    ON hackathon_programs FOR DELETE
    USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_hackathon_programs_updated_at ON hackathon_programs;
CREATE TRIGGER update_hackathon_programs_updated_at
    BEFORE UPDATE ON hackathon_programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create weekly_activities table to track user progress on weekly problems
CREATE TABLE IF NOT EXISTS weekly_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL,
    school_year INTEGER NOT NULL,
    problem_type TEXT NOT NULL CHECK (problem_type IN ('leetcode', 'usaco', 'codeforces')),
    problem_title TEXT NOT NULL,
    problem_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'not_attempted' CHECK (status IN ('not_attempted', 'viewed', 'completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, week_number, school_year, problem_type, problem_title)
);

CREATE INDEX IF NOT EXISTS idx_weekly_activities_user_id ON weekly_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_weekly_activities_week ON weekly_activities(week_number, school_year);

ALTER TABLE weekly_activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own weekly activities" ON weekly_activities;
DROP POLICY IF EXISTS "Users can insert their own weekly activities" ON weekly_activities;
DROP POLICY IF EXISTS "Users can update their own weekly activities" ON weekly_activities;
DROP POLICY IF EXISTS "Users can delete their own weekly activities" ON weekly_activities;

CREATE POLICY "Users can view their own weekly activities"
    ON weekly_activities FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own weekly activities"
    ON weekly_activities FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weekly activities"
    ON weekly_activities FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own weekly activities"
    ON weekly_activities FOR DELETE
    USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_weekly_activities_updated_at ON weekly_activities;
CREATE TRIGGER update_weekly_activities_updated_at
    BEFORE UPDATE ON weekly_activities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add user_profiles table for account info
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    bio TEXT,
    grade_level TEXT,
    graduation_year INTEGER,
    interests TEXT[],
    skills TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

CREATE POLICY "Users can view their own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add user_problem_statuses table for tracking daily challenge problem statuses
-- Handle migration if table exists with old structure
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
    
    -- If table doesn't exist, create it
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_problem_statuses') THEN
        CREATE TABLE user_problem_statuses (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
            problem_url TEXT NOT NULL,
            status TEXT NOT NULL CHECK (status IN ('attempted', 'solved', 'dnf')),
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE(user_id, problem_url)
        );
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_problem_statuses_user_id ON user_problem_statuses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_problem_statuses_problem_url ON user_problem_statuses(problem_url);

ALTER TABLE user_problem_statuses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Users can view their own problem statuses" ON user_problem_statuses;
DROP POLICY IF EXISTS "Users can insert their own problem statuses" ON user_problem_statuses;
DROP POLICY IF EXISTS "Users can update their own problem statuses" ON user_problem_statuses;
DROP POLICY IF EXISTS "Users can delete their own problem statuses" ON user_problem_statuses;

CREATE POLICY "Users can view their own problem statuses"
    ON user_problem_statuses FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own problem statuses"
    ON user_problem_statuses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own problem statuses"
    ON user_problem_statuses FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own problem statuses"
    ON user_problem_statuses FOR DELETE
    USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_user_problem_statuses_updated_at ON user_problem_statuses;
CREATE TRIGGER update_user_problem_statuses_updated_at
    BEFORE UPDATE ON user_problem_statuses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Admin policies: Allow admins to view all data
-- Admin is determined by checking if email is admin@gvcs.com
-- Note: This uses auth.jwt() to get the email from the JWT token

-- Admin can view all courses
DROP POLICY IF EXISTS "Admins can view all courses" ON user_courses;
CREATE POLICY "Admins can view all courses"
    ON user_courses FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'admin@gvcs.com'
    );

-- Ellis (Teacher) can view all courses (all students' independent study work)
DROP POLICY IF EXISTS "Ellis can view all courses" ON user_courses;
CREATE POLICY "Ellis can view all courses"
    ON user_courses FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true OR
        (auth.jwt() -> 'user_metadata' ->> 'role')::text = 'teacher'
    );

-- Admin can view all hackathons
DROP POLICY IF EXISTS "Admins can view all hackathons" ON hackathon_programs;
CREATE POLICY "Admins can view all hackathons"
    ON hackathon_programs FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'admin@gvcs.com'
    );

-- Admin can view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
CREATE POLICY "Admins can view all profiles"
    ON user_profiles FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'admin@gvcs.com' OR
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );

-- Admin can view all problem statuses
DROP POLICY IF EXISTS "Admins can view all problem statuses" ON user_problem_statuses;
CREATE POLICY "Admins can view all problem statuses"
    ON user_problem_statuses FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'admin@gvcs.com'
    );

-- Add hackathon_teams table for team management (must be created first)
CREATE TABLE IF NOT EXISTS hackathon_teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    hackathon_name TEXT NOT NULL,
    team_name TEXT,
    max_members INTEGER DEFAULT 4,
    created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hackathon_teams_hackathon_name ON hackathon_teams(hackathon_name);
CREATE INDEX IF NOT EXISTS idx_hackathon_teams_created_by ON hackathon_teams(created_by);

ALTER TABLE hackathon_teams ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Users can view all teams" ON hackathon_teams;
DROP POLICY IF EXISTS "Users can insert teams" ON hackathon_teams;
DROP POLICY IF EXISTS "Users can update teams they created" ON hackathon_teams;
DROP POLICY IF EXISTS "Users can delete teams they created" ON hackathon_teams;

-- Everyone can view all teams
CREATE POLICY "Users can view all teams"
    ON hackathon_teams FOR SELECT
    USING (true);

-- Users can create teams
CREATE POLICY "Users can insert teams"
    ON hackathon_teams FOR INSERT
    WITH CHECK (auth.uid() = created_by);

-- Users can update teams they created
CREATE POLICY "Users can update teams they created"
    ON hackathon_teams FOR UPDATE
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

-- Users can delete teams they created
CREATE POLICY "Users can delete teams they created"
    ON hackathon_teams FOR DELETE
    USING (auth.uid() = created_by);

DROP TRIGGER IF EXISTS update_hackathon_teams_updated_at ON hackathon_teams;
CREATE TRIGGER update_hackathon_teams_updated_at
    BEFORE UPDATE ON hackathon_teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add hackathon_registrations table for tracking who registered for which hackathons
CREATE TABLE IF NOT EXISTS hackathon_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    hackathon_name TEXT NOT NULL,
    team_id UUID REFERENCES hackathon_teams(id) ON DELETE SET NULL,
    user_name TEXT, -- Store user's name at registration time for display
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, hackathon_name)
);

CREATE INDEX IF NOT EXISTS idx_hackathon_registrations_user_id ON hackathon_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_hackathon_registrations_hackathon_name ON hackathon_registrations(hackathon_name);
CREATE INDEX IF NOT EXISTS idx_hackathon_registrations_team_id ON hackathon_registrations(team_id);

ALTER TABLE hackathon_registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Users can view all registrations" ON hackathon_registrations;
DROP POLICY IF EXISTS "Users can insert their own registrations" ON hackathon_registrations;
DROP POLICY IF EXISTS "Users can update their own registrations" ON hackathon_registrations;
DROP POLICY IF EXISTS "Users can delete their own registrations" ON hackathon_registrations;

-- Everyone can view all registrations (to see teams)
CREATE POLICY "Users can view all registrations"
    ON hackathon_registrations FOR SELECT
    USING (true);

-- Users can only insert their own registrations
CREATE POLICY "Users can insert their own registrations"
    ON hackathon_registrations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can only update their own registrations
CREATE POLICY "Users can update their own registrations"
    ON hackathon_registrations FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own registrations
CREATE POLICY "Users can delete their own registrations"
    ON hackathon_registrations FOR DELETE
    USING (auth.uid() = user_id);

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
CREATE POLICY "Users can view their own tags"
    ON user_tags FOR SELECT
    USING (auth.uid() = user_id);

-- Admins and Ellis can view all tags
CREATE POLICY "Admins can view all tags"
    ON user_tags FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'admin@gvcs.com' OR
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );

-- Admins and Ellis can manage all tags
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
CREATE POLICY "Users can view their own sessions"
    ON user_sessions FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own sessions
CREATE POLICY "Users can insert their own sessions"
    ON user_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own sessions
CREATE POLICY "Users can update their own sessions"
    ON user_sessions FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Admins and Ellis can view all sessions
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
CREATE POLICY "Users can view their own test attempts"
    ON test_attempts FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own test attempts
CREATE POLICY "Users can insert their own test attempts"
    ON test_attempts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Ellis can view all test attempts
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
CREATE POLICY "Ellis can view all cheating flags"
    ON cheating_flags FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );

-- System can insert flags (via service role or function)
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
CREATE POLICY "Users can view their own presentation analyses"
    ON presentation_analyses FOR SELECT
    USING (auth.uid() = user_id);

-- Ellis can view all analyses
CREATE POLICY "Ellis can view all presentation analyses"
    ON presentation_analyses FOR SELECT
    USING (
        (auth.jwt() ->> 'email')::text = 'ellis@gvsd.org' OR
        (auth.jwt() -> 'user_metadata' ->> 'isTeacher')::boolean = true
    );

-- System can insert/update analyses
CREATE POLICY "System can manage presentation analyses"
    ON presentation_analyses FOR ALL
    WITH CHECK (true);

-- ===========================================
-- Default Accounts
-- ===========================================
-- These accounts are created automatically when clicking the login buttons.
-- Make sure to disable "Enable email confirmations" in Supabase Auth settings.
--
-- Demo Account:
--   Email: demo@gvcs.com
--   Password: demo123
--   Metadata: { name: 'Demo Student', isDemo: true }
--
-- Admin Account:
--   Email: admin@gvcs.com
--   Password: admin123
--   Metadata: { name: 'Admin', isAdmin: true, role: 'admin' }

