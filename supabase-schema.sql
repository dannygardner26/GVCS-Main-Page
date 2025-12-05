-- GVCS Club Website - Supabase Schema
-- Copy ALL of this and paste into Supabase SQL Editor
-- Make sure to clear any previous text in the editor first!

DROP TABLE IF EXISTS hackathon_registrations CASCADE;
DROP TABLE IF EXISTS hackathon_teams CASCADE;
DROP TABLE IF EXISTS hackathon_programs CASCADE;
DROP TABLE IF EXISTS user_problem_statuses CASCADE;
DROP TABLE IF EXISTS weekly_activities CASCADE;
DROP TABLE IF EXISTS user_courses CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    display_name TEXT,
    bio TEXT,
    grade_level TEXT,
    graduation_year INTEGER,
    interests TEXT[] DEFAULT ARRAY[]::TEXT[],
    skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id TEXT NOT NULL,
    course_title TEXT NOT NULL,
    weeks JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE weekly_activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    week_number INTEGER NOT NULL,
    school_year INTEGER NOT NULL,
    problem_type TEXT NOT NULL,
    problem_title TEXT NOT NULL,
    problem_url TEXT,
    status TEXT DEFAULT 'not_attempted',
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, week_number, school_year, problem_type, problem_title)
);

CREATE TABLE user_problem_statuses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    problem_id TEXT NOT NULL,
    problem_type TEXT NOT NULL,
    status TEXT DEFAULT 'not_attempted',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, problem_id, problem_type)
);

CREATE TABLE hackathon_programs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    hackathon_name TEXT NOT NULL,
    hackathon_date DATE,
    current_step INTEGER DEFAULT 0,
    team_members JSONB DEFAULT '[]',
    project_idea TEXT,
    project_description TEXT,
    tech_stack JSONB DEFAULT '[]',
    tasks JSONB DEFAULT '[]',
    timeline JSONB DEFAULT '[]',
    resources JSONB DEFAULT '[]',
    notes TEXT,
    step_data JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE hackathon_teams (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    hackathon_id TEXT NOT NULL,
    team_name TEXT NOT NULL,
    team_code TEXT UNIQUE NOT NULL,
    leader_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    members UUID[] DEFAULT ARRAY[]::UUID[],
    max_members INTEGER DEFAULT 4,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE hackathon_registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    hackathon_id TEXT NOT NULL,
    team_id UUID REFERENCES hackathon_teams(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'registered',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, hackathon_id)
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_problem_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_profile" ON user_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_courses" ON user_courses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_activities" ON weekly_activities FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_statuses" ON user_problem_statuses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_programs" ON hackathon_programs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_registrations" ON hackathon_registrations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "view_registrations" ON hackathon_registrations FOR SELECT USING (true);
CREATE POLICY "view_teams" ON hackathon_teams FOR SELECT USING (true);
CREATE POLICY "leaders_manage_teams" ON hackathon_teams FOR ALL USING (auth.uid() = leader_id);
