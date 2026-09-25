import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { processCareerQuery } from './nlp/careerIntelligenceEngine.js';
import { modelTrainerInstance } from './nlp/modelTrainer.js';
import { parseResumeDocument, SAMPLE_RESUMES } from './nlp/resumeParser.js';
import { ACTIVE_LEARNING_PLAN, SKILL_PROGRESS_TRACKER, updateTaskStatus, generateIcsCalendarEvent } from './services/learningRoadmapService.js';
import { getNotifications, markNotificationAsRead, addNotification } from './services/notificationService.js';
import { compareUserAgainstJob, LIVE_JOB_POSTINGS } from './services/jobMarketService.js';
import { searchKnowledgeResources } from './services/resourceSearchService.js';
import authRoutes from './routes/authRoutes.js';
import { generateOpenAIChatWithRAG, isOpenAIConfigured } from './services/openaiService.js';
import { sendStudentProgressEmail, TARGET_USER_EMAIL } from './services/resendService.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// In-Memory State
let userProfile = {
  id: 'usr_ak9941',
  name: 'Alex Kumar',
  avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1UWB0ymMYniAJrp9yN7dTh9Znj0pzG8dUwilRdAeoMKU5jFjwCvb1fhSSehIsVFY3shdi_-MeNdYWiUi-xvVpsaH2mEDqZHXdfcQqNmz1oYPI7GoXTLGJEu6L0-9_tEB1G0xfYSjG6vDNSCWY2aL9BJp3LZMUMgE_2gX8vcnhqvZdb6mthRvyKl8bzK1RcJuYkh6-Jf6YcmWLekQgc5GE_noaxlfO8Tc6Jt6EP14-G6_4DfV-xxtBJ6mQ',
  targetRole: 'Data Scientist',
  targetLevel: 'L4 Senior Aspirant',
  readinessScore: 72,
  validatedStatus: 'VALIDATED',
  verifiedSkillsCount: 12,
  criticalGapsCount: 4,
  proofArtifactsCount: 3,
  monthlyVelocity: '+8%',
  learningMomentumPercent: 56,
  hoursLogged: 18.5,
  compensationBand: '$135k – $165k',
  percentileRank: 'Top 15% Percentile',
  marketUrgency: 'High Demand',
  openReqs: '8.4k open reqs',
  neuralEngineVersion: 'Neural Engine v3.4 Active',
  aiHealth: '99.8%',
  lastEvaluated: '12m ago',
  nextAssessmentDate: 'Dec 14, 2024',
  vectorId: 'AK-9941'
};

const radarData = [
  { attribute: 'PROGRAMMING', score: 92, benchmark: 75, angle: 90 },
  { attribute: 'DATA MANIPULATION', score: 88, benchmark: 70, angle: 30 },
  { attribute: 'AI / ML', score: 31, benchmark: 85, isCritical: true, angle: 330 },
  { attribute: 'STATS & PROB', score: 48, benchmark: 80, isWarning: true, angle: 270 },
  { attribute: 'PROBLEM SOLVING', score: 84, benchmark: 72, angle: 210 },
  { attribute: 'COMMUNICATION', score: 75, benchmark: 68, angle: 150 }
];

const competenciesInventory = [
  { id: 'c1', name: 'Python', level: 'Advanced', score: 92, verified: true, color: 'indigo' },
  { id: 'c2', name: 'SQL & Relational Schemas', level: 'Intermediate', score: 76, verified: true, color: 'sky' },
  { id: 'c3', name: 'Probability & Inferential Statistics', level: 'Beginner', score: 48, verified: false, color: 'amber', isWarning: true },
  { id: 'c4', name: 'Machine Learning & Modeling', level: 'Critical Gap', score: 31, verified: false, color: 'rose', isCritical: true }
];

const gapAnalysisList = [
  {
    id: 'gap-1',
    priority: 'TOP PRIORITY',
    title: 'Machine Learning Algorithms',
    currentLevel: '31% (Beginner)',
    requiredLevel: '85% (Advanced)',
    deficit: '-54%',
    description: 'Direct bottleneck for L4 Data Scientist conversion. Crucial for loss function intuition and model optimization.'
  },
  {
    id: 'gap-2',
    priority: 'HIGH PRIORITY',
    title: 'Deep Learning Frameworks',
    currentLevel: '20% (Novice)',
    requiredLevel: '75% (Advanced)',
    deficit: '-55%',
    frameworks: 'PyTorch / TensorFlow',
    description: 'Foundational for neural network architectures, backprop, and embedding representations.'
  },
  {
    id: 'gap-3',
    priority: 'MEDIUM PRIORITY',
    title: 'MLOps & Cloud Pipeline',
    currentLevel: '25% (Beginner)',
    requiredLevel: '65% (Proficient)',
    deficit: '-40%',
    frameworks: 'Docker / FastAPI / MLflow',
    description: 'Containerized model inference and API endpoints required for production scale.'
  },
  {
    id: 'gap-4',
    priority: 'MEDIUM PRIORITY',
    title: 'Statistical Hypothesis & A/B Testing',
    currentLevel: '48% (Beginner)',
    requiredLevel: '80% (Advanced)',
    deficit: '-32%',
    frameworks: 'SciPy / Statsmodels',
    description: 'Required for experiment design, statistical power calculation, and metric attribution.'
  }
];

