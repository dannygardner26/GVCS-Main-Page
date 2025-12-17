import React, { useState, useRef } from 'react';

const CommunicatorPresentationSection = ({ week, weekIndex, course, onUpdateCourse }) => {
    const fileInputRef = useRef(null);
    const [presentationLink, setPresentationLink] = useState('');
    const [submissionType, setSubmissionType] = useState('file');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hasSubmission = week.submissions?.communicator;

    const rubric = [
        { criterion: "Content Quality", maxPoints: 30, description: "Accurate, comprehensive, well-researched content" },
        { criterion: "Clarity & Organization", maxPoints: 25, description: "Clear structure, logical flow, easy to follow" },
        { criterion: "Visual Aids", maxPoints: 20, description: "Effective use of slides, diagrams, or visuals" },
        { criterion: "Delivery", maxPoints: 15, description: "Clear speaking, appropriate pace, engagement" },
        { criterion: "Examples & Demonstrations", maxPoints: 10, description: "Relevant examples and practical demonstrations" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submissionType === 'file') {
            const file = fileInputRef.current?.files?.[0];
            if (!file) {
                alert('Please select a presentation file to submit');
                return;
            }
        } else {
            if (!presentationLink.trim()) {
                alert('Please enter a presentation link');
                return;
            }
        }

        setIsSubmitting(true);

        const grades = rubric.map(r => ({
            criterion: r.criterion,
            points: Math.floor(Math.random() * (r.maxPoints - r.maxPoints * 0.7)) + Math.floor(r.maxPoints * 0.7),
            maxPoints: r.maxPoints,
            feedback: `Good work on ${r.criterion.toLowerCase()}. ${r.description}`
        }));

        const totalScore = grades.reduce((sum, g) => sum + g.points, 0);
        const totalMax = grades.reduce((sum, g) => sum + g.maxPoints, 0);
        const percentage = Math.round((totalScore / totalMax) * 100);

        const updated = { ...course };
        if (!updated.weeks[weekIndex].submissions) {
            updated.weeks[weekIndex].submissions = { builder: null, academic: null, communicator: null };
        }

        const submissionData = {
            submittedDate: new Date().toISOString(),
            rubric: grades,
            score: totalScore,
            totalPoints: totalMax,
            percentage: percentage,
            grade: percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : 'D',
            type: submissionType
        };

        if (submissionType === 'file') {
            const file = fileInputRef.current?.files?.[0];
            submissionData.fileName = file.name;
            submissionData.fileSize = file.size;
        } else {
            submissionData.link = presentationLink;
        }

        updated.weeks[weekIndex].submissions.communicator = submissionData;

        onUpdateCourse(updated);
        setIsSubmitting(false);
        alert(`Presentation submitted! Score: ${totalScore}/${totalMax} (${submissionData.grade})`);
    };

    if (hasSubmission) {
        return (
            <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-green-800">✓ Presentation Submitted</h3>
                        <span className="text-lg font-bold text-green-700">
                            Score: {hasSubmission.score}/{hasSubmission.totalPoints} ({hasSubmission.grade})
                        </span>
                    </div>
                    {hasSubmission.type === 'file' && (
                        <p className="text-sm text-green-600 mb-2">File: {hasSubmission.fileName} ({Math.round(hasSubmission.fileSize / 1024)} KB)</p>
                    )}
                    {hasSubmission.type === 'link' && hasSubmission.link && (
                        <a href={hasSubmission.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm block mb-2">
                            {hasSubmission.link}
                        </a>
                    )}
                    <p className="text-sm text-green-600">Submitted {new Date(hasSubmission.submittedDate).toLocaleDateString()}</p>
                </div>

                {hasSubmission.rubric && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h4 className="font-bold mb-3">Grading Rubric</h4>
                        <div className="space-y-3">
                            {hasSubmission.rubric.map((item, idx) => (
                                <div key={idx} className="border-b border-gray-200 pb-3 last:border-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-800">{item.criterion}</span>
                                        <span className="text-sm text-gray-600">{item.points}/{item.maxPoints} points</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{item.feedback}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{week.deliverables?.communicator?.title || 'Communicator Presentation'}</h3>
                <p className="text-sm text-gray-600 mb-4">{week.deliverables?.communicator?.description || 'Create a presentation to demonstrate your communication skills.'}</p>

                {week.deliverables?.communicator?.guidelines && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-orange-900 mb-3">Presentation Guidelines:</h4>
                        <div className="space-y-3">
                            {week.deliverables.communicator.guidelines.map((g, i) => {
                                // Check if this is a slide structure guideline
                                if (g.includes('Slide Structure') || g.includes('Required)')) {
                                    const parts = g.split(':');
                                    return (
                                        <div key={i} className="bg-white rounded p-3 border border-orange-300">
                                            <div className="font-bold text-orange-900 mb-2 text-sm">{parts[0]}</div>
                                            <div className="text-sm text-orange-800 whitespace-pre-line ml-2">
                                                {parts.slice(1).join(':').trim()}
                                            </div>
                                        </div>
                                    );
                                }
                                // Regular guideline
                                const parts = g.split(':');
                                if (parts.length > 1) {
                                    return (
                                        <div key={i} className="text-sm text-orange-800">
                                            <span className="font-semibold">{parts[0]}:</span>
                                            <span className="ml-1">{parts.slice(1).join(':')}</span>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={i} className="text-sm text-orange-800">{g}</div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-3">Grading Rubric</h4>
                <div className="space-y-2">
                    {rubric.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{item.criterion}</span>
                            <span className="text-gray-500">{item.maxPoints} points</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">Total: {rubric.reduce((sum, r) => sum + r.maxPoints, 0)} points</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Submission Type</label>
                    <div className="flex gap-4 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="presentationType" value="file" checked={submissionType === 'file'} onChange={(e) => setSubmissionType(e.target.value)} className="w-4 h-4" />
                            <span className="text-sm">Upload File</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="presentationType" value="link" checked={submissionType === 'link'} onChange={(e) => setSubmissionType(e.target.value)} className="w-4 h-4" />
                            <span className="text-sm">Link (Google Slides, YouTube, etc.)</span>
                        </label>
                    </div>
                </div>

                {submissionType === 'file' ? (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Presentation File</label>
                        <input type="file" ref={fileInputRef} accept=".pptx,.ppt,.pdf,.key" className="w-full p-2 border border-gray-300 rounded-lg" required={submissionType === 'file'} />
                        <p className="text-xs text-gray-500 mt-1">Acceptable formats: .pptx, .ppt, .pdf, .key</p>
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Presentation Link</label>
                        <input type="url" value={presentationLink} onChange={(e) => setPresentationLink(e.target.value)} placeholder="https://docs.google.com/presentation/..." className="w-full p-3 border border-gray-300 rounded-lg" required={submissionType === 'link'} />
                    </div>
                )}

                <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Submit Presentation'}
                </button>
            </form>
        </div>
    );
};

export default CommunicatorPresentationSection;
