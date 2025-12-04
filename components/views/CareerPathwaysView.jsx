import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../common/Icons';

const CareerPathwaysView = () => {
    const [expandedPathway, setExpandedPathway] = useState(null);

    const pathways = [
        {
            title: "Quantitative Finance & Fintech",
            icon: <Icons.Sparkles className="w-6 h-6 text-yellow-600" />,
            description: "Combine advanced mathematics, algorithms, and finance to build high-frequency trading systems and financial models.",
            color: "bg-yellow-50 border-yellow-100",
            textColor: "text-yellow-800",
            details: {
                ap: ["AP Calculus BC", "AP Statistics", "AP CSA", "AP Macro/Micro Economics"],
                codecademy: ["Data Science Path", "Python for Finance", "C++"],
                majors: ["CS + Math", "Financial Engineering", "Statistics", "Finance"],
                jobs: ["Quant Researcher", "Algorithmic Trader", "Fintech Developer"],
                ecs: ["Investment Club", "Math Competitions (AMC/AIME)", "USACO (Algorithmic Skills)"]
            }
        },
        {
            title: "STEM Education",
            icon: <Icons.Lightbulb className="w-6 h-6 text-green-600" />,
            description: "Inspire the next generation of innovators by combining technical expertise with pedagogy.",
            color: "bg-green-50 border-green-100",
            textColor: "text-green-800",
            details: {
                ap: ["AP CSA", "AP Psychology (Learning Science)", "AP Seminar"],
                codecademy: ["Learn Python (Basics)", "Web Development Path"],
                majors: ["CS Education", "Mathematics", "Education", "Cognitive Science"],
                jobs: ["CS Teacher", "Curriculum Developer", "EdTech Specialist", "Professor"],
                ecs: ["Peer Tutoring", "TA for CS Classes", "Starting a Coding Club", "Summer Camp Counselor"]
            }
        },
        {
            title: "Software Engineering",
            icon: <Icons.Code className="w-6 h-6 text-blue-600" />,
            description: "Build the applications and systems that power the modern world, from mobile apps to cloud infrastructure.",
            color: "bg-blue-50 border-blue-100",
            textColor: "text-blue-800",
            details: {
                ap: ["AP CSA", "AP CSP", "AP Physics C"],
                codecademy: ["Full Stack Engineer Path", "Java", "React", "Go"],
                majors: ["Computer Science", "Software Engineering", "Computer Engineering"],
                jobs: ["Full Stack Developer", "Mobile App Dev", "DevOps Engineer", "System Architect"],
                ecs: ["Hackathons", "Personal Projects", "Open Source Contributions", "Robotics"]
            }
        },
        {
            title: "Data Science & AI",
            icon: <Icons.Brain className="w-6 h-6 text-purple-600" />,
            description: "Extract insights from data and build intelligent systems that learn and adapt.",
            color: "bg-purple-50 border-purple-100",
            textColor: "text-purple-800",
            details: {
                ap: ["AP Statistics", "AP Calculus BC", "AP CSA"],
                codecademy: ["Data Scientist Path", "Machine Learning", "SQL", "Python"],
                majors: ["Data Science", "CS (AI Focus)", "Statistics", "Applied Math"],
                jobs: ["Data Scientist", "ML Engineer", "AI Researcher", "Data Analyst"],
                ecs: ["Kaggle Competitions", "Research Projects", "AI Club", "Science Fair"]
            }
        },
        {
            title: "Cybersecurity",
            icon: <Icons.Shield className="w-6 h-6 text-red-600" />,
            description: "Protect systems, networks, and data from digital attacks and unauthorized access.",
            color: "bg-red-50 border-red-100",
            textColor: "text-red-800",
            details: {
                ap: ["AP CSA", "AP CSP"],
                codecademy: ["Cybersecurity Path", "Linux", "Networks"],
                majors: ["Cybersecurity", "Information Security", "Computer Science"],
                jobs: ["Security Analyst", "Penetration Tester", "Security Engineer", "Cryptographer"],
                ecs: ["CTF Competitions (PicoCTF)", "CyberPatriot", "Ethical Hacking", "System Admin"]
            }
        },
        {
            title: "Game Development & Interactive Media",
            icon: <Icons.Sparkles className="w-6 h-6 text-pink-600" />,
            description: "Create immersive digital experiences through game engines, real-time graphics, and interactive storytelling.",
            color: "bg-pink-50 border-pink-100",
            textColor: "text-pink-800",
            details: {
                ap: ["AP CSA", "AP CSP", "AP Physics C", "AP Art & Design"],
                codecademy: ["Game Development", "Unity", "C#", "3D Programming"],
                majors: ["Game Design", "Computer Science", "Digital Media Arts", "Interactive Media"],
                jobs: ["Game Developer", "Game Engine Programmer", "Technical Artist", "VR/AR Developer", "Game Designer"],
                ecs: ["Game Jams (Ludum Dare, Global Game Jam)", "Personal Game Projects", "Unity/Unreal Learning", "Game Design Club", "Indie Game Development"]
            }
        },
        {
            title: "DevOps & Cloud Engineering",
            icon: <Icons.Code className="w-6 h-6 text-indigo-600" />,
            description: "Build and maintain scalable infrastructure, automate deployments, and ensure system reliability at scale.",
            color: "bg-indigo-50 border-indigo-100",
            textColor: "text-indigo-800",
            details: {
                ap: ["AP CSA", "AP CSP"],
                codecademy: ["DevOps", "AWS", "Docker", "Kubernetes", "Linux", "CI/CD"],
                majors: ["Computer Science", "Information Systems", "Computer Engineering"],
                jobs: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Cloud Architect", "Infrastructure Engineer", "Platform Engineer"],
                ecs: ["Personal Server Projects", "Open Source Contributions", "System Administration", "Cloud Certifications (AWS/GCP)", "Infrastructure Projects"]
            }
        },
        {
            title: "Human-Computer Interaction (HCI) / UX Engineering",
            icon: <Icons.Lightbulb className="w-6 h-6 text-teal-600" />,
            description: "Design and build intuitive user experiences by combining design thinking with technical implementation.",
            color: "bg-teal-50 border-teal-100",
            textColor: "text-teal-800",
            details: {
                ap: ["AP CSA", "AP CSP", "AP Psychology", "AP Art & Design"],
                codecademy: ["Front-End Development", "UI/UX Design", "React", "User Research"],
                majors: ["HCI", "Computer Science", "Design", "Cognitive Science", "Human-Centered Design"],
                jobs: ["UX Engineer", "Front-End Developer", "Product Designer", "Interaction Designer", "UX Researcher"],
                ecs: ["Design Projects", "User Research Studies", "Web Development", "Design Competitions", "Portfolio Building"]
            }
        },
        {
            title: "Research & Academia",
            icon: <Icons.Brain className="w-6 h-6 text-amber-600" />,
            description: "Advance the frontiers of computer science through research, publications, and academic teaching.",
            color: "bg-amber-50 border-amber-100",
            textColor: "text-amber-800",
            details: {
                ap: ["AP CSA", "AP Calculus BC", "AP Statistics", "AP Research", "AP Seminar"],
                codecademy: ["Python", "Data Science", "Machine Learning", "Research Methods"],
                majors: ["Computer Science (Research Track)", "Applied Math", "Physics", "Research-focused programs"],
                jobs: ["Research Scientist", "Professor", "Research Engineer", "PhD Researcher", "Postdoc"],
                ecs: ["Research Projects", "Science Fair", "Research Internships", "Academic Competitions (ISEF)", "Publications"]
            }
        },
        {
            title: "Embedded Systems & IoT",
            icon: <Icons.Code className="w-6 h-6 text-cyan-600" />,
            description: "Program devices that interact with the physical world, from microcontrollers to smart home systems.",
            color: "bg-cyan-50 border-cyan-100",
            textColor: "text-cyan-800",
            details: {
                ap: ["AP CSA", "AP Physics C", "AP Calculus BC"],
                codecademy: ["C/C++", "Embedded Systems", "Arduino/Raspberry Pi", "Microcontrollers"],
                majors: ["Computer Engineering", "Electrical Engineering", "Computer Science"],
                jobs: ["Embedded Systems Engineer", "Firmware Developer", "IoT Engineer", "Hardware Engineer", "Systems Programmer"],
                ecs: ["Robotics", "Electronics Projects", "Arduino/Raspberry Pi Projects", "Maker Faire", "Hardware Hacking"]
            }
        },
        {
            title: "Bioinformatics & Computational Biology",
            icon: <Icons.Sparkles className="w-6 h-6 text-emerald-600" />,
            description: "Apply computational methods to solve biological problems, from genomics to drug discovery.",
            color: "bg-emerald-50 border-emerald-100",
            textColor: "text-emerald-800",
            details: {
                ap: ["AP CSA", "AP Biology", "AP Statistics", "AP Calculus BC"],
                codecademy: ["Python", "Data Science", "Bioinformatics", "Scientific Computing"],
                majors: ["Bioinformatics", "Computational Biology", "CS + Biology", "Biostatistics"],
                jobs: ["Bioinformatics Scientist", "Computational Biologist", "Research Engineer", "Biotech Software Developer"],
                ecs: ["Research Projects", "Science Fair", "Biology + CS Projects", "Internships at Biotech Companies"]
            }
        },
        {
            title: "Computer Graphics & Visualization",
            icon: <Icons.Sparkles className="w-6 h-6 text-violet-600" />,
            description: "Create stunning visual experiences through rendering, shaders, and 3D mathematics.",
            color: "bg-violet-50 border-violet-100",
            textColor: "text-violet-800",
            details: {
                ap: ["AP CSA", "AP Calculus BC", "AP Physics C", "AP Art & Design"],
                codecademy: ["Computer Graphics", "3D Programming", "OpenGL", "Shader Programming"],
                majors: ["Computer Science", "Computer Graphics", "Digital Arts", "Applied Math"],
                jobs: ["Graphics Programmer", "Rendering Engineer", "Visualization Specialist", "Technical Artist", "Graphics Researcher"],
                ecs: ["Graphics Projects", "3D Modeling", "Shader Programming", "Art + Code Projects", "Game Engine Development"]
            }
        },
        {
            title: "Quality Assurance & Testing Engineering",
            icon: <Icons.Shield className="w-6 h-6 text-orange-600" />,
            description: "Ensure software quality through systematic testing, automation, and quality processes.",
            color: "bg-orange-50 border-orange-100",
            textColor: "text-orange-800",
            details: {
                ap: ["AP CSA", "AP CSP", "AP Statistics"],
                codecademy: ["Software Testing", "Automation", "Selenium", "Test-Driven Development"],
                majors: ["Computer Science", "Software Engineering", "Quality Assurance"],
                jobs: ["QA Engineer", "Test Automation Engineer", "Quality Engineer", "Test Architect", "SDET"],
                ecs: ["Testing Projects", "Bug Bounty Programs", "Open Source Testing", "Test Automation Projects"]
            }
        },
        {
            title: "Digital Forensics & Incident Response",
            icon: <Icons.Shield className="w-6 h-6 text-rose-600" />,
            description: "Investigate cybercrimes, analyze digital evidence, and respond to security incidents.",
            color: "bg-rose-50 border-rose-100",
            textColor: "text-rose-800",
            details: {
                ap: ["AP CSA", "AP CSP", "AP Statistics"],
                codecademy: ["Cybersecurity", "Digital Forensics", "Incident Response", "Linux"],
                majors: ["Cybersecurity", "Digital Forensics", "Computer Science", "Criminal Justice + CS"],
                jobs: ["Digital Forensics Analyst", "Incident Responder", "Malware Analyst", "Forensic Investigator", "Security Consultant"],
                ecs: ["CTF Competitions", "Digital Forensics Challenges", "Security Research", "Internships at Law Enforcement"]
            }
        },
        {
            title: "Computational Linguistics & NLP",
            icon: <Icons.Brain className="w-6 h-6 text-sky-600" />,
            description: "Bridge language and technology by building systems that understand and generate human language.",
            color: "bg-sky-50 border-sky-100",
            textColor: "text-sky-800",
            details: {
                ap: ["AP CSA", "AP Statistics", "AP English Language", "AP Research"],
                codecademy: ["Python", "Machine Learning", "NLP", "Linguistics"],
                majors: ["Computational Linguistics", "CS + Linguistics", "AI", "Cognitive Science"],
                jobs: ["NLP Engineer", "Computational Linguist", "AI Researcher (NLP)", "Language Technology Engineer"],
                ecs: ["NLP Projects", "Language Learning Apps", "Research Projects", "Linguistics Competitions"]
            }
        },
        {
            title: "Robotics & Autonomous Systems",
            icon: <Icons.Sparkles className="w-6 h-6 text-lime-600" />,
            description: "Build intelligent machines that perceive, plan, and act in the physical world.",
            color: "bg-lime-50 border-lime-100",
            textColor: "text-lime-800",
            details: {
                ap: ["AP CSA", "AP Physics C", "AP Calculus BC"],
                codecademy: ["Robotics", "Python", "Machine Learning", "Control Systems"],
                majors: ["Robotics", "Computer Engineering", "Mechanical Engineering + CS"],
                jobs: ["Robotics Engineer", "Autonomous Systems Engineer", "Control Systems Engineer", "Robotics Researcher"],
                ecs: ["Robotics Competitions (FRC, VEX)", "Robotics Projects", "Research", "Maker Projects"]
            }
        },
        {
            title: "Technical Writing & Developer Relations",
            icon: <Icons.Lightbulb className="w-6 h-6 text-fuchsia-600" />,
            description: "Bridge the gap between technology and users through documentation, tutorials, and community engagement.",
            color: "bg-fuchsia-50 border-fuchsia-100",
            textColor: "text-fuchsia-800",
            details: {
                ap: ["AP CSA", "AP CSP", "AP English Language"],
                codecademy: ["Technical Writing", "Documentation", "API Development", "Communication"],
                majors: ["Computer Science", "Technical Writing", "Communications", "English + CS"],
                jobs: ["Technical Writer", "Developer Advocate", "Documentation Engineer", "Technical Content Creator"],
                ecs: ["Blogging", "Open Source Documentation", "Tutorial Creation", "Writing", "Speaking at Conferences"]
            }
        },
        {
            title: "Product Management (Technical)",
            icon: <Icons.Brain className="w-6 h-6 text-amber-600" />,
            description: "Lead product strategy and development by combining technical knowledge with business acumen.",
            color: "bg-amber-50 border-amber-100",
            textColor: "text-amber-800",
            details: {
                ap: ["AP CSA", "AP Statistics", "AP Economics", "AP Psychology"],
                codecademy: ["Product Management", "Data Analysis", "Business Fundamentals"],
                majors: ["Computer Science", "Business", "Product Management", "Engineering Management"],
                jobs: ["Technical Product Manager", "Product Owner", "Program Manager", "Product Strategist"],
                ecs: ["Product Projects", "Business Competitions", "Leadership Roles", "Internships", "Startup Experience"]
            }
        },
        {
            title: "High-Performance Computing & Parallel Systems",
            icon: <Icons.Code className="w-6 h-6 text-slate-600" />,
            description: "Optimize code for supercomputers and parallel systems to solve computationally intensive problems.",
            color: "bg-slate-50 border-slate-100",
            textColor: "text-slate-800",
            details: {
                ap: ["AP CSA", "AP Calculus BC", "AP Physics C"],
                codecademy: ["C/C++", "Parallel Programming", "High-Performance Computing"],
                majors: ["Computer Science", "Applied Math", "Computational Science"],
                jobs: ["HPC Engineer", "Parallel Systems Developer", "Performance Engineer", "Scientific Computing Engineer"],
                ecs: ["Research Projects", "Supercomputing Competitions", "Performance Optimization Projects"]
            }
        },
        {
            title: "Accessibility Engineering",
            icon: <Icons.Shield className="w-6 h-6 text-emerald-600" />,
            description: "Build inclusive technology that is usable by everyone, regardless of ability or disability.",
            color: "bg-emerald-50 border-emerald-100",
            textColor: "text-emerald-800",
            details: {
                ap: ["AP CSA", "AP CSP", "AP Psychology"],
                codecademy: ["Web Accessibility", "Front-End Development", "Inclusive Design"],
                majors: ["Computer Science", "HCI", "Accessibility Engineering"],
                jobs: ["Accessibility Engineer", "Inclusive Design Engineer", "Assistive Technology Developer"],
                ecs: ["Accessibility Audits", "Inclusive Design Projects", "Volunteering with Disability Organizations"]
            }
        }
    ];

    const togglePathway = (index) => {
        setExpandedPathway(expandedPathway === index ? null : index);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gvcs-navy mb-4">Career Pathways</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                    Explore different directions your CS journey can take. Click on any pathway to see detailed roadmaps including courses, majors, and extracurriculars.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-3xl mx-auto">
                    <p className="text-sm text-blue-800">
                        <strong>Disclaimer:</strong> These pathways are suggestions based on typical requirements. Real jobs are <strong>not</strong> confined to these specific skills or activities. The items highlighted here are what employers typically look for, but career paths are diverse and flexible. Your unique combination of experiences, skills, and interests can lead to success in any of these fields.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {pathways.map((path, i) => {
                    const isExpanded = expandedPathway === i;
                    return (
                        <div 
                            key={i} 
                            className={`rounded-xl border-2 ${path.color.replace('bg-', 'border-')} overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${isExpanded ? 'ring-2 ring-offset-2 ' + path.color.replace('bg-', 'ring-') : ''} ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}
                            onClick={() => togglePathway(i)}
                        >
                            <div className={`p-4 ${path.color} flex items-start gap-3`}>
                                <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                                    {path.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`text-lg font-bold ${path.textColor} mb-1`}>{path.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{path.description}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Icons.ArrowRight 
                                        className={`w-5 h-5 ${path.textColor} transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} 
                                    />
                                </div>
                            </div>
                            
                            {isExpanded && (
                                <div className="p-6 bg-gray-50 border-t border-gray-200" style={{ animation: 'fadeIn 0.3s ease-out forwards' }}>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                                <Icons.Book className="w-4 h-4 text-gray-400" /> Recommended APs
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {path.details.ap.map((item, j) => (
                                                    <span key={j} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 font-medium">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                                <Icons.Code className="w-4 h-4 text-gray-400" /> Codecademy
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {path.details.codecademy.map((item, j) => (
                                                    <span key={j} className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-200 font-medium">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                                <Icons.GradCap className="w-4 h-4 text-gray-400" /> Majors
                                            </h4>
                                            <ul className="space-y-1.5">
                                                {path.details.majors.map((item, j) => (
                                                    <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                                                        <span className="text-gray-400 mt-1">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                                <Icons.GradCap className="w-4 h-4 text-gray-400" /> Careers
                                            </h4>
                                            <ul className="space-y-1.5">
                                                {path.details.jobs.map((item, j) => (
                                                    <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                                                        <span className="text-gray-400 mt-1">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                            <Icons.Sparkles className="w-4 h-4 text-gray-400" /> Extracurriculars
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {path.details.ecs.map((item, j) => (
                                                <span key={j} className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200 font-medium">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Header imported from ./components/common/Header


export default CareerPathwaysView;
