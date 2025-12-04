import React from 'react';

const MeetingArchiveView = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gvcs-navy mb-2">Meeting Archive</h2>
                <p className="text-gray-600">Missed a meeting? Catch up on slides, code, and recordings.</p>
            </div>

            <div className="space-y-4">
                {[
                    { date: "Nov 20, 2024", title: "Intro to Dynamic Programming", type: "Lecture", resources: ["Slides", "Recording", "Problem Set"] },
                    { date: "Nov 13, 2024", title: "Git & GitHub Workshop", type: "Workshop", resources: ["Cheatsheet", "Recording"] },
                    { date: "Nov 06, 2024", title: "Guest Speaker: Google Engineer", type: "Event", resources: ["Recording"] },
                    { date: "Oct 30, 2024", title: "Hackathon Prep Night", type: "Activity", resources: ["Team Sheet"] },
                ].map((meeting, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-300 transition-colors">
                        <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{meeting.date} • {meeting.type}</div>
                            <h3 className="text-lg font-bold text-gray-900">{meeting.title}</h3>
                        </div>
                        <div className="flex gap-2">
                            {meeting.resources.map((res, j) => (
                                <button key={j} className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 rounded-lg text-xs font-bold transition-colors">
                                    {res}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeetingArchiveView;
