import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from './supabase';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Analyze presentation PDF/link
export const analyzePresentation = async (presentationLink, rubric, weekTopic) => {
    try {
        // For now, we'll analyze the link/description
        // In production, you'd download the PDF if it's a Google Drive link
        // and extract text, or use the presentation content
        
        const prompt = `Analyze this presentation from a high school student taking an MIT-level course (${weekTopic}).

Presentation Link: ${presentationLink}

Evaluate based on this rubric:
${JSON.stringify(rubric, null, 2)}

Provide:
1. Content accuracy and understanding (0-40 points)
2. Clarity of explanation (0-25 points)
3. Visual aids quality (0-15 points)
4. Delivery/presentation skills (0-20 points)

For each criterion, provide:
- Score (points)
- Specific feedback
- Strengths
- Areas for improvement

Account for the fact this is a high school student, so be encouraging but maintain MIT-level standards. Provide constructive, specific feedback.

Return your analysis as JSON with this structure:
{
  "content_accuracy": { "score": 0-40, "feedback": "...", "strengths": [...], "improvements": [...] },
  "clarity": { "score": 0-25, "feedback": "...", "strengths": [...], "improvements": [...] },
  "visual_aids": { "score": 0-15, "feedback": "...", "strengths": [...], "improvements": [...] },
  "delivery": { "score": 0-20, "feedback": "...", "strengths": [...], "improvements": [...] },
  "overall_feedback": "...",
  "total_score": 0-100
}`;

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Try to parse JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        // Fallback: return text analysis
        return {
            analysis: text,
            total_score: 0
        };
    } catch (error) {
        console.error('Error analyzing presentation:', error);
        return {
            error: 'Failed to analyze presentation',
            analysis: null
        };
    }
};

// Analyze code submission
export const analyzeCode = async (code, language, requirements, weekTopic) => {
    try {
        const prompt = `Review this ${language} code submission from a high school student learning MIT-level algorithms (${weekTopic}).

Code:
\`\`\`${language}
${code}
\`\`\`

Requirements:
${JSON.stringify(requirements, null, 2)}

Check for:
1. Correctness and functionality (0-40 points)
2. Code quality and best practices (0-30 points)
3. Time/space complexity analysis accuracy (0-30 points)

For each criterion, provide:
- Score (points)
- Specific feedback
- Code examples of issues (if any)
- Suggestions for improvement

Be constructive and educational. This is a learning environment, so help them understand mistakes while maintaining high standards.

Return your analysis as JSON:
{
  "correctness": { "score": 0-40, "feedback": "...", "issues": [...], "suggestions": [...] },
  "code_quality": { "score": 0-30, "feedback": "...", "issues": [...], "suggestions": [...] },
  "complexity_analysis": { "score": 0-30, "feedback": "...", "issues": [...], "suggestions": [...] },
  "overall_feedback": "...",
  "total_score": 0-100,
  "plagiarism_risk": "low|medium|high",
  "plagiarism_notes": "..."
}`;

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        return {
            analysis: text,
            total_score: 0
        };
    } catch (error) {
        console.error('Error analyzing code:', error);
        return {
            error: 'Failed to analyze code',
            analysis: null
        };
    }
};

// Analyze lecture notes authenticity
export const analyzeNotesAuthenticity = async (notesText, lectureTopic, weekResources) => {
    try {
        const prompt = `Analyze these lecture notes from a high school student who watched an MIT lecture on "${lectureTopic}".

Lecture Resources:
${weekResources.map(r => `- ${r.title}: ${r.url}`).join('\n')}

Student Notes:
${notesText}

Determine:
1. Did they actually watch the lecture? (Evidence: specific examples, timestamps, personal insights, connections)
2. Effort level (1-10): Comprehensiveness, organization, detail, depth
3. Understanding gaps: Missing key concepts from the lecture
4. Authenticity score (1-10): How likely is it they genuinely took these notes while watching?

Be fair but thorough. High school students may have different note-taking styles, but there should be evidence of engagement with the lecture content. Look for:
- Specific examples mentioned in the lecture
- Personal insights or questions
- Connections to other concepts
- Evidence of active listening (not just copying slides)

Return your analysis as JSON:
{
  "watched_lecture": true|false,
  "watched_evidence": "...",
  "effort_level": 1-10,
  "effort_breakdown": {
    "comprehensiveness": 1-10,
    "organization": 1-10,
    "detail": 1-10,
    "depth": 1-10
  },
  "understanding_gaps": [...],
  "authenticity_score": 1-10,
  "authenticity_reasoning": "...",
  "feedback": "...",
  "recommendations": [...]
}`;

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        return {
            analysis: text,
            authenticity_score: 5
        };
    } catch (error) {
        console.error('Error analyzing notes:', error);
        return {
            error: 'Failed to analyze notes',
            analysis: null
        };
    }
};

// Cache presentation analysis
export const getOrAnalyzePresentation = async (userId, courseId, week, presentationLink, rubric, weekTopic) => {
    try {
        // Check if analysis exists
        const { data: existing } = await supabase
            .from('presentation_analyses')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .eq('week', week)
            .single();

        if (existing) {
            return existing.analysis;
        }

        // Perform analysis
        const analysis = await analyzePresentation(presentationLink, rubric, weekTopic);
        
        // Cache it
        await supabase
            .from('presentation_analyses')
            .upsert({
                user_id: userId,
                course_id: courseId,
                week: week,
                presentation_link: presentationLink,
                analysis: analysis,
                grade_breakdown: analysis
            });

        return analysis;
    } catch (error) {
        console.error('Error in getOrAnalyzePresentation:', error);
        return null;
    }
};



