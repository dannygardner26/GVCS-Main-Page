import React from 'react';
import { CURRICULUM_DATA } from '../../CurriculumData';

const CurriculumMap = ({ courses, onSelect }) => {
    // Organize courses by tier
    const tier1Courses = courses.filter(c => c.tier === 1);
    const tier2Courses = courses.filter(c => c.tier === 2);
    const tier3Courses = courses.filter(c => c.tier === 3);

    // Organize Tier 3 by subject area
    const aiCourses = tier3Courses.filter(c => c.title.startsWith("AI 40"));
    const sysCourses = tier3Courses.filter(c => c.title.startsWith("Sys 40"));
    const secCourses = tier3Courses.filter(c => c.title.startsWith("Sec ") || c.title === "Math 302: Cryptography");
    const graphicsCourses = tier3Courses.filter(c => c.title.startsWith("CS 40") && (c.title.includes("Graphics") || c.title.includes("Game") || c.title.includes("VR")));
    const langCourses = tier3Courses.filter(c => c.title.startsWith("CS 40") && c.title.includes("Language"));
    const emergingCourses = tier3Courses.filter(c => c.title.startsWith("Fin 30"));

    const getCourse = (title) => courses.find(c => c.title === title) || { title, difficulty: "Unknown", tags: [], description: "" };

    const CourseCard = ({ course, tier }) => {
        const courseData = getCourse(course.title);
        const fullCourseData = CURRICULUM_DATA[course.title] || {};
        const tierColors = {
            1: {
                bg: "bg-blue-500/10", border: "border-blue-500/50", hover: "hover:border-blue-400", glow: "bg-blue-500",
                label: "Tier 1: Gatekeeper", labelBg: "bg-blue-500"
            },
            2: {
                bg: "bg-purple-500/10", border: "border-purple-500/50", hover: "hover:border-purple-400", glow: "bg-purple-500",
                label: "Tier 2: Core", labelBg: "bg-purple-500"
            },
            3: {
                bg: "bg-emerald-500/10", border: "border-emerald-500/50", hover: "hover:border-emerald-400", glow: "bg-emerald-500",
                label: "Tier 3: Specialization", labelBg: "bg-emerald-500"
            }
        };
        const colors = tierColors[tier] || tierColors[3];
        const description = fullCourseData.description || courseData.description || course.description || "";

        return (
            <div
                className={`relative group/card ${colors.bg} ${colors.border} border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${colors.hover} hover:shadow-2xl hover:scale-105`}
                onClick={() => onSelect(courseData)}
            >
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-xl blur-xl opacity-0 group-hover/card:opacity-30 transition-opacity duration-500 ${colors.glow}`}></div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Tier Label */}
                    <div className={`${colors.labelBg} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full inline-block mb-3`}>
                        {colors.label}
                    </div>

                    {/* Course Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover/card:text-blue-300 transition-colors">
                        {course.title}
                    </h3>

                    {/* MIT Course Anchor */}
                    {fullCourseData.mit_anchor && (
                        <div className="mb-2">
                            <div className="text-xs text-gray-500 mb-1">Based on:</div>
                            <div className="text-xs text-blue-400 font-medium">
                                MIT {fullCourseData.mit_anchor}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {description && (
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                            {description}
                        </p>
                    )}

                    {/* Prerequisites */}
                    {(fullCourseData.prereqs || courseData.prereqs) && (fullCourseData.prereqs || courseData.prereqs).length > 0 && (
                        <div className="mb-3">
                            <div className="text-xs text-gray-500 mb-1">Prerequisites:</div>
                            <div className="flex flex-wrap gap-1">
                                {(fullCourseData.prereqs || courseData.prereqs).slice(0, 2).map((prereq, i) => (
                                    <span key={i} className="text-xs bg-slate-700/50 text-gray-300 px-2 py-0.5 rounded">
                                        {prereq}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-[#0B1120] to-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
            <div className="p-8 space-y-12">
                {/* TIER 1: The Gatekeepers */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="w-1 h-8 bg-blue-500 rounded"></span>
                            TIER 1: The Gatekeepers
                        </h2>
                        <p className="text-gray-400 text-sm ml-4">Year 1 - Early Year 2 • Non-negotiable pillars of CS education</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {tier1Courses.map((course, i) => (
                            <CourseCard key={i} course={course} tier={1} />
                        ))}
                    </div>
                </section>

                {/* TIER 2: The Core */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="w-1 h-8 bg-purple-500 rounded"></span>
                            TIER 2: The Core
                        </h2>
                        <p className="text-gray-400 text-sm ml-4">Mid Year 2 - Early Year 3 • Rigorous center of CS degree</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {tier2Courses.map((course, i) => (
                            <CourseCard key={i} course={course} tier={2} />
                        ))}
                    </div>
                </section>

                {/* TIER 3: Advanced Specializations */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="w-1 h-8 bg-emerald-500 rounded"></span>
                            TIER 3: Advanced Specializations
                        </h2>
                        <p className="text-gray-400 text-sm ml-4">Late Year 2 - Year 3 • Early specialization organized by subject area</p>
                    </div>

                    <div className="space-y-8">
                        {/* Artificial Intelligence & Machine Learning */}
                        {aiCourses.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                    Artificial Intelligence & Machine Learning
                                </h3>
                                <div className={`grid gap-6 ${aiCourses.length === 3 ? 'md:grid-cols-3' : aiCourses.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                                    {aiCourses.map((course, i) => (
                                        <CourseCard key={i} course={course} tier={3} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Systems & Infrastructure */}
                        {sysCourses.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                    Systems & Infrastructure
                                </h3>
                                <div className={`grid gap-6 ${sysCourses.length === 3 ? 'md:grid-cols-3' : sysCourses.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                                    {sysCourses.map((course, i) => (
                                        <CourseCard key={i} course={course} tier={3} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Security & Cryptography */}
                        {secCourses.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                    Security & Cryptography
                                </h3>
                                <div className={`grid gap-6 ${secCourses.length === 3 ? 'md:grid-cols-3' : secCourses.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                                    {secCourses.map((course, i) => (
                                        <CourseCard key={i} course={course} tier={3} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Graphics & Game Development */}
                        {graphicsCourses.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                    Graphics & Game Development
                                </h3>
                                <div className={`grid gap-6 ${graphicsCourses.length === 3 ? 'md:grid-cols-3' : graphicsCourses.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                                    {graphicsCourses.map((course, i) => (
                                        <CourseCard key={i} course={course} tier={3} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Programming Languages & Theory */}
                        {langCourses.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                    Programming Languages & Theory
                                </h3>
                                <div className="grid md:grid-cols-1 gap-6 max-w-2xl">
                                    {langCourses.map((course, i) => (
                                        <CourseCard key={i} course={course} tier={3} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Emerging Technologies */}
                        {emergingCourses.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-emerald-500 rounded"></span>
                                    Emerging Technologies
                                </h3>
                                <div className={`grid gap-6 ${emergingCourses.length === 3 ? 'md:grid-cols-3' : emergingCourses.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                                    {emergingCourses.map((course, i) => (
                                        <CourseCard key={i} course={course} tier={3} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CurriculumMap;
