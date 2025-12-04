import React, { useState } from 'react';
import { Icons } from '../common/Icons';

const EllisActivityCard = ({ type, title, description, guidelines }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const colors = {
        builder: { border: 'border-blue-500', bg: 'bg-blue-50/50', badge: 'bg-blue-500', text: 'text-blue-700' },
        academic: { border: 'border-purple-500', bg: 'bg-purple-50/50', badge: 'bg-purple-500', text: 'text-purple-700' },
        communicator: { border: 'border-orange-500', bg: 'bg-orange-50/50', badge: 'bg-orange-500', text: 'text-orange-700' }
    };

    const color = colors[type] || colors.builder;
    const typeLabel = type === 'builder' ? 'Builder' : type === 'academic' ? 'Academic' : 'Communicator';

    return (
        <div className={`border-l-4 ${color.border} pl-3 py-2 ${color.bg} rounded-r-lg`}>
            <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold ${color.badge} text-white px-2 py-0.5 rounded uppercase tracking-wider`}>
                        {typeLabel}
                    </span>
                    <span className="text-xs text-gray-500 italic">Choose One</span>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                    {isExpanded ? 'Less' : 'Learn More'}
                    <Icons.ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
            </div>
            <div className="text-sm font-bold text-gray-800 mb-1">{title}</div>
            {isExpanded && (
                <div className="mt-2 space-y-2">
                    <div className="text-xs text-gray-700 leading-relaxed">{description}</div>
                    {guidelines && guidelines.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className={`text-[10px] font-semibold ${color.text} uppercase tracking-wider mb-1`}>
                                Guidelines:
                            </div>
                            <ul className="text-xs text-gray-600 space-y-1">
                                {guidelines.map((g, i) => (
                                    <li key={i} className="flex items-start gap-1">
                                        <span className={`${color.text} mt-0.5`}>•</span>
                                        <span>{g}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EllisActivityCard;
