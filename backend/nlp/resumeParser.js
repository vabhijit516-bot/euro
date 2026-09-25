// AI Resume & Document Parser Engine
// Ingests resume text/documents, extracts technical & soft skills,
// provides explainable rationale for each detected skill & proficiency level,
// and compares directly with target career requirements.

import { extractEntities } from './entityExtractor.js';
import { CAREER_KNOWLEDGE_BASE } from '../knowledge/careerDatabase.js';

export const SAMPLE_RESUMES = {
  arun: {
    name: 'Arun',
    degree: 'B.Tech in Computer Science & Engineering',
    year: '4th Year',
    targetCareer: 'Full Stack Developer',
    text: `Arun | B.Tech CSE (4th Year)
Email: arun.cs@university.edu | GitHub: github.com/arun-dev
Career Objective: Aspiring Full Stack Developer seeking high-impact software engineering role.

Technical Skills:
- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Responsive Web Design
- Backend: Node.js, Express.js, RESTful APIs, JSON
- Databases: MongoDB, Mongoose, Relational SQL basics
- Version Control & Tools: Git, GitHub, VS Code, Postman

Projects:
1. Campus Connect Social Platform:
Developed a full stack web application using React, Node.js and MongoDB. Designed REST APIs for user authentication, posts, and real-time notifications with Socket.io. Built modular React components with responsive Tailwind UI.

2. E-Commerce Cart & Catalog:
Engineered an online shopping cart in JavaScript and React with state management, client-side routing, and MongoDB product catalog filtering.

3. Student Attendance Tracker:
Built an internal portal using HTML, CSS, JavaScript, and Node.js for automated classroom attendance tracking.

Certifications & Coursework:
- Certified in Modern JavaScript & React Web Development
- Data Structures & Algorithms coursework`
  },
  rahul: {
    name: 'Rahul',
    degree: 'B.Tech in Computer Science',
    year: '3rd Year',
    targetCareer: 'Software Developer',
    text: `Rahul | B.Tech Computer Science (3rd Year)
Passionate about algorithmic problem solving and software development.

Technical Skills:
- Languages: Python (Intermediate), Java (Beginner), SQL (Intermediate)
- Web: HTML5, CSS3
- Core CS: Data Structures & Algorithms, Object-Oriented Programming (OOP)
- Tools: Git, VS Code, Eclipse

Academic Projects:
1. Library Management System:
Developed a desktop application in Java and SQL to manage book checkouts, member catalogs, and late return penalties using OOP principles.

2. Web Data Scraper & Analyzer:
Built a Python automation script with BeautifulSoup and Pandas to scrape real-time tech job postings and summarize frequency of required skills.

3. Student Portfolio Website:
Created a clean personal portfolio using semantic HTML and CSS.`
  },
  alex: {
    name: 'Alex Kumar',
    degree: 'M.S. in Data Science',
    year: 'Final Year Aspirant',
    targetCareer: 'Data Scientist',
    text: `Alex Kumar | M.S. Data Science
Seeking Senior L4 Data Scientist conversion.

Core Competencies:
- Programming: Python (Advanced - NumPy, Pandas, Scikit-Learn)
- Querying: Relational SQL, PostgreSQL, Complex Joins, Window Functions
- Statistics: Exploratory Data Analysis, Descriptive Statistics, Inferential Hypothesis Testing
- Tools: Jupyter, Git, Docker (Basic), Excel (Advanced)

Projects:
1. Multi-Terabyte Customer Transaction Pipeline:
Engineered Python and SQL aggregation pipelines processing 1.2M customer events with Pandas and PostgreSQL.

2. Algorithmic Churn Prediction Model:
Trained baseline logistic regression and decision tree classifiers to predict subscription churn with 82% recall.`
  }
};

/**
 * Parses raw resume text into structured skills, assessments, and explanations.
 * @param {string} resumeText
 * @param {string} targetRole
 * @returns {object} Extracted resume intelligence
 */
