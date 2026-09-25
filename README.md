# CareerAI: AI Learning & Career Intelligence Platform

> **Problem 3 Solution — AI Learning & Career Assistant**  
> An intelligent, production-grade career platform engineered with **OpenAI GPT-4o**, **Resend API**, **Custom RAG Knowledge Base**, **Supabase Database & Auth**, **React (Tailwind CSS)**, and **Node.js + Express**.

---

## 🚀 Key Features

1. **AI Career Coach (7-Section Structured Output)**:
   - Powered by OpenAI GPT-4o paired with a Custom RAG Knowledge Engine & Skill Dependency Graph.
   - Outputs strict 7 sections: *Understanding*, *Current Status*, *Skill Gap Matrix*, *Prerequisite Recommendations*, *Next Steps*, *Resources*, and *Capstone Projects*.
2. **Weekly Learning Roadmap & Dynamic Progress Tracking**:
   - 6-week curriculum with week-by-week topic breakdowns, duration, difficulty, and hands-on practice.
   - Status toggles (*Not Started*, *In Progress*, *Completed*) with dynamic momentum and readiness recalculation.
3. **Automated Transactional Emails (Resend API)**:
   - Sends real-time progress update reports, milestone alerts, and study session summaries to `vabhijit516@gmail.com`.
4. **Sentence-Level Explainable Resume Parser**:
   - Parses student resumes, extracts technical skills, matches against target job architectures, and computes career readiness.
5. **Multi-Student Profile Switcher**:
   - Pre-configured with distinct personas: *Alex Kumar* (Data Scientist), *Priya Sharma* (AI Engineer), *Rahul Verma* (Software Developer), and *Arun* (Full Stack Developer).
6. **Real-World Job Market Benchmarking**:
   - Live comparisons against benchmark requirements from Google, Amazon, Stripe, and Meta.
7. **One-Click Calendar Sync**:
   - Exports study blocks as standard `.ics` iCalendar files for Google Calendar, Apple Calendar, and Outlook.
8. **Supabase Database & Auth**:
   - Full PostgreSQL relational schema with Row Level Security (RLS) and automatic user profile triggers.

---

## 🛠️ Tech Stack

- **AI Model**: OpenAI GPT-4o (`chat.completions.create`)
- **Knowledge Engine**: Custom RAG (10 Corporate Domains, 50+ Roles, Bloom's L1-L5 Thinking Levels, Skill Dependency Graph)
- **Transactional Email**: Resend API
- **Database & Authentication**: Supabase (PostgreSQL + Supabase Auth)
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Material Symbols
- **Backend**: Node.js, Express, RESTful APIs

---

## 📦 Project Structure

```
euro/
├── backend/
│   ├── config/              # Supabase & database clients
│   ├── knowledge/           # Career databases & skill dependency graphs
│   ├── nlp/                 # 9-stage NLP intelligence pipeline & resume parser
│   ├── routes/              # Auth routes & API endpoints
│   ├── services/            # OpenAI GPT-4o, Resend, learning roadmap & job market services
│   ├── server.js            # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # UI cards, modals, navigation, roadmaps
│   │   ├── pages/           # 9 complete responsive pages
│   │   ├── App.jsx          # Routing & global state
│   │   └── index.css        # Tailwind styling & typography
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── supabase_schema.sql      # Complete SQL database schema
├── .env.example             # Environment template
└── README.md
```

---

## ⚡ Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # Add your OpenAI, Resend, and Supabase keys
npm start
```
*Backend runs on `http://localhost:5000`.*

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

### 3. Supabase Database Initialization

1. Open your [Supabase SQL Editor](https://supabase.com/dashboard).
2. Run the provided [`supabase_schema.sql`](./supabase_schema.sql) script.

---

## 📄 License

MIT License. Designed and engineered for Problem 3 — AI Learning & Career Assistant.
