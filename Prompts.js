export const GENERATE_PLAN_PROMPT = (topic) => `
    Generate a 9-week independent study plan for a high school student learning "${topic}".
    
    CRITICAL REQUIREMENT: All resources MUST be 100% FREE.
    - Prioritize high-quality YouTube playlists/videos.
    - Use official free documentation.
    - NO paid courses.

    For EACH of the 9 weeks, provide a specific topic and THREE distinct "Ellis Activity" options for the student to choose from to demonstrate their learning:
    1. Project (Builder): A hands-on coding task.
    2. Test (Academic): A self-assessment or quiz concept.
    3. Presentation (Communicator): A topic to present or teach back.

    Return ONLY a raw JSON array of objects (no markdown).
    Structure:
    [
      {
        "week": 1,
        "topic": "Topic Title",
        "description": "What they will learn",
        "resources": [ { "title": "Resource Name", "url": "URL" } ],
        "activities": {
          "project": "Description of the project option",
          "test": "Description of the test option",
          "presentation": "Description of the presentation option"
        }
      },
      ...
    ]
`;

export const IDEA_GENERATION_PROMPT = (profile, availableCoursesList) => `
    ${profile}
    
    Here is a list of available courses/projects:
    ${availableCoursesList}

    Based on the student's profile, select the top 3-4 most suitable courses from the list above.
    
    Rules:
    1. If they have taken AP CSA, prioritize Intermediate/Advanced topics.
    2. If they like Math (8+), prioritize DSA, Discrete Math, or ML.
    3. If they like Art/Design, prioritize Web Design, UI/UX, or Frontend.
    4. If they like Games, prioritize Unity or Godot.
    5. If they are a beginner (no AP CSA), prioritize Intro courses.

    Return ONLY a raw JSON array of objects (no markdown) with this structure:
    [
      {
        "title": "Exact Title from List",
        "description": "A custom 1-sentence pitch to this specific student explaining why this is a good fit.",
        "difficulty": "Difficulty from List",
        "tags": ["Tag1", "Tag2"],
        "type": "premade" or "generated" // Must match the list
      },
      ...
    ]
`;
