import React, { useState, useEffect } from 'react';

export default function JobMarketBenchmarkCard() {
  const [jobsData, setJobsData] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState('job-goog-ds');
  const [loading, setLoading] = useState(false);

  const fetchJobComparison = (jobId) => {
    setLoading(true);
    fetch(`/api/jobs/compare?jobId=${jobId || selectedJobId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJobsData(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobComparison(selectedJobId);
  }, [selectedJobId]);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-xl">work</span>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase font-mono">
              Live Job Market Benchmark (Free Job API)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Section 13 // Compare current abilities directly against real-world employer requirements
          </p>
        </div>

        {/* Employer Dropdown */}
        {jobsData && jobsData.availableJobs && (
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 focus:outline-none focus:border-indigo-600"
          >
            {jobsData.availableJobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.company} — {j.role}
              </option>
            ))}
          </select>
        )}
      </div>

      {jobsData && jobsData.comparison && (
        <div className="space-y-4">
          {/* Match Score Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[10px] font-bold">
                  {jobsData.comparison.company}
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {jobsData.comparison.role}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {jobsData.comparison.location} • Compensation: <strong className="text-slate-800">{jobsData.comparison.compensation}</strong>
              </span>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 font-bold block">EMPLOYER MATCH</span>
              <span className="text-2xl font-extrabold text-indigo-600 font-mono">
                {jobsData.comparison.matchPercent}%
              </span>
            </div>
          </div>

          {/* Satisfied vs Missing Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Satisfied */}
            <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-200 space-y-2">
              <span className="text-[11px] font-mono font-bold text-emerald-800 block pb-1 border-b border-emerald-200">
                SATISFIED REQUIREMENTS ({jobsData.comparison.satisfiedSkills.length})
              </span>
              <div className="space-y-1.5">
                {jobsData.comparison.satisfiedSkills.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-xs text-emerald-600">check</span>
                      {s.skill}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                      {s.userLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="p-3 rounded-xl bg-rose-50/40 border border-rose-200 space-y-2">
              <span className="text-[11px] font-mono font-bold text-rose-800 block pb-1 border-b border-rose-200">
                MISSING JOB REQUIREMENTS ({jobsData.comparison.missingSkills.length})
              </span>
              <div className="space-y-1.5">
                {jobsData.comparison.missingSkills.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1 font-medium text-rose-900">
                      <span className="material-symbols-outlined text-xs text-rose-600">close</span>
                      {m.skill}
                    </span>
                    <span className="text-[10px] font-mono text-rose-700 font-semibold">
                      Required: {m.requiredLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
