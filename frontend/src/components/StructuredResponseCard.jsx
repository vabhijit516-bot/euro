import React, { useState } from 'react';

export default function StructuredResponseCard({ content, telemetry }) {
  const [showTelemetry, setShowTelemetry] = useState(false);

  // Parse 7 sections from standard markdown if present
  const parseSections = (text) => {
    if (!text || !text.includes('### 1. UNDERSTANDING')) {
      return null;
    }

    const sections = {};
    const regex = /### (\d)\. ([A-Z\s]+)\n([\s\S]*?)(?=(### \d\.|\Z))/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const title = match[2].trim();
      const body = match[3].trim();
      sections[title] = body;
    }
    return sections;
  };

  const parsed = parseSections(content);

  // Render markdown table for SKILL GAP
  const renderGapTable = (tableMarkdown) => {
    const lines = tableMarkdown.split('\n').filter(l => l.trim().startsWith('|'));
    if (lines.length < 3) return <p className="whitespace-pre-line text-xs">{tableMarkdown}</p>;

    const headers = lines[0].split('|').map(c => c.trim()).filter(Boolean);
    const rows = lines.slice(2).map(line => line.split('|').map(c => c.trim()).filter(Boolean));

    return (
      <div className="overflow-x-auto my-2 rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/80 font-mono text-[11px] text-slate-600 uppercase border-b border-slate-200">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="py-2 px-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => {
              const isDeficit = row.some(cell => cell.includes('Deficit') || cell.includes('CRITICAL'));
              return (
                <tr key={idx} className={isDeficit ? 'bg-rose-50/30' : 'bg-white'}>
                  {row.map((cell, cIdx) => {
                    const clean = cell.replace(/\*\*/g, '').replace(/`/g, '');
                    const isCritical = clean === 'CRITICAL';
                    const isHigh = clean === 'HIGH';
                    const isDeficitCell = clean.includes('Deficit');
                    const isMet = clean.includes('Strong') || clean.includes('Exact Match');

                    return (
                      <td key={cIdx} className="py-2 px-3">
                        {isCritical ? (
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold font-mono text-[10px]">
                            CRITICAL
                          </span>
                        ) : isHigh ? (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold font-mono text-[10px]">
                            HIGH
                          </span>
                        ) : isDeficitCell ? (
                          <span className="font-mono text-rose-600 font-semibold">{clean}</span>
                        ) : isMet ? (
                          <span className="font-mono text-emerald-600 font-semibold">{clean}</span>
                        ) : (
                          clean
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  if (!parsed) {
    return (
      <div className="whitespace-pre-line text-xs text-slate-800 leading-relaxed">
        {content}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Telemetry Quick Bar */}
      {telemetry && (
        <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-200">
          <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[10px] font-bold">
            Intent: {telemetry.intent}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-bold">
            Confidence: {telemetry.confidencePercent}%
          </span>
          {telemetry.blockersCount > 0 ? (
            <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-mono text-[10px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">block</span>
              {telemetry.blockersCount} Prerequisite Blocker(s)
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px] font-bold">
              ✅ Prerequisites Satisfied
            </span>
          )}

          <button
            onClick={() => setShowTelemetry(!showTelemetry)}
            className="ml-auto text-[10px] font-mono text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
          >
            {showTelemetry ? 'Hide 9-Stage Telemetry' : 'Inspect 9-Stage Pipeline'}
          </button>
        </div>
      )}

      {/* Expanded 9-Stage Telemetry Inspector */}
      {showTelemetry && telemetry && telemetry.stages && (
        <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] space-y-1.5 animate-fadeIn">
          <div className="text-emerald-400 font-bold pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>🧠 9-STAGE NLP PIPELINE EXECUTION TRACE</span>
            <span>Latency: {telemetry.latencyMs || 18}ms</span>
          </div>
          {telemetry.stages.map((st) => (
            <div key={st.stage} className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">Stage {st.stage}:</span>
              <span className="text-slate-300 font-semibold">{st.name}</span>
              <span className="text-emerald-400 ml-auto">[{st.status}]</span>
            </div>
          ))}
          {telemetry.blockers && telemetry.blockers.length > 0 && (
            <div className="p-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300 mt-2">
              ⚠️ <strong>Prerequisite Dependency Trigger:</strong>{' '}
              {telemetry.blockers[0].reason}
            </div>
          )}
        </div>
      )}

      {/* SECTION 1: UNDERSTANDING */}
      {parsed['UNDERSTANDING'] && (
        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100">
          <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-xs uppercase font-mono mb-1">
            <span className="material-symbols-outlined text-sm text-indigo-600">psychology</span>
            1. Understanding
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {parsed['UNDERSTANDING']}
          </p>
        </div>
      )}

      {/* SECTION 2: CURRENT STATUS */}
      {parsed['CURRENT STATUS'] && (
        <div>
          <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs uppercase font-mono mb-1">
            <span className="material-symbols-outlined text-sm text-slate-600">verified_user</span>
            2. Current Status
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {parsed['CURRENT STATUS']}
          </p>
        </div>
      )}

      {/* SECTION 3: SKILL GAP */}
      {parsed['SKILL GAP'] && (
        <div>
          <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs uppercase font-mono mb-1">
            <span className="material-symbols-outlined text-sm text-amber-600">analytics</span>
            3. Skill Gap Analysis
          </div>
          {renderGapTable(parsed['SKILL GAP'])}
        </div>
      )}

      {/* SECTION 4: RECOMMENDATION */}
      {parsed['RECOMMENDATION'] && (
        <div className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase font-mono mb-1">
            <span className="material-symbols-outlined text-sm text-amber-600">lightbulb</span>
            4. Strategic Recommendation
          </div>
          <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
            {parsed['RECOMMENDATION']}
          </p>
        </div>
      )}

      {/* SECTION 5: NEXT STEP */}
      {parsed['NEXT STEP'] && (
        <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200">
          <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs uppercase font-mono mb-1">
            <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
            5. Immediate Next Step
          </div>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">
            {parsed['NEXT STEP']}
          </p>
        </div>
      )}

      {/* SECTION 6: RESOURCES */}
      {parsed['RESOURCES'] && (
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs uppercase font-mono">
            <span className="material-symbols-outlined text-sm text-indigo-600">menu_book</span>
            6. Curated Learning Resources
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {parsed['RESOURCES']}
          </p>
        </div>
      )}

      {/* SECTION 7: PROJECT */}
      {parsed['PROJECT'] && (
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs uppercase font-mono">
            <span className="material-symbols-outlined text-sm text-indigo-600">code_blocks</span>
            7. Recommended Proof Project
          </div>
          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
            {parsed['PROJECT']}
          </p>
        </div>
      )}
    </div>
  );
}
