import React, { useState } from 'react';

export default function ProjectsStudio({ profile, onOpenAuditModal }) {
  const projects = [
    {
      id: 'proj-1',
      title: 'Customer Churn & Lifetime Value (LTV) Predictor',
      domain: 'Machine Learning',
      status: 'VERIFIED',
      difficulty: 'Intermediate',
      grade: '98% Peer Reviewed',
      techStack: ['Python', 'XGBoost', 'Pandas', 'Scikit-Learn', 'FastAPI'],
      description: 'End-to-end production predictive pipeline evaluated across 1.2M rows. Achieved 0.89 ROC-AUC with automated cross-validation stratification.',
      githubUrl: 'https://github.com/alexkumar-data/churn-predictor-production',
      metrics: '1.2M Rows • <18ms p95 latency • Dockerized'
    },
    {
      id: 'proj-2',
      title: 'High-Throughput Relational ETL & Cohort Analyzer',
      domain: 'Data Engineering',
      status: 'VERIFIED',
      difficulty: 'Intermediate',
      grade: '95% Peer Reviewed',
      techStack: ['PostgreSQL', 'Python', 'Docker', 'SQLAlchemy'],
      description: 'Multi-table financial transaction analytics pipeline with window functions, recursive CTEs, and automated data quality checks.',
      githubUrl: 'https://github.com/alexkumar-data/financial-etl-pipeline',
      metrics: '500k Daily Transactions • Zero Deadlocks'
    },
    {
      id: 'proj-3',
      title: 'Two-Tower Vector Recommender with HNSW Search',
      domain: 'Deep Learning & Search',
      status: 'IN PROGRESS',
      difficulty: 'Hard',
      grade: 'Sprint Milestone Due Nov 28',
      techStack: ['PyTorch', 'FastAPI', 'Faiss', 'Docker'],
      description: 'Candidate retrieval and ranking engine operating across 10M catalog embeddings with sub-50ms candidate scoring SLAs.',
      githubUrl: 'https://github.com/alexkumar-data/vector-recommender-engine',
      metrics: '10M Items • HNSW Index • In Progress'
    }
  ];

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Header Band */}
      <section className="relative w-full pt-4 pb-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[11px] uppercase font-bold tracking-wider">
                Proof Artifacts Studio // GitHub Validation
              </span>
              <span className="font-mono text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                3 Production Artifacts
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              PORTFOLIO PROOF STUDIO
            </h1>
            <p className="text-sm text-[#475569] leading-relaxed">
              Tangible GitHub repositories and benchmarks that prove production-readiness to hiring managers and FAANG interview panels.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAuditModal}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Export Proof Portfolio</span>
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    proj.status === 'VERIFIED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {proj.status}
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-bold">
                  {proj.difficulty}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">{proj.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1">
                {proj.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                <span className="text-slate-400">{proj.metrics}</span>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
                >
                  GitHub <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
