import { CURRICULUM_DATA } from '../CurriculumData';

// Generate POTENTIAL_COURSES from CURRICULUM_DATA
export const POTENTIAL_COURSES = Object.keys(CURRICULUM_DATA).map(title => {
    const course = CURRICULUM_DATA[title];
    return {
        title,
        type: "premade",
        difficulty: course.tier === 1 ? "Intermediate" : course.tier === 2 ? "Advanced" : "Expert",
        tags: [],
        tier: course.tier,
        description: course.description,
        prereqs: course.prereqs || []
    };
});
