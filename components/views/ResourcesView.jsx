import React from 'react';
import { Icons } from '../common/Icons';

const ResourcesView = () => {
    const resources = [
        {
            category: "Learn to Code",
            items: [
                { name: "Codecademy", url: "https://www.codecademy.com", desc: "Interactive coding lessons" },
                { name: "freeCodeCamp", url: "https://www.freecodecamp.org", desc: "Free certifications and projects" },
                { name: "CS50", url: "https://cs50.harvard.edu/x/", desc: "Harvard's Intro to CS" },
            ]
        },
        {
            category: "Competitive Programming",
            items: [
                { name: "USACO Guide", url: "https://usaco.guide", desc: "Comprehensive training curriculum" },
                { name: "Codeforces", url: "https://codeforces.com", desc: "Weekly contests and problem sets" },
                { name: "LeetCode", url: "https://leetcode.com", desc: "Interview prep and challenges" },
            ]
        },
        {
            category: "Game Development",
            items: [
                { name: "Unity Learn", url: "https://learn.unity.com", desc: "Official Unity tutorials" },
                { name: "Godot Docs", url: "https://docs.godotengine.org", desc: "Open source engine documentation" },
            ]
        },
        {
            category: "Web Development",
            items: [
                { name: "MDN Web Docs", url: "https://developer.mozilla.org", desc: "The bible of web development" },
                { name: "CSS-Tricks", url: "https://css-tricks.com", desc: "Deep dives into CSS" },
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gvcs-navy mb-8">Learning Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {resources.map((cat, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">{cat.category}</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {cat.items.map((item, j) => (
                                <a
                                    key={j}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-6 py-4 hover:bg-blue-50 transition-colors group"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-blue-600 group-hover:underline">{item.name}</span>
                                        <Icons.Link />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesView;