const roadmapNodes = [
  { id: 0, title: 'START', subtitle: 'Oct 2024', status: 'completed', score: '●' },
  { id: 1, title: 'Python Core', subtitle: 'Verified 100%', status: 'completed', icon: 'check' },
  { id: 2, title: 'Statistics & EDA', subtitle: 'Verified 100%', status: 'completed', icon: 'check' },
  { id: 3, title: 'Advanced SQL', subtitle: 'Verified 100%', status: 'completed', icon: 'check' },
  { id: 4, title: 'Machine Learning', subtitle: 'Unit 4 of 9', status: 'current', icon: 'cognition', isCurrent: true },
  { id: 5, title: 'Deep Learning', subtitle: 'Est. Jan 2025', status: 'upcoming', icon: 'schedule' },
  { id: 6, title: 'MLOps & APIs', subtitle: 'Locked', status: 'locked', icon: 'lock' },
  { id: 7, title: 'Portfolio Capstone', subtitle: 'Locked', status: 'locked', icon: 'lock' },
  { id: 8, title: 'CAREER READY ◎', subtitle: 'Target: Mar 2025', status: 'goal', icon: 'flag' }
];

const visualArtifacts = [
  {
    id: 'art-1',
    tag: 'Active Lab',
    tagColor: 'indigo',
    title: 'Lab #04: Gradient Descent Vector Space',
    description: 'Hands-on NumPy optimization sandbox evaluating convergence speed across varied learning rates.',
    estimatedTime: '3.5 hrs',
    actionText: 'Resume Module →',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7-UrkN3egewqB3pHR0h6-mCHk9ygS0iScCGqjMvMD3e5AbwiZPW7nP6JFJh5G98nIK7vlPk6yxju1kRrpwgrIdIHwDAZAw8qbT63E68ZP6dArV6Ld_94L-LR-ulHt-fHccyohlSGaC0L4OOZ3o6qxJdETV6EYc37mpS6lfXtPBvc2xBr_sOdxvAoECPCmkx_mWIomlbZGzjhmX-jmVRsOP1x_rVrO_yitrzotj-RLmSv9whJFjb6l'
  },
  {
    id: 'art-2',
    tag: 'Project Capstone',
    tagColor: 'emerald',
    title: 'Verified Proof: Multi-Class Churn Predictor',
    description: 'Production pipeline handling 1.2M rows with XGBoost and automated feature engineering validation.',
    estimatedTime: 'Peer Reviewed • Grade 98%',
    actionText: 'Inspect Code →',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXT103UoKkelJmhnA-7qvPyvrOY2wkjzIcTaZSJtY41kIjoxL9v66ceHkixHme-eZ-9t8OyQDxr1idyAcRk2bQoziFaLVcxp_SzZVvGY3RoQtMGa0pE9KJSXAIQEboBaMwy0WdnLA1MmLVJVZ6nketS4VK0kI7iqTxXIcjE9h_pv-aCs1ZVIISnCt3boia9rjTI53JZQ7xMgIwI8kiKqYNpzyRyTmRLon-ZPR2TApuYigUOk4MgFKz'
  },
  {
    id: 'art-3',
    tag: 'AI Coach',
    tagColor: 'sky',
    title: 'Interview Readiness: Mock Technical Gate',
    description: 'Simulated live coding and ML system design assessment tailored to FAANG senior expectations.',
    estimatedTime: 'Next Slot: Friday 14:00',
    actionText: 'Schedule Session →',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkszr1jJpCFQYq2doqB1NAGOsn619qf7yK7REs5tasj5kOfuG-i32wHXCvljfBBebnlI9vl3-xac7qgIQ1G4T2FUzKF756w_yfdXllVnAwQaqj-nmLgzarit9-bD9ggsOTCEoiPXDEH5z523SAJAKZAFxdVOw8XkPyXlHLGZQ8Zf3Usy0f6l_QvlURFhnsBpT2CzxlK7rIoE1IsjeVQAQaMksnDSxj7SF711eVLbVZQWt8BBgDAYiW'
  }
];

