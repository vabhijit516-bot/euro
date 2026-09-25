# 🔑 CareerAI Platform: API Keys & Integrations Guide

Welcome to the **CareerAI: AI Career Intelligence Platform** (Problem 3: AI Learning & Career Assistant).

> [!NOTE]
> **Zero Mandatory Keys Required to Run:**
> The platform is built with a self-contained, offline-first NLP intelligence engine:
> - Built-in **Multinomial Naive Bayes + TF-IDF N-Gram** intent classifier trained across 16 intents.
> - Custom Multi-Domain **Career Knowledge Base** (10 domains, 50+ roles, Bloom's L1–L5 levels).
> - Sentence-level **Resume & Document Parser** with explainability.
> - **Dependency DAG validator** and **Weekly Learning Plan generator**.
> - In-memory **Job Market comparator** and **iCalendar (.ics)** exporter.
>
> All features run **100% locally out-of-the-box**!

---

## 🚀 Optional Cloud API Keys to Supercharge the System

If you would like to connect external live cloud APIs, here is the complete list of keys you can provide:

| Key Name | Service | Purpose | Free Tier / Where to Obtain |
| :--- | :--- | :--- | :--- |
| **`GEMINI_API_KEY`** | **Google Gemini AI** *(Recommended)* | Powers generative conversational coaching, deep resume reasoning, and live mock interview rounds | **Free tier available** at [Google AI Studio](https://aistudio.google.com/) |
| **`OPENAI_API_KEY`** | **OpenAI** *(Optional)* | Optional LLM provider for GPT-4o / GPT-4o-mini structured career advice | [OpenAI Platform API Keys](https://platform.openai.com/api-keys) |
| **`RAPIDAPI_KEY`** | **RapidAPI / JSearch** | Real-time live job scraping across LinkedIn, Indeed, Google Jobs (Section 13) | **Free tier (500 req/mo)** at [RapidAPI JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) |
| **`SERPAPI_API_KEY`** | **SerpApi** | Live Google search retrieval for newly released courses, YouTube tutorials, and college syllabi (Section 13) | **Free tier (100 searches/mo)** at [SerpApi](https://serpapi.com/) |

---

## 🛠️ How to Provide Your API Keys

1. Create a file named `.env` in the `backend/` folder (or edit [`backend/.env.example`](file:///c:/Users/ABHIJIT/Downloads/euro/backend/.env.example) and rename it to `.env`).
2. Paste your keys:
   ```env
   GEMINI_API_KEY=AIzaSy...your-gemini-key
   OPENAI_API_KEY=sk-proj-...your-openai-key
   RAPIDAPI_KEY=...your-rapidapi-key
   SERPAPI_API_KEY=...your-serpapi-key
   ```
3. Restart the backend server:
   ```bash
   cd backend
   node server.js
   ```
4. The system will automatically detect the presence of your keys and switch from local heuristic mode to live cloud mode!

---

## 📂 Saved Pages in the `euro` Workspace

All pages are located in [`frontend/src/pages/`](file:///c:/Users/ABHIJIT/Downloads/euro/frontend/src/pages):

1. **[`Dashboard.jsx`](file:///c:/Users/ABHIJIT/Downloads/euro/frontend/src/pages/Dashboard.jsx)**: Overview, 72% circular SVG gauge, 6-axis Competency Radar, Weekly Learning Roadmap, and Live Job Market Benchmark.
2. **[`SkillIntelligence.jsx`](file:///c:/Users/ABHIJIT/Downloads/euro/frontend/src/pages/SkillIntelligence.jsx)**: Skill Matrix, Bloom's Taxonomy Levels 1–5, and Dependency Graph traversal.
3. **[`CareerExplorer.jsx`](file:///c:/Users/ABHIJIT/Downloads/euro/frontend/src/pages/CareerExplorer.jsx)**: Career Explorer intelligence engine with 50+ roles across 10 corporate domains.
4. **[`LearningPath.jsx`](file:///c:/Users/ABHIJIT/Downloads/euro/frontend/src/pages/LearningPath.jsx)**: Learning Path & Course Discovery with expandable syllabi and ROI stats.
5. **[`ProjectsStudio.jsx`](file:///c:/Users/ABHIJIT/Downloads/euro/frontend/src/pages/ProjectsStudio.jsx)**: Portfolio Capstone Projects, GitHub repo blueprints, and proof artifacts.
6. **[`AICoach.jsx`](file:///c:/Users/ABHIJIT/Downloads/euro/frontend/src/pages/AICoach.jsx)**: AI Career Coach Workspace with live 9-stage NLP Telemetry and Model Training Lab.
7. **[`AnalyticsDashboard.jsx`](file:///c:/Users/ABHIJIT/Downloads/euro/frontend/src/pages/AnalyticsDashboard.jsx)**: Statistical velocity analytics, skill acquisition curves, and percentile ranks.
8. **[`ResumeStudio.jsx`](file:///c:/Users/ABHIJIT/Downloads/euro/frontend/src/pages/ResumeStudio.jsx)**: AI Resume & Document Parser with explainable skill detection and gap analysis.
9. **[`NotificationsPage.jsx`](file:///c:/Users/ABHIJIT/Downloads/euro/frontend/src/pages/NotificationsPage.jsx)**: Full Notification & Study Reminder Center with 1-click calendar sync.
