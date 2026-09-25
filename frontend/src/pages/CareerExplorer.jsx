import React, { useState, useEffect } from 'react';

export default function CareerExplorer({ profile, onRoleSimulated }) {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('affinity');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [experienceLevel, setExperienceLevel] = useState('all');

  const categories = [
    'All',
    'Technology',
    'AI & Data',
    'Cybersecurity',
    'Cloud Architecture',
    'Product Management',
    'Business Analytics',
    'Fintech',
    'UI/UX Design',
    'DevOps & MLOps',
  ];

  const fetchCareers = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
    if (sortBy) params.append('sort', sortBy);

    fetch(`/api/careers?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.careers) {
          setCareers(data.careers);
          if (!selectedCareer && data.careers.length > 0) {
            setSelectedCareer(data.careers[0]);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCareers();
  }, [selectedCategory, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCareers();
  };

  const handleSimulateSwitch = async (careerId) => {
    try {
      const res = await fetch('/api/careers/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerId }),
      });
      const data = await res.json();
      if (data.success) {
        onRoleSimulated(data.updatedProfile);
        fetchCareers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-full overflow-hidden pb-12">
      {/* Ambient Light Background */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-indigo-100/60 blur-[100px]"></div>
      <div className="pointer-events-none absolute top-72 -left-20 h-80 w-80 rounded-full bg-sky-100/60 blur-[90px]"></div>

      {/* Header & Intelligence Search Deck */}
      <section className="flex flex-col gap-6 pt-4">
        {/* Title & Live Readout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] uppercase text-indigo-600 font-bold tracking-wider">
                Vector Space Engine // Dynamic Index
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
              <span className="font-mono text-[11px] text-slate-500 font-medium">
                Synced with 12 Verified Vector Embeddings
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl text-slate-900 tracking-tight font-extrabold">
              Explore Where Your Skills Can Take You
            </h1>
            <p className="text-base text-slate-600 mt-2">
              Discover high-growth careers matched against your existing 12 verified skills and potential readiness trajectory.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-xs">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-slate-400 font-bold">
                Active Vector Base
              </span>
              <span className="text-sm font-extrabold text-slate-900">
                {profile?.name || 'Alex Kumar'}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-indigo-600 font-bold">
                Match Confidence
              </span>
              <span className="text-sm font-extrabold text-indigo-600">94.8%</span>
            </div>
          </div>
        </div>

        {/* Natural Query Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full rounded-2xl bg-white border border-slate-200 p-2 shadow-xs"
        >
          <div className="flex flex-col md:flex-row items-center gap-3 p-1">
            <div className="relative flex items-center flex-1 w-full pl-2">
              <span className="material-symbols-outlined text-indigo-600 text-2xl mr-3">
                neurology
              </span>
              <input
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-base focus:outline-none"
                placeholder='Search a career, skill, or industry (e.g. "Data Scientist with Python and SQL", "Fintech Machine Learning")...'
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 border border-slate-200 px-2 py-1 rounded font-mono text-[10px] text-slate-500 font-semibold">
                <span>NATURAL AI PARSE</span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-lg">travel_explore</span>
                <span>Compute Trajectory</span>
              </button>
            </div>
          </div>

          {/* Filter Row & Telemetry Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 pt-2 pb-1 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                <span className="material-symbols-outlined text-slate-500 text-base">tune</span>
                <span className="font-mono text-[10px] text-slate-500 font-bold">SORT BY:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-indigo-600 font-mono text-[11px] font-bold focus:outline-none cursor-pointer"
                >
                  <option value="affinity">Match Affinity (Default)</option>
                  <option value="growth">3-Year Industry Velocity</option>
                  <option value="salary">Median Base Compensation</option>
                  <option value="gap">Smallest Skill Gap</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                <span className="material-symbols-outlined text-slate-500 text-base">layers</span>
                <span className="font-mono text-[10px] text-slate-500 font-bold">EXPERIENCE:</span>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="bg-transparent text-slate-800 font-mono text-[11px] font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">All Levels</option>
                  <option value="entry">Early Career (0-2y)</option>
                  <option value="mid">Mid-Senior (3-5y)</option>
                  <option value="lead">Principal / Lead (6y+)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                <span className="material-symbols-outlined text-slate-500 text-base">speed</span>
                <span className="font-mono text-[10px] text-slate-500 font-bold">READINESS:</span>
                <span className="font-mono text-[11px] text-indigo-600 font-bold">&gt; 50% Minimum</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Live Latency: 14ms (Quantum-Vector Cached)</span>
            </div>
          </div>
        </form>

        {/* Domain Categories: Horizontal Glow Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-indigo-100'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {cat === 'All' ? 'hub' : cat.includes('AI') ? 'psychology' : cat.includes('Cyber') ? 'security' : cat.includes('Cloud') ? 'cloud' : 'dataset'}
                </span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Workspace: Grid + Affinity Radar Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
        {/* Career Discovery Grid (8 Cols on XL) */}
        <section className="xl:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base text-slate-900 font-bold">Matched Roles</span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 font-mono text-[11px] text-indigo-700 font-bold">
                {careers.length} Target Paths Identified
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Indexed to User Vector: {profile?.vectorId || 'AK-9941'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careers.map((career) => {
              const isSelected = selectedCareer?.id === career.id;
              const isTarget = career.title === profile?.targetRole;
              const ringCircumference = 125.66;
              const ringOffset = ringCircumference * (1 - career.matchScore / 100);

              return (
                <article
                  key={career.id}
                  onClick={() => setSelectedCareer(career)}
                  className={`group relative flex flex-col justify-between rounded-2xl bg-white border p-5 shadow-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
                      : 'border-slate-200 hover:shadow-md hover:border-indigo-200'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    {/* Top Row: Badge & Circular Affinity Metric */}
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-indigo-600 px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                            {career.domain}
                          </span>
                          {isTarget && (
                            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                              Active Target
                            </span>
                          )}
                        </div>
                        <h2 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">
                          {career.title}
                        </h2>
                      </div>

                      {/* Glowing Indigo SVG Ring */}
                      <div className="relative flex items-center justify-center h-14 w-14 shrink-0">
                        <svg className="h-14 w-14 -rotate-90" viewBox="0 0 48 48">
                          <circle
                            className="text-slate-100"
                            cx="24"
                            cy="24"
                            fill="transparent"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <circle
                            className="text-indigo-600 transition-all duration-700"
                            cx="24"
                            cy="24"
                            fill="transparent"
                            r="20"
                            stroke="currentColor"
                            strokeDasharray={ringCircumference}
                            strokeDashoffset={ringOffset}
                            strokeLinecap="round"
                            strokeWidth="4"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-mono text-xs font-extrabold text-indigo-600">
                            {career.matchScore}%
                          </span>
                          <span className="font-mono text-[8px] text-slate-400 uppercase font-bold">
                            Match
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Complexity & Cognitive Tier */}
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">
                          Difficulty:
                        </span>
                        <span className="font-mono text-[10px] text-emerald-700 font-extrabold">
                          {career.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">
                          Thinking:
                        </span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`h-1.5 w-2 rounded-xs ${
                                i < career.complexityBars ? 'bg-indigo-600' : 'bg-slate-200'
                              }`}
                            ></span>
                          ))}
                        </div>
                        <span className="font-mono text-[10px] text-slate-800 font-bold ml-1">
                          0{career.complexityBars}/05
                        </span>
                      </div>
                    </div>

                    {/* Core Demanded Skills & Overlap */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-slate-500 font-bold">
                          Core Demanded Skills
                        </span>
                        <span className="font-mono text-[10px] text-indigo-600 font-bold">
                          {career.coreDemanded}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {career.verifiedSkills.map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 font-mono text-[10px] text-emerald-700 font-semibold flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-xs text-emerald-600">check</span>
                            {sk}
                          </span>
                        ))}
                        {career.missingSkills.slice(0, 2).map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 font-mono text-[10px] text-rose-700 font-medium flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-xs text-rose-500">priority_high</span>
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {career.description}
                    </p>
                  </div>

                  {/* Bottom Strip: Salary & Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                        Median Range
                      </span>
                      <div className="text-xs font-bold text-slate-900">{career.compensation}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSimulateSwitch(career.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-mono text-[11px] font-bold transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">alt_route</span>
                        <span>Simulate</span>
                      </button>
                      <a
                        href="/learning-path"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-[11px] font-bold transition-colors"
                      >
                        Path →
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Selected Role Affinity Radar & Trajectory Sidebar (4 cols) */}
        <aside className="xl:col-span-4 flex flex-col gap-4">
          {selectedCareer ? (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-4 sticky top-20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-indigo-600 font-bold">
                    Telemetry Drilldown
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 uppercase">
                    {selectedCareer.title}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700">
                  {selectedCareer.matchScore}% Fit
                </span>
              </div>

              {/* Compensation Breakdown */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                  Hiring &amp; Compensation Benchmark
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-extrabold text-slate-900">
                    {selectedCareer.compensation}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    {selectedCareer.growthRate} 3-Yr Growth
                  </span>
                </div>
                <span className="text-xs text-slate-500">{selectedCareer.hiringDemand}</span>
              </div>

              {/* Skills Analysis Breakdown */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-900">Verified Competencies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.verifiedSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm text-emerald-600">check</span>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-900">Gaps to Close:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.missingSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm text-rose-500">warning</span>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleSimulateSwitch(selectedCareer.id)}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">alt_route</span>
                  <span>Set as Active Career Target</span>
                </button>
                <a
                  href="/learning-path"
                  className="w-full py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base text-indigo-600">school</span>
                  <span>Explore Courses to Close Gaps</span>
                </a>
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
