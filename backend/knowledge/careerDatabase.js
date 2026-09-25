// Comprehensive Multi-Domain Career Knowledge Base (50+ Roles across 10 Corporate Domains)
// Attributes: [Job Title, Domain, Required Skills with Level 1-5, Thinking Level 1-5, Education, Experience, Tools, Responsibilities, Recommended Projects, Roadmap Phases, Target Compensation, Hiring Demand]

export const CAREER_KNOWLEDGE_BASE = [
  // 1. IT & SOFTWARE ROLES
  {
    id: 'it-software-developer',
    title: 'Software Developer',
    domain: 'IT & Software',
    thinkingLevel: 4,
    description: 'Design, write, test, and maintain efficient, scalable software applications and algorithmic pipelines.',
    requiredSkills: [
      { name: 'Python', requiredLevel: 3, importance: 0.9 },
      { name: 'Java', requiredLevel: 3, importance: 0.8 },
      { name: 'Data Structures & Algorithms', requiredLevel: 4, importance: 1.0 },
      { name: 'Object-Oriented Programming', requiredLevel: 4, importance: 0.95 },
      { name: 'Git & Version Control', requiredLevel: 3, importance: 0.85 },
      { name: 'Relational SQL', requiredLevel: 3, importance: 0.8 }
    ],
    tools: ['Git', 'VS Code', 'Docker', 'Postman', 'Jira'],
    education: 'B.Tech/B.S. in Computer Science or equivalent practical portfolio',
    experience: '0–3 years',
    certifications: ['AWS Certified Developer', 'Oracle Certified Associate Java'],
    responsibilities: [
      'Write modular, high-test-coverage code following SOLID principles',
      'Optimize algorithmic runtime and memory complexity',
      'Collaborate in agile sprint rituals and code review cycles'
    ],
    recommendedProjects: [
      {
        title: 'Concurrent Task Scheduler in Python/Java',
        difficulty: 'Intermediate',
        skills: ['DSA', 'Threading', 'OOP'],
        description: 'Build an in-memory priority queue scheduler with worker thread pool.'
      },
      {
        title: 'Distributed Key-Value Store',
        difficulty: 'Advanced',
        skills: ['Networking', 'Data Structures', 'Git'],
        description: 'Implement a raft-consensus based distributed store over TCP.'
      }
    ],
    roadmapPhases: [
      'Core Programming & Syntax Mastery',
      'Data Structures & Algorithmic Problem Solving',
      'Object-Oriented Design & Clean Architecture',
      'Databases, APIs & Version Control',
      'Production Systems & Testing'
    ],
    compensation: '$110,000 – $145,000',
    hiringDemand: 'High Demand (18.2k open reqs)'
  },
  {
    id: 'it-data-scientist',
    title: 'Data Scientist',
    domain: 'IT & Software',
    thinkingLevel: 5,
    description: 'Extract statistical insights, formulate hypotheses, and train predictive machine learning models to solve complex business problems.',
    requiredSkills: [
      { name: 'Python', requiredLevel: 4, importance: 1.0 },
      { name: 'Statistics & Probability', requiredLevel: 4, importance: 1.0 },
      { name: 'Machine Learning', requiredLevel: 4, importance: 1.0 },
      { name: 'Relational SQL', requiredLevel: 3, importance: 0.9 },
      { name: 'Data Manipulation (Pandas/NumPy)', requiredLevel: 4, importance: 0.95 },
      { name: 'Data Visualization', requiredLevel: 3, importance: 0.75 }
    ],
    tools: ['Jupyter', 'Scikit-Learn', 'Pandas', 'XGBoost', 'Tableau', 'Docker'],
    education: 'M.S. or B.S. in Data Science, Computer Science, Statistics, or Quantitative field',
    experience: '1–4 years',
    certifications: ['Google Professional Data Scientist', 'IBM Data Science Professional'],
    responsibilities: [
      'Perform exploratory data analysis and feature engineering on multi-terabyte datasets',
      'Formulate cost functions and train supervised/unsupervised machine learning models',
      'Conduct rigorous A/B hypothesis testing and causal inference experiments'
    ],
    recommendedProjects: [
      {
        title: 'Customer Churn & Lifetime Value Predictor',
        difficulty: 'Intermediate',
        skills: ['Python', 'Pandas', 'Machine Learning', 'XGBoost'],
        description: 'End-to-end pipeline predicting user churn with 0.89+ ROC-AUC.'
      },
      {
        title: 'Vector Search Recommender System',
        difficulty: 'Advanced',
        skills: ['Statistics', 'Embeddings', 'Machine Learning'],
        description: 'Content-based collaborative filtering using cosine distance on high-dimensional vectors.'
      }
    ],
    roadmapPhases: [
      'Python & Vectorized Data Wrangling',
      'Descriptive & Inferential Statistics',
      'Relational Database Modeling & Complex SQL',
      'Supervised & Unsupervised Machine Learning Algorithms',
      'Deep Learning & Model Deployment'
    ],
    compensation: '$135,000 – $165,000',
    hiringDemand: 'High Demand (8.4k open reqs)'
  },
  {
    id: 'it-ai-ml-engineer',
    title: 'AI/ML Engineer',
    domain: 'IT & Software',
    thinkingLevel: 5,
    description: 'Design, optimize, and deploy state-of-the-art deep neural networks and generative AI systems into low-latency production pipelines.',
    requiredSkills: [
      { name: 'Python', requiredLevel: 4, importance: 1.0 },
      { name: 'Machine Learning', requiredLevel: 4, importance: 1.0 },
      { name: 'Deep Learning', requiredLevel: 4, importance: 0.95 },
      { name: 'PyTorch / TensorFlow', requiredLevel: 4, importance: 0.95 },
      { name: 'MLOps & Deployment', requiredLevel: 3, importance: 0.85 },
      { name: 'Statistics & Probability', requiredLevel: 4, importance: 0.9 }
    ],
    tools: ['PyTorch', 'TensorRT', 'Hugging Face', 'Docker', 'Kubernetes', 'FastAPI'],
    education: 'B.S./M.S. in Computer Science, Machine Learning, or Electrical Engineering',
    experience: '2–5 years',
    certifications: ['AWS Machine Learning Specialty', 'TensorFlow Developer Certificate'],
    responsibilities: [
      'Fine-tune open-weight Transformer architectures and multimodal models',
      'Optimize tensor kernels for inference latency SLAs (<20ms p95)',
      'Construct automated CI/CD retraining loops with drift monitoring'
    ],
    recommendedProjects: [
      {
        title: 'Production RAG System with Vector Database',
        difficulty: 'Intermediate',
        skills: ['Python', 'Embeddings', 'FastAPI', 'Vector Search'],
        description: 'Build hybrid retrieval-augmented generation with reranking and guardrails.'
      },
      {
        title: 'Distributed Model Fine-Tuning Pipeline with LoRA',
        difficulty: 'Advanced',
        skills: ['PyTorch', 'Deep Learning', 'Transformers'],
        description: 'Quantized fine-tuning of Llama-3 on domain specific instruction dataset.'
      }
    ],
    roadmapPhases: [
      'Python Foundations & Mathematical Optimization',
      'Supervised & Unsupervised ML Algorithms',
      'Deep Neural Networks (Backpropagation, CNNs, Transformers)',
      'PyTorch / Hugging Face Ecosystem',
      'MLOps, Docker Containerization, & Latency Optimization'
    ],
    compensation: '$150,000 – $190,000',
    hiringDemand: 'Extreme Demand (12.1k open reqs)'
  },
  {
    id: 'it-data-analyst',
    title: 'Data Analyst',
    domain: 'IT & Software',
    thinkingLevel: 3,
    description: 'Aggregate, clean, and model structured business metrics to generate executive reporting dashboards and strategic recommendations.',
    requiredSkills: [
      { name: 'Relational SQL', requiredLevel: 3, importance: 1.0 },
      { name: 'Microsoft Excel / Sheets', requiredLevel: 3, importance: 0.9 },
      { name: 'Python', requiredLevel: 2, importance: 0.7 },
      { name: 'Data Visualization (Power BI / Tableau)', requiredLevel: 3, importance: 0.95 },
      { name: 'Statistics & Probability', requiredLevel: 2, importance: 0.75 }
    ],
    tools: ['Tableau', 'Power BI', 'SQL Server', 'Excel (Power Query)', 'Snowflake'],
    education: 'B.S. in Business Analytics, Computer Science, Economics, or Mathematics',
    experience: '0–2 years',
    certifications: ['Microsoft Power BI Data Analyst (PL-300)', 'Tableau Certified Data Analyst'],
    responsibilities: [
      'Build and automate mission-critical executive KPI dashboards',
      'Write multi-table SQL queries with window functions and CTEs',
      'Partner with cross-functional stakeholders to audit conversion funnels'
    ],
    recommendedProjects: [
      {
        title: 'Executive Revenue & Churn Intelligence Dashboard',
        difficulty: 'Intermediate',
        skills: ['SQL', 'Power BI', 'Data Modeling'],
        description: 'Automated semantic data model visualizing cohort retention and MRR.'
      }
    ],
    roadmapPhases: [
      'Advanced Excel & Business Analytics Formulas',
      'Relational Database Modeling & Advanced SQL',
      'Data Visualization & Storytelling (Power BI / Tableau)',
      'Applied Business Statistics & Cohort Analysis'
    ],
    compensation: '$75,000 – $105,000',
    hiringDemand: 'High Demand (15.4k open reqs)'
  },
  {
    id: 'it-fullstack-developer',
    title: 'Full Stack Developer',
    domain: 'IT & Software',
    thinkingLevel: 4,
    description: 'Engineer responsive web user interfaces and robust distributed backend APIs with secure database integrations.',
    requiredSkills: [
      { name: 'JavaScript / TypeScript', requiredLevel: 4, importance: 1.0 },
      { name: 'React', requiredLevel: 4, importance: 0.95 },
      { name: 'Node.js & Express', requiredLevel: 4, importance: 0.95 },
      { name: 'HTML & CSS', requiredLevel: 4, importance: 0.85 },
      { name: 'Relational SQL', requiredLevel: 3, importance: 0.85 },
      { name: 'REST & GraphQL APIs', requiredLevel: 3, importance: 0.8 }
    ],
    tools: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Vercel'],
    education: 'B.S. in Computer Science or Web Engineering bootcamp graduate',
    experience: '1–4 years',
    certifications: ['AWS Certified Developer', 'Meta Front-End Developer'],
    responsibilities: [
      'Architect client-side state models and responsive UI components',
      'Implement authenticated REST API endpoints with middleware validation',
      'Manage database migrations and schema indexes'
    ],
    recommendedProjects: [
      {
        title: 'Full-Stack Collaborative Workspace with Real-Time WebSockets',
        difficulty: 'Advanced',
        skills: ['React', 'Node.js', 'PostgreSQL', 'WebSockets'],
        description: 'SaaS application with role-based auth, workspace kanban, and live updates.'
      }
    ],
    roadmapPhases: [
      'HTML5, Modern CSS, & JavaScript ES6+',
      'React Components, Hooks, & State Architecture',
      'Node.js, Express, & RESTful API Design',
      'PostgreSQL, Prisma/ORM, & Authentication',
      'CI/CD, Cloud Deployment, & Production Hardening'
    ],
    compensation: '$115,000 – $155,000',
    hiringDemand: 'High Demand (19.8k open reqs)'
  },
  {
    id: 'it-devops-engineer',
    title: 'DevOps Engineer',
    domain: 'IT & Software',
    thinkingLevel: 5,
    description: 'Automate build, deployment, infrastructure-as-code, and continuous monitoring pipelines across multi-cloud environments.',
    requiredSkills: [
      { name: 'Linux System Administration', requiredLevel: 4, importance: 1.0 },
      { name: 'Docker & Containerization', requiredLevel: 4, importance: 1.0 },
      { name: 'Kubernetes', requiredLevel: 4, importance: 0.95 },
      { name: 'CI/CD Pipelines (GitHub Actions / GitLab)', requiredLevel: 4, importance: 0.95 },
      { name: 'Cloud Infrastructure (AWS/GCP)', requiredLevel: 4, importance: 0.9 },
      { name: 'Infrastructure as Code (Terraform)', requiredLevel: 3, importance: 0.85 }
    ],
    tools: ['Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Prometheus', 'Grafana'],
    education: 'B.S. in Computer Science, Systems Engineering, or equivalent experience',
    experience: '2–5 years',
    certifications: ['Certified Kubernetes Administrator (CKA)', 'AWS Certified DevOps Engineer'],
    responsibilities: [
      'Design zero-downtime blue/green and canary deployment pipelines',
      'Provision declarative cloud infrastructure with Terraform',
      'Manage Prometheus/Grafana alerting and incident response telemetry'
    ],
    recommendedProjects: [
      {
        title: 'Automated Multi-Region Kubernetes Deployment with Terraform',
        difficulty: 'Advanced',
        skills: ['Kubernetes', 'Terraform', 'Docker', 'CI/CD'],
        description: 'Complete GitOps pipeline using ArgoCD and automated canary releases.'
      }
    ],
    roadmapPhases: [
      'Linux Kernel & Bash Scripting Mastery',
      'Docker Containerization & Networking',
      'Cloud Architecture (AWS / GCP)',
      'Kubernetes Cluster Orchestration',
      'Terraform, GitOps, & Telemetry Monitoring'
    ],
    compensation: '$130,000 – $170,000',
    hiringDemand: 'Very High (11.4k open reqs)'
  },
  {
    id: 'it-cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    domain: 'IT & Software',
    thinkingLevel: 5,
    description: 'Identify system vulnerabilities, monitor network traffic for intrusion signatures, and execute incident containment procedures.',
    requiredSkills: [
      { name: 'Computer Networking (TCP/IP, DNS)', requiredLevel: 4, importance: 1.0 },
      { name: 'Linux & Command Line', requiredLevel: 4, importance: 0.95 },
      { name: 'SIEM & Log Analysis (Splunk)', requiredLevel: 3, importance: 0.9 },
      { name: 'Threat Detection & Incident Response', requiredLevel: 4, importance: 0.95 },
      { name: 'Python Scripting for Security', requiredLevel: 3, importance: 0.8 }
    ],
    tools: ['Wireshark', 'Splunk', 'Nmap', 'Metasploit', 'Burp Suite'],
    education: 'B.S. in Cybersecurity, Information Systems, or Network Engineering',
    experience: '1–4 years',
    certifications: ['CompTIA Security+', 'Certified Information Systems Security Professional (CISSP)'],
    responsibilities: [
      'Monitor enterprise SIEM security telemetry for anomalies and zero-day threats',
      'Perform vulnerability scanning, penetration testing, and remediation verification',
      'Coordinate post-incident root cause forensics and compliance reporting'
    ],
    recommendedProjects: [
      {
        title: 'Automated Intrusion Detection & Threat Scoring Engine',
        difficulty: 'Advanced',
        skills: ['Python', 'Networking', 'SIEM', 'Linux'],
        description: 'Analyze network PCAP files and trigger automated firewall containment rules.'
      }
    ],
    roadmapPhases: [
      'Networking Protocols & Operating System Internals',
      'Defensive Security Fundamentals & Threat Modeling',
      'SIEM Telemetry Monitoring & Incident Response',
      'Ethical Hacking & Vulnerability Assessment'
    ],
    compensation: '$115,000 – $150,000',
    hiringDemand: 'Extreme Demand (14.2k open reqs)'
  },

  // 2. MARKETING & GROWTH ROLES
  {
    id: 'mkt-digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    domain: 'Marketing & Digital Marketing',
    thinkingLevel: 3,
    description: 'Orchestrate multi-channel acquisition funnels combining organic search, paid social, email marketing, and conversion analytics.',
    requiredSkills: [
      { name: 'Search Engine Optimization (SEO)', requiredLevel: 3, importance: 0.95 },
      { name: 'Paid Ads Management (Google/Meta)', requiredLevel: 3, importance: 0.9 },
      { name: 'Web Analytics (Google Analytics 4)', requiredLevel: 3, importance: 0.95 },
      { name: 'Content Marketing & Copywriting', requiredLevel: 3, importance: 0.85 },
      { name: 'A/B Conversion Testing', requiredLevel: 3, importance: 0.8 }
    ],
    tools: ['Google Ads', 'Meta Ads Manager', 'GA4', 'Ahrefs', 'HubSpot'],
    education: 'B.S. in Marketing, Communications, or Business Administration',
    experience: '1–3 years',
    certifications: ['Google Ads Search Certification', 'HubSpot Inbound Marketing'],
    responsibilities: [
      'Manage PPC campaigns with strict Customer Acquisition Cost (CAC) targets',
      'Conduct keyword research and on-page/technical SEO audits',
      'Optimize landing page conversion rates through multi-variant testing'
    ],
    recommendedProjects: [
      {
        title: 'Full-Funnel Organic & Paid Acquisition Campaign Case Study',
        difficulty: 'Intermediate',
        skills: ['SEO', 'Google Ads', 'GA4', 'A/B Testing'],
        description: 'Demonstrate scaling MRR with 3.4x Return on Ad Spend (ROAS).'
      }
    ],
    roadmapPhases: [
      'Digital Marketing Foundations & Consumer Psychology',
      'SEO Architecture & Content Optimization',
      'Paid Search & Paid Social Campaign Execution',
      'Web Analytics, Attribution Modeling, & Conversion Optimization'
    ],
    compensation: '$65,000 – $95,000',
    hiringDemand: 'High Demand (12.3k open reqs)'
  },
  {
    id: 'mkt-growth-marketer',
    title: 'Growth Marketer',
    domain: 'Marketing & Digital Marketing',
    thinkingLevel: 4,
    description: 'Execute rapid experimental loops across user onboarding, retention loops, virality, and programmatic paid acquisition.',
    requiredSkills: [
      { name: 'A/B Testing & Experimentation', requiredLevel: 4, importance: 1.0 },
      { name: 'Marketing Analytics & SQL', requiredLevel: 3, importance: 0.9 },
      { name: 'Conversion Rate Optimization (CRO)', requiredLevel: 4, importance: 0.95 },
      { name: 'Paid Acquisition & CAC Optimization', requiredLevel: 3, importance: 0.85 },
      { name: 'Product-Led Growth (PLG)', requiredLevel: 3, importance: 0.85 }
    ],
    tools: ['Mixpanel', 'Amplitude', 'PostHog', 'Optimizely', 'SQL'],
    education: 'B.S. in Marketing, Economics, Statistics, or Engineering',
    experience: '2–5 years',
    certifications: ['Reforge Growth Series', 'Google Analytics Certification'],
    responsibilities: [
      'Run weekly growth experiment sprints focused on activation and viral loops',
      'Query analytics warehouses with SQL to analyze user cohort churn',
      'Architect onboarding flows reducing time-to-value for new signups'
    ],
    recommendedProjects: [
      {
        title: 'B2B SaaS Onboarding Experimentation & Retention Model',
        difficulty: 'Advanced',
        skills: ['SQL', 'CRO', 'Analytics', 'A/B Testing'],
        description: 'Increase Day-30 user retention by +18% through automated email nudges.'
      }
    ],
    roadmapPhases: [
      'Growth Accounting & Metric Frameworks (AARRR)',
      'Quantitative Marketing Analytics & SQL',
      'Scientific Experimentation & Statistical Power Analysis',
      'Viral Loops & Product-Led Monetization'
    ],
    compensation: '$95,000 – $135,000',
    hiringDemand: 'Steady (6.8k open reqs)'
  },

  // 3. SALES & BUSINESS DEVELOPMENT ROLES
  {
    id: 'sales-b2b-executive',
    title: 'Business Development Manager',
    domain: 'Sales & Business Development',
    thinkingLevel: 4,
    description: 'Drive high-value enterprise pipeline creation, conduct executive discovery calls, and negotiate multi-year contract renewals.',
    requiredSkills: [
      { name: 'B2B Solution Selling', requiredLevel: 4, importance: 1.0 },
      { name: 'Contract Negotiation', requiredLevel: 4, importance: 0.95 },
      { name: 'CRM Pipeline Management (Salesforce)', requiredLevel: 3, importance: 0.9 },
      { name: 'Executive Presentation & Discovery', requiredLevel: 4, importance: 0.95 },
      { name: 'Market & Competitor Research', requiredLevel: 3, importance: 0.8 }
    ],
    tools: ['Salesforce', 'HubSpot', 'LinkedIn Sales Navigator', 'Gong', 'ZoomInfo'],
    education: 'B.A./B.S. in Business, Marketing, or Communications',
    experience: '3–6 years',
    certifications: ['MEDDPICC Sales Methodology', 'Salesforce Certified Administrator'],
    responsibilities: [
      'Own annual quota of $1.5M+ ACV in enterprise software licenses',
      'Lead C-suite multi-stakeholder technical evaluations and security reviews',
      'Partner with pre-sales solution engineers on POC deliverables'
    ],
    recommendedProjects: [
      {
        title: 'Enterprise Go-To-Market Pitch & Battlecard Strategy',
        difficulty: 'Advanced',
        skills: ['B2B Sales', 'Negotiation', 'Competitive Analysis'],
        description: 'Complete playbook displacing legacy on-prem solutions with modern cloud SaaS.'
      }
    ],
    roadmapPhases: [
      'Outbound Prospecting & Cold Pipeline Creation',
      'Diagnostic Discovery & Value Engineering',
      'Enterprise MEDDPICC Qualification',
      'Legal Negotiation, Procurement, & Closing'
    ],
    compensation: '$90,000 – $140,000 Base ($180k–$260k OTE)',
    hiringDemand: 'High Demand (14.5k open reqs)'
  },

  // 4. FINANCE & ACCOUNTING ROLES
  {
    id: 'fin-financial-analyst',
    title: 'Financial Analyst',
    domain: 'Finance & Accounting',
    thinkingLevel: 4,
    description: 'Formulate dynamic three-statement financial models, forecast corporate budgets, and evaluate capital investment opportunities.',
    requiredSkills: [
      { name: 'Financial Modeling & Valuation (DCF)', requiredLevel: 4, importance: 1.0 },
      { name: 'Advanced Microsoft Excel (VBA/Power Query)', requiredLevel: 4, importance: 1.0 },
      { name: 'Corporate Accounting (GAAP/IFRS)', requiredLevel: 3, importance: 0.95 },
      { name: 'Variance & Budget Analysis', requiredLevel: 3, importance: 0.9 },
      { name: 'Business Intelligence & SQL', requiredLevel: 2, importance: 0.75 }
    ],
    tools: ['Excel', 'Bloomberg Terminal', 'Power BI', 'SAP ERP', 'QuickBooks'],
    education: 'B.S. in Finance, Accounting, Economics, or MBA',
    experience: '1–4 years',
    certifications: ['Chartered Financial Analyst (CFA Level 1/2)', 'FMVA (Financial Modeling)'],
    responsibilities: [
      'Develop dynamic discounted cash flow (DCF) and LBO models',
      'Conduct monthly operational variance analysis against fiscal forecasts',
      'Prepare board-level executive financial presentations'
    ],
    recommendedProjects: [
      {
        title: 'Three-Statement Dynamic LBO Model of Public SaaS Company',
        difficulty: 'Advanced',
        skills: ['Financial Modeling', 'Excel', 'GAAP'],
        description: 'Fully integrated income statement, balance sheet, and debt schedules.'
      }
    ],
    roadmapPhases: [
      'Accounting Principles & Financial Statement Mechanics',
      'Advanced Excel Financial Formulas & Sensitivity Analysis',
      'Discounted Cash Flow (DCF) & Relative Valuation',
      'Corporate Capital Budgeting & Executive Reporting'
    ],
    compensation: '$85,000 – $120,000',
    hiringDemand: 'Steady (10.1k open reqs)'
  },

  // 5. HR & RECRUITMENT ROLES
  {
    id: 'hr-talent-acquisition',
    title: 'Technical Recruiter',
    domain: 'HR & Recruitment',
    thinkingLevel: 3,
    description: 'Source, evaluate, and negotiate offers for high-caliber engineering, data science, and product leadership candidates.',
    requiredSkills: [
      { name: 'Technical Sourcing & Screening', requiredLevel: 3, importance: 1.0 },
      { name: 'Candidate Relationship Management', requiredLevel: 3, importance: 0.95 },
      { name: 'Interviewing & Behavioral Evaluation', requiredLevel: 3, importance: 0.9 },
      { name: 'Compensation Benchmarking', requiredLevel: 3, importance: 0.85 },
      { name: 'ATS Systems (Greenhouse / Lever)', requiredLevel: 3, importance: 0.85 }
    ],
    tools: ['LinkedIn Recruiter', 'Greenhouse', 'Lever', 'Gem', 'Levels.fyi'],
    education: 'B.A./B.S. in Human Resources, Communications, or Psychology',
    experience: '1–3 years',
    certifications: ['SHRM-CP', 'AIRS Certified Diversity Recruiter'],
    responsibilities: [
      'Full lifecycle recruitment across software and AI engineering teams',
      'Design structured interview rubrics mitigating hiring bias',
      'Negotiate complex equity and cash compensation packages'
    ],
    recommendedProjects: [
      {
        title: 'Diversity Technical Hiring Playbook & Scorecard Rubric',
        difficulty: 'Intermediate',
        skills: ['Sourcing', 'Rubric Design', 'Compensation'],
        description: 'End-to-end recruitment funnel reducing time-to-hire by 25%.'
      }
    ],
    roadmapPhases: [
      'Technical Concepts for Recruiters (Languages, Stacks, Frameworks)',
      'Advanced Boolean Search & Talent Pipeline Sourcing',
      'Behavioral & Structured Competency Interviewing',
      'Compensation Structuring & Closing Candidates'
    ],
    compensation: '$75,000 – $115,000',
    hiringDemand: 'High Demand (9.2k open reqs)'
  },

  // 6. DESIGN & CREATIVE ROLES
  {
    id: 'des-ui-ux-designer',
    title: 'UI/UX Product Designer',
    domain: 'Design & Creative',
    thinkingLevel: 5,
    description: 'Transform complex user requirements into elegant, accessible user journeys, wireframes, high-fidelity prototypes, and component design systems.',
    requiredSkills: [
      { name: 'Figma & Design Systems', requiredLevel: 4, importance: 1.0 },
      { name: 'User Research & Usability Testing', requiredLevel: 4, importance: 0.95 },
      { name: 'Information Architecture & Wireframing', requiredLevel: 4, importance: 0.95 },
      { name: 'Visual Hierarchy, Typography, & Color', requiredLevel: 4, importance: 0.9 },
      { name: 'Prototyping & Micro-interactions', requiredLevel: 3, importance: 0.85 }
    ],
    tools: ['Figma', 'FigJam', 'Miro', 'Lottie', 'Maze'],
    education: 'B.S./B.A. in Human-Computer Interaction (HCI), Graphic Design, or portfolio equivalent',
    experience: '2–5 years',
    certifications: ['Google UX Design Professional Certificate', 'Nielsen Norman Group UX Master'],
    responsibilities: [
      'Conduct generative user interviews and usability testing sessions',
      'Maintain modular tokenized design systems with auto-layout in Figma',
      'Partner closely with front-end engineers to ensure pixel-perfect fidelity'
    ],
    recommendedProjects: [
      {
        title: 'Complex Fintech Web Application & Tokenized Design System',
        difficulty: 'Advanced',
        skills: ['Figma', 'Information Architecture', 'User Research'],
        description: 'Comprehensive 40+ screen mobile/desktop design system with interactive prototype.'
      }
    ],
    roadmapPhases: [
      'Visual Foundations: Typography, Contrast, & Grid Systems',
      'User-Centered Design Methodology & Usability Testing',
      'Wireframing & Information Architecture',
      'Advanced Figma Components, Variables, & Auto-Layout',
      'Design Systems, Accessibility (WCAG), & Developer Handoff'
    ],
    compensation: '$105,000 – $145,000',
    hiringDemand: 'High Demand (11.0k open reqs)'
  },

  // 7. PRODUCT & STRATEGY ROLES
  {
    id: 'prod-product-manager',
    title: 'Product Manager',
    domain: 'Product & Management',
    thinkingLevel: 5,
    description: 'Synthesize customer needs, engineering feasibility, and business viability to define the vision, roadmap, and execution cadence of digital products.',
    requiredSkills: [
      { name: 'Product Strategy & Vision', requiredLevel: 4, importance: 1.0 },
      { name: 'Product Analytics & Metrics (SQL/Amplitude)', requiredLevel: 4, importance: 0.95 },
      { name: 'Agile & Scrum Roadmap Execution', requiredLevel: 4, importance: 0.95 },
      { name: 'User Discovery & Customer Interviews', requiredLevel: 4, importance: 0.9 },
      { name: 'PRD Writing & Backlog Prioritization', requiredLevel: 4, importance: 0.9 }
    ],
    tools: ['Jira', 'Notion', 'Mixpanel', 'Amplitude', 'Figma'],
    education: 'B.S. in Computer Science, Engineering, Business, or MBA',
    experience: '3–6 years',
    certifications: ['Certified Scrum Product Owner (CSPO)', 'Reforge Product Leadership'],
    responsibilities: [
      'Author comprehensive Product Requirements Documents (PRDs)',
      'Prioritize product backlogs using RICE/MoSCoW scoring frameworks',
      'Define North Star metrics and lead cross-functional sprint planning'
    ],
    recommendedProjects: [
      {
        title: 'End-to-End Product Spec & Go-To-Market Plan for AI Assistant',
        difficulty: 'Advanced',
        skills: ['Product Strategy', 'PRD', 'Metrics', 'User Discovery'],
        description: 'Comprehensive PRD, user flow, release phases, and metrics dashboard.'
      }
    ],
    roadmapPhases: [
      'Product Foundations: Problem Discovery & Customer Empathy',
      'Data-Informed Product Decisions & Metric Frameworks',
      'Agile Sprint Execution, PRD Writing, & User Stories',
      'Go-To-Market Strategy & Product-Led Monetization'
    ],
    compensation: '$130,000 – $175,000',
    hiringDemand: 'High Demand (13.6k open reqs)'
  },

  // 8. OPERATIONS & SUPPLY CHAIN ROLES
  {
    id: 'ops-supply-chain-analyst',
    title: 'Supply Chain Analyst',
    domain: 'Operations & Supply Chain',
    thinkingLevel: 4,
    description: 'Optimize global procurement, reduce inventory holding costs, and forecast shipment demand using mathematical supply chain algorithms.',
    requiredSkills: [
      { name: 'Supply Chain Analytics & Demand Forecasting', requiredLevel: 4, importance: 1.0 },
      { name: 'Advanced Excel & Linear Optimization', requiredLevel: 4, importance: 0.95 },
      { name: 'SQL & ERP Database Reporting', requiredLevel: 3, importance: 0.9 },
      { name: 'Vendor & Inventory Management', requiredLevel: 3, importance: 0.85 },
      { name: 'Tableau / Power BI Reporting', requiredLevel: 3, importance: 0.8 }
    ],
    tools: ['SAP S/4HANA', 'Oracle NetSuite', 'Excel Solver', 'Tableau'],
    education: 'B.S. in Supply Chain Management, Industrial Engineering, or Business',
    experience: '1–4 years',
    certifications: ['APICS CSCP (Certified Supply Chain Professional)'],
    responsibilities: [
      'Model safety stock buffers and economic order quantities (EOQ)',
      'Analyze freight logistics lead times to mitigate supply bottlenecks',
      'Automate monthly supplier on-time delivery KPI scorecards'
    ],
    recommendedProjects: [
      {
        title: 'Multi-Echelon Inventory Optimization & Forecasting Model',
        difficulty: 'Intermediate',
        skills: ['Excel', 'SQL', 'Forecasting'],
        description: 'Reduced inventory stockout rate by 34% using ARIMA modeling.'
      }
    ],
    roadmapPhases: [
      'Supply Chain Fundamentals & Logistics Topologies',
      'Quantitative Demand Forecasting & Inventory Math (EOQ)',
      'ERP Systems & Enterprise Data Warehousing',
      'Vendor Optimization & Global Trade Compliance'
    ],
    compensation: '$75,000 – $110,000',
    hiringDemand: 'Steady (8.5k open reqs)'
  }
];
