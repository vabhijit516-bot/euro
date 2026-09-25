import React from 'react';

export default function AnalyticsDashboard({ profile }) {
  const readiness = profile?.readinessScore || 72;
  const velocity = profile?.monthlyVelocity || '+8%';
  const momentum = profile?.learningMomentumPercent || 56;
  const hours = profile?.hoursLogged || 18.5;

  const weeklyVelocity = [
    { week: 'Week 1', hours: 4.5, gain: '+2.1% Readiness' },
    { week: 'Week 2', hours: 6.2, gain: '+3.4% Readiness' },
    { week: 'Week 3', hours: 5.0, gain: '+2.5% Readiness' },
    { week: 'Week 4 (Current)', hours: 2.8, gain: '+1.2% Readiness' }
  ];

  const percentileBenchmarks = [
    { metric: 'Algorithmic Problem Solving (LeetCode/DSA)', user: '84th Percentile', benchmark: 'Top 15% Standard' },
    { metric: 'Relational SQL & Query Optimization', user: '88th Percentile', benchmark: 'Top 20% Standard' },
    { metric: 'Python & Data Wrangling (Pandas/NumPy)', user: '92nd Percentile', benchmark: 'Top 10% Standard' },
    { metric: 'Machine Learning Formulation', user: '31st Percentile', benchmark: 'Top 15% Standard (Gap Bottleneck)' }
  ];

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Header */}
      <section className="relative w-full pt-4 pb-6 mb-6">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[11px] uppercase font-bold tracking-wider">
              Telemetry Analytics // Velocity &amp; Benchmarks
            </span>
            <span className="font-mono text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Real-Time Statistical Tracking
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            LEARNING VELOCITY &amp; ANALYTICS
          </h1>
          <p className="text-sm text-[#475569] leading-relaxed">
            Quantitative velocity metrics, MoM skill acquisition trajectory, and competitive candidate percentiles.
          </p>
        </div>
      </section>

      {/* KPI 4-Card Band */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 font-bold block">CAREER READINESS</span>
          <span className="text-2xl font-extrabold text-indigo-600 font-mono mt-1 block">{readiness}%</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">Top 15% Percentile</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 font-bold block">MONTHLY VELOCITY</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">{velocity}</span>
          <span className="text-[11px] text-slate-500 block mt-0.5">Month-over-Month Lift</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 font-bold block">HOURS LOGGED</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">{hours}h</span>
          <span className="text-[11px] text-slate-500 block mt-0.5">This Month</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 font-bold block">MOMENTUM SCORE</span>
          <span className="text-2xl font-extrabold text-emerald-600 font-mono mt-1 block">{momentum}%</span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">Active Sprint Cadence</span>
        </div>
      </div>

      {/* Detailed Analysis Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Sprint Hours */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono pb-2 border-b border-slate-100">
            Weekly Hours &amp; Readiness Velocity
          </h3>
          <div className="space-y-3">
            {weeklyVelocity.map((w, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{w.week}</span>
                  <span className="text-[11px] text-slate-500 font-mono">{w.hours} hours focused study</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[11px] font-bold border border-emerald-200">
                  {w.gain}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Percentiles */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono pb-2 border-b border-slate-100">
            Candidate Benchmark Percentiles vs Industry
          </h3>
          <div className="space-y-3">
            {percentileBenchmarks.map((b, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{b.metric}</span>
                  <span
                    className={`font-mono text-[11px] font-bold ${
                      b.user.includes('31st') ? 'text-rose-600' : 'text-indigo-600'
                    }`}
                  >
                    {b.user}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono block">
                  Target Benchmark: {b.benchmark}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
