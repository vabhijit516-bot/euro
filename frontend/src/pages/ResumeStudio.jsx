import React, { useState, useEffect } from 'react';

export default function ResumeStudio({ profile, onProfileUpdate }) {
  const [samples, setSamples] = useState(null);
  const [selectedSampleKey, setSelectedSampleKey] = useState('arun');
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState(profile?.targetRole || 'Full Stack Developer');
  const [parsing, setParsing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [synced, setSynced] = useState(false);

  // Fetch sample resumes on mount
  useEffect(() => {
    fetch('/api/resume/samples')
      .then((res) => res.json())
      .then((data) => {
        if (data.samples) {
          setSamples(data.samples);
          setResumeText(data.samples.arun.text);
          setTargetRole(data.samples.arun.targetCareer);
        }
      })
      .catch(console.error);
  }, []);

  const handleSelectSample = (key) => {
    setSelectedSampleKey(key);
    if (samples && samples[key]) {
      setResumeText(samples[key].text);
      setTargetRole(samples[key].targetCareer);
      setAnalysisResult(null);
      setSynced(false);
    }
  };

  const handleParseResume = async () => {
    if (!resumeText.trim()) return;
    setParsing(true);
    setSynced(false);

    try {
      const res = await fetch('/api/resume/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, targetRole })
      });
      const data = await res.json();
      if (data.result) {
        setAnalysisResult(data.result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setParsing(false);
    }
  };

  const handleSyncToProfile = async () => {
    if (!analysisResult) return;
    try {
      const res = await fetch('/api/resume/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          extractedSkills: analysisResult.extractedSkills,
          readinessScore: analysisResult.readinessScore,
          targetRole
        })
      });
      const data = await res.json();
      if (data.profile && onProfileUpdate) {
        onProfileUpdate(data.profile);
        setSynced(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Header Band */}
      <section className="relative w-full pt-4 pb-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[11px] uppercase font-bold tracking-wider">
                Document Intelligence // Section 4 &amp; 5
              </span>
              <span className="font-mono text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Skill Extraction Active
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              RESUME &amp; DOCUMENT AI STUDIO
            </h1>
            <p className="text-sm text-[#475569] leading-relaxed">
              Upload or paste your resume, CV, or project documents. The AI automatically identifies your skills, explains <em>why</em> each proficiency was detected, and computes your exact skill gaps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleParseResume}
              disabled={parsing || !resumeText.trim()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
            >
              <span className={`material-symbols-outlined text-base ${parsing ? 'animate-spin' : ''}`}>
                {parsing ? 'sync' : 'auto_awesome'}
              </span>
              <span>{parsing ? 'Analyzing Document...' : 'Run AI Skill Analysis'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid: Input Column & Results Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Sample Selector & Resume Editor */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Preset Sample Picker */}
          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                Select Test Student Resume
              </span>
              <span className="text-[10px] font-mono text-indigo-600 font-bold">Problem 3 Profiles</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectSample('arun')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedSampleKey === 'arun'
                    ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-100'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block">Arun</span>
                <span className="text-[10px] text-slate-500 block">Full Stack Dev</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectSample('rahul')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedSampleKey === 'rahul'
                    ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-100'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block">Rahul</span>
                <span className="text-[10px] text-slate-500 block">Software Dev</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectSample('alex')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedSampleKey === 'alex'
                    ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-100'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block">Alex Kumar</span>
                <span className="text-[10px] text-slate-500 block">Data Scientist</span>
              </button>
            </div>
          </div>

          {/* Target Career & Document Editor */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 uppercase font-mono">
                Target Job Role / Career Goal
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-indigo-600 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 uppercase font-mono">
                Resume Document Content (Text / Project Evidence)
              </label>
              <textarea
                rows={14}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text, project descriptions, or certificates here..."
                className="w-full bg-slate-50 border border-slate-200 text-xs p-3.5 rounded-xl font-mono focus:outline-none focus:border-indigo-600 text-slate-800 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Extraction & Gap Analysis */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {analysisResult ? (
            <div className="space-y-6">
              {/* Summary Banner */}
              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-xl">task_alt</span>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Document Analysis Complete: {analysisResult.candidateName}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Target: <strong className="text-slate-800">{analysisResult.targetCareer}</strong> • Detected {analysisResult.extractedSkillsCount} verified skills
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">CAREER READINESS</span>
                    <span className="text-xl font-extrabold text-indigo-600">
                      {analysisResult.readinessScore}%
                    </span>
                  </div>

                  <button
                    onClick={handleSyncToProfile}
                    disabled={synced}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      synced
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {synced ? 'check' : 'sync'}
                    </span>
                    <span>{synced ? 'Synced to Profile' : 'Apply to Profile'}</span>
                  </button>
                </div>
              </div>

              {/* Section 5: AI Skill Assessment with Explainability */}
              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600 text-lg">psychology</span>
                    <h3 className="text-xs font-bold text-slate-900 uppercase font-mono">
                      AI Skill Assessment &amp; Explainable Rationale
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {analysisResult.extractedSkills.length} Detected
                  </span>
                </div>

                <div className="space-y-2.5">
                  {analysisResult.extractedSkills.map((sk, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{sk.name}</span>
                          <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[10px] font-bold">
                            {sk.level}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Score: {sk.score}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed italic">
                        💡 <strong>Why AI identified this:</strong> {sk.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 6: Skill Gap Detection */}
              <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-lg">tune</span>
                    <h3 className="text-xs font-bold text-slate-900 uppercase font-mono">
                      Skill Gap Matrix ({analysisResult.targetCareer})
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-rose-600 font-bold">
                    {analysisResult.missingSkills.length} Deficits Found
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Present Skills */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-emerald-700 font-bold block pb-1 border-b border-emerald-100">
                      STUDENT HAS (✓ SATISFIED)
                    </span>
                    {analysisResult.presentSkills.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-emerald-900 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                          {p.skill}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-700">
                          {p.studentLevel}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Missing Skills */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-rose-700 font-bold block pb-1 border-b border-rose-100">
                      SKILL GAPS (✗ MISSING)
                    </span>
                    {analysisResult.missingSkills.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-rose-900 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-rose-600">cancel</span>
                          {m.skill}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-rose-700">
                          Required: {m.requiredLevel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prioritized Action Roadmap */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-slate-800 block uppercase font-mono">
                    Prioritized Next Steps to Close Gaps
                  </span>
                  {analysisResult.prioritizedGaps.map((g, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900">{g.skill}</strong>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold bg-rose-100 text-rose-800">
                            {g.priority} Priority
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{g.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">document_scanner</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Ready to Analyze Resume &amp; Documents
              </h3>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                Click <strong>"Run AI Skill Analysis"</strong> above to extract competencies, generate explainable evidence, detect skill deficits, and calculate readiness for <strong>{targetRole}</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
