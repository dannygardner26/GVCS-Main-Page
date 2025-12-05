import React, { useState, useEffect } from 'react';

// Hook for admin problems management
const useAdminProblems = () => {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        // Would normally fetch from database
        setProblems([]);
    }, []);

    const seedData = () => {
        const mockProblems = [
            { id: '1', title: 'Two Sum', concept: 'Hash Table', date: new Date(), solveCount: 15 },
            { id: '2', title: 'Merge K Sorted Lists', concept: 'Heaps', date: new Date(Date.now() - 86400000), solveCount: 8 },
            { id: '3', title: 'Valid Parentheses', concept: 'Stack', date: new Date(Date.now() - 172800000), solveCount: 25 }
        ];
        setProblems(mockProblems);
    };

    return { problems, seedData };
};

const AdminMeetingView = ({ onExit }) => {
    const { problems, seedData } = useAdminProblems();

    return (
        <main className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gvcs-navy">Problem Archive (Admin)</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage and review recent challenges</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={seedData}
                        className="text-sm bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium shadow-sm"
                    >
                        + Seed Mock Data
                    </button>
                    <button
                        onClick={onExit}
                        className="text-sm bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-100 transition-all font-medium shadow-sm"
                    >
                        Exit Admin
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {problems.map((p) => (
                    <div key={p.id} className="group bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition-colors">{p.title}</h3>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                    {p.concept}
                                </span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">
                                Posted {p.date?.toDate ? p.date.toDate().toLocaleDateString() : 'Just now'}
                            </span>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-center min-w-[80px]">
                                <div className="text-2xl font-bold text-gvcs-navy">{p.solveCount || 0}</div>
                                <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Solves</div>
                            </div>
                        </div>
                    </div>
                ))}
                {problems.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <div className="text-4xl mb-3">📭</div>
                        <p className="text-gray-500 font-medium">No problems found in the archive.</p>
                        <p className="text-gray-400 text-sm">Use the seed button to generate some test data.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default AdminMeetingView;
