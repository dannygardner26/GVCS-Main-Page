import React, { useState } from 'react';
import { Icons } from '../common/Icons';
import AcademicTestSection from '../ellis/AcademicTestSection';
import BuilderProjectSection from '../ellis/BuilderProjectSection';
import CommunicatorPresentationSection from '../ellis/CommunicatorPresentationSection';

// Learning Resources Section
export const LearningResourcesSection = ({ week }) => {
    return (
        <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> These resources are optional learning materials to help you understand the week's content before completing your Ellis activities. You don't need to complete them, but they're recommended!
                </p>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-4">Learning Resources</h3>

            {week.resources && week.resources.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                    {week.resources.map((resource, idx) => (
                        <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${resource.type === 'Video' ? 'bg-red-100 text-red-600' :
                                    resource.type === 'Article' ? 'bg-blue-100 text-blue-600' :
                                    'bg-green-100 text-green-600'
                                }`}>
                                    {resource.type === 'Video' ? '▶' : '📄'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 mb-1">{resource.title}</h4>
                                    <p className="text-xs text-gray-500">{resource.type}</p>
                                </div>
                                <Icons.Link className="w-4 h-4 text-gray-400" />
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm">No resources available for this week.</p>
            )}
        </div>
    );
};

// Week Detail View Component
const WeekDetailView = ({ week, weekIndex, course, onUpdateCourse }) => {
    const [activeSection, setActiveSection] = useState('learning'); // 'learning', 'academic', 'builder', 'communicator'

    return (
        <div className="border-t border-gray-200">
            {/* Section Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50">
                <button
                    onClick={() => setActiveSection('learning')}
                    className={`px-4 py-3 text-sm font-semibold transition-colors ${activeSection === 'learning'
                            ? 'text-gvcs-navy border-b-2 border-gvcs-navy bg-white'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    📚 Learning Resources
                </button>
                <button
                    onClick={() => setActiveSection('academic')}
                    className={`px-4 py-3 text-sm font-semibold transition-colors relative ${activeSection === 'academic'
                            ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    🎓 Academic: Test
                    {week.submissions?.academic && (
                        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    )}
                </button>
                <button
                    onClick={() => setActiveSection('builder')}
                    className={`px-4 py-3 text-sm font-semibold transition-colors relative ${activeSection === 'builder'
                            ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    🔨 Builder: Project
                    {week.submissions?.builder && (
                        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    )}
                </button>
                <button
                    onClick={() => setActiveSection('communicator')}
                    className={`px-4 py-3 text-sm font-semibold transition-colors relative ${activeSection === 'communicator'
                            ? 'text-orange-600 border-b-2 border-orange-600 bg-white'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    🎤 Communicator: Presentation
                    {week.submissions?.communicator && (
                        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    )}
                </button>
            </div>

            {/* Section Content */}
            <div className="p-6">
                {activeSection === 'learning' && (
                    <LearningResourcesSection week={week} />
                )}

                {activeSection === 'academic' && (
                    <AcademicTestSection
                        week={week}
                        weekIndex={weekIndex}
                        course={course}
                        onUpdateCourse={onUpdateCourse}
                    />
                )}

                {activeSection === 'builder' && (
                    <BuilderProjectSection
                        week={week}
                        weekIndex={weekIndex}
                        course={course}
                        onUpdateCourse={onUpdateCourse}
                    />
                )}

                {activeSection === 'communicator' && (
                    <CommunicatorPresentationSection
                        week={week}
                        weekIndex={weekIndex}
                        course={course}
                        onUpdateCourse={onUpdateCourse}
                    />
                )}
            </div>
        </div>
    );
};

export default WeekDetailView;
