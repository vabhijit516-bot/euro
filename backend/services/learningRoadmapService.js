// Weekly Learning Plan & Progress Tracking Service
// Implements Section 7 & Section 9 of Problem 3:
// Week-by-Week Learning Roadmap with Topic, Resource, Duration, Difficulty, Task, Project, Status
// Dynamically recalculates overall and per-skill progress when tasks are updated.

export let ACTIVE_LEARNING_PLAN = [
  {
    id: 'week-1',
    weekNumber: 1,
    title: 'Probability & Inferential Statistics Fundamentals',
    skillTarget: 'Statistics & Probability',
    resource: 'Khan Academy & Harvard Statistics 110: Continuous Distributions',
    resourceLink: 'https://www.edx.org/learn/probability/harvard-university-introduction-to-probability',
    duration: '12 Hours (Week 1)',
    difficulty: 'Intermediate',
    status: 'completed', // 'not_started' | 'in_progress' | 'completed'
    practiceTask: 'Calculate Z-scores, normal distributions, and p-values for hypothesis testing in Python.',
    projectIdea: 'A/B Testing Conversion Significance Calculator script with SciPy.',
    completedDate: '2024-10-14'
  },
  {
    id: 'week-2',
    weekNumber: 2,
    title: 'Advanced Relational SQL & Window Functions',
    skillTarget: 'Relational SQL',
    resource: 'PostgreSQL Official Docs & Mode Analytics Advanced SQL Tutorial',
    resourceLink: 'https://mode.com/sql-tutorial/',
    duration: '10 Hours (Week 2)',
    difficulty: 'Intermediate',
    status: 'completed',
    practiceTask: 'Execute complex multi-table joins, self-joins, CTEs, and window ranking queries.',
    projectIdea: 'E-commerce cohort retention & RFM customer segmentation queries across 500k transactions.',
    completedDate: '2024-10-21'
  },
  {
    id: 'week-3',
    weekNumber: 3,
    title: 'Supervised Machine Learning & Optimization Calculus',
    skillTarget: 'Machine Learning',
    resource: 'Stanford CS229 / Andrew Ng Machine Learning Specialization (Coursera)',
    resourceLink: 'https://www.coursera.org/specializations/machine-learning-introduction',
    duration: '15 Hours (Week 3)',
    difficulty: 'Hard',
    status: 'in_progress',
    practiceTask: 'Implement Batch and Stochastic Gradient Descent from scratch using only NumPy arrays.',
    projectIdea: 'Predictive customer churn classifier with Scikit-Learn evaluated by ROC-AUC and PR curves.',
    dueDate: '2024-11-05'
  },
  {
    id: 'week-4',
    weekNumber: 4,
    title: 'Tree Ensembles & Gradient Boosting (XGBoost/LightGBM)',
    skillTarget: 'Machine Learning',
    resource: 'DMLC XGBoost Documentation & Applied Kaggle Competitions',
    resourceLink: 'https://xgboost.readthedocs.io/',
    duration: '14 Hours (Week 4)',
    difficulty: 'Hard',
    status: 'not_started',
    practiceTask: 'Tune hyper-parameters (max_depth, learning_rate, subsample) using 5-fold cross-validation.',
    projectIdea: 'High-dimensional fraud detection pipeline handling imbalanced classes with SMOTE.',
    dueDate: '2024-11-12'
  },
  {
    id: 'week-5',
    weekNumber: 5,
    title: 'Deep Learning & Neural Network Foundations (PyTorch)',
    skillTarget: 'Deep Learning',
    resource: 'DeepLearning.AI PyTorch for Deep Learning Course',
    resourceLink: 'https://www.deeplearning.ai/',
    duration: '18 Hours (Week 5)',
    difficulty: 'Advanced',
    status: 'not_started',
    practiceTask: 'Construct a 3-layer Multilayer Perceptron (MLP) with custom PyTorch autograd loss functions.',
    projectIdea: 'Image feature embedding extractor and nearest-neighbor visual search engine.',
    dueDate: '2024-11-20'
  },
  {
    id: 'week-6',
    weekNumber: 6,
    title: 'Containerized Model Serving & MLOps Pipeline',
    skillTarget: 'Docker & Deployment',
    resource: 'FastAPI + Docker Production Inference Blueprint',
    resourceLink: 'https://fastapi.tiangolo.com/deployment/docker/',
    duration: '12 Hours (Week 6)',
    difficulty: 'Intermediate',
    status: 'not_started',
    practiceTask: 'Build a low-latency REST inference endpoint in FastAPI and package into a Docker image.',
    projectIdea: 'Containerized microservice deployed with automated health checks benchmarked at <25ms p95.',
    dueDate: '2024-11-28'
  }
];