let careersDatabase = [
  {
    id: 'car-1',
    title: 'DATA SCIENTIST',
    domain: 'AI & Data',
    domainCategory: 'Technology',
    matchScore: 72,
    difficulty: 'ADVANCED',
    complexityBars: 5,
    compensation: '$135k – $165k',
    growthRate: '+24%',
    hiringDemand: 'High Demand (8.4k open reqs)',
    verifiedSkills: ['Python', 'SQL', 'Statistics'],
    missingSkills: ['Machine Learning', 'Deep Learning'],
    coreDemanded: '3 of 5 verified',
    description: 'Develop statistical models, predictive algorithms, and machine learning pipelines to extract actionable intelligence from multi-terabyte datasets.',
    isPrimaryTarget: true
  },
  {
    id: 'car-2',
    title: 'MACHINE LEARNING ENGINEER',
    domain: 'AI & Data',
    domainCategory: 'Technology',
    matchScore: 64,
    difficulty: 'ADVANCED',
    complexityBars: 5,
    compensation: '$150k – $190k',
    growthRate: '+38%',
    hiringDemand: 'Extreme Demand (12.1k open reqs)',
    verifiedSkills: ['Python', 'SQL'],
    missingSkills: ['PyTorch', 'Distributed Training', 'TensorRT', 'Docker'],
    coreDemanded: '2 of 6 verified',
    description: 'Architect, fine-tune, and deploy large-scale deep learning models into ultra-low-latency production infrastructure.'
  },
  {
    id: 'car-3',
    title: 'DATA ANALYTICS LEAD',
    domain: 'Business Analytics',
    domainCategory: 'Business Analytics',
    matchScore: 88,
    difficulty: 'INTERMEDIATE',
    complexityBars: 4,
    compensation: '$120k – $145k',
    growthRate: '+14%',
    hiringDemand: 'Steady (6.2k open reqs)',
    verifiedSkills: ['SQL', 'Python', 'Tableau', 'Data Modeling', 'Communication'],
    missingSkills: ['Executive Stakeholder Reporting'],
    coreDemanded: '5 of 6 verified',
    description: 'Translate complex enterprise datasets into strategic growth recommendations, leading an agile squad of analytics engineers.'
  },
  {
    id: 'car-4',
    title: 'AI SOLUTIONS ARCHITECT',
    domain: 'Cloud Architecture',
    domainCategory: 'Cloud Architecture',
    matchScore: 58,
    difficulty: 'EXPERT',
    complexityBars: 5,
    compensation: '$180k – $230k',
    growthRate: '+42%',
    hiringDemand: 'High Demand (4.5k open reqs)',
    verifiedSkills: ['Python', 'System Architecture'],
    missingSkills: ['AWS/GCP GenAI', 'Enterprise Security', 'Kubernetes'],
    coreDemanded: '2 of 5 verified',
    description: 'Design enterprise cloud AI foundations, vector search topologies, and sovereign LLM governance architectures.'
  },
  {
    id: 'car-5',
    title: 'QUANTITATIVE RESEARCH ANALYST',
    domain: 'Fintech',
    domainCategory: 'Fintech',
    matchScore: 68,
    difficulty: 'ADVANCED',
    complexityBars: 5,
    compensation: '$160k – $210k',
    growthRate: '+19%',
    hiringDemand: 'Selective (3.1k open reqs)',
    verifiedSkills: ['Python', 'SQL', 'Inferential Statistics'],
    missingSkills: ['Stochastic Calculus', 'High-Frequency Time Series'],
    coreDemanded: '3 of 5 verified',
    description: 'Design algorithmic trading alpha models, risk simulation matrices, and econometric backtesting engines.'
  },
  {
    id: 'car-6',
    title: 'BUSINESS INTELLIGENCE SPECIALIST',
    domain: 'Technology',
    domainCategory: 'Technology',
    matchScore: 82,
    difficulty: 'INTERMEDIATE',
    complexityBars: 3,
    compensation: '$105k – $130k',
    growthRate: '+11%',
    hiringDemand: 'High (9.8k open reqs)',
    verifiedSkills: ['SQL', 'Python', 'Relational Schemas', 'Dashboards'],
    missingSkills: ['dbt', 'Snowflake Optimization'],
    coreDemanded: '4 of 5 verified',
    description: 'Build automated ELT semantic layers, metric governance pipelines, and executive intelligence dashboards.'
  },
  {
    id: 'car-7',
    title: 'MLOPS PLATFORM ENGINEER',
    domain: 'DevOps & MLOps',
    domainCategory: 'DevOps & MLOps',
    matchScore: 61,
    difficulty: 'ADVANCED',
    complexityBars: 5,
    compensation: '$145k – $185k',
    growthRate: '+35%',
    hiringDemand: 'High (7.3k open reqs)',
    verifiedSkills: ['Python', 'Linux/Bash'],
    missingSkills: ['Kubernetes', 'KServe', 'Prometheus', 'CI/CD Pipelines'],
    coreDemanded: '2 of 5 verified',
    description: 'Automate model training loops, drift monitoring, GPU scheduling, and zero-downtime deployment pipelines.'
  },
  {
    id: 'car-8',
    title: 'CYBER AI THREAT ANALYST',
    domain: 'Cybersecurity',
    domainCategory: 'Cybersecurity',
    matchScore: 54,
    difficulty: 'ADVANCED',
    complexityBars: 4,
    compensation: '$130k – $170k',
    growthRate: '+28%',
    hiringDemand: 'Very High (5.0k open reqs)',
    verifiedSkills: ['Python', 'Network Log Analysis'],
    missingSkills: ['SIEM', 'Adversarial ML', 'MITRE ATT&CK'],
    coreDemanded: '2 of 5 verified',
    description: 'Detect zero-day cyber threats using anomaly detection, graph neural networks, and automated security orchestration.'
  }
];

