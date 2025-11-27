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

-- Add user_profiles table for account info
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
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
CREATE TABLE IF NOT EXISTS user_problem_statuses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_url TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('attempted', 'solved', 'dnf')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, problem_url)
);

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

-- Note: Demo account should be created manually or via Supabase dashboard
-- Email: demo@gvcs.com
-- Password: demo123456
-- You can create this user via Supabase Auth dashboard or by running the signup in the app

