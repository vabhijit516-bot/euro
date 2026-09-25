import React, { useState, useEffect } from 'react';

export default function LearningPath({ profile, onProfileUpdate }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [partnerFilter, setPartnerFilter] = useState('All');
  const [sortBy, setSortBy] = useState('vectorFit');
  const [expandedSyllabus, setExpandedSyllabus] = useState({});

  const partners = [
    'All',
    'DeepLearning.AI',
    'Stanford AI Lab',
    'Google Cloud',
    'OpenAI Academy',
    'Univ. Michigan',
    'IBM Research'
  ];

  const fetchCourses = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (partnerFilter && partnerFilter !== 'All') params.append('partner', partnerFilter);
    if (sortBy) params.append('sort', sortBy);

    fetch(`/api/courses?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.courses) setCourses(data.courses);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, [partnerFilter, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  const handleEnrollToggle = async (courseId) => {
    try {
      const res = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (data.success) {
        // Update local course list
        setCourses((prev) =>
          prev.map((c) => (c.id === courseId ? { ...c, enrolled: data.course.enrolled } : c))
        );
        if (onProfileUpdate) {
          onProfileUpdate({
            ...profile,
            learningMomentumPercent: data.learningMomentum,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSyllabus = (id) => {
    setExpandedSyllabus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* SECTION 1: HERO / ADAPTIVE INTELLIGENCE BANNER */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-xs mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF]/60 via-white/80 to-[#F8FAFC] pointer-events-none z-10"></div>
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Telemetry Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#C7D2FE] rounded-full self-start shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse"></span>
              <span className="font-mono text-[11px] text-[#4F46E5] uppercase font-bold tracking-wider">
                AI-Optimized Curriculum // Target: {profile?.targetRole || 'Data Scientist'} (L4 Senior)
              </span>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl lg:text-[40px] lg:leading-[1.15] text-[#0F172A] tracking-tight font-extrabold">
                Master the Exact Skills That Close Your Career Gaps.
              </h1>
              <p className="text-sm md:text-base text-[#475569] max-w-2xl mt-1 leading-relaxed">
                Discover 4,800+ accredited industry specializations and university credentials matched to your vector readiness score (<span className="text-[#4F46E5] font-bold">{profile?.readinessScore || 72}%</span>). Powered by real-time hiring benchmarks from OpenAI, Google, DeepLearning.AI, Stanford, and Microsoft.
              </p>
            </div>

            {/* ROI Intelligence Micro-Card */}
            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[#4F46E5] shrink-0">
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_graph
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0F172A]">
                    AI Recommended Fast-Track: Advanced ML Specialization
                  </span>
                  <span className="font-mono text-[11px] text-[#4F46E5] font-medium">
                    Estimated ROI: +$60,000 base compensation potential • 6 weeks to L4 readiness
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-mono text-[11px] font-bold whitespace-nowrap self-end sm:self-center">
                99.2% Vector Fit
              </span>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleEnrollToggle('crs-1')}
                className="px-5 py-3 rounded-xl bg-[#4F46E5] text-white text-xs font-bold shadow-md hover:bg-[#4338CA] hover:shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">bolt</span>
                <span>Auto-Enroll AI Recommended Path</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold transition-all shadow-2xs flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base text-[#64748B]">dataset</span>
                <span>Explore Catalog Matrix</span>
              </button>
            </div>
          </div>

          {/* Right Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-md border border-[#E2E8F0] relative group">
              <img
                alt="Tech laboratory visualization"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XBu6qNRZXcC0SDogmUFFGbQN4P9h_VpzxTzxeOBvI0BhOkt6r3VJY-FuKDbNfMJk9-61Dyv_19YYmd_1aEh2puiwGoKv03UfzSfJEmP6uzflCjLPDg0kJEqFfmvSxezkn-shgLt2x1_-s8lqmRUsKkeQjwgARZ08Zc3XLiFTL59L9ew7x--UMtopjyUKvAQZaiSoW3Q3LnAL954uLiLTADJHs45W3J-VSMEMyOS7CDQim-mKcF6EHGIIQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

              {/* Floating Telemetry HUD */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
                    <span className="material-symbols-outlined text-lg">hub</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-[#64748B] uppercase font-bold tracking-wider">
                      Cognitive Skill Weight
                    </span>
                    <span className="text-xs font-bold text-[#0F172A]">
                      Transformer Architectures &amp; MLOps
                    </span>
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-mono text-sm text-[#059669] font-extrabold">+18.4%</span>
                  <span className="font-mono text-[9px] text-[#64748B]">Readiness Lift</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PARTNER STRIP */}
      <section className="w-full flex flex-col gap-2 mb-8">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[11px] uppercase text-[#64748B] tracking-wider font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></span>
            Learn from industry pioneers &amp; top tier research faculties
          </span>
          <span className="font-mono text-[11px] text-[#94A3B8] hidden md:inline">
            350+ Global Institutions Verified
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-center justify-center gap-2 shadow-2xs">
            <span className="material-symbols-outlined text-[#0284C7] text-base">cloud_done</span>
            <span className="text-xs font-bold text-[#0F172A]">Google Cloud</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-center justify-center gap-2 shadow-2xs">
            <span className="material-symbols-outlined text-[#B91C1C] text-base">school</span>
            <span className="text-xs font-bold text-[#0F172A]">Stanford AI</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-center justify-center gap-2 shadow-2xs">
            <span className="material-symbols-outlined text-[#4F46E5] text-base">neurology</span>
            <span className="text-xs font-bold text-[#0F172A]">DeepLearning.AI</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-center justify-center gap-2 shadow-2xs">
            <span className="material-symbols-outlined text-[#2563EB] text-base">terminal</span>
            <span className="text-xs font-bold text-[#0F172A]">IBM Research</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-center justify-center gap-2 shadow-2xs">
            <span className="material-symbols-outlined text-[#0284C7] text-base">deployed_code</span>
            <span className="text-xs font-bold text-[#0F172A]">Microsoft</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-center justify-center gap-2 shadow-2xs">
            <span className="material-symbols-outlined text-[#047857] text-base">psychology</span>
            <span className="text-xs font-bold text-[#0F172A]">OpenAI Academy</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-center justify-center gap-2 shadow-2xs col-span-2 sm:col-span-1">
            <span className="material-symbols-outlined text-[#D97706] text-base">verified</span>
            <span className="text-xs font-bold text-[#0F172A]">Univ. Michigan</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTELLIGENT DISCOVERY SEARCH & TAXONOMY BAR */}
      <section
        id="catalog-section"
        className="w-full flex flex-col gap-4 mb-6 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs"
      >
        <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#94A3B8] pointer-events-none text-xl">
              travel_explore
            </span>
            <input
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] text-sm pl-11 pr-28 py-3 rounded-xl focus:outline-none focus:bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] transition-all"
              type="text"
              placeholder="Search PyTorch, Transformers, MLOps, Statistics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute right-3 px-2 py-0.5 rounded bg-[#EEF2FF] border border-[#C7D2FE] font-mono text-[10px] text-[#4F46E5] uppercase font-bold">
              Vector Search
            </span>
          </div>

          {/* Partner & Sort Filters */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#64748B] font-medium">Partner:</span>
              <select
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold py-2.5 px-3 rounded-lg focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                {partners.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#64748B] font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold py-2.5 px-3 rounded-lg focus:outline-none focus:border-[#4F46E5] cursor-pointer"
              >
                <option value="vectorFit">Skill Gap Priority (Highest Match)</option>
                <option value="rating">Course Rating (4.8+)</option>
                <option value="duration">Time to Completion</option>
              </select>
            </div>
          </div>
        </form>
      </section>

      {/* SECTION 4: COURSE CATALOG CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const isExpanded = !!expandedSyllabus[course.id];
          return (
            <article
              key={course.id}
              className="rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6 flex flex-col gap-3">
                {/* Header: Partner + Vector Fit Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ color: course.partnerColor }}
                    >
                      {course.partnerIcon}
                    </span>
                    <span className="text-xs font-bold text-[#0F172A]">{course.partner}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] font-mono text-[10px] font-bold">
                    {course.vectorFit}% Vector Fit
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-[#0F172A] leading-snug line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {course.roi}
                </p>

                {/* Duration & Hours */}
                <div className="flex items-center gap-4 text-xs font-mono text-[#64748B] py-1 border-y border-[#F1F5F9]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">menu_book</span>
                    {course.hoursPerWeek}
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <span className="material-symbols-outlined text-sm">star</span>
                    {course.rating}
                  </span>
                </div>

                {/* Skills Covered Pills */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono uppercase text-[#94A3B8] font-bold">
                    Competencies Covered
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {course.skillsCovered.map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-medium"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Syllabus Accordion */}
                {isExpanded && (
                  <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#334155] space-y-1.5 animate-fadeIn">
                    <span className="font-mono text-[10px] font-bold text-slate-700 uppercase">
                      Curriculum Modules:
                    </span>
                    <ul className="list-decimal pl-4 space-y-1 text-[11px]">
                      {course.syllabus.map((mod, i) => (
                        <li key={i}>{mod}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Strip: Accordion toggle & Enroll CTA */}
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleSyllabus(course.id)}
                  className="text-xs text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Hide Syllabus' : 'View Syllabus'}</span>
                  <span className="material-symbols-outlined text-sm">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleEnrollToggle(course.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                    course.enrolled
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {course.enrolled ? 'check_circle' : 'add_circle'}
                  </span>
                  <span>{course.enrolled ? 'Enrolled' : 'Enroll Now'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