let coursesDatabase = [
  {
    id: 'crs-1',
    title: 'Advanced Machine Learning Specialization',
    partner: 'DeepLearning.AI',
    partnerIcon: 'neurology',
    partnerColor: '#4F46E5',
    vectorFit: 99.2,
    duration: '6 weeks',
    hoursPerWeek: '8-10 hrs/wk',
    level: 'Intermediate to Advanced',
    roi: '+$60,000 base compensation potential • 6 weeks to L4 readiness',
    skillsCovered: ['Supervised Learning', 'Gradient Descent', 'Regularization', 'XGBoost', 'Cost Functions'],
    rating: 4.9,
    enrolledCount: 42100,
    enrolled: false,
    featured: true,
    syllabus: [
      'Mathematical Foundations: Linear Algebra & Multivariate Calculus for Optimization',
      'Loss Functions, Convex Optimization, & Batch Gradient Descent Dynamics',
      'Tree Ensembles, Gradient Boosting (XGBoost, LightGBM), & Feature Importance',
      'Model Diagnostics: Bias-Variance Decomposition & Regularization (L1/L2)'
    ]
  },
  {
    id: 'crs-2',
    title: 'Deep Learning Specialization (5-Course Series)',
    partner: 'DeepLearning.AI',
    partnerIcon: 'psychology',
    partnerColor: '#4F46E5',
    vectorFit: 98.7,
    duration: '16 weeks',
    hoursPerWeek: '6-8 hrs/wk',
    level: 'Advanced',
    roi: 'Closes Critical Gap #2 • Required for LLMs and Computer Vision',
    skillsCovered: ['Neural Networks', 'Backpropagation', 'CNNs', 'Sequence Models', 'Transformers'],
    rating: 4.95,
    enrolledCount: 154000,
    enrolled: false,
    featured: false,
    syllabus: [
      'Neural Networks and Deep Learning: Vectorized Forward/Backprop',
      'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization & Optimization',
      'Structuring Machine Learning Projects: Error Analysis & Orthogonalization',
      'Convolutional Neural Networks & Computer Vision Architectures',
      'Sequence Models: RNNs, LSTMs, Attention Mechanisms, & Transformers'
    ]
  },
  {
    id: 'crs-3',
    title: 'Machine Learning Engineering for Production (MLOps)',
    partner: 'Google Cloud & DeepLearning.AI',
    partnerIcon: 'cloud_done',
    partnerColor: '#0284C7',
    vectorFit: 97.4,
    duration: '8 weeks',
    hoursPerWeek: '5-7 hrs/wk',
    level: 'Intermediate',
    roi: 'Closes Critical Gap #3 • Hands-on Docker, FastAPI, and Vertex AI',
    skillsCovered: ['FastAPI', 'Docker', 'Kubeflow', 'Model Monitoring', 'CI/CD for ML'],
    rating: 4.85,
    enrolledCount: 38200,
    enrolled: false,
    featured: false,
    syllabus: [
      'Introduction to Machine Learning in Production: Scoping & Design',
      'Machine Learning Data Lifecycle in Production: Feature Stores & Validation',
      'Machine Learning Model Deployment, Serving, & Inference Pipelines',
      'Continuous Training, Drift Detection, & Automated Governance'
    ]
  },
  {
    id: 'crs-4',
    title: 'Probabilistic Graphical Models & Statistical Inference',
    partner: 'Stanford AI Lab',
    partnerIcon: 'school',
    partnerColor: '#B91C1C',
    vectorFit: 96.1,
    duration: '10 weeks',
    hoursPerWeek: '10-12 hrs/wk',
    level: 'Advanced',
    roi: 'Boosts Probability & Stats from 48% to 90%',
    skillsCovered: ['Bayesian Networks', 'Markov Random Fields', 'Expectation-Maximization', 'MCMC Sampling'],
    rating: 4.9,
    enrolledCount: 22800,
    enrolled: true,
    featured: false,
    syllabus: [
      'Representation: Bayesian Networks & Undirected Models',
      'Exact and Approximate Inference: Variable Elimination & Belief Propagation',
      'Parameter Estimation & Structure Learning under Partial Observability',
      'Decision Making under Uncertainty & Reinforcement Learning Foundations'
    ]
  },
  {
    id: 'crs-5',
    title: 'Enterprise GenAI Architecture & LLM Orchestration',
    partner: 'OpenAI Academy',
    partnerIcon: 'neurology',
    partnerColor: '#047857',
    vectorFit: 98.1,
    duration: '4 weeks',
    hoursPerWeek: '6-8 hrs/wk',
    level: 'Advanced',
    roi: '+$35k market bump for RAG, Vector Search, and LangChain expertise',
    skillsCovered: ['Vector Databases', 'RAG', 'Function Calling', 'Fine-Tuning', 'Guardrails'],
    rating: 4.92,
    enrolledCount: 51200,
    enrolled: false,
    featured: false,
    syllabus: [
      'Embedding Spaces, High-Dimensional Cosine Indexing, & HNSW Topologies',
      'Advanced Retrieval-Augmented Generation (Hybrid Search, Re-ranking)',
      'Agentic Workflows: Tool Calling, ReAct Patterns, & State Graphs',
      'Evaluations: Ragas, TruLens, & LLM Red-Teaming Safety Frameworks'
    ]
  },
  {
    id: 'crs-6',
    title: 'Applied Data Science with Python & Big Data Analytics',
    partner: 'Univ. Michigan',
    partnerIcon: 'verified',
    partnerColor: '#D97706',
    vectorFit: 95.2,
    duration: '12 weeks',
    hoursPerWeek: '6 hrs/wk',
    level: 'Intermediate',
    roi: 'Solidifies Python manipulation and PySpark distributed workloads',
    skillsCovered: ['Pandas', 'NumPy', 'Matplotlib', 'NetworkX', 'Text Mining'],
    rating: 4.8,
    enrolledCount: 89000,
    enrolled: true,
    featured: false,
    syllabus: [
      'Introduction to Data Science in Python: Series, DataFrames & Aggregation',
      'Applied Plotting, Charting & Data Representation in Python',
      'Applied Machine Learning in Python: Scikit-Learn pipelines',
      'Applied Text Mining & Social Network Analysis'
    ]
  }
];