export let SKILL_PROGRESS_TRACKER = [
  { name: 'Python', progressPercent: 100, verified: true, level: 'Advanced' },
  { name: 'Relational SQL', progressPercent: 80, verified: true, level: 'Intermediate' },
  { name: 'Statistics & Probability', progressPercent: 60, verified: false, level: 'Intermediate' },
  { name: 'Machine Learning', progressPercent: 40, verified: false, level: 'Beginner' },
  { name: 'Deep Learning', progressPercent: 20, verified: false, level: 'Novice' },
  { name: 'Docker & MLOps', progressPercent: 15, verified: false, level: 'Novice' }
];

/**
 * Updates a learning task's status and recalculates overall and per-skill progress.
 * @param {string} taskId
 * @param {'not_started'|'in_progress'|'completed'} newStatus
 * @returns {object} Updated learning plan and overall metrics
 */
export function updateTaskStatus(taskId, newStatus) {
  const task = ACTIVE_LEARNING_PLAN.find(t => t.id === taskId);
  if (!task) return null;

  task.status = newStatus;
  if (newStatus === 'completed') {
    task.completedDate = new Date().toISOString().split('T')[0];
    
    // Bump associated skill progress
    const associatedSkill = SKILL_PROGRESS_TRACKER.find(
      s => s.name.toLowerCase() === task.skillTarget.toLowerCase() ||
           task.skillTarget.toLowerCase().includes(s.name.toLowerCase())
    );
    if (associatedSkill) {
      associatedSkill.progressPercent = Math.min(100, associatedSkill.progressPercent + 20);
      if (associatedSkill.progressPercent >= 75) {
        associatedSkill.verified = true;
      }
    }
  }

  // Recalculate overall progress
  const totalTasks = ACTIVE_LEARNING_PLAN.length;
  const completedTasks = ACTIVE_LEARNING_PLAN.filter(t => t.status === 'completed').length;
  const inProgressTasks = ACTIVE_LEARNING_PLAN.filter(t => t.status === 'in_progress').length;
  
  const overallProgressPercent = Math.round(
    ((completedTasks * 1.0 + inProgressTasks * 0.4) / totalTasks) * 100
  );

  return {
    success: true,
    task,
    learningPlan: ACTIVE_LEARNING_PLAN,
    skillTracker: SKILL_PROGRESS_TRACKER,
    overallProgressPercent,
    completedTasksCount: completedTasks,
    totalTasksCount: totalTasks
  };
}

/**
 * Generates an iCalendar (.ics) format string for 1-click calendar scheduling.
 * @param {object} task
 * @returns {string} .ics format
 */
export function generateIcsCalendarEvent(task) {
  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const start = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
  const dtStart = start.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours study block
  const dtEnd = end.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CareerAI Platform//AI Learning Assistant//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:careerai-task-${task.id}@careerai.platform
DTSTAMP:${dtStamp}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:Study Session: ${task.title}
DESCRIPTION:${task.practiceTask}\\nResource: ${task.resource} (${task.resourceLink})\\nEstimated: ${task.duration}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder: Upcoming CareerAI Study Session
END:VALARM
END:VEVENT
END:VCALENDAR`;
}
