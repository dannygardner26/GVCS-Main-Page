# Creating Test Users for Mock Data

To populate the database with mock data, you need to create some test users first. Here are two ways to do it:

## Option 1: Via the App (Recommended)

1. Start your development server
2. Click "Student Login" or use the demo login
3. Create accounts with different emails (they'll be stored in `auth.users`)
4. Make sure each user has a profile in `user_profiles` (this should happen automatically)

## Option 2: Via Supabase Dashboard

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add User" and create users manually
4. For each user, make sure to create a corresponding entry in `user_profiles`:

```sql
INSERT INTO user_profiles (user_id, display_name, grade_level, graduation_year)
VALUES (
    'USER_ID_FROM_AUTH',  -- Replace with actual user ID
    'Test Student 1',
    '10th',
    2027
);
```

## After Creating Users

Once you have users, run the `populateMockData.sql` script in the Supabase SQL Editor to populate:
- Tags (p1-p7, Independent study, etc.)
- Session data (time tracking)
- Test attempts
- Cheating flags

## Quick Test User Creation Script

If you want to create test users quickly, you can use this in Supabase SQL Editor (but you'll still need to create the auth users first):

```sql
-- This assumes you have auth users - replace the UUIDs with actual user IDs
-- You can get user IDs from: SELECT id, email FROM auth.users;

-- Example (replace with real user IDs):
INSERT INTO user_profiles (user_id, display_name, grade_level, graduation_year)
VALUES 
    ('USER_ID_1', 'Alice Johnson', '10th', 2027),
    ('USER_ID_2', 'Bob Smith', '11th', 2026),
    ('USER_ID_3', 'Charlie Brown', '9th', 2028),
    ('USER_ID_4', 'Diana Prince', '12th', 2025),
    ('USER_ID_5', 'Eve Wilson', '10th', 2027)
ON CONFLICT (user_id) DO UPDATE SET display_name = EXCLUDED.display_name;
```

Then run `populateMockData.sql` to add all the mock data!