let chatHistory = [
  {
    id: 'msg-1',
    sender: 'ai',
    timestamp: '10:42 AM',
    model: 'GPT-4o Career-FineTune',
    content: `Good morning Alex! I have completed your latest vector diagnostic evaluation against current senior market requisitions.

**Executive Summary:**
- **Target Role:** Senior Data Scientist (L4)
- **Current Match:** **72% Readiness**
- **Strongest Competencies:** Python (92%), Data Wrangling (88%), SQL (76%)
- **Critical Focus Area:** Machine Learning Foundations (31%) & Statistical Inference (48%)

Your highest ROI action right now is completing **Probability & Statistics Fundamentals** before tackling heavy neural nets. That single sequence will increase your ML comprehension velocity by **+35%**.

How would you like to proceed today? We can dive into a **ML System Design Mock**, build a **30-Day Skill Sprint Plan**, or review your **Resume ATS alignment**.`
  }
];

let savedMemoryNotes = [
  { id: 'mem-1', title: 'Target: L4 Data Scientist', tag: 'Role Target', color: 'indigo' },
  { id: 'mem-2', title: 'Strong Python & SQL Core (92%)', tag: 'Asset', color: 'emerald' },
  { id: 'mem-3', title: 'Critical Gap: Gradient Descent & Regularization', tag: 'High Urgency', color: 'rose' },
  { id: 'mem-4', title: 'Next Milestone Gate: Nov 28, 2024', tag: 'Timeline', color: 'sky' }
];

// ================= ROUTES ================= //

// 1. GET /api/profile
app.get('/api/profile', (req, res) => {
  res.json({ success: true, profile: userProfile });
});

// 2. GET /api/overview
app.get('/api/overview', (req, res) => {
  res.json({
    success: true,
    profile: userProfile,
    radar: radarData,
    inventory: competenciesInventory,
    gaps: gapAnalysisList,
    roadmap: roadmapNodes,
    artifacts: visualArtifacts,
    aiInsight: {
      title: 'Completing Statistics before Machine Learning will improve your learning velocity by 35%.',
      why: 'You currently have a beginner-level probability & statistics foundation (48%) that will directly hinder cost function intuition and gradient descent convergence comprehension.',
      recommendedStep: 'Complete Probability & Statistics Fundamentals (12-18 hrs)'
    }
  });
});

// 3. GET /api/careers
app.get('/api/careers', (req, res) => {
  const { query, category, sort } = req.query;
  let results = [...careersDatabase];

  if (category && category !== 'All' && category !== 'Technology (Active)' && category !== 'Technology') {
    results = results.filter(c => 
      c.domain.toLowerCase().includes(category.toLowerCase()) || 
      c.domainCategory.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.domain.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.verifiedSkills.some(s => s.toLowerCase().includes(q)) ||
      c.missingSkills.some(s => s.toLowerCase().includes(q))
    );
  }

  if (sort === 'salary') {
    results.sort((a, b) => b.compensation.localeCompare(a.compensation));
  } else if (sort === 'growth') {
    results.sort((a, b) => parseInt(b.growthRate) - parseInt(a.growthRate));
  } else if (sort === 'gap') {
    results.sort((a, b) => a.missingSkills.length - b.missingSkills.length);
  } else {
    // Default: affinity
    results.sort((a, b) => b.matchScore - a.matchScore);
  }

  res.json({
    success: true,
    total: results.length,
    activeVector: userProfile.vectorId,
    userProfile,
    careers: results
  });
});

// 4. GET /api/careers/:id
app.get('/api/careers/:id', (req, res) => {
  const career = careersDatabase.find(c => c.id === req.params.id);
  if (!career) return res.status(404).json({ success: false, message: 'Career not found' });
  res.json({ success: true, career });
});

// 5. POST /api/careers/simulate
app.post('/api/careers/simulate', (req, res) => {
  const { careerId } = req.body;
  const career = careersDatabase.find(c => c.id === careerId);
  if (!career) return res.status(404).json({ success: false, message: 'Target role not found' });

  // Update user profile target role
  userProfile.targetRole = career.title;
  userProfile.readinessScore = career.matchScore;
  userProfile.compensationBand = career.compensation;
  userProfile.openReqs = career.hiringDemand;

  // Mark in careers database
  careersDatabase.forEach(c => {
    c.isPrimaryTarget = (c.id === careerId);
  });

  res.json({
    success: true,
    message: `Simulated switch to ${career.title}`,
    updatedProfile: userProfile
  });
});

// 6. GET /api/courses
app.get('/api/courses', (req, res) => {
  const { query, partner, sort } = req.query;
  let results = [...coursesDatabase];

  if (partner && partner !== 'All') {
    results = results.filter(c => c.partner.toLowerCase().includes(partner.toLowerCase()));
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.partner.toLowerCase().includes(q) ||
      c.skillsCovered.some(s => s.toLowerCase().includes(q))
    );
  }

  if (sort === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'duration') {
    results.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
  } else {
    // Default: vector fit
    results.sort((a, b) => b.vectorFit - a.vectorFit);
  }

  res.json({
    success: true,
    total: results.length,
    courses: results
  });
});

