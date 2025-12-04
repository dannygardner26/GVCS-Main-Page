import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../common/Icons';

const HomeView = () => {
    const navigate = useNavigate();
    const [activePillar, setActivePillar] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e, index) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
        setMousePos({ x, y, index });
    };

    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section with Image */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Hero Image Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero.jpg"
                        alt="GVCS Computer Science Club"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = "/images/hero.png";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="max-w-5xl mx-auto px-4 text-center relative z-10 pt-20 pb-32">
                    <div className="inline-block mb-6 px-4 py-1.5 border border-blue-400/30 rounded-full bg-blue-500/20 backdrop-blur-sm">
                        <span className="text-blue-100 text-xs font-bold tracking-widest uppercase">Est. 2024 • Garnet Valley</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight drop-shadow-2xl">
                        Great Valley <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400">
                            Computer Science
                        </span>
                    </h1>
                    <p className="text-xl text-slate-200 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-lg">
                        A community of builders, students, and communicators. Home of <span className="font-bold text-white">The Code Academy</span>.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/weekly')}
                            className="group relative px-8 py-4 bg-white text-slate-900 font-bold text-lg rounded-full overflow-hidden shadow-2xl hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                This Week's Problems <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                        <button
                            onClick={() => navigate('/ellis')}
                            className="px-8 py-4 bg-transparent text-white font-bold text-lg rounded-full border-2 border-white/50 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all"
                        >
                            Plan Your Study
                        </button>
                    </div>
                </div>
            </section>

            {/* Tech Radar Section */}
            <section className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Icons.Sparkles className="text-blue-600" /> Tech Radar
                        </h2>
                        <span className="text-sm text-slate-500">What we're exploring this month</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Why Zuhaad Likes Rust", tag: "Languages", desc: "Memory safety without garbage collection. Is it the future of systems programming?", color: "bg-orange-50 text-orange-700 border-orange-200", link: "/articles/why-zuhaad-likes-rust" },
                            { title: "Intro to Svelte 5", tag: "Web", desc: "Rethinking reactivity. Less boilerplate, more performance.", color: "bg-red-50 text-red-700 border-red-200" },
                            { title: "Agentic AI Workflows", tag: "AI", desc: "Moving beyond chatbots to autonomous agents that can use tools.", color: "bg-purple-50 text-purple-700 border-purple-200" }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                onClick={() => item.link && navigate(item.link)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${item.color} border`}>{item.tag}</span>
                                    <Icons.ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive 3D Tilt Pillars Section */}
            <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            The Three <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">Pillars</span>
                        </h2>
                        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                            Move your mouse around and click the interactive elements to explore each pillar
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Builder",
                                icon: Icons.HardHat,
                                desc: "Architects of the digital world. We build apps, websites, and tools that solve real problems.",
                                color: "from-cyan-500 to-orange-500",
                                bgColor: "rgba(0, 255, 255, 0.15)",
                                borderColor: "rgba(0, 255, 255, 0.4)",
                                glowColor: "rgba(255, 136, 0, 0.3)",
                                stats: ["50+ Projects", "20+ Members", "10+ Tools"],
                                link: "/ellis"
                            },
                            {
                                title: "Student",
                                icon: Icons.BookOpen,
                                desc: "Seekers of deep knowledge. We study algorithms, theory, and the fundamental laws of computation.",
                                color: "from-purple-600 to-pink-500",
                                bgColor: "rgba(128, 0, 255, 0.15)",
                                borderColor: "rgba(128, 0, 255, 0.4)",
                                glowColor: "rgba(255, 0, 170, 0.3)",
                                stats: ["100+ Problems", "15+ Algorithms", "5 Competitions"],
                                link: "/weekly"
                            },
                            {
                                title: "Communicator",
                                icon: Icons.Speaker,
                                desc: "Voices of clarity. We communicate complex ideas with precision and persuasion.",
                                color: "from-green-500 to-yellow-400",
                                bgColor: "rgba(0, 255, 102, 0.15)",
                                borderColor: "rgba(0, 255, 102, 0.4)",
                                glowColor: "rgba(255, 221, 0, 0.3)",
                                stats: ["30+ Articles", "12+ Talks", "25+ Mentees"],
                                link: "/resources"
                            }
                        ].map((pillar, i) => {
                            const isActive = activePillar === i;
                            const tiltX = mousePos.index === i ? mousePos.y * 15 : 0;
                            const tiltY = mousePos.index === i ? mousePos.x * -15 : 0;
                            const glowX = mousePos.index === i ? (mousePos.x + 1) * 50 : 50;
                            const glowY = mousePos.index === i ? (mousePos.y + 1) * 50 : 50;

                            return (
                                <div
                                    key={i}
                                    data-pillar={i}
                                    className="relative group"
                                    onMouseMove={(e) => {
                                        handleMouseMove(e, i);
                                        if (!isActive) setActivePillar(i);
                                    }}
                                    onMouseLeave={() => {
                                        setActivePillar(null);
                                        setMousePos({ x: 0, y: 0, index: null });
                                    }}
                                    style={{
                                        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                                        transformStyle: 'preserve-3d',
                                        transition: activePillar === i ? 'none' : 'transform 0.3s ease-out'
                                    }}
                                >
                                    {/* Dynamic Glow Effect */}
                                    <div
                                        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${pillar.bgColor}, transparent 70%)`,
                                            transition: 'opacity 0.5s ease',
                                            filter: 'none'
                                        }}
                                    ></div>

                                    {/* Main Card */}
                                    <div
                                        className="relative bg-slate-800/90 rounded-3xl p-8 border-2 h-full flex flex-col overflow-hidden"
                                        style={{
                                            borderColor: isActive ? pillar.borderColor : 'rgba(255, 255, 255, 0.1)',
                                            boxShadow: isActive
                                                ? `0 20px 60px -10px ${pillar.bgColor}, 0 0 40px ${pillar.bgColor}`
                                                : '0 10px 30px rgba(0, 0, 0, 0.3)',
                                            transform: 'translateZ(50px)',
                                            transition: 'all 0.3s ease',
                                            backdropFilter: 'none'
                                        }}
                                    >
                                        {/* Animated Background Pattern */}
                                        <div
                                            className="absolute inset-0 opacity-10"
                                            style={{
                                                backgroundImage: `radial-gradient(circle at ${glowX}% ${glowY}%, ${pillar.bgColor}, transparent 50%)`,
                                                transition: 'background-position 0.1s ease-out',
                                                filter: 'none'
                                            }}
                                        ></div>

                                        {/* Custom Icon */}
                                        <div className="relative mb-6 flex justify-center">
                                            <div
                                                className="transform transition-all duration-300"
                                                style={{
                                                    transform: isActive
                                                        ? `translateZ(60px) scale(1.15) rotateY(${tiltY * 0.5}deg)`
                                                        : 'translateZ(60px)',
                                                    width: '120px',
                                                    height: '180px'
                                                }}
                                            >
                                                {pillar.icon && (
                                                    <pillar.icon
                                                        className="w-full h-full select-none pointer-events-none text-white"
                                                        style={{
                                                            display: 'block',
                                                            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3
                                            className="text-3xl font-black text-white mb-3 relative z-10"
                                            style={{
                                                transform: `translateZ(40px)`,
                                                textShadow: isActive ? `0 0 20px ${pillar.bgColor}` : 'none',
                                                transition: 'text-shadow 0.3s ease'
                                            }}
                                        >
                                            {pillar.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                                            {pillar.desc}
                                        </p>

                                        {/* Clickable CTA Button */}
                                        <div className="mt-auto relative z-10" style={{ transform: 'translateZ(40px)' }}>
                                            <button
                                                onClick={() => navigate(pillar.link)}
                                                className={`w-full px-6 py-4 bg-gradient-to-r ${pillar.color} hover:opacity-90 border-2 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
                                                style={{
                                                    borderColor: pillar.borderColor,
                                                    boxShadow: isActive ? `0 8px 24px ${pillar.bgColor}` : `0 4px 12px ${pillar.bgColor}`,
                                                    filter: 'none'
                                                }}
                                            >
                                                <span>Explore {pillar.title}</span>
                                                <Icons.ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Stats Bar */}
                                        <div className="mt-6 pt-6 border-t border-slate-700 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                                            <div className="flex justify-between text-xs text-slate-400">
                                                {pillar.stats.map((stat, sIdx) => (
                                                    <div key={sIdx} className="text-center">
                                                        <div className="font-bold text-white">{stat}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Interactive Instructions */}
                    <div className="text-center mt-12">
                        <p className="text-slate-400 text-sm">
                            Move your mouse over each pillar - Click to explore - Watch the 3D tilt effect
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Do - Gallery Section */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Life at The Academy</h2>
                        <p className="text-slate-600 text-lg">More than just code. A community of innovators.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96 md:h-[600px]">
                        {/* Large Featured Image */}
                        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group shadow-xl hover:shadow-2xl transition-all">
                            <img
                                src="/images/gallery1.jpg"
                                alt="GVCS Club Activities"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                    e.target.src = "/images/gallery1.png";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <span className="text-white font-bold text-xl">Hackathons & Competitions</span>
                                <p className="text-white/80 text-sm mt-1">Building projects, solving challenges, and competing together</p>
                            </div>
                        </div>

                        {/* Small Image 1 */}
                        <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group shadow-lg hover:shadow-xl transition-all">
                            <img
                                src="/images/gallery2.jpg"
                                alt="Workshops"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.src = "/images/gallery2.png";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 w-full">
                                <span className="text-white text-sm font-bold">Workshops</span>
                            </div>
                        </div>

                        {/* Tall Image */}
                        <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative group shadow-lg hover:shadow-xl transition-all">
                            <img
                                src="/images/gallery2.jpg"
                                alt="Collaboration"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.src = "/images/gallery2.png";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 w-full">
                                <span className="text-white text-sm font-bold">Collaboration</span>
                                <p className="text-white/80 text-xs mt-1">Learning together, building together</p>
                            </div>
                        </div>

                        {/* Small Image 2 */}
                        <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group shadow-lg hover:shadow-xl transition-all">
                            <img
                                src="/images/gallery1.jpg"
                                alt="Guest Speakers"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.src = "/images/gallery1.png";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 w-full">
                                <span className="text-white text-sm font-bold">Guest Speakers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
                        {[
                            { number: "50+", label: "Active Members" },
                            { number: "100+", label: "Projects Built" },
                            { number: "20+", label: "Hackathons" },
                            { number: "15+", label: "Workshops" }
                        ].map((stat, i) => (
                            <div key={i} className="text-white">
                                <div className="text-5xl font-black mb-2">{stat.number}</div>
                                <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Get Started</h2>
                    <p className="text-slate-600">Explore what we have to offer</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        {
                            title: "Weekly Challenges",
                            desc: "Practice problems from LeetCode and USACO every week",
                            icon: <Icons.Code className="w-8 h-8" />,
                            color: "from-blue-500 to-cyan-500",
                            onClick: () => navigate('/weekly')
                        },
                        {
                            title: "Curriculum Generator",
                            desc: "Create personalized 9-week independent study plans",
                            icon: <Icons.Book className="w-8 h-8" />,
                            color: "from-purple-500 to-pink-500",
                            onClick: () => navigate('/ellis')
                        },
                        {
                            title: "Career Pathways",
                            desc: "Explore different career paths in computer science",
                            icon: <Icons.GradCap className="w-8 h-8" />,
                            color: "from-emerald-500 to-teal-500",
                            onClick: () => navigate('/careers')
                        }
                    ].map((link, i) => (
                        <button
                            key={i}
                            onClick={link.onClick}
                            className="group bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-transparent hover:shadow-xl transition-all text-left"
                        >
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                                {link.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{link.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{link.desc}</p>
                            <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                                Learn more <Icons.ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomeView;
