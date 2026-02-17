import { v4 as uuidv4 } from 'uuid';

// Configuration
const PATTERNS = {
    coreCS: ['dsa', 'data structures', 'algorithms', 'oop', 'object oriented', 'dbms', 'database management', 'os', 'operating systems', 'networks', 'computer networks', 'system design'],
    languages: ['java', 'python', 'javascript', 'js', 'typescript', 'ts', 'c\\+\\+', 'cpp', 'c#', 'csharp', 'go', 'golang', 'ruby', 'swift', 'kotlin', 'c '],
    web: ['react', 'next\\.js', 'node\\.js', 'node', 'express', 'rest', 'graphql', 'html', 'css', 'redux', 'vue', 'angular'],
    data: ['sql', 'mongodb', 'mongo', 'postgresql', 'postgres', 'mysql', 'redis', 'nosql', 'kafka', 'elasticsearch'],
    cloud: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'linux', 'devops', 'jenkins', 'terraform'],
    testing: ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'jest', 'testing', 'qa']
};

const QUESTIONS_BANK = {
    coreCS: ["Explain Process vs Thread.", "ACID properties?", "Polymorphism example?", "TCP vs UDP?", "Hash Map internals?"],
    languages: ["Memory management?", "Interface vs Abstract class?", "Garbage Collection?", "Closures?", "== vs ===?"],
    web: ["Virtual DOM?", "Middleware in Express?", "Local/Session Storage vs Cookies?", "REST constraints?", "CSS Box Model?"],
    data: ["SQL vs NoSQL?", "Indexing?", "JOIN types?", "Transactions?", "Normalization?"],
    cloud: ["Docker vs VM?", "CI/CD pipeline?", "Kubernetes usage?", "Scaling types?", "Serverless?"],
    testing: ["Unit vs Integration?", "Test Pyramid?", "TDD?", "Flaky tests?", "Page Object Model?"]
};

// Company Intel Types
const COMPANY_TYPES = {
    enterprise: ['google', 'amazon', 'microsoft', 'facebook', 'meta', 'apple', 'netflix', 'adobe', 'salesforce', 'oracle', 'ibm', 'intel', 'cisco', 'tcs', 'infosys', 'wipro', 'accenture', 'cognizant', 'capgemini', 'deloitte', 'pwc', 'kpmg', 'ey', 'goldman sachs', 'jpmorgan', 'morgan stanley', 'walmart', 'target', 'flipkart', 'uber', 'ola', 'paytm', 'zomato', 'swiggy', 'byju'],
    mid: ['zoho', 'freshworks', 'atlassian', 'stripe', 'shopify', 'airbnb', 'dropbox', 'box', 'slack', 'zoom', 'twilio', 'pagerduty', 'datadog', 'okta', 'auth0', 'zerodha', 'razorpay', 'cred', 'dream11', 'meesho', 'cars24', 'udaan', 'phonepe', 'bharatpe', 'lenskart', 'nykaa']
};

const getCompanyType = (companyName) => {
    if (!companyName) return 'startup';
    const lower = companyName.toLowerCase();
    if (COMPANY_TYPES.enterprise.some(c => lower.includes(c))) return 'enterprise';
    if (COMPANY_TYPES.mid.some(c => lower.includes(c))) return 'mid-size';
    return 'startup';
};