// 7. POST /api/courses/enroll
app.post('/api/courses/enroll', (req, res) => {
  const { courseId } = req.body;
  const course = coursesDatabase.find(c => c.id === courseId);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

  course.enrolled = !course.enrolled;
  if (course.enrolled) {
    userProfile.learningMomentumPercent = Math.min(100, userProfile.learningMomentumPercent + 8);
    userProfile.hoursLogged = parseFloat((userProfile.hoursLogged + 2.5).toFixed(1));
  } else {
    userProfile.learningMomentumPercent = Math.max(0, userProfile.learningMomentumPercent - 8);
  }

  res.json({
    success: true,
    message: course.enrolled ? `Successfully enrolled in ${course.title}` : `Unenrolled from ${course.title}`,
    course,
    learningMomentum: userProfile.learningMomentumPercent
  });
});

// 8. GET /api/coach/messages
app.get('/api/coach/messages', (req, res) => {
  res.json({
    success: true,
    activeContext: {
      user: userProfile.name,
      targetRole: userProfile.targetRole,
      readiness: `${userProfile.readinessScore}%`,
      criticalGap: 'ML / Statistical Modeling',
      latency: '24ms',
      model: 'GPT-4o Career-FineTune'
    },
    messages: chatHistory,
    savedMemory: savedMemoryNotes
  });
});

// 9. POST /api/coach/chat & /api/coach/message
const handleCoachChat = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ success: false, message: 'Prompt is required' });

  const userMsg = {
    id: `msg-${Date.now()}`,
    sender: 'user',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    content: prompt
  };
  chatHistory.push(userMsg);

  // Execute full 9-Stage NLP Intelligence Pipeline & Custom RAG
  const pipelineResult = processCareerQuery(prompt, userProfile, chatHistory);

  // If OpenAI API key is provided, route directly to OpenAI API + Custom RAG
  let finalContent = pipelineResult.structuredContent;
  let activeModel = 'OpenAI GPT-4o + Custom RAG';

  if (isOpenAIConfigured) {
    try {
      const openAIReply = await generateOpenAIChatWithRAG(prompt, userProfile);
      if (openAIReply && openAIReply.success && openAIReply.content) {
        finalContent = openAIReply.content;
        activeModel = openAIReply.model || 'OpenAI GPT-4o + Custom RAG';
      } else if (openAIReply && openAIReply.quotaExceeded) {
        activeModel = 'OpenAI GPT-4o (Key Linked • Custom RAG)';
        finalContent = `> ⚡ **OpenAI API Connected (GPT-4o)**: Request handled by OpenAI API client. Note: Project key \`${process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 16) + '...' : ''}\` has \`0 credits\` on [platform.openai.com](https://platform.openai.com/settings/organization/billing/). The 7-section structured answer below is provided via CareerAI's Custom RAG Knowledge Engine & Dependency Graph:\n\n${pipelineResult.structuredContent}`;
      }
    } catch (err) {
      console.error('[OpenAI Pipeline Error]:', err.message);
    }
  }

  // Dynamically update student readiness score from the engine's assessment
  if (pipelineResult.readinessScore) {
    userProfile.readinessScore = pipelineResult.readinessScore;
  }

  const aiReply = {
    id: `msg-${Date.now() + 1}`,
    sender: 'ai',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    model: activeModel,
    content: finalContent,
    contextCareer: pipelineResult.matchedCareer,
    intent: pipelineResult.intent,
    confidence: pipelineResult.confidence,
    telemetry: pipelineResult.telemetry
  };
  chatHistory.push(aiReply);

  res.json({
    success: true,
    message: aiReply,
    nlpTelemetry: pipelineResult.telemetry,
    chatHistory,
    userProfile
  });
};

app.post('/api/coach/chat', handleCoachChat);
app.post('/api/coach/message', handleCoachChat);

// Model Training & Status Endpoints
app.post('/api/model/train', (req, res) => {
  const startTime = Date.now();
  const metrics = modelTrainerInstance.train();
  const elapsed = Date.now() - startTime;

  res.json({
    success: true,
    message: 'CareerAI Neural Model successfully trained across all 16 intents and multi-domain corpora!',
    elapsedMs: elapsed,
    metrics
  });
});

app.get('/api/model/status', (req, res) => {
  if (!modelTrainerInstance.isTrained) {
    modelTrainerInstance.train();
  }
  res.json({
    success: true,
    status: 'TRAINED_ACTIVE',
    engineVersion: 'CareerAI Neural v3.4',
    metrics: modelTrainerInstance.trainingMetrics
  });
});

// Explicit Deep Career & Skill Gap Diagnostic API
app.post('/api/career/analyze', (req, res) => {
  const { prompt, targetRole } = req.body;
  const tempProfile = { ...userProfile, targetRole: targetRole || userProfile.targetRole };
  const result = processCareerQuery(prompt || `Analyze requirements for ${tempProfile.targetRole}`, tempProfile, []);
  res.json({ success: true, result });
});

// 10. POST /api/coach/clear
app.post('/api/coach/clear', (req, res) => {
  chatHistory = [
    {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'GPT-4o Career-FineTune',
      content: `Context refreshed. Ready for your next career query, system design exercise, or strategy session!`
    }
  ];
  res.json({ success: true, message: 'Context cleared', chatHistory });
});

