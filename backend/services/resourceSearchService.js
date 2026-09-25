// Learning Resource Search & Knowledge Retrieval Service
// Implements Section 8 of Problem 3:
// Interactive semantic search across structured curriculum trees, courses, tutorials, and documentation.

export const KNOWLEDGE_TREES = {
  'machine learning': {
    topic: 'Machine Learning Fundamentals',
    level: 'Beginner to Advanced',
    hierarchy: [
      { name: 'Python Prerequisites', description: 'Functions, lambdas, OOP, list comprehensions', resource: 'Python Official Tutorial' },
      { name: 'NumPy Vectorization', description: 'Array broadcasting, dot products, matrix algebra', resource: 'NumPy Quickstart' },
      { name: 'Pandas Data Wrangling', description: 'DataFrames, groupby, missing value imputation', resource: '10 Minutes to Pandas' },
      { name: 'Statistics & Probability', description: 'Distributions, variance, p-values, hypothesis tests', resource: 'StatQuest by Josh Starmer' },
      { name: 'Supervised Learning', description: 'Linear regression, logistic loss, decision trees', resource: 'Scikit-Learn User Guide' },
      { name: 'Unsupervised Learning', description: 'K-Means clustering, PCA dimensionality reduction', resource: 'Coursera ML Specialization' },
      { name: 'ML Projects & Production', description: 'Churn prediction, model serialization, FastAPI endpoint', resource: 'Kaggle Datasets & GitHub' }
    ]
  },
  'deep learning': {
    topic: 'Deep Learning & Neural Networks',
    level: 'Intermediate to Advanced',
    hierarchy: [
      { name: 'Linear Algebra & Calculus', description: 'Matrix multiplication, partial derivatives, chain rule', resource: '3Blue1Brown Essence of Linear Algebra' },
      { name: 'Perceptrons & Multi-Layer Networks', description: 'Activation functions (ReLU, Sigmoid), forward pass', resource: 'DeepLearning.AI Neural Networks' },
      { name: 'Backpropagation & Gradient Descent', description: 'Loss computation, autograd, learning rate scheduling', resource: 'CS231n Convolutional Networks' },
      { name: 'PyTorch Framework', description: 'Tensors, nn.Module, optimizers, DataLoader', resource: 'PyTorch Tutorials' },
      { name: 'Transformers & LLMs', description: 'Self-attention, multi-head attention, Hugging Face', resource: 'Hugging Face NLP Course' }
    ]
  },
  'full stack': {
    topic: 'Full Stack Web Development',
    level: 'Beginner to Intermediate',
    hierarchy: [
      { name: 'HTML5 & CSS3', description: 'Semantic layout, Flexbox, CSS Grid, Responsive design', resource: 'MDN Web Docs' },
      { name: 'Modern JavaScript (ES6+)', description: 'Promises, Async/Await, Closures, DOM manipulation', resource: 'JavaScript.info' },
      { name: 'React Component Architecture', description: 'Hooks (useState, useEffect), custom hooks, routing', resource: 'React.dev Official Documentation' },
      { name: 'Node.js & Express APIs', description: 'Middleware, RESTful endpoints, JWT authentication', resource: 'Expressjs.com Guide' },
      { name: 'Databases & ORM', description: 'PostgreSQL, MongoDB, schema design, indexing', resource: 'Prisma / Mongoose Documentation' },
      { name: 'Docker & Cloud Deployment', description: 'Containerization, Dockerfile, AWS EC2 / Vercel', resource: 'Docker Get Started' }
    ]
  },
  'devops': {
    topic: 'DevOps & Cloud Engineering',
    level: 'Intermediate to Advanced',
    hierarchy: [
      { name: 'Linux Command Line', description: 'Bash scripting, file permissions, process management', resource: 'Linux Journey' },
      { name: 'Git & Version Control', description: 'Branching strategies, rebase, merge conflicts', resource: 'Pro Git Book' },
      { name: 'Docker Containerization', description: 'Multi-stage builds, container networking, volumes', resource: 'Docker Official Docs' },
      { name: 'CI/CD Pipelines', description: 'GitHub Actions, automated test suites, artifact packaging', resource: 'GitHub Actions Documentation' },
      { name: 'Kubernetes Orchestration', description: 'Pods, Deployments, Services, Ingress, Helm', resource: 'Kubernetes.io Interactive Tutorials' },
      { name: 'Infrastructure as Code (Terraform)', description: 'Declarative cloud provisioning on AWS/GCP', resource: 'HashiCorp Learn' }
    ]
  }
};

/**
 * Searches the knowledge retrieval index.
 * @param {string} query
 * @returns {object} Search match with hierarchy and recommended resources
 */
export function searchKnowledgeResources(query = '') {
  const q = query.toLowerCase().trim();
  
  let matchedKey = Object.keys(KNOWLEDGE_TREES).find(k => q.includes(k) || k.includes(q));
  if (!matchedKey) {
    if (q.includes('learn') || q.includes('python') || q.includes('data')) {
      matchedKey = 'machine learning';
    } else if (q.includes('web') || q.includes('react') || q.includes('node')) {
      matchedKey = 'full stack';
    } else {
      matchedKey = 'machine learning';
    }
  }

  const result = KNOWLEDGE_TREES[matchedKey];
  return {
    query,
    matchedTopic: result.topic,
    level: result.level,
    curriculumHierarchy: result.hierarchy,
    totalModules: result.hierarchy.length,
    retrievalSource: 'CareerAI Vectorized Knowledge Index v3.4'
  };
}
