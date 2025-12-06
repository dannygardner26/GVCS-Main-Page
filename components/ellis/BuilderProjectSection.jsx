import React, { useState, useRef } from 'react';
import { Icons } from '../common/Icons';

const BuilderProjectSection = ({ week, weekIndex, course, onUpdateCourse }) => {
    const fileInputRef = useRef(null);
    const [submissionType, setSubmissionType] = useState('file');
    const [githubRepo, setGithubRepo] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hasSubmission = week.submissions?.builder;

    // Check if this week has template files to download
    const hasTemplateFiles = week.deliverables?.builder?.template_files || week.deliverables?.builder?.template_file;

    const rubric = [
        { criterion: "Functionality", maxPoints: 30, description: "Code works correctly and meets all requirements" },
        { criterion: "Code Quality", maxPoints: 20, description: "Clean, readable, well-documented code" },
        { criterion: "Testing", maxPoints: 20, description: "Comprehensive test cases and edge cases covered" },
        { criterion: "Documentation", maxPoints: 15, description: "README, comments, and usage instructions" },
        { criterion: "Creativity/Extra Features", maxPoints: 15, description: "Additional features beyond requirements" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submissionType === 'file') {
            const file = fileInputRef.current?.files?.[0];
            if (!file) {
                alert('Please select a file to submit');
                return;
            }
        } else {
            if (!githubRepo.trim()) {
                alert('Please enter a GitHub repository URL');
                return;
            }
            const githubUrlPattern = /^https?:\/\/(www\.)?(github\.com|github\.io)\/.+/;
            if (!githubUrlPattern.test(githubRepo.trim())) {
                alert('Please enter a valid GitHub repository URL');
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
            grade: percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : 'D'
        };

        if (submissionType === 'file') {
            const file = fileInputRef.current?.files?.[0];
            submissionData.fileName = file.name;
            submissionData.fileSize = file.size;
            submissionData.type = 'file';
        } else {
            submissionData.githubRepo = githubRepo.trim();
            submissionData.type = 'github';
        }

        updated.weeks[weekIndex].submissions.builder = submissionData;

        onUpdateCourse(updated);
        setIsSubmitting(false);
        alert(`Project submitted! Score: ${totalScore}/${totalMax} (${submissionData.grade})`);
    };

    if (hasSubmission) {
        return (
            <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-green-800">✓ Project Submitted</h3>
                        <span className="text-lg font-bold text-green-700">
                            Score: {hasSubmission.score}/{hasSubmission.totalPoints} ({hasSubmission.grade})
                        </span>
                    </div>
                    {hasSubmission.type === 'file' && (
                        <p className="text-sm text-green-600 mb-2">File: {hasSubmission.fileName} ({Math.round(hasSubmission.fileSize / 1024)} KB)</p>
                    )}
                    {hasSubmission.type === 'github' && (
                        <p className="text-sm text-green-600 mb-2">
                            <a href={hasSubmission.githubRepo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                GitHub: {hasSubmission.githubRepo}
                            </a>
                        </p>
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

    // Show template-based UI if there are template files available
    if (hasTemplateFiles) {
        const templateFileName = `${week.topic?.replace(/[^a-zA-Z0-9]/g, '_')}_template.java`;

        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{week.deliverables?.builder?.title || 'Complete the Template'}</h3>
                    <p className="text-sm text-gray-600 mb-4">{week.deliverables?.builder?.description || 'Download the template file and fill in the missing code sections.'}</p>
                </div>

                {week.deliverables?.builder?.guidelines && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Step-by-Step Guidelines:</h4>
                        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                            {week.deliverables.builder.guidelines.map((guideline, i) => (<li key={i} className="ml-2">{guideline}</li>))}
                        </ol>
                    </div>
                )}

                {/* Download buttons for template files (supports multiple languages) */}
                {week.deliverables?.builder?.template_files && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Download Starter File</h4>
                        <p className="text-sm text-gray-600 mb-4">Choose your preferred language:</p>
                        <div className="flex flex-wrap gap-3">
                            {week.deliverables.builder.template_files.java && (
                                <button
                                    onClick={() => {
                                        const templateFile = week.deliverables.builder.template_files.java;
                                        const blob = new Blob([templateFile.content], { type: 'text/plain' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = templateFile.filename;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                    }}
                                    className="flex-1 min-w-[140px] px-4 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573"/>
                                        <path d="M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118"/>
                                        <path d="M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.889 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627"/>
                                    </svg>
                                    Java (.java)
                                </button>
                            )}
                            {week.deliverables.builder.template_files.cpp && (
                                <button
                                    onClick={() => {
                                        const templateFile = week.deliverables.builder.template_files.cpp;
                                        const blob = new Blob([templateFile.content], { type: 'text/plain' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = templateFile.filename;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                    }}
                                    className="flex-1 min-w-[140px] px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z"/>
                                    </svg>
                                    C++ (.cpp)
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Legacy single template file support */}
                {week.deliverables?.builder?.template_file && !week.deliverables?.builder?.template_files && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <button
                            onClick={() => {
                                const templateFile = week.deliverables.builder.template_file;
                                const templateContent = templateFile.content || '';
                                const fileName = templateFile.filename || templateFileName;
                                const blob = new Blob([templateContent], { type: 'text/plain' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = fileName;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                            }}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                            <Icons.Link className="w-5 h-5" />
                            Download Template File
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Completed Template File</label>
                        <input type="file" ref={fileInputRef} accept=".java,.py,.cpp,.c" className="w-full p-2 border border-gray-300 rounded-lg" required />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50">
                        {isSubmitting ? 'Submitting...' : 'Submit Completed Template'}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{week.deliverables?.builder?.title || 'Builder Project'}</h3>
                <p className="text-sm text-gray-600 mb-4">{week.deliverables?.builder?.description || 'Complete this project to demonstrate your building skills.'}</p>

                {week.deliverables?.builder?.guidelines && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Guidelines:</h4>
                        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                            {week.deliverables.builder.guidelines.map((g, i) => (<li key={i}>{g}</li>))}
                        </ul>
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
                            <input type="radio" name="submissionType" value="file" checked={submissionType === 'file'} onChange={(e) => setSubmissionType(e.target.value)} className="w-4 h-4" />
                            <span className="text-sm">File Upload</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="submissionType" value="github" checked={submissionType === 'github'} onChange={(e) => setSubmissionType(e.target.value)} className="w-4 h-4" />
                            <span className="text-sm">GitHub Repository</span>
                        </label>
                    </div>
                </div>

                {submissionType === 'file' ? (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Project File</label>
                        <input type="file" ref={fileInputRef} className="w-full p-2 border border-gray-300 rounded-lg" required={submissionType === 'file'} />
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub Repository URL</label>
                        <input type="url" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} placeholder="https://github.com/username/repository" className="w-full p-3 border border-gray-300 rounded-lg" required={submissionType === 'github'} />
                    </div>
                )}

                <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Submit Project'}
                </button>
            </form>
        </div>
    );
};

export default BuilderProjectSection;
