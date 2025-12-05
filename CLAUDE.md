# Project Context - GVCS Club Website

## Tech Stack
- React + Vite
- Tailwind CSS
- Supabase (auth & database)
- Google Generative AI (Gemini) for curriculum generation
- React Router for navigation

## Refactoring Completed!
The massive ClubWebsite.jsx (~3000+ lines) has been fully extracted into modular components. The main entry point is now `App.jsx` (185 lines) which serves as just the router.

## File Structure
```
App.jsx (185 lines) - Main router and auth logic
main.jsx - App entry point
CurriculumData.js - Course curriculum definitions
ChallengeData.js - LeetCode and USACO problem pools
Prompts.js - AI prompt templates

components/
├── admin/
│   └── AdminPanel.jsx (340 lines)
├── articles/
│   └── WhyZuhaadLikesRustArticle.jsx
├── auth/
│   └── LoginModal.jsx
├── common/
│   ├── Header.jsx
│   └── Icons.jsx
├── context/
│   └── NotificationContext.jsx
├── dashboard/
│   ├── AccountInfoSection.jsx (121 lines)
│   ├── AdminMeetingView.jsx (77 lines)
│   ├── Dashboard.jsx (669 lines) - Main dashboard
│   ├── DailyProblemSidebar.jsx
│   ├── EventList.jsx
│   ├── HackathonsSection.jsx (99 lines)
│   ├── InteractiveWeekView.jsx (270 lines)
│   ├── MyPlans.jsx (115 lines)
│   └── WeekDetailView.jsx (144 lines)
├── ellis/
│   ├── AcademicTestSection.jsx (240 lines)
│   ├── BuilderProjectSection.jsx (250 lines)
│   ├── CommunicatorPresentationSection.jsx (183 lines)
│   ├── CurriculumMap.jsx
│   ├── EllisActivityCard.jsx
│   └── EllisGenerator.jsx (679 lines)
├── hackathon/
│   ├── HackathonProgramWizard.jsx (1182 lines)
│   └── HackathonProgramView.jsx (392 lines)
└── views/
    ├── CareerPathwaysView.jsx (416 lines)
    ├── HackathonHubView.jsx (866 lines)
    ├── HomeView.jsx (450 lines)
    ├── MeetingArchiveView.jsx
    ├── ResourcesView.jsx
    └── WeeklyActivitiesView.jsx (342 lines)

utils/
├── schoolDays.js - School day calculations
├── supabase.js - Supabase client
└── potentialCourses.js - Course data generation
```

## Component Summary

### Ellis (Curriculum) Components → `components/ellis/`
- `EllisGenerator.jsx` - AI-powered curriculum generator
- `CurriculumMap.jsx` - Visual curriculum tier display
- `EllisActivityCard.jsx` - Activity card with builder/academic/communicator types
- `AcademicTestSection.jsx` - Academic test/quiz submissions
- `BuilderProjectSection.jsx` - Builder project submissions
- `CommunicatorPresentationSection.jsx` - Presentation submissions

### Dashboard Components → `components/dashboard/`
- `Dashboard.jsx` - Main user dashboard with courses, progress, hackathons
- `AccountInfoSection.jsx` - User profile section
- `HackathonsSection.jsx` - Hackathon list in dashboard
- `WeekDetailView.jsx` - Week detail container with tabs
- `InteractiveWeekView.jsx` - Interactive week view with submissions
- `AdminMeetingView.jsx` - Admin meeting controls
- `MyPlans.jsx` - Saved plans view
- `DailyProblemSidebar.jsx` - Daily problem widget
- `EventList.jsx` - Event list component

### View Components → `components/views/`
- `HomeView.jsx` - Homepage with hero, tech radar, 3D pillars
- `HackathonHubView.jsx` - Hackathon registration and teams
- `CareerPathwaysView.jsx` - Career path exploration
- `WeeklyActivitiesView.jsx` - Weekly problem tracking
- `ResourcesView.jsx` - Learning resources page
- `MeetingArchiveView.jsx` - Past meeting archive

### Hackathon Components → `components/hackathon/`
- `HackathonProgramWizard.jsx` - Multi-step hackathon project creation wizard
- `HackathonProgramView.jsx` - Individual hackathon project view

### Admin Components → `components/admin/`
- `AdminPanel.jsx` - Admin controls and management

### Common Components → `components/common/`
- `Header.jsx` - Navigation header
- `Icons.jsx` - Icon components

### Other
- `components/context/NotificationContext.jsx` - Toast notifications
- `components/auth/LoginModal.jsx` - Authentication modal
- `components/articles/WhyZuhaadLikesRustArticle.jsx` - Article component

## Notes
- Dev server runs on localhost:5174 (or next available port)
- `npm run dev` to start development server
- All components follow React functional component patterns
- Uses Tailwind CSS for styling
