import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../common/Icons';
import { useNotification } from '../context/NotificationContext';
import { supabase } from '../../utils/supabase';

const HackathonsSection = ({ hackathons, user, onSelect, onRefresh }) => {
    const navigate = useNavigate();
    const { showNotification, showConfirm } = useNotification();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gvcs-navy">Hackathon Projects</h2>
                <button
                    onClick={() => navigate('/hackathons')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 flex items-center gap-2"
                >
                    <Icons.Sparkles /> Start New Project
                </button>
            </div>

            {hackathons.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-600 mb-4">You haven't created any hackathon projects yet.</p>
                    <button
                        onClick={() => navigate('/hackathons')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                    >
                        Start Your First Project
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {hackathons.map(hackathon => (
                        <div
                            key={hackathon.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer relative group"
                            onClick={() => onSelect(hackathon)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-gvcs-navy mb-1">{hackathon.hackathon_name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {hackathon.hackathon_date ? new Date(hackathon.hackathon_date).toLocaleDateString() : 'Date TBD'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                                            <div
                                                className="bg-purple-600 h-2 rounded-full transition-all"
                                                style={{ width: `${((hackathon.current_step + 1) / 6) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-600">Step {hackathon.current_step + 1}/6</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            showConfirm(
                                                `Are you sure you want to delete "${hackathon.hackathon_name}"? This will remove all your planning progress.`,
                                                async () => {
                                                    try {
                                                        const { error } = await supabase
                                                            .from('hackathon_programs')
                                                            .delete()
                                                            .eq('id', hackathon.id)
                                                            .eq('user_id', user.id);

                                                        if (error) throw error;
                                                        showNotification('Hackathon project deleted successfully!', 'success');
                                                        onRefresh();
                                                    } catch (error) {
                                                        console.error('Error deleting hackathon:', error);
                                                        showNotification('Failed to delete hackathon. Please try again.', 'error');
                                                    }
                                                }
                                            );
                                        }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                        title="Delete hackathon"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                    <Icons.ArrowRight className="w-6 h-6 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HackathonsSection;
