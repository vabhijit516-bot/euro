import React, { useState, useEffect } from 'react';
import WeeklyLearningRoadmapCard from '../components/WeeklyLearningRoadmapCard';
import JobMarketBenchmarkCard from '../components/JobMarketBenchmarkCard';

export default function Dashboard({ profile, onOpenRoleModal, onOpenAuditModal }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/overview')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching overview:', err);
        setLoading(false);
      });
  }, []);

  const readiness = profile?.readinessScore ?? data?.profile?.readinessScore ?? 72;
  const targetRole = profile?.targetRole ?? data?.profile?.targetRole ?? 'DATA SCIENTIST';
  const compensation = profile?.compensationBand ?? data?.profile?.compensationBand ?? '$135k – $165k';
  const openReqs = profile?.openReqs ?? data?.profile?.openReqs ?? '8.4k open reqs';

  // SVG Gauge calculation: circumference = 2 * PI * 68 = 427.25
  const circumference = 427.25;
  const dashoffset = circumference * (1 - readiness / 100);

  return (
    <div className="relative w-full">
      {/* Dynamic Ambient Subtle Backdrop */}
      <div className="absolute -top-12 left-1/4 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-48 right-10 w-80 h-80 bg-sky-50/70 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* 1. Header Greeting & Telemetry Control Bar */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-4 mb-6">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-full w-max shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="text-[11px] font-mono text-emerald-700 font-semibold uppercase tracking-wider">
              Neural Model Synchronized
            </span>
            <span className="text-[#CBD5E1] text-[11px] font-mono">•</span>
            <span className="text-[11px] font-mono text-[#64748B]">Last evaluated 12m ago</span>
          </div>

          <h1 className="text-3xl md:text-4xl text-[#0F172A] font-extrabold tracking-tight">
            Good morning, Alex.
          </h1>
          <p className="text-base text-[#475569] max-w-2xl">
            Here's where you stand on your autonomous trajectory to becoming a{' '}
            <span className="text-indigo-600 font-semibold">{targetRole}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-end">
          <button
            onClick={onOpenAuditModal}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] text-sm font-semibold hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-lg text-indigo-600 group-hover:rotate-12 transition-transform">
              download
            </span>
            <span>Download Career Audit</span>
          </button>
          <button
            onClick={onOpenRoleModal}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-xs hover:shadow-indigo-200 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-lg text-white group-hover:scale-110 transition-transform">
              alt_route
            </span>
            <span>Simulate Role Switch</span>
          </button>
        </div>
      </header>

      {/* 2. Main Hero Career Card */}
      <section className="relative rounded-2xl bg-white border border-[#E2E8F0] p-6 lg:p-8 shadow-xs overflow-hidden mb-6">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center relative z-10">
          {/* Target Role & Core Benchmark Metadata */}
          <div className="xl:col-span-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono uppercase text-indigo-600 font-bold tracking-widest">
                Target Architecture
              </span>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl text-[#0F172A] font-extrabold tracking-tight uppercase">
                  {targetRole}
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-[11px] font-mono text-indigo-700 font-bold">
                  L4 SENIOR ASPIRANT
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">
                  Compensation Band
                </span>
                <span className="text-base text-[#0F172A] font-bold mt-0.5">{compensation}</span>
                <span className="text-[11px] font-mono text-indigo-600 font-semibold mt-0.5">
                  Top 15% Percentile
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">
                  Market Urgency
                </span>
                <span className="text-base text-emerald-600 font-bold mt-0.5">High Demand</span>
                <span className="text-[11px] font-mono text-[#64748B] mt-0.5">{openReqs}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
              <span
                className="material-symbols-outlined text-indigo-600 text-xl shrink-0 mt-0.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lightbulb
              </span>
              <p className="text-xs text-[#334155] leading-relaxed">
                <span className="font-semibold text-indigo-900">Dynamic Insight:</span> You're progressing well. Your single highest leverage opportunity is{' '}
                <span className="text-indigo-700 font-semibold">
                  Machine Learning (Beginner → Advanced)
                </span>.
              </p>
            </div>
          </div>

          {/* Center: Circular Career Readiness Visualization */}
          <div className="xl:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6 p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                <circle
                  className="text-[#E2E8F0]"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="68"
                  stroke="currentColor"
                  strokeWidth="10"
                ></circle>
                <circle
                  className="text-indigo-600 transition-all duration-1000 ease-out"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="68"
                  stroke="currentColor"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashoffset}
                  strokeLinecap="round"
                  strokeWidth="10"
                ></circle>
                <circle
                  className="text-[#CBD5E1]"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="54"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">
                  Readiness
                </span>
                <span className="text-3xl font-extrabold text-[#0F172A] leading-none my-0.5">
                  {readiness}%
                </span>
                <span className="text-[10px] font-mono text-indigo-600 font-bold">VALIDATED</span>
              </div>
            </div>

            {/* Breakdown Mini Stats */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-[#475569]">Current Skills</span>
                <span className="text-[11px] font-mono font-semibold text-[#0F172A] bg-white border border-[#E2E8F0] px-2 py-0.5 rounded shadow-2xs">
                  12 Verified
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-[#475569]">Identified Gaps</span>
                <span className="text-[11px] font-mono font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  4 Critical
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-[#475569]">Production Proofs</span>
                <span className="text-[11px] font-mono font-semibold text-[#0F172A] bg-white border border-[#E2E8F0] px-2 py-0.5 rounded shadow-2xs">
                  3 Artifacts
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-[#475569]">Monthly Velocity</span>
                <span className="text-[11px] font-mono font-bold text-emerald-600 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-xs">trending_up</span>+8%
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="xl:col-span-3 flex flex-col justify-center gap-2.5">
            <a
              href="/learning-path"
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 shadow-xs transition-all text-center flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">rocket_launch</span>
              <span>Accelerate Readiness</span>
            </a>
            <button
              onClick={onOpenRoleModal}
              className="w-full py-3 px-4 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] text-sm hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all text-center flex items-center justify-center gap-2 font-semibold shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-base text-[#64748B]">analytics</span>
              <span>View Career Analysis</span>
            </button>
            <div className="flex items-center justify-between px-1 pt-1">
              <span className="text-[11px] font-mono text-[#64748B]">Next assessment gate:</span>
              <span className="text-[11px] font-mono text-[#0F172A] font-bold">Dec 14, 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Intelligence Overview Metrics (4 Light Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Metric 1: Verified Skills */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">arrow_upward</span>+2 this wk
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">
              Competency Engine
            </span>
            <h3 className="text-xl text-[#0F172A] font-bold">12 Verified</h3>
            <p className="text-xs text-[#64748B] mt-1">Python, SQL, Wrangling, +9 others</p>
          </div>
        </div>

        {/* Metric 2: Critical Gaps */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              High Priority
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">
              Skill Deficits
            </span>
            <h3 className="text-xl text-[#0F172A] font-bold">4 Critical</h3>
            <p className="text-xs text-[#64748B] mt-1">ML Algos, Deep Learning, MLOps</p>
          </div>
        </div>

        {/* Metric 3: Proof Projects */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <span className="material-symbols-outlined text-2xl">layers</span>
            </div>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              1 in progress
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">
              Proof Artifacts
            </span>
            <h3 className="text-xl text-[#0F172A] font-bold">3 Completed</h3>
            <p className="text-xs text-[#64748B] mt-1">Customer Churn, Sales ETL Pipeline</p>
          </div>
        </div>

        {/* Metric 4: Learning Momentum */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
              <span className="material-symbols-outlined text-2xl">speed</span>
            </div>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
              {profile?.hoursLogged ?? 18.5} hrs logged
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">
              Learning Momentum
            </span>
            <h3 className="text-xl text-[#0F172A] font-bold">
              {profile?.learningMomentumPercent ?? 56}% Roadmap
            </h3>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${profile?.learningMomentumPercent ?? 56}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Signature Skill Intelligence & Gap Telemetry Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Radar Telemetry Chart (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[11px] font-mono uppercase text-indigo-600 font-bold">
                Vector Evaluation
              </span>
              <h2 className="text-base text-[#0F172A] font-bold">Competency Radar</h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] font-medium">
              6 Attributes Analyzed
            </span>
          </div>

          {/* SVG Radar Chart */}
          <div className="relative w-full aspect-square max-w-sm mx-auto my-2 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 320 320">
              <defs>
                <linearGradient id="radarGlowLight" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.30"></stop>
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.10"></stop>
                </linearGradient>
              </defs>
              {/* Web Polygons */}
              <polygon
                className="text-[#E2E8F0]"
                fill="#F8FAFC"
                points="160,20 281,90 281,230 160,300 39,230 39,90"
                stroke="currentColor"
                strokeWidth="1.5"
              ></polygon>
              <polygon
                className="text-[#E2E8F0]"
                fill="#FFFFFF"
                points="160,55 251,107 251,212 160,265 69,212 69,107"
                stroke="currentColor"
                strokeWidth="1"
              ></polygon>
              <polygon
                className="text-[#E2E8F0]"
                fill="#F8FAFC"
                points="160,90 220,125 220,195 160,230 100,195 100,125"
                stroke="currentColor"
                strokeWidth="1"
              ></polygon>

              {/* Axis lines */}
              <line className="text-[#CBD5E1]" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="160" x2="160" y1="160" y2="20"></line>
              <line className="text-[#CBD5E1]" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="160" x2="281" y1="160" y2="90"></line>
              <line className="text-[#CBD5E1]" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="160" x2="281" y1="160" y2="230"></line>
              <line className="text-[#CBD5E1]" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="160" x2="160" y1="160" y2="300"></line>
              <line className="text-[#CBD5E1]" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="160" x2="39" y1="160" y2="230"></line>
              <line className="text-[#CBD5E1]" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="160" x2="39" y1="160" y2="90"></line>

              {/* Actual Profile Area */}
              <polygon
                fill="url(#radarGlowLight)"
                points="160,31 266,98 197,181 160,227 58,218 69,107"
                stroke="#4f46e5"
                strokeWidth="2.5"
              ></polygon>

              {/* High-Contrast Nodes on Vertices */}
              <circle className="animate-pulse" cx="160" cy="31" fill="#4f46e5" r="4.5" stroke="#FFFFFF" strokeWidth="1.5"></circle>
              <circle cx="266" cy="98" fill="#4f46e5" r="4.5" stroke="#FFFFFF" strokeWidth="1.5"></circle>
              <circle cx="197" cy="181" fill="#ef4444" r="4.5" stroke="#FFFFFF" strokeWidth="1.5"></circle>
              <circle cx="160" cy="227" fill="#f59e0b" r="4.5" stroke="#FFFFFF" strokeWidth="1.5"></circle>
              <circle cx="58" cy="218" fill="#4f46e5" r="4.5" stroke="#FFFFFF" strokeWidth="1.5"></circle>
              <circle cx="69" cy="107" fill="#4f46e5" r="4.5" stroke="#FFFFFF" strokeWidth="1.5"></circle>

              {/* Dimension Labels */}
              <text fill="#0F172A" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" textAnchor="middle" x="160" y="14">
                PROGRAMMING 92%
              </text>
              <text fill="#0F172A" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" textAnchor="start" x="285" y="88">
                DATA MANIP 88%
              </text>
              <text fill="#EF4444" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" textAnchor="start" x="285" y="235">
                AI / ML 31%
              </text>
              <text fill="#D97706" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" textAnchor="middle" x="160" y="315">
                STATS &amp; PROB 48%
              </text>
              <text fill="#0F172A" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" textAnchor="end" x="35" y="235">
                PROBLEM SOLVING 84%
              </text>
              <text fill="#0F172A" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" textAnchor="end" x="35" y="88">
                COMM 75%
              </text>
            </svg>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <span className="text-[11px] font-mono text-[#0F172A] font-semibold">
                Alex (Validated Profile)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]"></span>
              <span className="text-[11px] font-mono text-[#64748B]">Benchmark Median</span>
            </div>
          </div>
        </div>

        {/* Top Skills Bar Stack & Gap Comparative Matrix (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Top Skills Stack */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base text-[#0F172A] font-bold">Core Competency Inventory</h2>
              <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">
                Benchmarked to Senior L4
              </span>
            </div>

            {/* Skill 1: Python */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#0F172A] font-semibold flex items-center gap-2">
                  <span>Python</span>
                  <span className="px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-[10px] font-mono text-indigo-700 font-semibold">
                    Advanced
                  </span>
                </span>
                <span className="text-xs font-mono text-[#0F172A] font-bold">92%</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full w-[92%]"></div>
              </div>
            </div>

            {/* Skill 2: SQL */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#0F172A] font-semibold flex items-center gap-2">
                  <span>SQL &amp; Relational Schemas</span>
                  <span className="px-1.5 py-0.5 rounded bg-sky-50 border border-sky-100 text-[10px] font-mono text-sky-700 font-semibold">
                    Intermediate
                  </span>
                </span>
                <span className="text-xs font-mono text-[#0F172A] font-bold">76%</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div className="bg-sky-600 h-full rounded-full w-[76%]"></div>
              </div>
            </div>

            {/* Skill 3: Statistics */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#0F172A] font-semibold flex items-center gap-2">
                  <span>Probability &amp; Inferential Statistics</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[10px] font-mono text-amber-700 font-semibold">
                    Beginner
                  </span>
                </span>
                <span className="text-xs font-mono text-amber-700 font-bold">48%</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full w-[48%]"></div>
              </div>
            </div>

            {/* Skill 4: Machine Learning */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#0F172A] font-semibold flex items-center gap-2">
                  <span>Machine Learning &amp; Modeling</span>
                  <span className="px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-mono font-bold">
                    Critical Gap
                  </span>
                </span>
                <span className="text-xs font-mono text-rose-600 font-bold">31%</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full w-[31%]"></div>
              </div>
            </div>
          </div>

          {/* Comparative Skill Matrix */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase text-indigo-600 font-bold">
                  Gap Analysis Engine
                </span>
                <h2 className="text-base text-[#0F172A] font-bold">What's Between You and Your Career?</h2>
              </div>
              <span className="px-2 py-1 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-mono font-bold uppercase">
                Differential: -28%
              </span>
            </div>

            {/* Comparative Row: Priority 1 Machine Learning */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="text-sm text-[#0F172A] font-bold">
                    TOP PRIORITY: Machine Learning Algorithms
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#64748B] text-[11px] font-mono mt-1">
                  <span>
                    Current Profile: <strong className="text-rose-600">31% (Beginner)</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Requirement: <strong className="text-indigo-600 font-semibold">85% (Advanced)</strong>
                  </span>
                </div>
              </div>
              <a
                href="/learning-path"
                className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Start Closing Gap</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>

            {/* Secondary gaps summary inline */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col">
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">Gap #2</span>
                <span className="text-xs text-[#0F172A] font-semibold mt-0.5">
                  Deep Learning Frameworks
                </span>
                <span className="text-[11px] font-mono text-[#64748B] mt-1">
                  Deficit: <span className="text-rose-600 font-medium">-55%</span> • PyTorch/TensorFlow
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col">
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">Gap #3</span>
                <span className="text-xs text-[#0F172A] font-semibold mt-0.5">
                  MLOps &amp; Cloud Pipeline
                </span>
                <span className="text-[11px] font-mono text-[#64748B] mt-1">
                  Deficit: <span className="text-rose-600 font-medium">-40%</span> • Docker/FastAPI
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI Recommendation Insight Card ('CAREERAI INSIGHT') */}
      <section className="relative rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-sky-50/60 border border-indigo-100 p-6 lg:p-8 shadow-xs overflow-hidden mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0 p-3 rounded-xl bg-white border border-indigo-200 text-indigo-600 shadow-xs">
              <span className="material-symbols-outlined text-3xl">psychology</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
              </span>
            </div>
            <div className="flex flex-col gap-1 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase font-extrabold text-indigo-700 tracking-wider">
                  CAREERAI INSIGHT
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white border border-indigo-200 text-[10px] font-mono text-indigo-700 font-semibold">
                  Efficiency Optimization Engine
                </span>
              </div>
              <h3 className="text-base md:text-lg text-[#0F172A] font-bold">
                Completing Statistics before Machine Learning will improve your learning velocity by 35%.
              </h3>
              <p className="text-sm text-[#475569]">
                <span className="font-semibold text-[#0F172A]">Why:</span> You currently have a beginner-level probability &amp; statistics foundation (48%) that will directly hinder cost function intuition and gradient descent convergence comprehension.
              </p>
              <div className="inline-flex items-center gap-2 mt-1 text-[#0F172A]">
                <span className="material-symbols-outlined text-indigo-600 text-base">arrow_forward</span>
                <span className="text-xs font-mono font-semibold">Recommended Next Step:</span>
                <span className="text-xs font-mono text-indigo-700 font-bold">
                  Complete Probability &amp; Statistics Fundamentals (12-18 hrs)
                </span>
              </div>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-3 self-start lg:self-center">
            <a
              href="/learning-path"
              className="px-4 py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs hover:shadow-indigo-200 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>Add to My Roadmap</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Connected Career Roadmap Timeline */}
      <section className="p-6 lg:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className="text-[10px] font-mono uppercase text-indigo-600 font-bold tracking-wider">
              Target Pipeline
            </span>
            <h2 className="text-lg text-[#0F172A] font-bold">Connected Career Roadmap</h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>Completed (3)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>Active (1)
            </span>
            <span className="flex items-center gap-1.5 text-[#94A3B8] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#CBD5E1]"></span>Locked (4)
            </span>
          </div>
        </div>

        {/* Horizontal Scrollable Visual Timeline */}
        <div className="relative overflow-x-auto pb-4 pt-2">
          <div className="min-w-[880px] flex items-center justify-between relative px-4">
            {/* Connecting Architecture Lines */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-[#E2E8F0] -z-0"></div>
            <div className="absolute left-8 w-[38%] top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-0"></div>

            {/* Node 0: START */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xs text-xs font-mono font-bold">
                ●
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase mt-2">START</span>
              <span className="text-[10px] font-mono text-[#94A3B8]">Oct 2024</span>
            </div>

            {/* Node 1: Python */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center shadow-2xs">
                <span className="material-symbols-outlined text-lg font-bold">check</span>
              </div>
              <span className="text-xs text-[#0F172A] font-bold mt-2">Python Core</span>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">Verified 100%</span>
            </div>

            {/* Node 2: Statistics */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center shadow-2xs">
                <span className="material-symbols-outlined text-lg font-bold">check</span>
              </div>
              <span className="text-xs text-[#0F172A] font-bold mt-2">Statistics &amp; EDA</span>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">Verified 100%</span>
            </div>

            {/* Node 3: SQL */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center shadow-2xs">
                <span className="material-symbols-outlined text-lg font-bold">check</span>
              </div>
              <span className="text-xs text-[#0F172A] font-bold mt-2">Advanced SQL</span>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">Verified 100%</span>
            </div>

            {/* Node 4: Machine Learning (CURRENT FOCUS) */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <span className="material-symbols-outlined text-xl">cognition</span>
                <span className="absolute -inset-1 rounded-full bg-indigo-400/40 animate-ping pointer-events-none"></span>
              </div>
              <span className="text-xs text-indigo-700 font-bold mt-2">Machine Learning</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-bold uppercase mt-0.5">
                CURRENT
              </span>
            </div>

            {/* Node 5: Deep Learning */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#64748B] flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">schedule</span>
              </div>
              <span className="text-xs text-[#475569] font-medium mt-2">Deep Learning</span>
              <span className="text-[10px] font-mono text-[#94A3B8]">Est. Jan 2025</span>
            </div>

            {/* Node 6: Deployment & MLOps */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#94A3B8] flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">lock</span>
              </div>
              <span className="text-xs text-[#475569] font-medium mt-2">MLOps &amp; APIs</span>
              <span className="text-[10px] font-mono text-[#94A3B8]">Locked</span>
            </div>

            {/* Node 7: Portfolio Capstone */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#94A3B8] flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">lock</span>
              </div>
              <span className="text-xs text-[#475569] font-medium mt-2">Portfolio Capstone</span>
              <span className="text-[10px] font-mono text-[#94A3B8]">Locked</span>
            </div>

            {/* Node 8: CAREER READY */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shadow-2xs">
                <span className="material-symbols-outlined text-xl">flag</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-700 font-bold uppercase mt-2">
                CAREER READY ◎
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">Target: Mar 2025</span>
            </div>
          </div>
        </div>

        {/* Roadmap Telemetry Footer Bar */}
        <div className="mt-4 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">update</span>
            <span className="text-xs text-[#334155]">
              Current Module: <strong className="text-[#0F172A]">Supervised Learning &amp; Regularization (Unit 4 of 9)</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-[#64748B]">
              Next milestone deadline: <strong className="text-indigo-700 font-semibold">Nov 28</strong>
            </span>
            <a
              href="/learning-path"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 transition-colors"
            >
              Open Interactive Roadmap <span className="material-symbols-outlined text-sm">chevron_right</span>
            </a>
          </div>
        </div>
      </section>

      {/* Problem 3: Weekly Learning Roadmap & Dynamic Progress Tracker */}
      <section className="mb-6">
        <WeeklyLearningRoadmapCard />
      </section>

      {/* Problem 3: Live Job Market Requirements Benchmark */}
      <section className="mb-6">
        <JobMarketBenchmarkCard />
      </section>

      {/* 7. Context Visual Artifacts Showcase (3 Images Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Artifact 1 */}
        <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-xs flex flex-col group hover:shadow-md transition-shadow">
          <div className="relative h-44 w-full overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Data scientist workspace"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7-UrkN3egewqB3pHR0h6-mCHk9ygS0iScCGqjMvMD3e5AbwiZPW7nP6JFJh5G98nIK7vlPk6yxju1kRrpwgrIdIHwDAZAw8qbT63E68ZP6dArV6Ld_94L-LR-ulHt-fHccyohlSGaC0L4OOZ3o6qxJdETV6EYc37mpS6lfXtPBvc2xBr_sOdxvAoECPCmkx_mWIomlbZGzjhmX-jmVRsOP1x_rVrO_yitrzotj-RLmSv9whJFjb6l"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-mono text-indigo-700 border border-white font-bold shadow-2xs">
              Active Lab
            </span>
          </div>
          <div className="p-5 flex flex-col justify-between flex-1">
            <div>
              <h4 className="text-sm font-bold text-[#0F172A]">Lab #04: Gradient Descent Vector Space</h4>
              <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">
                Hands-on NumPy optimization sandbox evaluating convergence speed across varied learning rates.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
              <span className="text-[10px] font-mono text-[#94A3B8]">Estimated: 3.5 hrs</span>
              <a
                href="/learning-path"
                className="text-xs font-mono text-indigo-600 font-bold hover:text-indigo-800"
              >
                Resume Module →
              </a>
            </div>
          </div>
        </div>

        {/* Artifact 2 */}
        <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-xs flex flex-col group hover:shadow-md transition-shadow">
          <div className="relative h-44 w-full overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Neural network diagram"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXT103UoKkelJmhnA-7qvPyvrOY2wkjzIcTaZSJtY41kIjoxL9v66ceHkixHme-eZ-9t8OyQDxr1idyAcRk2bQoziFaLVcxp_SzZVvGY3RoQtMGa0pE9KJSXAIQEboBaMwy0WdnLA1MmLVJVZ6nketS4VK0kI7iqTxXIcjE9h_pv-aCs1ZVIISnCt3boia9rjTI53JZQ7xMgIwI8kiKqYNpzyRyTmRLon-ZPR2TApuYigUOk4MgFKz"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-mono text-emerald-700 border border-white font-bold shadow-2xs">
              Project Capstone
            </span>
          </div>
          <div className="p-5 flex flex-col justify-between flex-1">
            <div>
              <h4 className="text-sm font-bold text-[#0F172A]">Verified Proof: Multi-Class Churn Predictor</h4>
              <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">
                Production pipeline handling 1.2M rows with XGBoost and automated feature engineering validation.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
              <span className="text-[10px] font-mono text-[#94A3B8]">Peer Reviewed • Grade 98%</span>
              <span className="text-xs font-mono text-indigo-600 font-bold hover:text-indigo-800 cursor-pointer">
                Inspect Code →
              </span>
            </div>
          </div>
        </div>

        {/* Artifact 3 */}
        <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-xs flex flex-col group hover:shadow-md transition-shadow">
          <div className="relative h-44 w-full overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="AI coaching room"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkszr1jJpCFQYq2doqB1NAGOsn619qf7yK7REs5tasj5kOfuG-i32wHXCvljfBBebnlI9vl3-xac7qgIQ1G4T2FUzKF756w_yfdXllVnAwQaqj-nmLgzarit9-bD9ggsOTCEoiPXDEH5z523SAJAKZAFxdVOw8XkPyXlHLGZQ8Zf3Usy0f6l_QvlURFhnsBpT2CzxlK7rIoE1IsjeVQAQaMksnDSxj7SF711eVLbVZQWt8BBgDAYiW"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-mono text-sky-700 border border-white font-bold shadow-2xs">
              AI Coach
            </span>
          </div>
          <div className="p-5 flex flex-col justify-between flex-1">
            <div>
              <h4 className="text-sm font-bold text-[#0F172A]">Interview Readiness: Mock Technical Gate</h4>
              <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">
                Simulated live coding and ML system design assessment tailored to FAANG senior expectations.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
              <span className="text-[10px] font-mono text-[#94A3B8]">Next Slot: Friday 14:00</span>
              <a
                href="/ai-coach"
                className="text-xs font-mono text-indigo-600 font-bold hover:text-indigo-800"
              >
                Schedule Session →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
