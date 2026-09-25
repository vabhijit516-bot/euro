// Advanced Entity and Skill Extraction Engine
// Extracts structured entities: Careers, Skills (with standardized Levels 1-5), Tools, Credentials, Constraints

const KNOWN_CAREERS = [
  'Data Scientist', 'AI/ML Engineer', 'AI Engineer', 'Machine Learning Engineer',
  'Software Developer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
  'Data Analyst', 'Data Engineer', 'DevOps Engineer', 'Cloud Engineer', 'Cloud Solutions Architect',
  'Solutions Architect', 'Cybersecurity Analyst', 'Product Manager', 'Technical Program Manager',
  'Financial Analyst', 'Investment Banker', 'UI/UX Designer', 'Product Designer',
  'Supply Chain Analyst', 'Operations Manager', 'Growth Marketer', 'Technical Recruiter',
  'Digital Marketing Specialist', 'HR Business Partner', 'Clinical Informatics Specialist'
];

const KNOWN_SKILLS = [
  // IT & AI
  'Python', 'SQL', 'Relational SQL', 'Statistics & Probability', 'Statistics', 'Probability',
  'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy',
  'Natural Language Processing', 'NLP', 'Computer Vision', 'Generative AI', 'LLMs', 'Transformers',
  'Data Structures & Algorithms', 'DSA', 'Object-Oriented Programming', 'OOP',
  'Docker', 'Docker & Containerization', 'Kubernetes', 'Linux', 'Linux System Administration',
  'CI/CD Pipelines', 'AWS', 'GCP', 'Azure', 'Terraform', 'FastAPI', 'Flask', 'Postman',
  // Web & Full Stack
  'React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML & CSS', 'Next.js', 'Express',
  'GraphQL', 'RESTful APIs', 'Tailwind CSS', 'Redux', 'System Architecture',
  // Data Engineering & BI
  'Tableau', 'Power BI', 'Excel', 'Advanced Excel', 'Apache Spark', 'Kafka', 'Airflow', 'Snowflake',
  // Business & Design
  'Figma', 'User Research', 'Wireframing & Prototyping', 'Usability Testing', 'Financial Modeling',
  'DCF Valuation', 'Corporate Accounting', 'A/B Testing', 'SEO & SEM', 'Google Analytics',
  'Stakeholder Management', 'Agile / Scrum', 'Prompt Engineering', 'Product Roadmapping'
];

/**
 * Extracts entities, target career, and recognized skills from the prompt.
 * Standardizes skill levels into Levels 1-5:
 * Level 1: Beginner / Foundational
 * Level 2: Elementary / Practical
 * Level 3: Intermediate / Proficient
 * Level 4: Advanced / Production-Ready
 * Level 5: Expert / Architect / Strategic
 * @param {string} prompt
 * @returns {object} Extracted entities
 */
export function extractEntities(prompt = '') {
  const text = prompt.toLowerCase();

  // 1. Extract Target Career
  let detectedCareer = null;
  for (const career of KNOWN_CAREERS) {
    if (text.includes(career.toLowerCase())) {
      detectedCareer = career;
      break;
    }
  }

  // 2. Extract Skills Mentioned and infer Level 1-5
  const detectedSkills = [];
  const checkedSkills = new Set();

  for (const skill of KNOWN_SKILLS) {
    const sLower = skill.toLowerCase();
    if (text.includes(sLower) && !checkedSkills.has(sLower)) {
      checkedSkills.add(sLower);
      
      let level = 2; // Default practical level
      if (
        text.includes(`expert in ${sLower}`) ||
        text.includes(`mastered ${sLower}`) ||
        text.includes(`lead ${sLower}`) ||
        text.includes(`architect ${sLower}`) ||
        text.includes(`level 5`) ||
        text.includes(`l5`)
      ) {
        level = 5;
      } else if (
        text.includes(`advanced ${sLower}`) ||
        text.includes(`${sLower} advanced`) ||
        text.includes(`senior ${sLower}`) ||
        text.includes(`production ${sLower}`) ||
        text.includes(`level 4`) ||
        text.includes(`l4`)
      ) {
        level = 4;
      } else if (
        text.includes(`intermediate ${sLower}`) ||
        text.includes(`${sLower} intermediate`) ||
        text.includes(`proficient in ${sLower}`) ||
        text.includes(`level 3`) ||
        text.includes(`l3`)
      ) {
        level = 3;
      } else if (
        text.includes(`basic ${sLower}`) ||
        text.includes(`beginner in ${sLower}`) ||
        text.includes(`started learning ${sLower}`) ||
        text.includes(`level 1`) ||
        text.includes(`level 2`)
      ) {
        level = 1;
      } else if (
        text.includes(`no experience in ${sLower}`) ||
        text.includes(`never used ${sLower}`) ||
        text.includes(`lack ${sLower}`)
      ) {
        level = 0;
      }

      detectedSkills.push({ name: skill, level });
    }
  }

  // 3. Extract Timeline / Time Constraints
  let timeline = null;
  const timeMatch = prompt.match(/(\d+)\s*(month|week|day|hr|hour)s?/i);
  if (timeMatch) {
    timeline = `${timeMatch[1]} ${timeMatch[2]}s`;
  }

  // 4. Extract Degree / Education
  let education = null;
  if (text.includes('b.tech') || text.includes('btech')) education = 'B.Tech in Computer Science';
  else if (text.includes('b.s.') || text.includes('bachelor')) education = 'Bachelor of Science';
  else if (text.includes('m.s.') || text.includes('master')) education = 'Master of Science';
  else if (text.includes('mba')) education = 'Master of Business Administration (MBA)';
  else if (text.includes('phd') || text.includes('doctorate')) education = 'Ph.D.';

  // 5. Detect Dependency / Prerequisite inquiry
  const hasPrerequisiteQuery =
    text.includes('can i start') ||
    text.includes('should i learn') ||
    text.includes('before') ||
    text.includes('prerequisite') ||
    text.includes('what first') ||
    text.includes('start with');

  return {
    detectedCareer,
    detectedSkills,
    timeline,
    education,
    hasPrerequisiteQuery
  };
}
