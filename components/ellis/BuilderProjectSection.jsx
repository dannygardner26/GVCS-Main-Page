import React, { useState, useRef } from 'react';
import { Icons } from '../common/Icons';

const BuilderProjectSection = ({ week, weekIndex, course, onUpdateCourse }) => {
    const fileInputRef = useRef(null);
    const [submissionType, setSubmissionType] = useState('file');
    const [githubRepo, setGithubRepo] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hasSubmission = week.submissions?.builder;

    const isCS102DS = course?.title?.includes('CS 102') || course?.title?.includes('Data Structures');

    const rubric = [
        { criterion: "Functionality", maxPoints: 40, description: "Code works correctly and meets all requirements" },
        { criterion: "Code Quality", maxPoints: 30, description: "Clean, readable, well-structured code" },
        { criterion: "Testing", maxPoints: 30, description: "Comprehensive test cases and edge cases covered" }
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

    // Download function that works for all courses
    const downloadTemplateFile = (language = null) => {
        const builder = week.deliverables?.builder;
        if (!builder) return;
        
        let fileContent = null;
        let fileName = null;
        
        // Check for template_files (plural) with java/cpp options
        if (builder.template_files) {
            if (language && builder.template_files[language]) {
                const fileInfo = builder.template_files[language];
                fileContent = fileInfo.content;
                fileName = fileInfo.filename;
            } else if (language === null && builder.template_files.java) {
                // Default to Java if no language specified
                const fileInfo = builder.template_files.java;
                fileContent = fileInfo.content;
                fileName = fileInfo.filename;
            }
        }
        // Check for template_file (singular) - older format
        else if (builder.template_file) {
            fileContent = builder.template_file.content;
            fileName = builder.template_file.filename;
        }
        
        if (!fileContent || !fileName) {
            alert('Template file not available for download.');
            return;
        }
        
        try {
            const blob = new Blob([fileContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
            alert(`Error downloading file.`);
        }
    };
    
    // Check if we have template files to download
    const hasTemplateFiles = week.deliverables?.builder?.template_files || week.deliverables?.builder?.template_file;
    const hasMultipleLanguages = week.deliverables?.builder?.template_files?.java && week.deliverables?.builder?.template_files?.cpp;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{week.deliverables?.builder?.title || 'Builder Project'}</h3>
                <p className="text-sm text-gray-600 mb-4">{week.deliverables?.builder?.description || 'Complete this project to demonstrate your building skills.'}</p>

                {week.deliverables?.builder?.guidelines && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Step-by-Step Guidelines:</h4>
                        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                            {week.deliverables.builder.guidelines.map((guideline, i) => (<li key={i} className="ml-2">{guideline}</li>))}
                        </ol>
                    </div>
                )}

                {hasTemplateFiles && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-700 mb-3">Download Starter File:</h4>
                        {hasMultipleLanguages ? (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    {week.deliverables.builder.template_files.java && (
                                        <button
                                            onClick={() => downloadTemplateFile('java')}
                                            className="px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                                        >
                                            <Icons.Link className="w-5 h-5" />
                                            Download Java
                                        </button>
                                    )}
                                    {week.deliverables.builder.template_files.cpp && (
                                        <button
                                            onClick={() => downloadTemplateFile('cpp')}
                                            className="px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                                        >
                                            <Icons.Link className="w-5 h-5" />
                                            Download C++
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Choose your preferred language. Both files contain the same starter code structure.</p>
                            </>
                        ) : (
                            <button
                                onClick={() => downloadTemplateFile()}
                                className="px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                            >
                                <Icons.Link className="w-5 h-5" />
                                Download Template File
                            </button>
                        )}
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
