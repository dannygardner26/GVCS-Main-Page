import React from 'react';
import { Icons } from '../common/Icons';

const EventList = () => {
    const events = [
        // --- Local / Train Distance (Philly, NYC, DC, NJ) ---
        { date: "Dec 05", name: "ImpactX '25", type: "Virtual", tag: "Major", url: "https://code4hope.org" },
        { date: "Dec 10", name: "AI Summit NY Hackathon", type: "In-Person", tag: "Trip", url: "https://theaisummit.com/newyork/hackathon" },
        { date: "Dec 12", name: "Agentic AI Hackathon", type: "In-Person", tag: "Trip", url: "https://odsc.com/new-york/hackathon/" },
        { date: "Dec 12", name: "MLH & DigitalOcean AI", type: "In-Person", tag: "Trip", url: "https://organize.mlh.io/participants/events/11388-ai-hackathon-hosted-by-mlh-digitalocean" },
        { date: "Jan 10", name: "DeltaHacks 12", type: "In-Person", tag: "Major", url: "https://deltahacks.com/" },
        { date: "Jan 17", name: "Hack BI", type: "In-Person", tag: "Local", url: "https://hackbi.org/" },
        { date: "Jan 23", name: "Hoya Hacks 2026", type: "In-Person", tag: "Trip", url: "https://hoyahacks.georgetown.domains/" },
        { date: "Jan 2026", name: "DragonHacks XII", type: "In-Person", tag: "Local", url: "https://dragonhacks.org/" },
        { date: "Feb 07", name: "DevFest NYC", type: "In-Person", tag: "Trip", url: "https://mlh.io/seasons/2026/events" },
        { date: "Feb 28", name: "Code Quest NJ", type: "In-Person", tag: "Local", url: "https://www.lmcodequestacademy.com/" },
        { date: "Mar 07", name: "HackNJIT", type: "In-Person", tag: "Local", url: "https://hacknjit.org/" },

        // --- Other Major Events ---
        { date: "Dec 06", name: "East Bay Hackers", type: "In-Person", tag: "Fun", url: "https://eastbayhackers.club/" },
        { date: "Dec 07", name: "CrabHacks 2025", type: "In-Person", tag: "Fun", url: "https://crabhacks.org/" },
        { date: "Dec 08", name: "CodeFest 2025", type: "Virtual", tag: "Fun", url: "https://codefesthack2025.vercel.app/" },
        { date: "Dec 12", name: "Global Hack Week: AI/ML", type: "Virtual", tag: "Major", url: "https://hack.mlh.io/" },
        { date: "Jan 16", name: "CruzHacks 2026", type: "In-Person", tag: "Major", url: "https://cruzhacks.com/" },
        { date: "Jan 17", name: "nwHacks 2026", type: "In-Person", tag: "Major", url: "https://www.nwhacks.io/" },
        { date: "Jan 17", name: "McHacks 13", type: "In-Person", tag: "Major", url: "https://mchacks.ca/" },
        { date: "Jan 30", name: "ElleHacks 2026", type: "In-Person", tag: "Major", url: "https://ellehacks.com/" },

        // --- Exams ---
        { date: "May 05", name: "AP Computer Science A Exam", type: "Exam", tag: "School", url: "https://apstudents.collegeboard.org/courses/ap-computer-science-a/assessment" },
    ].sort((a, b) => {
        // Simple date sorter for "Month Day" format assuming upcoming year
        const getMonthIdx = (m) => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(m);
        const [mA, dA] = a.date.split(' ');
        const [mB, dB] = b.date.split(' ');

        // Handle "Jan 2026" vs "Jan 10"
        const dayA = parseInt(dA) || 1;
        const dayB = parseInt(dB) || 1;

        // Adjust for year boundary (Dec is 2025, Jan+ is 2026)
        const yearA = getMonthIdx(mA) >= 11 ? 2025 : 2026;
        const yearB = getMonthIdx(mB) >= 11 ? 2025 : 2026;

        if (yearA !== yearB) return yearA - yearB;
        if (getMonthIdx(mA) !== getMonthIdx(mB)) return getMonthIdx(mA) - getMonthIdx(mB);
        return dayA - dayB;
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Upcoming Events</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{events.length} Events</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                {events.map((e, i) => (
                    <div key={i} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                        <div className="text-center min-w-[60px]">
                            <div className="text-xs font-bold text-blue-600 uppercase">{e.date.split(' ')[0]}</div>
                            <div className="text-lg font-bold text-gray-800">{e.date.split(' ')[1]}</div>
                        </div>
                        <div className="flex-1">
                            {e.url ? (
                                <a
                                    href={e.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-bold text-gray-900 hover:text-blue-600 hover:underline flex items-center gap-1"
                                >
                                    {e.name}
                                    <Icons.Link className="w-3 h-3 text-gray-400" />
                                </a>
                            ) : (
                            <h4 className="text-sm font-bold text-gray-900">{e.name}</h4>
                            )}
                            <div className="flex gap-2 mt-1">
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{e.type}</span>
                                {e.tag === 'Major' && <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded">Critical</span>}
                                {e.tag === 'Local' && <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">Local</span>}
                                {e.tag === 'Trip' && <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">Trip</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
