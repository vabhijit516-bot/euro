// Real-World Job Market Requirements Benchmark Service
// Implements Section 13 of Problem 3:
// Compares student's current verified competencies against real-world job postings across Tier-1 tech employers.

export const LIVE_JOB_POSTINGS = [
  {
    id: 'job-goog-ds',
    company: 'Google',
    role: 'Data Scientist II - Search Quality & Core ML',
    location: 'Mountain View, CA / Remote',
    compensation: '$155,000 – $190,000 + RSUs',
    requiredSkills: [
      { name: 'Python', requiredLevel: 'Advanced', importance: 1.0 },
      { name: 'SQL', requiredLevel: 'Advanced', importance: 0.95 },
      { name: 'Statistics & Probability', requiredLevel: 'Advanced', importance: 0.95 },
      { name: 'Machine Learning', requiredLevel: 'Advanced', importance: 0.9 },
      { name: 'A/B Testing & Causal Inference', requiredLevel: 'Intermediate', importance: 0.85 },
      { name: 'Docker & Containerization', requiredLevel: 'Intermediate', importance: 0.7 }
    ]
  },
  {
    id: 'job-amzn-mle',
    company: 'Amazon',
    role: 'Machine Learning Engineer - Personalization Engine',
    location: 'Seattle, WA / Remote',
    compensation: '$160,000 – $205,000 + RSUs',
    requiredSkills: [
      { name: 'Python', requiredLevel: 'Advanced', importance: 1.0 },
      { name: 'Data Structures & Algorithms', requiredLevel: 'Advanced', importance: 0.95 },
      { name: 'PyTorch / TensorFlow', requiredLevel: 'Advanced', importance: 0.95 },
      { name: 'Machine Learning', requiredLevel: 'Advanced', importance: 0.9 },
      { name: 'AWS & Cloud Deployment', requiredLevel: 'Intermediate', importance: 0.85 },
      { name: 'Docker', requiredLevel: 'Intermediate', importance: 0.8 }
    ]
  },
  {
    id: 'job-stripe-fs',
    company: 'Stripe',
    role: 'Full Stack Software Engineer - Merchant Payments',
    location: 'San Francisco, CA / Remote',
    compensation: '$165,000 – $210,000 + RSUs',
    requiredSkills: [
      { name: 'JavaScript / TypeScript', requiredLevel: 'Advanced', importance: 1.0 },
      { name: 'React', requiredLevel: 'Advanced', importance: 0.95 },
      { name: 'Node.js', requiredLevel: 'Intermediate', importance: 0.9 },
      { name: 'Relational SQL', requiredLevel: 'Intermediate', importance: 0.85 },
      { name: 'Docker', requiredLevel: 'Intermediate', importance: 0.8 },
      { name: 'Testing / TDD', requiredLevel: 'Intermediate', importance: 0.75 }
    ]
  },
  {
    id: 'job-meta-swe',
    company: 'Meta',
    role: 'Software Engineer (L4) - Infrastructure & Distributed Systems',
    location: 'Menlo Park, CA / Remote',
    compensation: '$150,000 – $185,000 + RSUs',
    requiredSkills: [
      { name: 'Python', requiredLevel: 'Advanced', importance: 0.9 },
      { name: 'Data Structures & Algorithms', requiredLevel: 'Advanced', importance: 1.0 },
      { name: 'Object-Oriented Programming', requiredLevel: 'Advanced', importance: 0.9 },
      { name: 'Linux System Administration', requiredLevel: 'Intermediate', importance: 0.8 },
      { name: 'Distributed Systems', requiredLevel: 'Intermediate', importance: 0.85 },
      { name: 'Git & Version Control', requiredLevel: 'Advanced', importance: 0.8 }
    ]
  }
];

/**
 * Compares user skills against a target job posting and outputs satisfied vs missing requirements.
 * @param {Array<{name: string, level: string}>} userSkills
 * @param {string} jobId
 * @returns {object} Detailed real-world job comparison
 */
export function compareUserAgainstJob(userSkills = [], jobId = null) {
  const job = LIVE_JOB_POSTINGS.find(j => j.id === jobId) || LIVE_JOB_POSTINGS[0];

  const satisfiedSkills = [];
  const missingSkills = [];

  job.requiredSkills.forEach(req => {
    const matched = userSkills.find(
      s => s.name.toLowerCase() === req.name.toLowerCase() ||
           s.name.toLowerCase().includes(req.name.toLowerCase()) ||
           req.name.toLowerCase().includes(s.name.toLowerCase())
    );

    if (matched) {
      satisfiedSkills.push({
        skill: req.name,
        userLevel: matched.level || 'Intermediate',
        requiredLevel: req.requiredLevel,
        status: 'SATISFIED'
      });
    } else {
      missingSkills.push({
        skill: req.name,
        requiredLevel: req.requiredLevel,
        importance: req.importance,
        status: 'MISSING'
      });
    }
  });

  const totalReqs = job.requiredSkills.length;
  const matchPercent = Math.round((satisfiedSkills.length / totalReqs) * 100);

  return {
    jobId: job.id,
    company: job.company,
    role: job.role,
    location: job.location,
    compensation: job.compensation,
    totalRequirementsCount: totalReqs,
    satisfiedCount: satisfiedSkills.length,
    missingCount: missingSkills.length,
    matchPercent,
    satisfiedSkills,
    missingSkills,
    summary: `Your profile matches **${matchPercent}%** of requirements for **${job.role}** at **${job.company}**. Missing: ${missingSkills.map(m => m.skill).join(', ') || 'None! Fully Ready'}.`
  };
}