// 11. GET /api/audit/download
app.get('/api/audit/download', (req, res) => {
  const auditContent = `# CAREERAI INTELLIGENCE AUDIT REPORT
Generated: ${new Date().toISOString()}
Candidate: ${userProfile.name} (Vector ID: ${userProfile.vectorId})
Target Architecture: ${userProfile.targetRole} (${userProfile.targetLevel})
Overall Career Readiness: ${userProfile.readinessScore}% (VALIDATED)

## Core Metrics
- Compensation Band: ${userProfile.compensationBand}
- Market Urgency: ${userProfile.marketUrgency} (${userProfile.openReqs})
- Verified Competencies: ${userProfile.verifiedSkillsCount} verified
- Critical Skill Deficits: ${userProfile.criticalGapsCount} identified
- Proof Artifacts: ${userProfile.proofArtifactsCount} production validated
- Velocity: ${userProfile.monthlyVelocity} MoM

## Competency Inventory
${competenciesInventory.map(c => `- ${c.name}: ${c.score}% (${c.level}) - ${c.verified ? 'VERIFIED' : 'GAP'}`).join('\n')}

## Priority Action Items
1. Complete Probability & Inferential Statistics (12-18 hrs)
2. Advance Machine Learning from 31% to 85% via Hands-on Vector Labs
3. Complete Capstone ML Churn Predictor Review

---
Report Authenticated by CAREERAI Neural Engine v3.4
`;
  res.setHeader('Content-Type', 'text/markdown');
  res.setHeader('Content-Disposition', 'attachment; filename="CareerAI_Audit_AlexKumar.md"');
  res.send(auditContent);
});

// ==========================================
// PROBLEM 3: AI LEARNING & CAREER ASSISTANT
// ==========================================

// Multiple Student Profiles (Section 3 & Section 15 of Problem 3)
const STUDENT_PROFILES = {
  alex: {
    id: 'alex',
    name: 'Alex Kumar',
    degree: 'M.S. in Data Science',
    year: 'Final Year Aspirant',
    targetRole: 'Data Scientist',
    targetLevel: 'L4 Senior Aspirant',
    avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1UWB0ymMYniAJrp9yN7dTh9Znj0pzG8dUwilRdAeoMKU5jFjwCvb1fhSSehIsVFY3shdi_-MeNdYWiUi-xvVpsaH2mEDqZHXdfcQqNmz1oYPI7GoXTLGJEu6L0-9_tEB1G0xfYSjG6vDNSCWY2aL9BJp3LZMUMgE_2gX8vcnhqvZdb6mthRvyKl8bzK1RcJuYkh6-Jf6YcmWLekQgc5GE_noaxlfO8Tc6Jt6EP14-G6_4DfV-xxtBJ6mQ',
    readinessScore: 72,
    validatedStatus: 'VALIDATED',
    verifiedSkillsCount: 12,
    criticalGapsCount: 4,
    proofArtifactsCount: 3,
    monthlyVelocity: '+8%',
    learningMomentumPercent: 56,
    hoursLogged: 18.5,
    compensationBand: '$135k – $165k',
    percentileRank: 'Top 15% Percentile',
    marketUrgency: 'High Demand',
    openReqs: '8.4k open reqs',
    neuralEngineVersion: 'Neural Engine v3.4 Active',
    aiHealth: '99.8%',
    lastEvaluated: '12m ago',
    nextAssessmentDate: 'Dec 14, 2024',
    vectorId: 'AK-9941'
  },
  rahul: {
    id: 'rahul',
    name: 'Rahul',
    degree: 'B.Tech in Computer Science & Engineering',
    year: '3rd Year',
    targetRole: 'Software Developer',
    targetLevel: 'Entry / Junior Level',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    readinessScore: 64,
    validatedStatus: 'IN PROGRESS',
    verifiedSkillsCount: 6,
    criticalGapsCount: 3,
    proofArtifactsCount: 2,
    monthlyVelocity: '+12%',
    learningMomentumPercent: 70,
    hoursLogged: 14.0,
    compensationBand: '$105k – $130k',
    percentileRank: 'Top 25% Percentile',
    marketUrgency: 'High Demand',
    openReqs: '18.2k open reqs',
    neuralEngineVersion: 'Neural Engine v3.4 Active',
    aiHealth: '99.8%',
    lastEvaluated: '1h ago',
    nextAssessmentDate: 'Jan 10, 2025',
    vectorId: 'RH-3312'
  },
  arun: {
    id: 'arun',
    name: 'Arun',
    degree: 'B.Tech in Computer Science & Engineering',
    year: '4th Year',
    targetRole: 'Full Stack Developer',
    targetLevel: 'Associate / Mid-Level',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    readinessScore: 68,
    validatedStatus: 'VALIDATED',
    verifiedSkillsCount: 8,
    criticalGapsCount: 3,
    proofArtifactsCount: 3,
    monthlyVelocity: '+15%',
    learningMomentumPercent: 82,
    hoursLogged: 22.5,
    compensationBand: '$120k – $150k',
    percentileRank: 'Top 20% Percentile',
    marketUrgency: 'Very High Demand',
    openReqs: '14.5k open reqs',
    neuralEngineVersion: 'Neural Engine v3.4 Active',
    aiHealth: '99.8%',
    lastEvaluated: 'Just now',
    nextAssessmentDate: 'Dec 20, 2024',
    vectorId: 'AR-7781'
  }
};

let activeStudentId = 'alex';

// A. Profiles Switcher & Listing
app.get('/api/profiles', (req, res) => {
  res.json({
    activeStudentId,
    profiles: Object.values(STUDENT_PROFILES)
  });
});

app.post('/api/profile/switch', (req, res) => {
  const { studentId } = req.body;
  if (STUDENT_PROFILES[studentId]) {
    activeStudentId = studentId;
    userProfile = { ...STUDENT_PROFILES[studentId] };
    return res.json({ success: true, profile: userProfile });
  }
  res.status(400).json({ success: false, message: 'Student profile not found' });
});

