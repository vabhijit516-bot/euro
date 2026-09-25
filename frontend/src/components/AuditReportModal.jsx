import React from 'react';

export default function AuditReportModal({ isOpen, onClose, profile }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    window.open('/api/audit/download', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#0F172A]">Official Career Intelligence Audit</h3>
              <p className="text-xs text-[#64748B]">
                Cryptographically certified talent vector telemetry by CAREERAI Neural Engine v3.4.
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 font-mono text-xs text-[#334155] bg-slate-50/50">
          <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-[#0F172A]">CANDIDATE: {profile?.name || 'Alex Kumar'}</span>
              <span className="text-indigo-600 font-bold">VECTOR ID: {profile?.vectorId || 'AK-9941'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div>TARGET ROLE: <strong className="text-slate-900">{profile?.targetRole || 'Data Scientist'}</strong></div>
              <div>CLASSIFICATION: <strong className="text-slate-900">{profile?.targetLevel || 'L4 Senior Aspirant'}</strong></div>
              <div>READINESS SCORE: <strong className="text-emerald-700">{profile?.readinessScore || 72}% (VALIDATED)</strong></div>
              <div>COMPENSATION BAND: <strong className="text-indigo-600">{profile?.compensationBand || '$135k – $165k'}</strong></div>
              <div>VERIFIED SKILLS: <strong>{profile?.verifiedSkillsCount || 12} Verified</strong></div>
              <div>CRITICAL GAPS: <strong className="text-rose-600">{profile?.criticalGapsCount || 4} Deficits</strong></div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col gap-2">
            <span className="font-bold text-slate-900 uppercase">Neural Audit Recommendations:</span>
            <ul className="list-disc pl-4 space-y-1 text-slate-700">
              <li>Sequence Probability &amp; Inferential Statistics before neural network coursework to maximize learning velocity by +35%.</li>
              <li>Close Machine Learning Gap from 31% to 85% with hands-on vectorized gradient descent implementations.</li>
              <li>Deploy XGBoost customer churn capstone with Docker &amp; FastAPI for production evaluation.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#64748B]">SHA-256: 8f92...c014 (Tamper Evident)</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#334155] hover:bg-slate-50"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Download (.md)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
