import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'REMINDERS' | 'PREREQUISITES' | 'DEADLINES'
  const navigate = useNavigate();

  const fetchNotifs = () => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (data.notifications) setNotifications(data.notifications);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      const res = await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.notifications) setNotifications(data.notifications);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotifs = notifications.filter((item) => {
    if (filter === 'REMINDERS') return item.type === 'REMINDER';
    if (filter === 'PREREQUISITES') return item.type === 'PREREQUISITE_ALERT';
    if (filter === 'DEADLINES') return item.type === 'PROJECT_DEADLINE';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Header */}
      <section className="relative w-full pt-4 pb-6 mb-6">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[11px] uppercase font-bold tracking-wider">
              Reminder System // Section 10
            </span>
            <span className="font-mono text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            NOTIFICATIONS &amp; STUDY REMINDERS
          </h1>
          <p className="text-sm text-[#475569] leading-relaxed">
            Automated alerts for planned study sessions, incomplete courses, upcoming portfolio gates, and prerequisite warnings.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {['ALL', 'REMINDERS', 'PREREQUISITES', 'DEADLINES'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-colors cursor-pointer ${
                filter === f
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Notifications List */}
      <div className="space-y-4 max-w-4xl">
        {filteredNotifs.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all ${
              item.isRead
                ? 'bg-white border-slate-200 shadow-xs'
                : 'bg-indigo-50/20 border-indigo-200 ring-1 ring-indigo-100 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    item.priority === 'HIGH'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : item.priority === 'MEDIUM'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.type}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{item.timestamp}</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.message}</p>

            {item.progress && (
              <div className="mb-3 max-w-sm">
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span>Current Task Progress</span>
                  <span className="font-bold text-indigo-600">{item.progress}%</span>
                </div>
                <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <button
                onClick={() => {
                  handleMarkRead(item.id);
                  if (item.actionRoute) navigate(item.actionRoute);
                }}
                className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
              >
                <span>{item.actionText}</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>

              {!item.isRead && (
                <button
                  onClick={() => handleMarkRead(item.id)}
                  className="text-slate-400 hover:text-slate-600 font-mono text-[11px]"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
