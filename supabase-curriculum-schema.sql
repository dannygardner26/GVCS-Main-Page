-- GVCS Curriculum Database Schema
-- Moves curriculum from CurriculumData.js to database
-- Supports MIT OCW textbook-style course structure

-- ============================================
-- CORE CURRICULUM TABLES
-- ============================================

-- Courses: Main course definitions
CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_code TEXT UNIQUE NOT NULL,           -- e.g., "CS 102"
    title TEXT NOT NULL,                         -- e.g., "Data Structures & Algorithms"
    full_title TEXT GENERATED ALWAYS AS (course_code || ': ' || title) STORED,
    description TEXT,
    tier INTEGER NOT NULL DEFAULT 1,             -- 1=Gatekeeper, 2=Foundation, 3=Specialization
    prereqs TEXT[] DEFAULT ARRAY[]::TEXT[],      -- Array of course_codes
    nice_to_have TEXT[] DEFAULT ARRAY[]::TEXT[], -- Optional prereqs
    mit_anchor TEXT,                             -- e.g., "6.006 Introduction to Algorithms"
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MIT OCW Textbooks: Define the core textbook/PDF resources for a course
CREATE TABLE IF NOT EXISTS mit_textbooks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,                         -- e.g., "Introduction to Algorithms (CLRS)"
    short_name TEXT,                             -- e.g., "CLRS" for quick reference
    pdf_url TEXT,                                -- URL to the PDF
    mit_ocw_url TEXT,                            -- MIT OpenCourseWare course page
    total_pages INTEGER,
    description TEXT,
    is_primary BOOLEAN DEFAULT false,            -- Primary textbook for the course
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Weeks: Weekly curriculum structure
CREATE TABLE IF NOT EXISTS course_weeks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    week_number INTEGER NOT NULL,
    topic TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, week_number)
);

-- ============================================
-- TEXTBOOK-STYLE READING ASSIGNMENTS
-- ============================================

-- Weekly Reading Assignments: Specific page ranges and sections
CREATE TABLE IF NOT EXISTS week_readings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    week_id UUID REFERENCES course_weeks(id) ON DELETE CASCADE NOT NULL,
    textbook_id UUID REFERENCES mit_textbooks(id) ON DELETE CASCADE NOT NULL,
    reading_order INTEGER DEFAULT 0,             -- Order to display readings
    section_title TEXT,                          -- e.g., "Chapter 3: Growth of Functions"
    page_start INTEGER,
    page_end INTEGER,
    description TEXT,                            -- e.g., "Focus on Big-O notation definitions"
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weekly Exercises: Specific problems/exercises from the textbook
CREATE TABLE IF NOT EXISTS week_exercises (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    week_id UUID REFERENCES course_weeks(id) ON DELETE CASCADE NOT NULL,
    textbook_id UUID REFERENCES mit_textbooks(id) ON DELETE CASCADE,
    exercise_order INTEGER DEFAULT 0,
    exercise_ref TEXT NOT NULL,                  -- e.g., "Exercise 3.1-4" or "Problem 31.2"
    page_number INTEGER,
    description TEXT,                            -- What the exercise covers
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SUPPLEMENTARY RESOURCES
-- ============================================

-- Week Resources: Videos, articles, external links
CREATE TABLE IF NOT EXISTS week_resources (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    week_id UUID REFERENCES course_weeks(id) ON DELETE CASCADE NOT NULL,
    resource_order INTEGER DEFAULT 0,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('video', 'article', 'pdf', 'tool', 'lecture')),
    duration_minutes INTEGER,                    -- For videos
    description TEXT,
    is_required BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DELIVERABLES (Builder/Academic/Communicator)
-- ============================================

-- Week Deliverables: The three pathway options
CREATE TABLE IF NOT EXISTS week_deliverables (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    week_id UUID REFERENCES course_weeks(id) ON DELETE CASCADE NOT NULL,
    pathway TEXT NOT NULL CHECK (pathway IN ('builder', 'academic', 'communicator')),
    title TEXT NOT NULL,
    description TEXT,
    guidelines TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(week_id, pathway)
);

-- Template Files: For builder projects that have downloadable templates
CREATE TABLE IF NOT EXISTS deliverable_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    deliverable_id UUID REFERENCES week_deliverables(id) ON DELETE CASCADE NOT NULL,
    filename TEXT NOT NULL,
    content TEXT NOT NULL,                       -- The actual template code
    language TEXT,                               -- e.g., "java", "python"
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE mit_textbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE week_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE week_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE week_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE week_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverable_templates ENABLE ROW LEVEL SECURITY;

-- Everyone can read curriculum (it's public content)
CREATE POLICY "public_read_courses" ON courses FOR SELECT USING (true);
CREATE POLICY "public_read_textbooks" ON mit_textbooks FOR SELECT USING (true);
CREATE POLICY "public_read_weeks" ON course_weeks FOR SELECT USING (true);
CREATE POLICY "public_read_readings" ON week_readings FOR SELECT USING (true);
CREATE POLICY "public_read_exercises" ON week_exercises FOR SELECT USING (true);
CREATE POLICY "public_read_resources" ON week_resources FOR SELECT USING (true);
CREATE POLICY "public_read_deliverables" ON week_deliverables FOR SELECT USING (true);
CREATE POLICY "public_read_templates" ON deliverable_templates FOR SELECT USING (true);

-- Only admins can modify (we'll handle this in the app layer for now)
-- You can add admin-specific policies later using a user_roles table

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_course_weeks_course ON course_weeks(course_id);
CREATE INDEX IF NOT EXISTS idx_week_readings_week ON week_readings(week_id);
CREATE INDEX IF NOT EXISTS idx_week_exercises_week ON week_exercises(week_id);
CREATE INDEX IF NOT EXISTS idx_week_resources_week ON week_resources(week_id);
CREATE INDEX IF NOT EXISTS idx_week_deliverables_week ON week_deliverables(week_id);

-- ============================================
-- HELPER VIEWS
-- ============================================

-- Full week view with all related data
CREATE OR REPLACE VIEW week_full_view AS
SELECT
    cw.id as week_id,
    cw.week_number,
    cw.topic,
    cw.description as week_description,
    c.course_code,
    c.title as course_title,
    c.full_title,
    c.tier
FROM course_weeks cw
JOIN courses c ON c.id = cw.course_id
ORDER BY c.tier, c.course_code, cw.week_number;
