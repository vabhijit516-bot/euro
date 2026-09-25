import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationCenterPopover({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const fetchNotifs = () => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (data.notifications) {
          setNotifications(data.notifications);
          setUnreadCount(data.unreadCount);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchNotifs();
  }, [isOpen]);

  const handleMarkRead = async (id) => {
    try {
      const res = await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.notifications) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = (item) => {
    handleMarkRead(item.id);
    if (item.actionRoute) {
      navigate(item.actionRoute);
    }
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600 text-lg">notifications</span>
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono">
            Reminders &amp; Alerts
          </h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-bold">
              {unreadCount} new
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-xs font-bold"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-4 transition-colors ${
              item.isRead ? 'bg-white' : 'bg-indigo-50/30'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
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
              <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
            </div>

            <h4 className="text-xs font-bold text-slate-900 mb-1">{item.title}</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5">
              {item.message}
            </p>

            {item.progress && (
              <div className="mb-2.5 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => handleAction(item)}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
              >
                <span>{item.actionText || 'View Details'}</span>
                <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>

              {!item.isRead && (
                <button
                  onClick={() => handleMarkRead(item.id)}
                  className="text-[10px] text-slate-400 hover:text-slate-600 font-mono"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