// B. Resume Parser & Document Analysis (Section 4 & Section 5 of Problem 3)
app.get('/api/resume/samples', (req, res) => {
  res.json({ success: true, samples: SAMPLE_RESUMES });
});

app.post('/api/resume/parse', (req, res) => {
  const { resumeText, targetRole } = req.body;
  const effectiveRole = targetRole || userProfile.targetRole || 'Full Stack Developer';
  const result = parseResumeDocument(resumeText || SAMPLE_RESUMES.arun.text, effectiveRole);
  res.json({ success: true, result });
});

app.post('/api/resume/sync', (req, res) => {
  const { extractedSkills, readinessScore, targetRole } = req.body;
  if (readinessScore) userProfile.readinessScore = readinessScore;
  if (targetRole) userProfile.targetRole = targetRole;
  if (extractedSkills && extractedSkills.length > 0) {
    userProfile.verifiedSkillsCount = Math.max(userProfile.verifiedSkillsCount, extractedSkills.length);
  }
  res.json({ success: true, message: 'Skills synced to active profile', profile: userProfile });
});

// C. Weekly Learning Plan & Progress Tracking (Section 7 & Section 9 of Problem 3)
app.get('/api/learning-plan', (req, res) => {
  const totalTasks = ACTIVE_LEARNING_PLAN.length;
  const completedTasks = ACTIVE_LEARNING_PLAN.filter(t => t.status === 'completed').length;
  const inProgressTasks = ACTIVE_LEARNING_PLAN.filter(t => t.status === 'in_progress').length;
  const overallProgressPercent = Math.round(
    ((completedTasks * 1.0 + inProgressTasks * 0.4) / totalTasks) * 100
  );

  res.json({
    success: true,
    learningPlan: ACTIVE_LEARNING_PLAN,
    skillTracker: SKILL_PROGRESS_TRACKER,
    overallProgressPercent,
    completedTasksCount: completedTasks,
    totalTasksCount: totalTasks
  });
});

app.put('/api/learning-plan/task/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'not_started' | 'in_progress' | 'completed'
  const updateResult = updateTaskStatus(id, status);
  if (!updateResult) return res.status(404).json({ success: false, message: 'Task not found' });
  
  // Also reflect in userProfile momentum
  userProfile.learningMomentumPercent = Math.min(100, updateResult.overallProgressPercent);

  // Automatically dispatch progress report email to vabhijit516@gmail.com
  sendStudentProgressEmail(TARGET_USER_EMAIL, userProfile, updateResult).catch(err => {
    console.error('[Progress Email Async Error]:', err.message);
  });

  res.json(updateResult);
});

// Explicit Progress Email Dispatch to vabhijit516@gmail.com
app.post('/api/progress/email-report', async (req, res) => {
  const { email } = req.body;
  const targetEmail = email || TARGET_USER_EMAIL;
  
  const totalTasks = ACTIVE_LEARNING_PLAN.length;
  const completedTasks = ACTIVE_LEARNING_PLAN.filter(t => t.status === 'completed').length;
  const inProgressTasks = ACTIVE_LEARNING_PLAN.filter(t => t.status === 'in_progress').length;
  const overallProgressPercent = Math.round(
    ((completedTasks * 1.0 + inProgressTasks * 0.4) / totalTasks) * 100
  );

  const emailResult = await sendStudentProgressEmail(targetEmail, userProfile, {
    completedTasksCount: completedTasks,
    totalTasksCount: totalTasks,
    overallProgressPercent
  });

  res.json({
    success: true,
    message: `Progress report dispatched to ${targetEmail}`,
    emailResult,
    userProfile
  });
});

// D. Calendar Scheduling Export (.ics) (Section 13 of Problem 3)
app.get('/api/calendar/export/:taskId', (req, res) => {
  const task = ACTIVE_LEARNING_PLAN.find(t => t.id === req.params.taskId) || ACTIVE_LEARNING_PLAN[0];
  const icsContent = generateIcsCalendarEvent(task);
  
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="CareerAI_Study_${task.id}.ics"`);
  res.send(icsContent);
});

// E. Notifications & Reminders (Section 10 of Problem 3)
app.get('/api/notifications', (req, res) => {
  res.json(getNotifications());
});

app.post('/api/notifications/mark-read', (req, res) => {
  const { id } = req.body;
  res.json(markNotificationAsRead(id));
});

// F. Job Market Real-World Requirements Comparison (Section 13 of Problem 3)
app.get('/api/jobs/compare', (req, res) => {
  const { jobId } = req.query;
  const userSkillsFormatted = SKILL_PROGRESS_TRACKER.map(s => ({
    name: s.name,
    level: s.level
  }));
  const comparison = compareUserAgainstJob(userSkillsFormatted, jobId);
  res.json({
    success: true,
    availableJobs: LIVE_JOB_POSTINGS,
    comparison
  });
});

// G. Knowledge Retrieval & Resource Search (Section 8 of Problem 3)
app.get('/api/resources/search', (req, res) => {
  const { q } = req.query;
  const searchResult = searchKnowledgeResources(q || 'machine learning');
  res.json({ success: true, searchResult });
});

// Production: Serve React Frontend SPA Build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.join(__dirname, '../frontend/dist');

app.use(express.static(frontendDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CareerAI Express Backend listening on http://localhost:${PORT}`);
});