const getCompanyIntel = (name, type) => {
    if (type === 'enterprise') {
        return {
            industry: 'Technology / Services',
            size: 'Enterprise (2000+)',
            focus: 'Strong emphasis on Data Structures, Algorithms, and Core CS fundamentals. Expect standardized testing platforms (HackerRank/Codility) and structured interview loops.',
            rounds: [
                { roundTitle: 'Online Assessment', focusAreas: ['Aptitude', 'DSA (Arrays/Strings/Trees)'], whyItMatters: 'Filters candidates at scale based on problem-solving speed.' },
                { roundTitle: 'Technical Round 1', focusAreas: ['DSA Problem Solving', 'Core CS (OS/DBMS)'], whyItMatters: 'Validates coding proficiency and theoretical understanding.' },
                { roundTitle: 'Technical Round 2', focusAreas: ['System Design', 'Low Level Design'], whyItMatters: 'Tests ability to structure complex code and scalable systems.' },
                { roundTitle: 'Managerial / HR', focusAreas: ['Behavioral', 'Culture Fit'], whyItMatters: 'Ensures long-term alignment with company values.' }
            ]
        };
    } else if (type === 'mid-size') {
        return {
            industry: 'Product / SaaS',
            size: 'Mid-size (200-2000)',
            focus: 'Balance of problem solving and practical implementation. Likely to ask about system design and past projects in depth.',
            rounds: [
                { roundTitle: 'Screening', focusAreas: ['Resume Screening', 'Intro Call'], whyItMatters: 'Checks for relevant experience and communication skills.' },
                { roundTitle: 'Technical Loop 1', focusAreas: ['Practical Coding', 'Machine Coding'], whyItMatters: 'Tests ability to write clean, working code for real-world scenarios.' },
                { roundTitle: 'Technical Loop 2', focusAreas: ['System Design', 'Architecture'], whyItMatters: 'Evaluates understanding of distributed systems and scalability.' },
                { roundTitle: 'Culture Fit', focusAreas: ['Values', 'Team Alignment'], whyItMatters: 'Crucial for maintaining company culture during growth.' }
            ]
        };
    } else {
        return {
            industry: 'Technology / Startup',
            size: 'Startup (<200)',
            focus: 'High focus on practical skills, framework knowledge (React/Node/etc), and ability to ship code. Less emphasis on theoretical DSA puzzles.',
            rounds: [
                { roundTitle: 'Initial Chat', focusAreas: ['Founder/Lead Interaction'], whyItMatters: 'Gauges passion, adaptability, and cultural fit.' },
                { roundTitle: 'Practical Task', focusAreas: ['Take-home assignment', 'Live Pairing'], whyItMatters: 'Direct proof of ability to build features.' },
                { roundTitle: 'Tech Deep Dive', focusAreas: ['Code Review', 'Architecture Discussion'], whyItMatters: 'Assesses code quality, decision making, and trade-offs.' },
                { roundTitle: 'Final Round', focusAreas: ['Culture', 'Vision Alignment'], whyItMatters: 'Ensures shared vision and ownership mentality.' }
            ]
        };
    }
};