export function parseResumeDocument(resumeText = '', targetRole = 'Full Stack Developer') {
  const lines = resumeText.split('\n').filter(l => l.trim().length > 0);
  const textLower = resumeText.toLowerCase();

  // 1. Skill Extraction with Sentence-Level Evidence & Explanation
  const extractedSkills = [];
  const recognizedSkillsMap = [
    { name: 'React', keywords: ['react', 'react.js', 'reactjs'], defaultLevel: 'Intermediate', baseScore: 78 },
    { name: 'Node.js', keywords: ['node.js', 'nodejs', 'node'], defaultLevel: 'Intermediate', baseScore: 75 },
    { name: 'MongoDB', keywords: ['mongodb', 'mongoose'], defaultLevel: 'Intermediate', baseScore: 72 },
    { name: 'JavaScript', keywords: ['javascript', 'es6', 'js'], defaultLevel: 'Advanced', baseScore: 88 },
    { name: 'HTML & CSS', keywords: ['html', 'html5', 'css', 'css3', 'tailwind'], defaultLevel: 'Advanced', baseScore: 90 },
    { name: 'Python', keywords: ['python', 'pandas', 'numpy'], defaultLevel: 'Intermediate', baseScore: 82 },
    { name: 'SQL', keywords: ['sql', 'postgresql', 'mysql', 'relational'], defaultLevel: 'Intermediate', baseScore: 76 },
    { name: 'Java', keywords: ['java', 'oop'], defaultLevel: 'Beginner', baseScore: 50 },
    { name: 'Git & Version Control', keywords: ['git', 'github'], defaultLevel: 'Intermediate', baseScore: 75 },
    { name: 'RESTful APIs', keywords: ['rest', 'restful', 'apis'], defaultLevel: 'Intermediate', baseScore: 74 },
    { name: 'Docker', keywords: ['docker', 'container'], defaultLevel: 'Beginner', baseScore: 40 },
    { name: 'AWS', keywords: ['aws', 'cloud', 'ec2', 's3'], defaultLevel: 'Beginner', baseScore: 35 },
    { name: 'Testing / TDD', keywords: ['jest', 'testing', 'unit test', 'tdd'], defaultLevel: 'Beginner', baseScore: 30 },
    { name: 'Machine Learning', keywords: ['machine learning', 'scikit', 'xgboost'], defaultLevel: 'Beginner', baseScore: 45 },
    { name: 'Deep Learning', keywords: ['deep learning', 'pytorch', 'tensorflow'], defaultLevel: 'Beginner', baseScore: 30 }
  ];

  for (const sk of recognizedSkillsMap) {
    let found = false;
    let evidenceSentence = '';

    for (const kw of sk.keywords) {
      if (textLower.includes(kw)) {
        found = true;
        // Find line containing this keyword as proof
        const matchLine = lines.find(l => l.toLowerCase().includes(kw));
        if (matchLine) {
          evidenceSentence = matchLine.trim();
        }
        break;
      }
    }

    if (found) {
      let level = sk.defaultLevel;
      let score = sk.baseScore;

      // Check contextual qualifiers in evidence
      const evLower = evidenceSentence.toLowerCase();
      if (evLower.includes('advanced') || evLower.includes('architect') || evLower.includes('lead')) {
        level = 'Advanced';
        score = Math.min(95, score + 12);
      } else if (evLower.includes('basic') || evLower.includes('beginner') || evLower.includes('familiar')) {
        level = 'Beginner';
        score = Math.max(35, score - 15);
      }

      extractedSkills.push({
        name: sk.name,
        level,
        score,
        status: 'VERIFIED',
        evidence: evidenceSentence || `Identified through explicit keyword reference in technical experience section.`,
        explanation: `AI detected "${sk.name}" at ${level} level from resume context: "${(evidenceSentence || sk.name).slice(0, 110)}..."`
      });
    }
  }

  // 2. Fetch Target Career Blueprint
  let careerBlueprint = CAREER_KNOWLEDGE_BASE.find(
    c => c.title.toLowerCase() === targetRole.toLowerCase() ||
         targetRole.toLowerCase().includes(c.title.toLowerCase())
  );

  if (!careerBlueprint) {
    careerBlueprint = CAREER_KNOWLEDGE_BASE[0]; // Software Developer / Full Stack
  }

  // 3. Skill Gap Detection (Student Skills vs Target Requirements)
  const presentSkills = [];
  const missingSkills = [];
  const prioritizedGaps = [];

  careerBlueprint.requiredSkills.forEach(req => {
    const matched = extractedSkills.find(
      s => s.name.toLowerCase() === req.name.toLowerCase() ||
           s.name.toLowerCase().includes(req.name.toLowerCase()) ||
           req.name.toLowerCase().includes(s.name.toLowerCase())
    );

    if (matched) {
      presentSkills.push({
        skill: req.name,
        studentLevel: matched.level,
        studentScore: matched.score,
        requiredLevel: `Level ${req.requiredLevel}/5`,
        status: 'SATISFIED'
      });
    } else {
      missingSkills.push({
        skill: req.name,
        requiredLevel: `Level ${req.requiredLevel}/5`,
        importance: req.importance,
        status: 'MISSING'
      });
      prioritizedGaps.push({
        skill: req.name,
        priority: req.importance >= 0.9 ? 'HIGH' : req.importance >= 0.75 ? 'MEDIUM' : 'LOW',
        importance: req.importance,
        action: `Learn fundamentals and complete a verified portfolio project for ${req.name}.`
      });
    }
  });

  // Sort prioritized gaps by importance descending
  prioritizedGaps.sort((a, b) => b.importance - a.importance);

  // 4. Overall Match & Readiness Calculation
  const totalRequired = careerBlueprint.requiredSkills.length;
  const matchRatio = totalRequired > 0 ? presentSkills.length / totalRequired : 0.6;
  const calculatedReadiness = Math.round(matchRatio * 75 + 15);

  return {
    parsedAt: new Date().toISOString(),
    candidateName: lines[0]?.split('|')[0]?.trim() || 'Student Candidate',
    targetCareer: careerBlueprint.title,
    domain: careerBlueprint.domain,
    extractedSkillsCount: extractedSkills.length,
    extractedSkills,
    presentSkills,
    missingSkills,
    prioritizedGaps,
    readinessScore: calculatedReadiness,
    aiSummary: `Parsed resume for **${careerBlueprint.title}**. Detected ${extractedSkills.length} competencies. Identified ${missingSkills.length} critical skill gaps to target.`
  };
}
