import React, { useState, useRef } from 'react';
import { Icons } from '../common/Icons';
import LectureNotesSection from '../ellis/LectureNotesSection';

const InteractiveWeekView = ({ course, week, weekIndex, onBack, onUpdateCourse }) => {
    const [selectedActivityType, setSelectedActivityType] = useState(week.selectedActivity);
    const fileInputRef = useRef(null);
    const [testAnswers, setTestAnswers] = useState({});
    const [presentationLink, setPresentationLink] = useState('');

    const handleActivitySelect = (activityType) => {
        setSelectedActivityType(activityType);
        const updated = { ...course };
        updated.weeks[weekIndex].selectedActivity = activityType;
        onUpdateCourse(updated);
    };

    const handleFileSubmit = (e) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            const updated = { ...course };
            updated.weeks[weekIndex].submissions.builder = {
                fileName: file.name,
                fileSize: file.size,
                submittedDate: new Date().toISOString()
            };
            onUpdateCourse(updated);
            alert("File submitted successfully!");
        }
    };

    const handleTestSubmit = (e) => {
        e.preventDefault();
        const updated = { ...course };
        updated.weeks[weekIndex].submissions.academic = {
            answers: testAnswers,
            submittedDate: new Date().toISOString()
        };
        onUpdateCourse(updated);
        alert("Test submitted successfully!");
    };

    const handlePresentationSubmit = (e) => {
        e.preventDefault();
        if (presentationLink) {
            const updated = { ...course };
            updated.weeks[weekIndex].submissions.communicator = {
                link: presentationLink,
                submittedDate: new Date().toISOString()
            };
            onUpdateCourse(updated);
            alert("Presentation submitted successfully!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button
                onClick={onBack}
                className="mb-4 text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1"
            >
                <Icons.ArrowRight /> Back to Course
            </button>

            <h2 className="text-2xl font-bold text-gvcs-navy mb-2">Week {week.week}: {week.topic}</h2>
            <p className="text-gray-600 mb-4">{week.description}</p>
            
            {course.mit_anchor && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                    <p className="text-sm text-blue-800">
                        <strong>Based on:</strong> MIT {course.mit_anchor}
                        {course.mit_url && (
                            <a href={course.mit_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">
                                (View MIT OCW Course)
                            </a>
                        )}
                    </p>
                </div>
            )}

            {/* Lecture Notes Checker */}
            {week.deliverables?.lecture_notes && (
                <LectureNotesSection
                    week={week}
                    weekIndex={weekIndex}
                    course={course}
                />
            )}

            {/* Activity Selection */}
            {!selectedActivityType ? (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h3 className="font-bold text-gray-800 mb-4">Choose Your Ellis Activity</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        {week.deliverables && Object.entries(week.deliverables)
                            .filter(([type]) => type !== 'lecture_notes') // Exclude lecture_notes from main selection
                            .map(([type, data]) => (
                            <button
                                key={type}
                                onClick={() => handleActivitySelect(type)}
                                className={`p-4 rounded-lg border-2 text-left transition-all ${type === 'builder' ? 'border-blue-500 hover:bg-blue-50' :
                                    type === 'academic' ? 'border-purple-500 hover:bg-purple-50' :
                                        'border-orange-500 hover:bg-orange-50'
                                    }`}
                            >
                                <div className={`text-xs font-bold mb-2 ${type === 'builder' ? 'text-blue-600' :
                                    type === 'academic' ? 'text-purple-600' :
                                        'text-orange-600'
                                    }`}>
                                    {type === 'builder' ? 'BUILDER' : type === 'academic' ? 'ACADEMIC' : 'COMMUNICATOR'}
                                </div>
                                <div className="font-bold text-gray-800">{data.title}</div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Selected Activity Info */}
                    <div className={`p-4 rounded-lg border-l-4 ${selectedActivityType === 'builder' ? 'border-blue-500 bg-blue-50' :
                        selectedActivityType === 'academic' ? 'border-purple-500 bg-purple-50' :
                            'border-orange-500 bg-orange-50'
                        }`}>
                        <h3 className="font-bold text-gray-800 mb-2">
                            {week.deliverables[selectedActivityType].title}
                        </h3>
                        <p className="text-sm text-gray-700">{week.deliverables[selectedActivityType].description}</p>
                        <button
                            onClick={() => handleActivitySelect(null)}
                            className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                        >
                            Change Activity
                        </button>
                    </div>

                    {/* Submission Forms */}
                    {selectedActivityType === 'builder' && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Submit Your Project</h3>
                            {week.submissions.builder ? (
                                <div className="bg-green-50 border border-green-200 rounded p-4">
                                    <p className="text-green-700 font-semibold">✓ Submitted</p>
                                    <p className="text-sm text-green-600 mt-1">
                                        {week.submissions.builder.fileName}
                                        ({Math.round(week.submissions.builder.fileSize / 1024)} KB)
                                    </p>
                                    <p className="text-xs text-green-600 mt-1">
                                        Submitted {new Date(week.submissions.builder.submittedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleFileSubmit}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="mb-4"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Submit File
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {selectedActivityType === 'academic' && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Complete the Test</h3>
                            {week.submissions.academic ? (
                                <div className="bg-green-50 border border-green-200 rounded p-4">
                                    <p className="text-green-700 font-semibold">✓ Submitted</p>
                                    <p className="text-xs text-green-600 mt-1">
                                        Submitted {new Date(week.submissions.academic.submittedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleTestSubmit}>
                                    {week.deliverables.academic.questions?.map((q, idx) => (
                                        <div key={idx} className="mb-4">
                                            <label className="block font-semibold mb-2">{q.question}</label>
                                            {q.type === 'text' && (
                                                <textarea
                                                    value={testAnswers[q.id] || ''}
                                                    onChange={(e) => setTestAnswers({ ...testAnswers, [q.id]: e.target.value })}
                                                    className="w-full p-2 border rounded"
                                                    rows="3"
                                                    required
                                                />
                                            )}
                                            {q.type === 'mcq' && (
                                                <div className="space-y-2">
                                                    {q.options?.map((opt, optIdx) => (
                                                        <label key={optIdx} className="flex items-center gap-2">
                                                            <input
                                                                type="radio"
                                                                name={q.id}
                                                                value={optIdx}
                                                                checked={testAnswers[q.id] === optIdx}
                                                                onChange={() => setTestAnswers({ ...testAnswers, [q.id]: optIdx })}
                                                            />
                                                            {opt}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        Submit Test
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {selectedActivityType === 'communicator' && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Submit Your Presentation</h3>
                            {week.submissions.communicator ? (
                                <div className="bg-green-50 border border-green-200 rounded p-4">
                                    <p className="text-green-700 font-semibold">✓ Submitted</p>
                                    <a href={week.submissions.communicator.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                                        {week.submissions.communicator.link}
                                    </a>
                                    <p className="text-xs text-green-600 mt-1">
                                        Submitted {new Date(week.submissions.communicator.submittedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handlePresentationSubmit}>
                                    <label className="block font-semibold mb-2">Presentation Link</label>
                                    <input
                                        type="url"
                                        value={presentationLink}
                                        onChange={(e) => setPresentationLink(e.target.value)}
                                        placeholder="https://docs.google.com/presentation/..."
                                        className="w-full p-2 border rounded mb-4"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                    >
                                        Submit Presentation
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Resources Section */}
            {week.resources && week.resources.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
                    <h3 className="font-bold text-gray-800 mb-4">Learning Resources</h3>
                    <div className="space-y-3">
                        {week.resources.map((resource, idx) => (
                            <a
                                key={idx}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-100"
                            >
                                <div className={`w-8 h-8 rounded flex items-center justify-center ${
                                    resource.type === 'Video' ? 'bg-red-100 text-red-600' :
                                    resource.type === 'Article' ? 'bg-blue-100 text-blue-600' :
                                    'bg-green-100 text-green-600'
                                }`}>
                                    {resource.type === 'Video' ? '▶' : '📄'}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-800">{resource.title}</div>
                                    <div className="text-xs text-gray-500">{resource.type}</div>
                                </div>
                                <Icons.Link className="w-4 h-4 text-gray-400" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveWeekView;
