# Project Context - GVCS Club Website

## Tech Stack
- React + Vite
- Tailwind CSS
- Supabase (auth & database)
- Google Generative AI (Gemini) for curriculum generation
- React Router for navigation

## Current Task
Splitting ClubWebsite.jsx into smaller, organized component files. The file was originally ~8000+ lines and has been reduced to ~5200 lines.

## Completed Extractions

### Ellis (Curriculum) Components → `components/ellis/`
- `EllisGenerator.jsx` (~707 lines) - AI-powered curriculum generator
- `CurriculumMap.jsx` - Visual curriculum tier display
- `EllisActivityCard.jsx` - Activity card with builder/academic/communicator types

### View Components → `components/views/`
- `HomeView.jsx` - Homepage with hero, tech radar, 3D pillars
- `HackathonHubView.jsx` (~860 lines) - Hackathon registration and teams
- `CareerPathwaysView.jsx` (~409 lines) - Career path exploration
- `WeeklyActivitiesView.jsx` (~337 lines) - Weekly problem tracking
- `ResourcesView.jsx` - Learning resources page
- `MeetingArchiveView.jsx` - Past meeting archive

### Common Components → `components/common/`
- `Header.jsx` - Navigation header
- `Icons.jsx` - Icon components

### Other Extracted
- `components/context/NotificationContext.jsx` - Toast notifications
- `components/auth/LoginModal.jsx` - Authentication modal
- `components/dashboard/DailyProblemSidebar.jsx` - Daily problem widget
- `components/dashboard/EventList.jsx` - Event list component
- `components/articles/WhyZuhaadLikesRustArticle.jsx` - Article component
- `utils/schoolDays.js` - School day calculations
- `utils/supabase.js` - Supabase client
- `utils/potentialCourses.js` - Course data generation

## Remaining Components to Extract from ClubWebsite.jsx

### High Priority (Large Components)
1. **HackathonProgramWizard** (~1178 lines) → `components/hackathon/HackathonProgramWizard.jsx`
   - Multi-step hackathon project creation wizard

2. **Dashboard** (~764 lines) → `components/dashboard/Dashboard.jsx`
   - User dashboard with courses, progress, hackathons
   - Dependencies: AccountInfoSection, HackathonsSection, InteractiveWeekView

3. **HackathonProgramView** (~388 lines) → `components/hackathon/HackathonProgramView.jsx`
   - Individual hackathon project view

4. **AdminPanel** (~370 lines) → `components/admin/AdminPanel.jsx`
   - Admin controls and management

### Medium Priority
- `AccountInfoSection` (~119 lines) - User profile section
- `HackathonsSection` (~93 lines) - Hackathon list in dashboard
- `AcademicTestSection` (~556 lines) - Academic test submissions
- `BuilderProjectSection` (~348 lines) - Builder project submissions
- `CommunicatorPresentationSection` (~243 lines) - Presentation submissions
- `InteractiveWeekView` (~231 lines) - Week detail view with tabs

### Lower Priority
- `WeekDetailView` (~92 lines) - Week detail container
- `LearningResourcesSection` (~45 lines) - Week resources
- `AdminMeetingView` (~61 lines) - Admin meeting controls
- `MyPlans` (~110 lines) - Saved plans view
- `useAdminProblems` hook - Admin problem management

## File Structure
```
components/
├── admin/           (to be created)
├── articles/
├── auth/
├── common/
├── context/
├── dashboard/
├── ellis/
├── hackathon/       (to be created)
└── views/
utils/
├── schoolDays.js
├── supabase.js
└── potentialCourses.js
```

## Data Files
- `CurriculumData.js` - Course curriculum definitions
- `ChallengeData.js` - LeetCode and USACO problem pools
- `Prompts.js` - AI prompt templates

## Notes
- When extracting components, check for dependencies on sibling components
- Some components (like Dashboard) depend on multiple sub-components
- Use the existing import patterns from already-extracted components as reference
- Dev server runs on localhost:5175 (ports 5173-5174 may be in use)
