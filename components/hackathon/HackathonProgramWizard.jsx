import React, { useState, useMemo } from 'react';
import { useNotification } from '../context/NotificationContext';

const HackathonProgramWizard = ({ user, onComplete, onCancel }) => {
    const { showNotification, showConfirm } = useNotification();
    const [step, setStep] = useState(0);
    const [hackathonData, setHackathonData] = useState({
        hackathon_name: '',
        hackathon_date: '',
        tracks: [], // Prize categories
        team_members: [],
        current_step: 0,
        finalized_idea: '',
        master_document: '',
        ideation_prompt: '',
        master_document_prompt: ''
    });
    const [teamMemberInput, setTeamMemberInput] = useState('');
    const [trackInput, setTrackInput] = useState('');
    const [hackathonInfo, setHackathonInfo] = useState({
        theme: '',
        tool_specific_awards: '',
        context: '',
        sponsors: '',
        judge_demographic: ''
    });

    const steps = [
        { title: 'Download Tools', description: 'Get required software' },
        { title: 'Ideation', description: 'Brainstorm with LLM' },
        { title: 'Master Document', description: 'Create execution plan' },
        { title: 'Individual Setup', description: 'Set up personal LLM' },
        { title: 'Execution', description: 'Build the project' },
        { title: 'Pitch & Submit', description: 'Create presentation' }
    ];

    // Memoize ideation prompt to avoid re-renders
    const ideationPromptPreview = useMemo(() => {
        return `I'm participating in a hackathon and need help brainstorming project ideas.

HACKATHON DETAILS:
- Event Name: ${hackathonData.hackathon_name || '[INSERT HACKATHON NAME]'}
- Theme: ${hackathonInfo.theme || '[INSERT THEME, e.g., Education, Healthcare, Sustainability, or leave blank if open]'}
- Tool-Specific Awards: ${hackathonInfo.tool_specific_awards || '[INSERT TOOL-SPECIFIC AWARDS, e.g., Best Use of Twilio API, Best Use of AWS, Best Mobile App, etc.]'}
- Sponsors: ${hackathonInfo.sponsors || '[INSERT ALL SPONSORS FOR THE EVENT]'}
- Judge Demographic: ${hackathonInfo.judge_demographic || '[INSERT JUDGE DEMOGRAPHIC, e.g., Industry professionals, VCs, University professors, etc.]'}

AVAILABLE PRIZE CATEGORIES:
${hackathonData.tracks.length > 0 ? hackathonData.tracks.map(t => `- ${t}`).join('\n') : '[INSERT ALL PRIZE CATEGORIES, e.g., Best Overall, Best Design, Best Education Hack, Best AI/ML Hack, etc.]'}

TEAM SIZE: ${hackathonData.team_members.length || '[INSERT NUMBER]'} members

ADDITIONAL CONTEXT:
${hackathonInfo.context || '[PASTE RELEVANT CONTEXT HERE - e.g., CTRL+A of the hackathon website, important rules, special requirements, etc.]'}

INSTRUCTIONS:
Please help me brainstorm creative, feasible hackathon project ideas using a TWO-STEP PROCESS:

STEP 1: Generate the core project idea first
- Focus on solving a real problem or addressing the theme
- Consider what prize categories we have a good shot at (pick ones that aren't too competitive)
- Leverage our team's interests and skills
- Ensure it has clear impact and potential for a demo

STEP 2: Incorporate tool-specific awards
- After generating the core idea, creatively incorporate any tool-specific award requirements
- For example: If the core idea is an auditing tool and there's a "Best Messaging App" award, find a way to incorporate messaging features (e.g., real-time notifications, team chat, etc.)
- The tool-specific award should enhance the project, not force a complete pivot

For each idea, provide:
- Project name
- Brief description
- Problem it solves
- Key features
- Suggested tech stack
- Which prize categories it targets (and why we have a good shot)
- How tool-specific awards are incorporated
- Why it's feasible for a hackathon

Let's iterate and refine these ideas together!`;
    }, [hackathonData.hackathon_name, hackathonData.tracks, hackathonData.team_members, hackathonInfo.theme, hackathonInfo.tool_specific_awards, hackathonInfo.context, hackathonInfo.sponsors, hackathonInfo.judge_demographic]);

    // Memoize master document prompt to avoid re-renders
    const masterDocumentPromptPreview = useMemo(() => {
        const ideaSummary = hackathonData.finalized_idea || '[PASTE YOUR FINALIZED IDEA HERE]';
        return `I need you to create an EXTREMELY DETAILED and COMPREHENSIVE master execution document for our hackathon project. This document will be used by a TEAM working together, and each team member will use their own AI coding assistant (Cursor, Claude Code, etc.) to implement their tasks.

CRITICAL: This is a TEAM PROJECT. The document must emphasize coordination, context sharing, and synchronization between team members and their AI assistants.

FINALIZED PROJECT IDEA:
${ideaSummary}

TEAM MEMBERS:
${hackathonData.team_members.length > 0 ? hackathonData.team_members.map(m => `- ${m}`).join('\n') : '[INSERT TEAM MEMBER NAMES]'}

HACKATHON CONTEXT:
- Theme: ${hackathonInfo.theme || 'Open'}
- Tool-Specific Awards: ${hackathonInfo.tool_specific_awards || 'None'}

Create a MASTER EXECUTION DOCUMENT with the following structure:

1. PROJECT OVERVIEW (Brief - 1-2 paragraphs)
   - Complete project description
   - Problem statement
   - Solution approach
   - Target users
   - Success metrics

2. TECHNICAL ARCHITECTURE (Detailed)
   - System architecture diagram (describe in detail)
   - Technology stack with versions
   - Database schema (if applicable)
   - API endpoints (if applicable)
   - File/folder structure
   - Dependencies and packages needed
   - Environment variables and configuration

3. TEAM COORDINATION PROTOCOL (CRITICAL - NEW SECTION)
   IMPORTANT: This section must be included and emphasized throughout the document.

   - TEAM AWARENESS: All AI coding assistants (Cursor, Claude Code, etc.) must understand that this is a collaborative team project. They are NOT working in isolation.

   - CONTEXT SHARING MECHANISM:
     * Each team member's AI assistant should periodically (every 30-60 minutes or after completing a task) generate a "context update" from their current branch
     * This context update should include:
       - What files they've created/modified
       - What functions/features they've implemented
       - Current state of their branch
       - Any API contracts, data structures, or interfaces they've defined
       - Dependencies they've added
       - Any blockers or questions

   - CONTEXT DISTRIBUTION:
     * Team members should share these context updates with each other (via Discord, shared doc, etc.)
     * Each person should paste their teammates' context updates into their own AI assistant
     * AI assistants should use this shared context to ensure code compatibility and alignment

   - CHECK-IN SCHEDULE:
     * Every 2-3 hours, team members should do a "sync check-in"
     * During check-ins:
       - Pull latest changes from main branch
       - Review teammates' context updates
       - Update your AI assistant with latest project state
       - Identify and resolve any conflicts or misalignments
       - Adjust your tasks if needed based on team progress

   - BRANCH CONTEXT GENERATION:
     * When a team member completes a task or makes significant progress, their AI assistant should:
       - Analyze the current branch state
       - Generate a summary of changes
       - Identify what other team members need to know
       - Create a context snippet to share

   - ALIGNMENT VERIFICATION:
     * Before implementing new features, AI assistants should:
       - Check if any teammates have implemented related code
       - Verify API contracts match
       - Ensure data structures are compatible
       - Confirm naming conventions are consistent

4. STEP-BY-STEP TASKS FOR EACH TEAM MEMBER (CRITICAL - MAIN FOCUS)
   For EACH team member, create an EXTREMELY DETAILED step-by-step task list:

   === TEAM MEMBER: [MEMBER NAME] ===
   Role: [Frontend/Backend/Full-stack/Design/etc]

   TASKS (Numbered, in order of execution):

   Task 1: [Task Name]
   - Description: [What exactly needs to be done]
   - Step 1: [First specific action]
   - Step 2: [Second specific action]
   - Step 3: [Third specific action]
   - ... (continue for all steps)
   - Files to create: [Exact file paths, e.g., src/components/LoginForm.jsx]
   - Files to modify: [Exact file paths and what to change]
   - Functions to create: [Function names and signatures]
   - Dependencies needed: [What they need from teammates]
   - Git branch: [Branch name, e.g., feature/login-form]
   - Testing: [How to test this task]
   - Integration points: [How this connects to other tasks]
   - Estimated time: [Time estimate]

   Task 2: [Task Name]
   - [Same detailed structure as Task 1]

   Task 3: [Task Name]
   - [Same detailed structure as Task 1]

   ... (Continue for all tasks for this team member)

   DEPENDENCIES:
   - Waiting for: [What they need from other team members]
   - Providing to: [What they're creating for others]

   CHECK-IN POINTS:
   - After Task 1: [What to share with team]
   - After Task 2: [What to share with team]
   - ... (Continue for each task)

   Repeat this entire section for EACH team member.

5. GIT WORKFLOW & BRANCH STRATEGY
   - Branch naming: [Convention, e.g., feature/team-member-name/task-name]
   - Main branch protection: [Rules]
   - Merge process: [How to merge]
   - Conflict resolution: [Process]
   - Commit message format: [Format]

6. DEPLOYMENT PLAN
   - Hosting platform
   - Environment variables needed
   - Build commands
   - Deployment steps

7. DEMO PREPARATION
   - Demo script
   - Key features to showcase
   - Potential issues and solutions

CRITICAL REQUIREMENTS FOR THIS DOCUMENT:
- Focus HEAVILY on step-by-step tasks for each person (Section 4 should be the longest section)
- Emphasize team coordination and context sharing throughout
- Include specific file paths, function names, API endpoints, database tables
- Make it clear that AI assistants must be aware of team collaboration
- Include check-in points and context sharing instructions
- Ensure tasks are broken down into the smallest possible actionable steps
- Every team member should be able to follow their tasks without asking questions

This document will be used by each team member with their own AI coding assistant. The assistants must understand they're part of a coordinated team effort.`;
    }, [hackathonData.finalized_idea, hackathonData.team_members, hackathonInfo.theme, hackathonInfo.tool_specific_awards]);

    // Generate ideation prompt template
    const generateIdeationPrompt = () => {
        const prompt = `I'm participating in a hackathon and need help brainstorming project ideas.

HACKATHON DETAILS:
- Event Name: ${hackathonData.hackathon_name || '[INSERT HACKATHON NAME]'}
- Theme: ${hackathonInfo.theme || '[INSERT THEME, e.g., Education, Healthcare, Sustainability, or leave blank if open]'}
- Tool-Specific Awards: ${hackathonInfo.tool_specific_awards || '[INSERT TOOL-SPECIFIC AWARDS, e.g., Best Use of Twilio API, Best Use of AWS, Best Mobile App, etc.]'}
- Sponsors: ${hackathonInfo.sponsors || '[INSERT ALL SPONSORS FOR THE EVENT]'}
- Judge Demographic: ${hackathonInfo.judge_demographic || '[INSERT JUDGE DEMOGRAPHIC, e.g., Industry professionals, VCs, University professors, etc.]'}

AVAILABLE PRIZE CATEGORIES:
${hackathonData.tracks.length > 0 ? hackathonData.tracks.map(t => `- ${t}`).join('\n') : '[INSERT ALL PRIZE CATEGORIES, e.g., Best Overall, Best Design, Best Education Hack, Best AI/ML Hack, etc.]'}

TEAM SIZE: ${hackathonData.team_members.length || '[INSERT NUMBER]'} members

ADDITIONAL CONTEXT:
${hackathonInfo.context || '[PASTE RELEVANT CONTEXT HERE - e.g., CTRL+A of the hackathon website, important rules, special requirements, etc.]'}

INSTRUCTIONS:
Please help me brainstorm creative, feasible hackathon project ideas using a TWO-STEP PROCESS:

STEP 1: Generate the core project idea first
- Focus on solving a real problem or addressing the theme
- Consider what prize categories we have a good shot at (pick ones that aren't too competitive)
- Leverage our team's interests and skills
- Ensure it has clear impact and potential for a demo

STEP 2: Incorporate tool-specific awards
- After generating the core idea, creatively incorporate any tool-specific award requirements
- For example: If the core idea is an auditing tool and there's a "Best Messaging App" award, find a way to incorporate messaging features (e.g., real-time notifications, team chat, etc.)
- The tool-specific award should enhance the project, not force a complete pivot

For each idea, provide:
- Project name
- Brief description
- Problem it solves
- Key features
- Suggested tech stack
- Which prize categories it targets (and why we have a good shot)
- How tool-specific awards are incorporated
- Why it's feasible for a hackathon

Let's iterate and refine these ideas together!`;

        return prompt;
    };

    // Generate master document prompt template
    const generateMasterDocumentPrompt = () => {
        const ideaSummary = hackathonData.finalized_idea || '[PASTE YOUR FINALIZED IDEA HERE]';

        const prompt = `I need you to create an EXTREMELY DETAILED and COMPREHENSIVE master execution document for our hackathon project. This document will be used by a TEAM working together, and each team member will use their own AI coding assistant (Cursor, Claude Code, etc.) to implement their tasks.

CRITICAL: This is a TEAM PROJECT. The document must emphasize coordination, context sharing, and synchronization between team members and their AI assistants.

FINALIZED PROJECT IDEA:
${ideaSummary}

TEAM MEMBERS:
${hackathonData.team_members.length > 0 ? hackathonData.team_members.map(m => `- ${m}`).join('\n') : '[INSERT TEAM MEMBER NAMES]'}

HACKATHON CONTEXT:
- Theme: ${hackathonInfo.theme || 'Open'}
- Tool-Specific Awards: ${hackathonInfo.tool_specific_awards || 'None'}

Create a MASTER EXECUTION DOCUMENT with the following structure:

1. PROJECT OVERVIEW (Brief - 1-2 paragraphs)
   - Complete project description
   - Problem statement
   - Solution approach
   - Target users
   - Success metrics

2. TECHNICAL ARCHITECTURE (Detailed)
   - System architecture diagram (describe in detail)
   - Technology stack with versions
   - Database schema (if applicable)
   - API endpoints (if applicable)
   - File/folder structure
   - Dependencies and packages needed
   - Environment variables and configuration

3. TEAM COORDINATION PROTOCOL (CRITICAL - NEW SECTION)
   IMPORTANT: This section must be included and emphasized throughout the document.

   - TEAM AWARENESS: All AI coding assistants (Cursor, Claude Code, etc.) must understand that this is a collaborative team project. They are NOT working in isolation.

   - CONTEXT SHARING MECHANISM:
     * Each team member's AI assistant should periodically (every 30-60 minutes or after completing a task) generate a "context update" from their current branch
     * This context update should include:
       - What files they've created/modified
       - What functions/features they've implemented
       - Current state of their branch
       - Any API contracts, data structures, or interfaces they've defined
       - Dependencies they've added
       - Any blockers or questions

   - CONTEXT DISTRIBUTION:
     * Team members should share these context updates with each other (via Discord, shared doc, etc.)
     * Each person should paste their teammates' context updates into their own AI assistant
     * AI assistants should use this shared context to ensure code compatibility and alignment

   - CHECK-IN SCHEDULE:
     * Every 2-3 hours, team members should do a "sync check-in"
     * During check-ins:
       - Pull latest changes from main branch
       - Review teammates' context updates
       - Update your AI assistant with latest project state
       - Identify and resolve any conflicts or misalignments
       - Adjust your tasks if needed based on team progress

   - BRANCH CONTEXT GENERATION:
     * When a team member completes a task or makes significant progress, their AI assistant should:
       - Analyze the current branch state
       - Generate a summary of changes
       - Identify what other team members need to know
       - Create a context snippet to share

   - ALIGNMENT VERIFICATION:
     * Before implementing new features, AI assistants should:
       - Check if any teammates have implemented related code
       - Verify API contracts match
       - Ensure data structures are compatible
       - Confirm naming conventions are consistent

4. STEP-BY-STEP TASKS FOR EACH TEAM MEMBER (CRITICAL - MAIN FOCUS)
   For EACH team member, create an EXTREMELY DETAILED step-by-step task list:

   === TEAM MEMBER: [MEMBER NAME] ===
   Role: [Frontend/Backend/Full-stack/Design/etc]

   TASKS (Numbered, in order of execution):

   Task 1: [Task Name]
   - Description: [What exactly needs to be done]
   - Step 1: [First specific action]
   - Step 2: [Second specific action]
   - Step 3: [Third specific action]
   - ... (continue for all steps)
   - Files to create: [Exact file paths, e.g., src/components/LoginForm.jsx]
   - Files to modify: [Exact file paths and what to change]
   - Functions to create: [Function names and signatures]
   - Dependencies needed: [What they need from teammates]
   - Git branch: [Branch name, e.g., feature/login-form]
   - Testing: [How to test this task]
   - Integration points: [How this connects to other tasks]
   - Estimated time: [Time estimate]

   Task 2: [Task Name]
   - [Same detailed structure as Task 1]

   Task 3: [Task Name]
   - [Same detailed structure as Task 1]

   ... (Continue for all tasks for this team member)

   DEPENDENCIES:
   - Waiting for: [What they need from other team members]
   - Providing to: [What they're creating for others]

   CHECK-IN POINTS:
   - After Task 1: [What to share with team]
   - After Task 2: [What to share with team]
   - ... (Continue for each task)

   Repeat this entire section for EACH team member.

5. GIT WORKFLOW & BRANCH STRATEGY
   - Branch naming: [Convention, e.g., feature/team-member-name/task-name]
   - Main branch protection: [Rules]
   - Merge process: [How to merge]
   - Conflict resolution: [Process]
   - Commit message format: [Format]

6. DEPLOYMENT PLAN
   - Hosting platform
   - Environment variables needed
   - Build commands
   - Deployment steps

7. DEMO PREPARATION
   - Demo script
   - Key features to showcase
   - Potential issues and solutions

CRITICAL REQUIREMENTS FOR THIS DOCUMENT:
- Focus HEAVILY on step-by-step tasks for each person (Section 4 should be the longest section)
- Emphasize team coordination and context sharing throughout
- Include specific file paths, function names, API endpoints, database tables
- Make it clear that AI assistants must be aware of team collaboration
- Include check-in points and context sharing instructions
- Ensure tasks are broken down into the smallest possible actionable steps
- Every team member should be able to follow their tasks without asking questions

This document will be used by each team member with their own AI coding assistant. The assistants must understand they're part of a coordinated team effort.`;

        return prompt;
    };

    const handleStep1 = () => {
        // Just move to next step - tools download is informational
        setStep(1);
    };

    const handleStep2 = () => {
        if (!hackathonData.finalized_idea || hackathonData.finalized_idea.trim() === '') {
            showNotification('Please paste your finalized idea before proceeding.', 'error');
            return;
        }
        generateMasterDocumentPrompt();
        setStep(2);
    };

    const handleStep3 = () => {
        if (!hackathonData.master_document || hackathonData.master_document.trim() === '') {
            showNotification('Please paste your master document before proceeding.', 'error');
            return;
        }
        setStep(3);
    };

    const handleStep4 = () => {
        setStep(4);
    };

    const handleStep5 = () => {
        setStep(5);
    };

    const handleComplete = () => {
        const finalData = {
            user_id: user.id,
            ...hackathonData,
            current_step: 5, // Last step (Pitch & Submit)
            hackathon_date: hackathonData.hackathon_date || null
        };
        onComplete(finalData);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gvcs-navy">Hackathon Project Wizard</h2>
                    <p className="text-sm text-gray-500">Step {step + 1} of {steps.length}: {steps[step].title}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        {steps.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setStep(i)}
                                className={`px-2 py-1 text-xs rounded transition-colors ${i === step
                                        ? 'bg-purple-600 text-white font-bold'
                                        : i < step
                                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                                title={s.title}
                            >
                                {i + 1}
                            </button>
                        ))}
                </div>
                <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">Cancel</button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between mb-2">
                    {steps.map((s, i) => (
                        <div key={i} className={`flex-1 ${i < steps.length - 1 ? 'border-t-2' : ''} ${i <= step ? 'border-purple-600' : 'border-gray-200'}`}></div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                    {steps.map((s, i) => (
                        <span key={i} className={i <= step ? 'text-purple-600 font-bold' : ''}>{s.title}</span>
                    ))}
                </div>
            </div>

            {/* Step 0: Download Tools */}
            {step === 0 && (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Step 1: Download Required Tools</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Everyone on your team must download these tools before starting the hackathon.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <h4 className="font-bold text-blue-900 mb-3">Required Downloads (Everyone):</h4>
                            <ul className="text-sm text-blue-800 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span>
                                    <div>
                                        <span className="font-semibold">Discord</span> - Team communication
                                        <span className="text-blue-600 ml-2">(Free)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span>
                                    <div>
                                        <span className="font-semibold">Git</span> - Version control
                                        <span className="text-blue-600 ml-2">(Free)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span>
                                    <div>
                                        <span className="font-semibold">Node.js</span> - JavaScript runtime
                                        <span className="text-blue-600 ml-2">(Free)</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span>
                                    <div>
                                        <span className="font-semibold">VS Code</span> - Code editor
                                        <span className="text-blue-600 ml-2">(Free)</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                            <h4 className="font-bold text-purple-900 mb-3">Choose One AI Build Tool (Required):</h4>
                            <p className="text-xs text-purple-700 mb-3">Each team member should pick one AI coding assistant. Compare pricing below:</p>
                            <div className="space-y-3">
                                <div className="bg-white rounded-lg p-3 border-2 border-green-500 border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <div className="flex items-center gap-2">
                                            <h5 className="font-bold text-gray-900">Cursor</h5>
                                                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">Recommended</span>
                                            </div>
                                            <p className="text-xs text-gray-600">AI-powered code editor (VS Code fork)</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">Free + $20/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free tier: Limited requests. Pro: Unlimited AI requests, $20/month</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">GitHub Copilot</h5>
                                            <p className="text-xs text-gray-600">AI pair programmer by Microsoft</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">$10/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free for students/teachers. Individual: $10/month, Business: $19/user/month</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border-2 border-green-500 border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <div className="flex items-center gap-2">
                                            <h5 className="font-bold text-gray-900">Claude Code (via Cline)</h5>
                                                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">Recommended</span>
                                            </div>
                                            <p className="text-xs text-gray-600">VS Code extension using Claude AI</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">$20/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Requires Anthropic API key. Claude 3.5 Sonnet: ~$3/million tokens</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">Codeium</h5>
                                            <p className="text-xs text-gray-600">Free AI coding assistant</p>
                                        </div>
                                        <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">Free</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free tier: Unlimited basic completions. Pro: $12/month for advanced features</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">Tabnine</h5>
                                            <p className="text-xs text-gray-600">AI code completion</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">Free + $12/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free tier: Limited. Pro: $12/month, Team: $15/user/month</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">Aider</h5>
                                            <p className="text-xs text-gray-600">AI pair programming in terminal</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">$20/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Requires OpenAI API key. GPT-4: ~$30/million tokens input, $60/million output</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">Continue.dev</h5>
                                            <p className="text-xs text-gray-600">Open source AI coding assistant</p>
                                        </div>
                                        <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">Free</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free and open source. Requires API key (OpenAI, Anthropic, etc.)</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border-2 border-green-500 border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <div className="flex items-center gap-2">
                                            <h5 className="font-bold text-gray-900">Antigravity</h5>
                                                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">Recommended</span>
                                            </div>
                                            <p className="text-xs text-gray-600">AI code generation tool</p>
                                        </div>
                                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">$15/mo</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Subscription-based AI coding assistant</p>
                                </div>

                                <div className="bg-white rounded-lg p-3 border border-purple-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h5 className="font-bold text-gray-900">Sourcegraph Cody</h5>
                                            <p className="text-xs text-gray-600">AI coding assistant</p>
                                        </div>
                                        <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">Free</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Free tier available. Pro: $9/month</p>
                                </div>
                            </div>
                            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                                <strong>Tip:</strong> For hackathons, Codeium or Continue.dev offer great free options. Cursor Pro is popular for teams that need unlimited requests.
                            </div>
                        </div>

                        <button
                            onClick={handleStep1}
                            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                        >
                            Continue
                        </button>
                        </div>
                </div>
            )}

            {/* Step 1: Ideation */}
            {step === 1 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 2: Ideation</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Fill out the hackathon details below, then use the generated prompt with your LLM to brainstorm ideas.
                    </p>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Team Members</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={teamMemberInput}
                                    onChange={(e) => setTeamMemberInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && teamMemberInput.trim()) {
                                            setHackathonData({
                                                ...hackathonData,
                                                team_members: [...hackathonData.team_members, teamMemberInput.trim()]
                                            });
                                            setTeamMemberInput('');
                                        }
                                    }}
                                    placeholder="Enter name and press Enter"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {hackathonData.team_members.map((member, i) => (
                                    <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                                        {member}
                                        <button
                                            onClick={() => setHackathonData({
                                                ...hackathonData,
                                                team_members: hackathonData.team_members.filter((_, idx) => idx !== i)
                                            })}
                                            className="text-purple-700 hover:text-purple-900"
                                        >
                                            x
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Prize Categories</label>
                        <p className="text-xs text-gray-500 mb-2">List all available prize categories. The AI will help you pick ones you have a good shot at.</p>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={trackInput}
                                    onChange={(e) => setTrackInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && trackInput.trim()) {
                                            setHackathonData({
                                                ...hackathonData,
                                                tracks: [...hackathonData.tracks, trackInput.trim()]
                                            });
                                            setTrackInput('');
                                        }
                                    }}
                                placeholder="e.g., Best Overall, Best Design, Best Education Hack, etc."
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {hackathonData.tracks.map((track, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                                        {track}
                                        <button
                                            onClick={() => setHackathonData({
                                                ...hackathonData,
                                                tracks: hackathonData.tracks.filter((_, idx) => idx !== i)
                                            })}
                                            className="text-blue-700 hover:text-blue-900"
                                        >
                                            x
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Hackathon Name</label>
                            <input
                                type="text"
                                value={hackathonData.hackathon_name}
                                onChange={(e) => setHackathonData({ ...hackathonData, hackathon_name: e.target.value })}
                                placeholder="e.g., PennApps, HackMIT"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Theme (optional)</label>
                            <input
                                type="text"
                                value={hackathonInfo.theme}
                                onChange={(e) => setHackathonInfo({ ...hackathonInfo, theme: e.target.value })}
                                placeholder="e.g., Education, Healthcare"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tool-Specific Awards</label>
                        <p className="text-xs text-gray-500 mb-2">Awards that require using specific tools/APIs (e.g., Best Use of Twilio, Best AWS Integration)</p>
                        <textarea
                            value={hackathonInfo.tool_specific_awards}
                            onChange={(e) => setHackathonInfo({ ...hackathonInfo, tool_specific_awards: e.target.value })}
                            placeholder="e.g., Best Use of Twilio API, Best Mobile App, Best AWS Integration"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="2"
                            />
                        </div>

                        <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Sponsors</label>
                            <textarea
                            value={hackathonInfo.sponsors}
                            onChange={(e) => setHackathonInfo({ ...hackathonInfo, sponsors: e.target.value })}
                            placeholder="List all sponsors for the event"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="3"
                            />
                        </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Judge Demographic</label>
                        <input
                            type="text"
                            value={hackathonInfo.judge_demographic}
                            onChange={(e) => setHackathonInfo({ ...hackathonInfo, judge_demographic: e.target.value })}
                            placeholder="e.g., Industry professionals, VCs, University professors"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Context</label>
                        <p className="text-xs text-gray-500 mb-2">Paste relevant context (e.g., CTRL+A of hackathon website, important rules, special requirements)</p>
                        <textarea
                            value={hackathonInfo.context}
                            onChange={(e) => setHackathonInfo({ ...hackathonInfo, context: e.target.value })}
                            placeholder="Paste hackathon website content, rules, requirements, etc."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="6"
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-gray-800">Live Ideation Prompt Preview</label>
                            <button
                                onClick={() => {
                                    const prompt = generateIdeationPrompt();
                                    setHackathonData({ ...hackathonData, ideation_prompt: prompt });
                                    navigator.clipboard.writeText(prompt);
                                    alert('Prompt copied to clipboard!');
                                }}
                                className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Copy Prompt
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">This prompt updates automatically as you fill out the form above. Use it with Perplexity, Claude, GPT-4, or your preferred LLM to brainstorm ideas.</p>
                        <textarea
                            value={hackathonData.ideation_prompt || ideationPromptPreview}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs bg-gray-50"
                            rows="15"
                        />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-blue-900 mb-2">Instructions:</h4>
                        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                            <li>Fill out all the hackathon details above</li>
                            <li>Review the generated prompt preview</li>
                            <li>Click "Copy Prompt" to copy it to your clipboard</li>
                            <li>Paste it into Perplexity, Claude, GPT-4, or your preferred LLM</li>
                            <li>Have your team discuss and iterate with the LLM to refine ideas</li>
                            <li>Once you've finalized an idea, paste it in the text area below</li>
                        </ol>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Finalized Idea *</label>
                        <p className="text-xs text-gray-500 mb-2">Paste your finalized project idea here after brainstorming with your team and LLM:</p>
                        <textarea
                            value={hackathonData.finalized_idea}
                            onChange={(e) => setHackathonData({ ...hackathonData, finalized_idea: e.target.value })}
                            placeholder="Paste your finalized project idea here. Include: project name, description, problem it solves, key features, and tech stack..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="8"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(0)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleStep2}
                            disabled={!hackathonData.finalized_idea || hackathonData.finalized_idea.trim() === ''}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Master Document */}
            {step === 2 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 3: Create Master Document</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Create an extremely detailed master execution document that will guide your entire team. This document should be comprehensive and clear enough for each team member to work independently.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-blue-900 mb-2">Instructions:</h4>
                        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                            <li>First, paste your finalized idea into a prompt to get a summary/context</li>
                            <li>Then, use the "Master Document Prompt" below with your LLM to generate the comprehensive execution plan</li>
                            <li>The master document should be EXTREMELY LONG and DETAILED - include specific file paths, function names, API endpoints, etc.</li>
                            <li>Paste the complete master document below once generated</li>
                        </ol>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-gray-700">Master Document Prompt Template</label>
                            <button
                                onClick={() => {
                                    const prompt = generateMasterDocumentPrompt();
                                    setHackathonData({ ...hackathonData, master_document_prompt: prompt });
                                    navigator.clipboard.writeText(prompt);
                                    alert('Prompt copied to clipboard!');
                                }}
                                className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Generate & Copy
                            </button>
                        </div>
                        <textarea
                            value={hackathonData.master_document_prompt || masterDocumentPromptPreview}
                            onChange={(e) => setHackathonData({ ...hackathonData, master_document_prompt: e.target.value })}
                            placeholder="Click 'Generate & Copy' to create your master document prompt..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs"
                            rows="20"
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Master Document *</label>
                        <p className="text-xs text-gray-500 mb-3">Upload a file or paste your complete master execution document below:</p>

                        {/* File Upload Option */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-600 mb-2">Option 1: Upload File</label>
                            <input
                                type="file"
                                accept=".txt,.md,.doc,.docx"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            setHackathonData({ ...hackathonData, master_document: event.target.result });
                                        };
                                        reader.readAsText(file);
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            <p className="text-xs text-gray-400 mt-1">Supported formats: .txt, .md, .doc, .docx</p>
                        </div>

                        {/* Text Box Option */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-2">Option 2: Paste Text</label>
                        <textarea
                            value={hackathonData.master_document}
                            onChange={(e) => setHackathonData({ ...hackathonData, master_document: e.target.value })}
                                placeholder="Paste your complete master document here. It should include: project overview, technical architecture, step-by-step tasks for each team member, team coordination protocol, git workflow, deployment plan, and demo preparation..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs"
                            rows="25"
                        />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(1)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleStep3}
                            disabled={!hackathonData.master_document || hackathonData.master_document.trim() === ''}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Individual Setup */}
            {step === 3 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 4: Individual LLM Setup</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Each team member should set up their personal LLM (web-based) to act as their context/AI/prompt engineer.
                    </p>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-purple-900 mb-3">For Each Team Member:</h4>
                        <ol className="text-sm text-purple-800 space-y-2 list-decimal list-inside">
                            <li>Open a web-based LLM (Claude, GPT-4, Perplexity, etc.)</li>
                            <li>Paste the ENTIRE master document into the LLM</li>
                            <li>Provide your name and ask: "What do I need to do?"</li>
                            <li>The LLM will guide you through your specific batch of tasks</li>
                            <li>Use the LLM to create prompts for your in-house coding agent (Cursor, Claude Code, etc.)</li>
                        </ol>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-gray-900 mb-2">Example Prompt for Your LLM:</h4>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                            <p className="mb-2">Here is our complete hackathon project master document:</p>
                            <p className="mb-2">[PASTE ENTIRE MASTER DOCUMENT HERE]</p>
                            <p className="mb-2">My name is: [YOUR NAME]</p>
                            <p>What do I need to do? Please guide me through my specific tasks and help me create prompts for my coding agent.</p>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-bold text-yellow-900 mb-2">Tips:</h4>
                        <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                            <li>Keep the master document in context throughout the hackathon</li>
                            <li>Ask your LLM to break down complex tasks into smaller steps</li>
                            <li>Have your LLM create specific, actionable prompts for your coding agent</li>
                            <li>Update your LLM when dependencies are ready or blockers occur</li>
                        </ul>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(2)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleStep4}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Step 4: Execution */}
            {step === 4 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 5: Execution</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Work through your tasks following your LLM's guidance and using your coding agent.
                    </p>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-green-900 mb-3">Execution Workflow:</h4>
                        <ol className="text-sm text-green-800 space-y-2 list-decimal list-inside">
                            <li>Follow your LLM's instructions step-by-step</li>
                            <li>Use your LLM to create prompts for your in-house coding agent (Cursor, Claude Code, etc.)</li>
                            <li>Implement features according to your batch in the master document</li>
                            <li>Push your code to Git when you complete tasks</li>
                            <li>Pull latest changes from teammates regularly</li>
                            <li>Wait for dependencies if needed (communicate in Discord)</li>
                            <li>Test your work and integrate with teammates' code</li>
                            <li>Continue iterating until all features are complete</li>
                        </ol>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-gray-900 mb-2">Git Workflow Reminder:</h4>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                            <li>Create feature branches: <code className="bg-gray-100 px-1 rounded">git checkout -b feature/your-feature</code></li>
                            <li>Commit frequently: <code className="bg-gray-100 px-1 rounded">git commit -m "descriptive message"</code></li>
                            <li>Push your branch: <code className="bg-gray-100 px-1 rounded">git push origin feature/your-feature</code></li>
                            <li>Pull latest changes: <code className="bg-gray-100 px-1 rounded">git pull origin main</code></li>
                            <li>Merge conflicts? Ask your LLM for help resolving them</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-bold text-blue-900 mb-2">Communication:</h4>
                        <p className="text-sm text-blue-800">
                            Keep your team updated in Discord. Share progress, blockers, and when dependencies are ready.
                            Use your LLM to help communicate technical details clearly.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(3)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleStep5}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Step 5: Pitch & Submit */}
            {step === 5 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Step 6: Pitch Deck & DevPost</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Create your presentation and submit to DevPost before the deadline.
                    </p>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-purple-900 mb-3">Pitch Deck Creation:</h4>
                        <ol className="text-sm text-purple-800 space-y-2 list-decimal list-inside">
                            <li>Assign someone (or multiple people) to create the pitch deck</li>
                            <li>Use Canva, Figma, or Google Slides</li>
                            <li>Include: Problem, Solution, Demo, Impact, Tech Stack, Team</li>
                            <li>Keep it concise - usually 3-5 minutes for presentation</li>
                            <li>Practice the pitch with your team</li>
                        </ol>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-blue-900 mb-3">DevPost Submission:</h4>
                        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                            <li>Create account on DevPost (if not already done)</li>
                            <li>Fill out project details: name, description, problem, solution</li>
                            <li>Add screenshots/demo video</li>
                            <li>List technologies used</li>
                            <li>Add team members</li>
                            <li>Include GitHub repository link</li>
                            <li>Submit before the deadline!</li>
                        </ol>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-yellow-900 mb-2">Demo Preparation:</h4>
                        <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                            <li>Test your demo thoroughly before presenting</li>
                            <li>Have a backup plan if live demo fails (recorded video)</li>
                            <li>Prepare answers to common questions</li>
                            <li>Highlight your best features</li>
                            <li>Show the problem you're solving clearly</li>
                        </ul>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(4)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleComplete}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                        >
                            Complete Setup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HackathonProgramWizard;
