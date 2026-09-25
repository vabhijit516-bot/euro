import React, { useState, useEffect } from 'react';

export default function SimulateRoleModal({ isOpen, onClose, onRoleSimulated, currentRole }) {
  const [careers, setCareers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/careers')
        .then((res) => res.json())
        .then((data) => {
          if (data.careers) {
            setCareers(data.careers);
            const current = data.careers.find((c) => c.title === currentRole);
            if (current) setSelectedId(current.id);
            else if (data.careers.length > 0) setSelectedId(data.careers[0].id);
          }
        })
        .catch(console.error);
    }
  }, [isOpen, currentRole]);

  if (!isOpen) return null;

  const handleSimulate = async () => {
    if (!selectedId) return;
    setLoading(true);
    try {
      const res = await fetch('/api/careers/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerId: selectedId }),
      });
      const data = await res.json();
      if (data.success) {
        onRoleSimulated(data.updatedProfile);
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedCareer = careers.find((c) => c.id === selectedId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined text-2xl">alt_route</span>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#0F172A]">Simulate Career Role Switch</h3>
              <p className="text-xs text-[#64748B]">
                Recalculate vector readiness score and skill gap matrices in real time.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] p-1.5 rounded-lg hover:bg-white"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-4 flex-1">
          <div>
            <label className="block text-xs font-mono uppercase text-[#64748B] font-bold mb-2">
              Select Target Career Track
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {careers.map((c) => {
                const isSelected = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedId(c.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500'
                        : 'border-[#E2E8F0] bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-[#0F172A] line-clamp-1">{c.title}</span>
                      <span className="text-[10px] font-mono font-extrabold text-indigo-600 bg-white px-1.5 py-0.5 rounded border border-indigo-100">
                        {c.matchScore}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                      <span>{c.compensation}</span>
                      <span className="text-emerald-700 font-semibold">{c.growthRate}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedCareer && (
            <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-indigo-700 font-bold">
                  Telemetry Impact Preview
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700">
                  {selectedCareer.domain}
                </span>
              </div>
              <p className="text-xs text-[#334155] leading-relaxed">
                {selectedCareer.description}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E2E8F0]">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#64748B]">Verified Competencies:</span>
                  <div className="text-xs font-bold text-emerald-700 mt-0.5">
                    {selectedCareer.verifiedSkills.join(', ')}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#64748B]">Projected Gaps:</span>
                  <div className="text-xs font-bold text-rose-600 mt-0.5">
                    {selectedCareer.missingSkills.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white text-sm font-semibold text-[#334155] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSimulate}
            disabled={loading}
            type="button"
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-all flex items-center gap-2"
          >
            {loading ? (
              <span>Calculating...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Apply Simulated Role</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
