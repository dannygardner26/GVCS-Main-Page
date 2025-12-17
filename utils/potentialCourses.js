import { CURRICULUM_DATA } from '../CurriculumData';

// Generate POTENTIAL_COURSES from CURRICULUM_DATA
export const POTENTIAL_COURSES = Object.keys(CURRICULUM_DATA).map(title => {
    const course = CURRICULUM_DATA[title];
    return {
        title,
        type: "premade",
        difficulty: course.tier === 1 ? "Intermediate" : course.tier === 2 ? "Advanced" : course.tier === 3 ? "Expert" : course.category === "language_track" ? "Intermediate" : "Unknown",
        tags: course.category === "language_track" ? [title.includes("C++") ? "C++" : "Python", "Language Track"] : [],
        tier: course.tier,
        category: course.category || null,
        description: course.description,
        prereqs: course.prereqs || [],
        mit_anchor: course.mit_anchor || null,
        mit_url: course.mit_url || null
    };
});
