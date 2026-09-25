import React, { useState, useEffect } from 'react';

export default function SkillIntelligence({ profile, onOpenRoleModal, onOpenAuditModal }) {
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'blooms' | 'dependencies'

  const competencies = [
    { name: 'Python Programming', level: 'Advanced (Level 4/5)', score: 92, verified: true, blooms: 'L4 - Synthesis & Architecture', tag: 'Core Strength' },
    { name: 'Data Manipulation (Pandas/NumPy)', level: 'Advanced (Level 4/5)', score: 88, verified: true, blooms: 'L4 - Synthesis & Architecture', tag: 'Core Strength' },
    { name: 'Relational SQL & Schemas', level: 'Intermediate (Level 3/5)', score: 76, verified: true, blooms: 'L3 - Analysis & Execution', tag: 'Proficient' },
    { name: 'Data Structures & Algorithms', level: 'Intermediate (Level 3/5)', score: 74, verified: true, blooms: 'L3 - Analysis & Execution', tag: 'Proficient' },
    { name: 'Git & Version Control', level: 'Intermediate (Level 3/5)', score: 75, verified: true, blooms: 'L3 - Analysis & Execution', tag: 'Proficient' },
    { name: 'Statistics & Probability', level: 'Beginner (Level 2/5)', score: 48, verified: false, blooms: 'L2 - Comprehension', tag: 'Needs Work' },
    { name: 'Machine Learning Algorithms', level: 'Critical Gap (Level 1/5)', score: 31, verified: false, blooms: 'L1 - Knowledge', tag: 'Bottleneck' },
    { name: 'Deep Learning & Neural Nets', level: 'Novice (Level 1/5)', score: 20, verified: false, blooms: 'L1 - Knowledge', tag: 'Prerequisite Blocked' }
  ];

  const bloomsTaxonomyLevels = [
    { level: 'Level 5: Evaluation & Strategy', desc: 'System design trade-offs, organizational architecture, enterprise model governance.' },
    { level: 'Level 4: Synthesis & Architecture', desc: 'Constructing production-grade end-to-end pipelines, custom loss functions, containerized serving.' },
    { level: 'Level 3: Analysis & Implementation', desc: 'Writing modular code, debugging, testing, analyzing statistical distributions.' },
    { level: 'Level 2: Comprehension & Practical Use', desc: 'Applying existing libraries, calling APIs, running baseline models.' },
    { level: 'Level 1: Knowledge & Foundations', desc: 'Recall of fundamental syntax, definitions, mathematical concepts.' }
  ];

  const dependencyChains = [
    {
      target: 'Deep Learning (PyTorch)',
      prerequisites: ['Python (L3+)', 'Statistics & Probability (L3+)', 'Machine Learning (L3+)'],
      status: 'BLOCKED',
      reason: 'Missing Level 3 Statistics & Probability.'
    },
    {
      target: 'Machine Learning Modeling',
      prerequisites: ['Python (L2+)', 'Pandas/NumPy (L2+)', 'Statistics & Probability (L2+)'],
      status: 'IN PROGRESS',
      reason: 'Statistics is at Level 2/5; ready for classical algorithms.'
    },
    {
      target: 'MLOps & Containerized Serving',
      prerequisites: ['Machine Learning (L3+)', 'Docker & Containerization (L2+)'],
      status: 'UPCOMING',
      reason: 'Requires completion of supervised model training first.'
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
                Cognitive Competency Matrix // Bloom's L1–L5
              </span>
              <span className="font-mono text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                12 Verified Vectors
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              SKILL INTELLIGENCE MATRIX
            </h1>
            <p className="text-sm text-[#475569] leading-relaxed">
              Standardized Bloom's Taxonomy assessment (Levels 1–5), multi-axis competency benchmarks, and prerequisite graph chains.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRoleModal}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">alt_route</span>
              <span>Target: {profile?.targetRole || 'Data Scientist'}</span>
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'matrix'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Competency Breakdown (1-5)
          </button>
          <button
            onClick={() => setActiveTab('dependencies')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'dependencies'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Prerequisite DAG Chains
          </button>
          <button
            onClick={() => setActiveTab('blooms')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'blooms'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Bloom's Taxonomy Framework
          </button>
        </div>
      </section>

      {/* Tab 1: Competency Breakdown */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competencies.map((comp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {comp.name}
                    {comp.verified && (
                      <span className="material-symbols-outlined text-xs text-emerald-600">verified</span>
                    )}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                    {comp.level} • {comp.blooms}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    comp.tag === 'Core Strength'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : comp.tag === 'Bottleneck'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : comp.tag === 'Prerequisite Blocked'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  {comp.tag}
                </span>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-slate-500 font-bold">MATURITY SCORE</span>
                  <span className="font-extrabold text-slate-900">{comp.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      comp.score >= 80 ? 'bg-emerald-500' : comp.score >= 50 ? 'bg-indigo-600' : 'bg-rose-500'
                    }`}
                    style={{ width: `${comp.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Prerequisite DAG Chains */}
      {activeTab === 'dependencies' && (
        <div className="space-y-4">
          {dependencyChains.map((chain, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-600">account_tree</span>
                  <h4 className="text-sm font-bold text-slate-900">
                    Target Node: {chain.target}
                  </h4>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    chain.status === 'BLOCKED'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : chain.status === 'IN PROGRESS'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {chain.status}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                  REQUIRED DIRECT PREREQUISITES:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {chain.prerequisites.map((p, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-mono text-[11px] font-semibold"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-600 mt-2 font-medium">
                  {chain.status === 'BLOCKED' ? '⚠️ Blocker: ' : 'ℹ️ '}
                  {chain.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Bloom's Taxonomy Framework */}
      {activeTab === 'blooms' && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 uppercase font-mono">
            5-Level Cognitive Complexity Scale (Bloom's Taxonomy)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            The platform does not merely measure if a student has seen a keyword. It validates deep cognitive competency from basic recall (Level 1) to strategic architectural synthesis (Level 5).
          </p>

          <div className="space-y-3 pt-2">
            {bloomsTaxonomyLevels.map((b, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                  {5 - idx}
                </span>
                <div>
                  <strong className="text-slate-900 block font-mono">{b.level}</strong>
                  <span className="text-[11px] text-slate-600 mt-0.5 block">{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