export const analyzeJD = (company, role, jdText) => {
    const jdLower = (jdText || "").toLowerCase();
    const extractedSkills = {
        coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: []
    };
    const presentCategories = [];
    let foundAny = false;

    // Skill Extraction
    Object.entries(PATTERNS).forEach(([category, keywords]) => {
        const found = keywords.filter(k => {
            try {
                const regex = new RegExp(`\\b${k}\\b`, 'i');
                return regex.test(jdLower);
            } catch (e) {
                return jdLower.includes(k);
            }
        });
        if (found.length > 0) {
            extractedSkills[category] = found.map(k => k.replace(/\\/g, ''));
            presentCategories.push(category);
            foundAny = true;
        }
    });

    // Fallback if no skills
    if (!foundAny) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    // Base Score Calculation
    let baseScore = 35;
    if (foundAny) baseScore += Math.min(presentCategories.length * 5, 30);
    if (company && company.trim().length > 1) baseScore += 10;
    if (role && role.trim().length > 1) baseScore += 10;
    if (jdText && jdText.length > 800) baseScore += 10;
    if (baseScore > 100) baseScore = 100;

    // Questions Generation
    let questions = [];
    if (foundAny) {
        presentCategories.forEach(cat => {
            const catQuestions = QUESTIONS_BANK[cat] || [];
            const shuffled = [...catQuestions].sort(() => 0.5 - Math.random());
            questions.push(...shuffled.slice(0, 2));
        });
    }
    // Fill with general
    const generalQuestions = ["Tell me about a challenging project.", "Strengths/Weaknesses?", "Where in 5 years?", "Why this company?", "Conflict resolution?"];
    if (questions.length < 10) {
        questions.push(...generalQuestions.slice(0, 10 - questions.length));
    }
    questions = questions.slice(0, 10);

    // Intel & Mapping
    const companyType = getCompanyType(company);
    const companyIntel = getCompanyIntel(company, companyType);
    const roundMapping = companyIntel.rounds;

    // Customize mapping based on skills
    if (companyType === 'startup' && presentCategories.includes('web')) {
        roundMapping[1].focusAreas = ['React/Node Feature Build', 'API Integration'];
    }
    if (companyType === 'enterprise' && presentCategories.includes('data')) {
        roundMapping[1].focusAreas.push('SQL Queries');
    }

    // Checklist Generation
    const checklist = [
        { roundTitle: 'Round 1: Basics', items: ["Aptitude Check", "Logical Reasoning", "Verbal Ability", "Resume Prep", "Basic Coding"] },
        { roundTitle: 'Round 2: Technical', items: ["Data Structures", "Algorithms", "Time Complexity", "OOPS", "System Design Basics"] },
        { roundTitle: 'Round 3: Advanced', items: ["Project Deep Dive", "Live Coding", `Stack Specifics (${presentCategories.join(', ') || 'General'})`, "DB Design"] },
        { roundTitle: 'Round 4: HR', items: ["Behavioral (STAR)", "Company Research", "Questions for Interviewer", "Salary Prep", "Soft Skills"] }
    ];

    // 7-Day Plan
    const primary = presentCategories[0] || 'coreCS';
    const secondary = presentCategories[1] || 'languages';
    const plan7Days = [
        { day: 'Day 1-2', focus: `Focus on ${primary === 'web' || primary === 'cloud' ? 'Frameworks' : 'Fundamentals'}`, tasks: [`Revise ${extractedSkills[primary]?.join(', ') || 'Basics'}`] },
        { day: 'Day 3-4', focus: 'Intensive Practice', tasks: [`Solve problems related to ${extractedSkills['coreCS']?.join(', ') || 'Arrays/Strings'}`] },
        { day: 'Day 5', focus: 'Project Polish', tasks: [`Demonstrate usage of ${extractedSkills[secondary]?.join(', ') || 'primary language'}`] },
        { day: 'Day 6', focus: 'Mock Interviews', tasks: ['Practice generated questions'] },
        { day: 'Day 7', focus: 'Revision & Rest', tasks: ['Review weak areas'] }
    ];

    const now = new Date().toISOString();

    const analysisResult = {
        id: uuidv4(),
        createdAt: now,
        updatedAt: now,
        company: company || "",
        role: role || "",
        jdText: jdText || "",
        extractedSkills,
        roundMapping,
        checklist,
        plan7Days,
        questions,
        baseScore,
        skillConfidenceMap: {},
        finalScore: baseScore, // Initially same as base
        companyIntel,
        companyType
    };

    return analysisResult;
};


export const saveToHistory = (analysis) => {
    try {
        const history = getHistory();
        const index = history.findIndex(item => item.id === analysis.id);
        if (index !== -1) history[index] = analysis;
        else history.unshift(analysis);
        localStorage.setItem('jd_analysis_history', JSON.stringify(history));
    } catch (e) {
        console.error("Failed to save history:", e);
    }
};

export const getHistory = () => {
    try {
        const stored = localStorage.getItem('jd_analysis_history');
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) return [];
        // Filter out corrupted entries without ID
        return parsed.filter(item => item && item.id);
    } catch (e) {
        console.error("Failed to parse history:", e);
        return [];
    }
};

export const getAnalysisById = (id) => {
    const history = getHistory();
    return history.find(item => item.id === id);
};

export const getUpdatedScore = (analysis) => {
    if (!analysis) return 0;
    let currentScore = analysis.baseScore; // Always start from base
    const map = analysis.skillConfidenceMap || {};
    Object.values(map).forEach(status => {
        if (status === 'know') currentScore += 2;
        if (status === 'practice') currentScore -= 2;
    });
    return Math.max(0, Math.min(100, currentScore));
};
