# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key from Settings > API

## 2. Set Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

## 3. Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase_schema.sql`
4. Run the SQL script

This will create:
- `user_courses` table
- Row Level Security policies
- Indexes for performance
- Automatic timestamp updates

## 4. Configure Authentication Settings (IMPORTANT for Demo Account)

**CRITICAL:** For the demo account to work immediately without email confirmation:

1. Go to your Supabase Dashboard → Authentication → Settings
2. Under "Email Auth", find "Enable email confirmations"
3. **DISABLE this setting** (uncheck the box)
4. Save changes

This allows the demo account to work immediately without requiring email verification.

### Alternative: Create Demo Account Manually

If you prefer to create the demo account manually:

1. Go to Authentication > Users in Supabase dashboard
2. Click "Add User" > "Create new user"
3. Email: `demo@gvcs.com`
4. Password: `demo123456`
5. **Check "Auto Confirm User"** (this bypasses email confirmation)
6. User Metadata (optional):
   ```json
   {
     "name": "Demo Student",
     "isDemo": true
   }
   ```

**Note:** The demo account will be automatically created when you click "Try Demo Account" in the login modal, but it will only work immediately if email confirmations are disabled.

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Click "Student Login" > "Try Demo Account"
3. Navigate to Ellis Generator
4. Select "CS 301: Design & Analysis of Algorithms"
5. Click "Add to My Courses"
6. Go to "My Courses" to see your course

## Database Schema

### user_courses table

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to auth.users)
- `course_title` (TEXT)
- `course_id` (TEXT, e.g., "CS_301")
- `weeks` (JSONB) - Array of week objects with:
  - `week` (number)
  - `topic` (string)
  - `description` (string)
  - `resources` (array)
  - `deliverables` (object with builder, academic, communicator)
  - `selected_activity` (string or null)
  - `submissions` (object with builder, academic, communicator)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

## Security

Row Level Security (RLS) is enabled. Users can only:
- View their own courses
- Insert their own courses
- Update their own courses
- Delete their own courses

