import React, { useState, useEffect } from 'react';

export default function WeeklyLearningRoadmapCard({ onProgressChanged }) {
  const [learningPlan, setLearningPlan] = useState([]);
  const [skillTracker, setSkillTracker] = useState([]);
  const [overallProgress, setOverallProgress] = useState(40);
  const [loading, setLoading] = useState(false);

  const fetchPlan = () => {
    fetch('/api/learning-plan')
      .then((res) => res.json())
      .then((data) => {
        if (data.learningPlan) setLearningPlan(data.learningPlan);
        if (data.skillTracker) setSkillTracker(data.skillTracker);
        if (data.overallProgressPercent !== undefined) {
          setOverallProgress(data.overallProgressPercent);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const handleStatusToggle = async (taskId, currentStatus) => {
    let nextStatus = 'in_progress';
    if (currentStatus === 'not_started') nextStatus = 'in_progress';
    else if (currentStatus === 'in_progress') nextStatus = 'completed';
    else nextStatus = 'not_started';

    try {
      const res = await fetch(`/api/learning-plan/task/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json();
      if (data.success) {
        setLearningPlan(data.learningPlan);
        setSkillTracker(data.skillTracker);
        setOverallProgress(data.overallProgressPercent);
        if (onProgressChanged) onProgressChanged(data.overallProgressPercent);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress & Skill Breakdown Bars (Section 9 of Problem 3) */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 text-xl">trending_up</span>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase font-mono">
                Skill Progress Tracker &amp; Velocity
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Section 9 // Real-time competency maturation based on completed tasks
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500">OVERALL PROGRESS:</span>
            <span className="text-xl font-extrabold text-indigo-600 font-mono">
              {overallProgress}%
            </span>
          </div>
        </div>

        {/* Individual Skill Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillTracker.map((sk, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  {sk.name}
                  {sk.verified && (
                    <span className="material-symbols-outlined text-xs text-emerald-600">verified</span>
                  )}
                </span>
                <span className="font-bold text-indigo-600">{sk.progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${sk.progressPercent}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Level: {sk.level}</span>
                <span>{sk.verified ? 'Verified Proficiency' : 'In Progress'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Week-by-Week Learning Roadmap (Section 7 of Problem 3) */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 text-xl">event_upcoming</span>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase font-mono">
                Weekly Personalized Learning Plan
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Topic, Resource, Duration, Difficulty, Hands-on Task, Project &amp; 1-Click Calendar Sync
            </p>
          </div>
          <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
            6-Week Adaptive Sequence
          </span>
        </div>

        <div className="space-y-3">
          {learningPlan.map((task) => {
            const isCompleted = task.status === 'completed';
            const isInProgress = task.status === 'in_progress';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all text-xs space-y-3 ${
                  isCompleted
                    ? 'bg-emerald-50/20 border-emerald-200'
                    : isInProgress
                    ? 'bg-indigo-50/20 border-indigo-200 ring-1 ring-indigo-100'
                    : 'bg-white border-slate-200'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[10px] font-bold">
                      WEEK {task.weekNumber}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{task.title}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Pill Toggle */}
                    <button
                      onClick={() => handleStatusToggle(task.id, task.status)}
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isInProgress
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                      title="Click to cycle status: Not Started -> In Progress -> Completed"
                    >
                      <span className="material-symbols-outlined text-xs">
                        {isCompleted ? 'check_circle' : isInProgress ? 'pending' : 'radio_button_unchecked'}
                      </span>
                      <span>
                        {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
                      </span>
                    </button>

                    {/* Calendar Sync Button (Section 13) */}
                    <a
                      href={`/api/calendar/export/${task.id}`}
                      download={`CareerAI_Study_${task.id}.ics`}
                      className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors"
                      title="Schedule Study Session (Download .ics Calendar Event)"
                    >
                      <span className="material-symbols-outlined text-base">calendar_add_on</span>
                    </a>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <strong className="text-slate-800 block">📚 Curated Resource:</strong>
                    <a
                      href={task.resourceLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline font-medium block truncate"
                    >
                      {task.resource}
                    </a>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <strong className="text-slate-800 block">⏱ Commitment &amp; Difficulty:</strong>
                    <span>{task.duration} • <span className="font-semibold text-indigo-700">{task.difficulty}</span></span>
                  </div>
                </div>

                {/* Practice Task & Project */}
                <div className="space-y-1.5 text-[11px] pt-1">
                  <p className="text-slate-700">
                    <strong className="text-slate-900 font-mono text-[10px]">PRACTICE TASK:</strong> {task.practiceTask}
                  </p>
                  <p className="text-slate-700">
                    <strong className="text-slate-900 font-mono text-[10px]">PROOF PROJECT:</strong> {task.projectIdea}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
