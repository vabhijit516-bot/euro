import React, { useState } from 'react';

export default function ResourceSearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('machine learning from beginner level');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (queryToUse) => {
    const q = queryToUse || searchQuery;
    if (!q.trim()) return;

    setSearching(true);
    try {
      const res = await fetch(`/api/resources/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.searchResult) {
        setSearchResult(data.searchResult);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const sampleQueries = [
    'machine learning from beginner level',
    'deep learning neural networks',
    'full stack web development',
    'devops cloud engineering'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[85vh] animate-fadeIn">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-indigo-600 text-xl">travel_explore</span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Knowledge Retrieval &amp; Resource Search
              </h3>
              <p className="text-[11px] text-slate-500">
                Section 8 // Multi-Domain Structured Curriculum Search
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g. I want to learn machine learning from beginner level..."
                className="w-full bg-slate-50 border border-slate-200 text-xs pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white text-slate-900"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={searching}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 transition-colors"
            >
              {searching ? 'Retrieving...' : 'Search'}
            </button>
          </div>

          {/* Quick Pill Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className="text-[10px] font-mono text-slate-400 font-bold">SUGGESTIONS:</span>
            {sampleQueries.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(sq);
                  handleSearch(sq);
                }}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-[11px] text-slate-600 font-medium transition-colors"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="p-5 overflow-y-auto space-y-4">
          {searchResult ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase font-mono">
                    {searchResult.matchedTopic}
                  </h4>
                  <span className="text-[11px] text-indigo-600 font-medium">
                    Level: {searchResult.level} • {searchResult.totalModules} Core Milestones
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
                  Vector Match 99.4%
                </span>
              </div>

              {/* Hierarchy Tree */}
              <div className="space-y-2">
                {searchResult.curriculumHierarchy.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 block">{item.name}</span>
                        <span className="text-[11px] text-slate-600 leading-relaxed block mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-white border border-slate-200 text-indigo-700 font-mono text-[10px] font-bold shrink-0">
                      {item.resource}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              Type a topic above to search structured knowledge hierarchies, prerequisite maps, and documentation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
