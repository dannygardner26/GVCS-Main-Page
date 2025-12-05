import React, { useState, useRef } from 'react';
import { Icons } from '../common/Icons';
import { supabase } from '../../utils/supabase';

const HackathonProgramView = ({ hackathon, user, onBack, onUpdate }) => {
    // Use local state that we control - don't sync from props to avoid conflicts
    const [currentStep, setCurrentStep] = useState(() => hackathon.current_step || 0);
    const lastSavedStepRef = useRef(hackathon.current_step || 0);

    const steps = [
        'Download Tools',
        'Ideation',
        'Master Document',
        'Individual Setup',
        'Execution',
        'Pitch & Submit'
    ];

    const updateStep = async (newStep) => {
        if (newStep === currentStep) return; // Already on this step

        // Optimistic update - change UI immediately
        setCurrentStep(newStep);
        lastSavedStepRef.current = newStep;

        // Update database in background (don't call onUpdate to avoid refresh that resets state)
        try {
            const { error } = await supabase
                .from('hackathon_programs')
                .update({
                    current_step: newStep,
                    updated_at: new Date().toISOString()
                })
                .eq('id', hackathon.id);

            if (error) {
                console.error('Error updating step:', error);
                // Revert on error
                setCurrentStep(lastSavedStepRef.current);
            }
            // Don't call onUpdate() - it causes a refresh that resets the step
            // The step will persist in the database and be loaded on next page visit
        } catch (error) {
            console.error('Error updating step:', error);
            // Revert on error
            setCurrentStep(lastSavedStepRef.current);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <button
                onClick={onBack}
                className="mb-4 text-sm text-gray-500 hover:text-gvcs-navy flex items-center gap-1"
            >
                <Icons.ArrowRight /> Back to Dashboard
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-gvcs-navy mb-2">{hackathon.hackathon_name}</h2>
                <p className="text-gray-600 mb-4">
                    {hackathon.hackathon_date ? new Date(hackathon.hackathon_date).toLocaleDateString() : 'Date TBD'}
                </p>

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>Step {currentStep + 1} of {steps.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Project Information Summary */}
                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Project Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Team Members */}
                        {hackathon.team_members && hackathon.team_members.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Team Members</h4>
                                <div className="flex flex-wrap gap-2">
                                    {hackathon.team_members.map((member, i) => (
                                        <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                            {member}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tracks / Prize Categories */}
                        {hackathon.tracks && hackathon.tracks.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Prize Categories / Tracks</h4>
                                <div className="flex flex-wrap gap-2">
                                    {hackathon.tracks.map((track, i) => (
                                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                            {track}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Discord Link */}
                        {hackathon.discord_link && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Discord Link</h4>
                                <a
                                    href={hackathon.discord_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm break-all"
                                >
                                    {hackathon.discord_link}
                                </a>
                            </div>
                        )}

                        {/* Created Date */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Created</h4>
                            <p className="text-sm text-gray-600">
                                {hackathon.created_at ? new Date(hackathon.created_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step Navigation */}
            <div className="grid grid-cols-6 gap-2 mb-6">
                {steps.map((step, i) => (
                    <button
                        key={i}
                        onClick={() => updateStep(i)}
                        className={`p-3 rounded-lg text-xs font-semibold transition-all ${i === currentStep
                            ? 'bg-purple-600 text-white'
                            : i < currentStep
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Documents & Resources Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Documents & Resources</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Ideation Prompt */}
                    {hackathon.ideation_prompt && (
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-800">Ideation Prompt</h4>
                                <button
                                    onClick={() => {
                                        const blob = new Blob([hackathon.ideation_prompt], { type: 'text/plain' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `${hackathon.hackathon_name}_ideation_prompt.txt`;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                    }}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Download
                                </button>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-h-48 overflow-y-auto">
                                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">{hackathon.ideation_prompt}</pre>
                            </div>
                        </div>
                    )}

                    {/* Master Document Prompt */}
                    {hackathon.master_document_prompt && (
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-800">Master Document Prompt</h4>
                                <button
                                    onClick={() => {
                                        const blob = new Blob([hackathon.master_document_prompt], { type: 'text/plain' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `${hackathon.hackathon_name}_master_document_prompt.txt`;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                    }}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Download
                                </button>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-h-48 overflow-y-auto">
                                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">{hackathon.master_document_prompt}</pre>
                            </div>
                        </div>
                    )}

                    {/* Finalized Idea */}
                    {hackathon.finalized_idea && (
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-800">Finalized Idea</h4>
                                <button
                                    onClick={() => {
                                        const blob = new Blob([hackathon.finalized_idea], { type: 'text/plain' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `${hackathon.hackathon_name}_finalized_idea.txt`;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                    }}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Download
                                </button>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-h-48 overflow-y-auto">
                                <pre className="text-sm text-gray-700 whitespace-pre-wrap">{hackathon.finalized_idea}</pre>
                            </div>
                        </div>
                    )}

                    {/* Master Document */}
                    {hackathon.master_document && (
                        <div className="border border-gray-200 rounded-lg p-4 md:col-span-2">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-800">Master Document</h4>
                                <button
                                    onClick={() => {
                                        const blob = new Blob([hackathon.master_document], { type: 'text/plain' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `${hackathon.hackathon_name}_master_document.txt`;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                    }}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Download
                                </button>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-h-64 overflow-y-auto">
                                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">{hackathon.master_document}</pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">{steps[currentStep]}</h3>

                {currentStep === 0 && (
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Review your project information above. Make sure all team members have access to the Discord link and understand the prize categories you're targeting.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-blue-800">
                                {hackathon.discord_link && (
                                    <li>
                                        <a href={hackathon.discord_link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            - Join Discord Server
                                        </a>
                                    </li>
                                )}
                                <li>- Download required tools (Cursor, Lovable, etc.)</li>
                                <li>- Set up development environment</li>
                            </ul>
                        </div>
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="space-y-4">
                        {hackathon.finalized_idea ? (
                            <>
                                <p className="text-gray-600">
                                    Your finalized idea is shown in the Documents & Resources section above. Use this to guide your development.
                                </p>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-sm text-green-800">
                                        Idea finalized. You can reference it above or download it for easy access.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-800">
                                    No finalized idea yet. Complete the ideation step in the wizard to generate your project idea.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-4">
                        {hackathon.master_document ? (
                            <>
                                <p className="text-gray-600">
                                    Your master document is shown in the Documents & Resources section above. This is your complete execution plan.
                                </p>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-sm text-green-800 mb-2">
                                        Master document created. Use this to coordinate with your team and AI assistants.
                                    </p>
                                    <p className="text-xs text-green-700">
                                        Tip: Each team member should copy the master document and paste it into their LLM (Claude, GPT-4, etc.) to get personalized task breakdowns.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-800">
                                    No master document yet. Complete the master document step in the wizard to generate your execution plan.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">Individual LLM Setup</h4>
                        <p className="text-gray-600">Each team member should:</p>
                        <ol className="list-decimal list-inside text-gray-700 space-y-2">
                            <li>Open a web-based LLM (Claude, GPT-4, Perplexity, etc.)</li>
                            <li>Paste the entire master document</li>
                            <li>Provide your name and ask what you need to do</li>
                            <li>Use the LLM to create prompts for your coding agent</li>
                        </ol>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">Execution Phase</h4>
                        <p className="text-gray-600">Work through your tasks:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Follow your LLM's instructions step-by-step</li>
                            <li>Use your LLM to create prompts for your coding agent</li>
                            <li>Push/pull code regularly</li>
                            <li>Communicate with your team in Discord</li>
                            <li>Test and integrate your work</li>
                        </ul>
                    </div>
                )}

                {currentStep === 5 && (
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">Pitch Deck & DevPost</h4>
                        <p className="text-gray-600">Final steps:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Create your pitch deck (Canva, Figma, or Google Slides)</li>
                            <li>Submit to DevPost before the deadline</li>
                            <li>Prepare your demo</li>
                            <li>Practice your presentation</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HackathonProgramView;
