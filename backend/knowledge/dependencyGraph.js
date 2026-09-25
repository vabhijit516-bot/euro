// Skill Dependency Graph Engine
// Defines directional prerequisites and validator functions

export const SKILL_DEPENDENCY_GRAPH = {
  'Deep Learning': {
    prerequisites: [
      { skill: 'Python', minLevel: 3, reason: 'Deep learning frameworks (PyTorch/TensorFlow) require idiomatic Python and OOP.' },
      { skill: 'Statistics & Probability', minLevel: 3, reason: 'Understanding loss distributions, stochastic gradients, and cross-entropy requires foundational probability.' },
      { skill: 'Machine Learning', minLevel: 3, reason: 'Supervised loss minimization, overfitting, and validation concepts are prerequisites to neural networks.' }
    ]
  },
  'Machine Learning': {
    prerequisites: [
      { skill: 'Python', minLevel: 2, reason: 'Data structures, functions, and scientific libraries require basic practical Python.' },
      { skill: 'Data Manipulation (Pandas/NumPy)', minLevel: 2, reason: 'Feature engineering and matrix operations are required before training models.' },
      { skill: 'Statistics & Probability', minLevel: 2, reason: 'Understanding mean, variance, covariance, and standard deviations is required for algorithm intuition.' }
    ]
  },
  'PyTorch / TensorFlow': {
    prerequisites: [
      { skill: 'Python', minLevel: 3, reason: 'Custom tensor operations, autograd, and module classes require solid OOP in Python.' },
      { skill: 'Deep Learning', minLevel: 2, reason: 'Conceptual understanding of layers, forward/backward passes, and activation functions.' }
    ]
  },
  'MLOps & Deployment': {
    prerequisites: [
      { skill: 'Machine Learning', minLevel: 3, reason: 'You must know how models are serialized and evaluated before deploying them in Docker/APIs.' },
      { skill: 'Docker & Containerization', minLevel: 2, reason: 'Containerizing inference services is the standard for modern MLOps pipelines.' }
    ]
  },
  'React': {
    prerequisites: [
      { skill: 'JavaScript / TypeScript', minLevel: 3, reason: 'React relies heavily on closures, array methods (map/filter), destructuring, and async/await.' },
      { skill: 'HTML & CSS', minLevel: 2, reason: 'Semantic HTML and responsive layout understanding are required to construct JSX.' }
    ]
  },
  'Kubernetes': {
    prerequisites: [
      { skill: 'Docker & Containerization', minLevel: 3, reason: 'Kubernetes orchestrates Docker containers; container image fundamentals are required first.' },
      { skill: 'Linux System Administration', minLevel: 2, reason: 'Cluster node troubleshooting and networking require core Linux skills.' }
    ]
  },
  'Financial Modeling & Valuation (DCF)': {
    prerequisites: [
      { skill: 'Advanced Microsoft Excel (VBA/Power Query)', minLevel: 3, reason: 'Dynamic modeling requires advanced financial formulas, lookup logic, and data tables.' },
      { skill: 'Corporate Accounting (GAAP/IFRS)', minLevel: 2, reason: 'Three-statement modeling requires understanding how balance sheets, income statements, and cash flows link.' }
    ]
  }
};

/**
 * Validates whether a candidate has met the prerequisites for a target skill.
 * @param {string} targetSkill
 * @param {Array<{name: string, level: number}>} userSkills
 * @returns {{ satisfies: boolean, blockers: Array<{skill: string, currentLevel: number, requiredLevel: number, reason: string}> }}
 */
export function validatePrerequisites(targetSkill, userSkills = []) {
  const node = SKILL_DEPENDENCY_GRAPH[targetSkill];
  if (!node) {
    return { satisfies: true, blockers: [] };
  }

  const blockers = [];
  for (const prereq of node.prerequisites) {
    const userSkill = userSkills.find(
      s => s.name.toLowerCase() === prereq.skill.toLowerCase() ||
           s.name.toLowerCase().includes(prereq.skill.toLowerCase()) ||
           prereq.skill.toLowerCase().includes(s.name.toLowerCase())
    );

    const currentLevel = userSkill ? userSkill.level : 0;
    if (currentLevel < prereq.minLevel) {
      blockers.push({
        skill: prereq.skill,
        currentLevel,
        requiredLevel: prereq.minLevel,
        reason: prereq.reason
      });
    }
  }

  return {
    satisfies: blockers.length === 0,
    blockers
  };
}
