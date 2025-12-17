import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Icons } from '../common/Icons';

const LectureNotesSection = ({ week, weekIndex, course }) => {
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState('');
    const hasSubmission = week.submissions?.lecture_notes;

    const extractTextFromPDF = async (file) => {
        // For now, we'll use a simple approach - in production, you'd use pdf-parse or PDF.js
        // This is a placeholder that will need proper PDF parsing
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Note: This is a simplified approach. For production, use a proper PDF parser
                // For now, we'll return a placeholder - you'll need to implement actual PDF parsing
                resolve("PDF text extraction - implement with pdf-parse or PDF.js");
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    };

    const analyzeNotesWithGemini = async (notesText, weekActivities) => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        // Build the activities context
        const activitiesContext = `
Week Activities:
- Builder Activity: ${weekActivities.builder?.title || 'N/A'}
  Description: ${weekActivities.builder?.description || 'N/A'}
  Key Requirements: ${weekActivities.builder?.guidelines?.join('; ') || 'N/A'}

- Academic Activity: ${weekActivities.academic?.title || 'N/A'}
  Description: ${weekActivities.academic?.description || 'N/A'}
  Key Requirements: ${weekActivities.academic?.guidelines?.join('; ') || 'N/A'}

- Communicator Activity: ${weekActivities.communicator?.title || 'N/A'}
  Description: ${weekActivities.communicator?.description || 'N/A'}
  Key Requirements: ${weekActivities.communicator?.guidelines?.join('; ') || 'N/A'}
`;

        const prompt = `You are an educational assistant helping a student improve their lecture notes. 

STUDENT'S NOTES:
${notesText}

WEEK'S ACTIVITIES (what the student needs to know):
${activitiesContext}

Your task:
1. Analyze the student's notes for completeness against the week's activities
2. Identify missing key concepts that are needed for the activities
3. Identify any misunderstandings or incorrect information
4. Provide constructive feedback

IMPORTANT RULES:
- DO NOT reveal specific test questions or answers
- DO NOT tell them what will be on the test
- Focus on gaps in understanding that would prevent success in the activities
- Be encouraging and constructive
- Format your response as follows:

Completeness Score: [0-100]%

✅ Well Covered:
- [List concepts that are well covered]

⚠️ Partially Covered:
- [List concepts that need more detail]

❌ Missing Topics:
- [List important concepts that are missing]

💡 Recommendations:
- [Specific suggestions for improvement]

🔍 Potential Misunderstandings:
- [Any incorrect information or misconceptions found]

Provide your analysis:`;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Gemini API error:', error);
            throw new Error('Failed to analyze notes. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            setError('Please select a PDF file');
            return;
        }

        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file');
            return;
        }

        setIsUploading(true);
        setIsAnalyzing(true);
        setError('');
        setAnalysisResult(null);

        try {
            // Extract text from PDF (simplified - needs proper implementation)
            const notesText = await extractTextFromPDF(file);

            // Get week activities
            const weekActivities = week.deliverables || {};

            // Analyze with Gemini
            const analysis = await analyzeNotesWithGemini(notesText, weekActivities);

            setAnalysisResult(analysis);
            
            // Store submission
            const updated = { ...course };
            if (!updated.weeks[weekIndex].submissions) {
                updated.weeks[weekIndex].submissions = { builder: null, academic: null, communicator: null, lecture_notes: null };
            }
            updated.weeks[weekIndex].submissions.lecture_notes = {
                fileName: file.name,
                fileSize: file.size,
                submittedDate: new Date().toISOString(),
                analysis: analysis,
                completenessScore: extractScore(analysis)
            };
        } catch (err) {
            console.error('Error analyzing notes:', err);
            setError(err.message || 'Failed to analyze notes. Please try again.');
        } finally {
            setIsUploading(false);
            setIsAnalyzing(false);
        }
    };

    const extractScore = (analysisText) => {
        const match = analysisText.match(/Completeness Score:\s*(\d+)%/);
        return match ? parseInt(match[1]) : null;
    };

    if (hasSubmission) {
        return (
            <div className="space-y-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-green-800">✓ Lecture Notes Submitted</h3>
                        {hasSubmission.completenessScore && (
                            <span className="text-lg font-bold text-green-700">
                                Score: {hasSubmission.completenessScore}%
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-green-600 mb-2">File: {hasSubmission.fileName}</p>
                    <p className="text-sm text-green-600">Submitted {new Date(hasSubmission.submittedDate).toLocaleDateString()}</p>
                </div>

                {hasSubmission.analysis && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-bold mb-3">Analysis Feedback</h4>
                        <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm text-gray-700">
                            {hasSubmission.analysis}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <Icons.Link className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-800">Lecture Notes Checker</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
                <strong>Optional:</strong> Upload your lecture notes (PDF) to get feedback on completeness and identify any gaps in your understanding. 
                This is a helpful tool if you took notes - there is <strong>no length requirement</strong>. Submit whatever notes you have.
            </p>

            {week.deliverables?.lecture_notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Note-Taking Guidelines:</h4>
                    <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                        {week.deliverables.lecture_notes.guidelines.map((guideline, i) => (
                            <li key={i}>{guideline}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload Lecture Notes (PDF)
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".pdf"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                        disabled={isUploading || isAnalyzing}
                    />
                </div>

                {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isUploading || isAnalyzing}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isAnalyzing ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing Notes...
                        </>
                    ) : isUploading ? (
                        'Uploading...'
                    ) : (
                        <>
                            <Icons.Link className="w-5 h-5" />
                            Upload and Analyze Notes
                        </>
                    )}
                </button>
            </form>

            {analysisResult && (
                <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold mb-3">Analysis Results</h4>
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm text-gray-700">
                        {analysisResult}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LectureNotesSection;


