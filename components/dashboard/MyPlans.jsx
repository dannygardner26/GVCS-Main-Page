import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';

const MyPlans = ({ user }) => {
    const [academicRecord, setAcademicRecord] = useState({
        "2024-2025": { 1: null, 2: null, 3: null, 4: null }
    });
    const [savedPlans, setSavedPlans] = useState([]);
    const [isSelectorOpen, setIsSelectorOpen] = useState(null); // {year, mp}

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('gvcs_saved_plans') || '[]');
        setSavedPlans(saved);

        const record = JSON.parse(localStorage.getItem('gvcs_academic_record') || 'null');
        if (record) setAcademicRecord(record);
    }, []);

    const assignPlan = (year, mp, plan) => {
        const newRecord = { ...academicRecord };
        if (!newRecord[year]) newRecord[year] = { 1: null, 2: null, 3: null, 4: null };
        newRecord[year][mp] = plan;
        setAcademicRecord(newRecord);
        localStorage.setItem('gvcs_academic_record', JSON.stringify(newRecord));
        setIsSelectorOpen(null);
    };

    const clearSlot = (year, mp) => {
        if (!confirm("Are you sure you want to remove this plan from your schedule?")) return;
        const newRecord = { ...academicRecord };
        newRecord[year][mp] = null;
        setAcademicRecord(newRecord);
        localStorage.setItem('gvcs_academic_record', JSON.stringify(newRecord));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gvcs-navy flex items-center gap-3">
                    <Icons.Book /> My Academic Record
                </h2>
                <p className="text-gray-600">Manage your independent study curriculum for the year.</p>
            </div>

            {Object.entries(academicRecord).sort().reverse().map(([year, mps]) => (
                <div key={year} className="mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{year} School Year</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(mp => {
                            const plan = mps[mp];
                            return (
                                <div key={mp} className={`relative rounded-xl border-2 transition-all min-h-[200px] flex flex-col
                                    ${plan ? 'border-gvcs-navy bg-white shadow-sm' : 'border-dashed border-gray-300 bg-gray-50 hover:border-gray-400'}`}>

                                    <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-t-lg border-b border-gray-200 flex justify-between items-center">
                                        Marking Period {mp}
                                        {plan && <button onClick={() => clearSlot(year, mp)} className="text-red-400 hover:text-red-600">×</button>}
                                    </div>

                                    {plan ? (
                                        <div className="p-4 flex-grow flex flex-col">
                                            <h4 className="font-bold text-gvcs-navy mb-1 line-clamp-2">{plan.topic || plan.title}</h4>
                                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded self-start mb-2">{plan.level || "Standard"}</span>
                                            <div className="mt-auto pt-4">
                                                <button className="w-full py-1.5 text-xs font-bold text-gvcs-navy border border-gvcs-navy rounded hover:bg-gvcs-navy hover:text-white transition-colors">
                                                    View Plan
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-4 flex-grow flex flex-col items-center justify-center text-center">
                                            {isSelectorOpen?.year === year && isSelectorOpen?.mp === mp ? (
                                                <div className="absolute inset-0 bg-white z-10 p-2 overflow-y-auto rounded-xl">
                                                    <div className="text-xs font-bold text-gray-400 mb-2">Select a Saved Plan:</div>
                                                    {savedPlans.length === 0 && <div className="text-xs text-red-500">No saved plans found. Go to Curriculum Generator to create one!</div>}
                                                    {savedPlans.map(p => (
                                                        <button
                                                            key={p.id}
                                                            onClick={() => assignPlan(year, mp, p)}
                                                            className="w-full text-left p-2 hover:bg-blue-50 rounded text-xs border-b border-gray-100 last:border-0"
                                                        >
                                                            <div className="font-bold text-gvcs-navy">{p.topic}</div>
                                                            <div className="text-gray-400">{p.date}</div>
                                                        </button>
                                                    ))}
                                                    <button
                                                        onClick={() => setIsSelectorOpen(null)}
                                                        className="w-full mt-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setIsSelectorOpen({ year, mp })}
                                                    className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gvcs-navy transition-colors"
                                                >
                                                    <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-lg font-bold">+</div>
                                                    <span className="text-sm font-medium">Assign Plan</span>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyPlans;
