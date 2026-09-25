import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ profile, onOpenRoleModal }) {
  const readiness = profile?.readinessScore || 72;
  const targetRole = profile?.targetRole || 'Data Scientist';

  const navItems = [
    { label: 'Overview', path: '/', icon: 'dashboard' },
    { label: 'My Career', path: '/my-career', icon: 'route' },
    { label: 'Skill Intelligence', path: '/skills', icon: 'psychology' },
    { label: 'Career Explorer', path: '/explorer', icon: 'explore' },
    { label: 'Learning Path', path: '/learning-path', icon: 'school' },
    { label: 'Projects', path: '/projects', icon: 'terminal' },
    { label: 'AI Coach', path: '/ai-coach', icon: 'smart_toy' },
  ];

  const telemetryItems = [
    { label: 'Progress Analytics', path: '/analytics', icon: 'query_stats' },
    { label: 'Resume Intelligence', path: '/resume', icon: 'description' },
    { label: 'Notifications', path: '/notifications', icon: 'notifications', badge: '3' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-[#E2E8F0] z-50 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className="px-6 pt-6 pb-4 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center p-0.5 border border-[#E2E8F0] bg-slate-50 shadow-xs">
              <img
                alt="CAREERAI Logo"
                className="h-7 w-7 object-contain rounded-lg"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XJHbS59b5oi5qcsUoe2KY5_wcJQZb0g_-oRo_ul5a1YNBdGGbHOW47fm6hdyP36UdmhjjVJl5uR52xPYlypB4qezOkHtxumz-1EbWyx3ZkOsut-6foyOVW9dAQ0sR8cs-gxsocHJ0Xlhq1wzyzRX6OmhZTN0ARRpQM-xejlvBqhGf7u3EmwDMkxu4JxOmDlluKsZ6zzuUd7ZBb8OBr4TYEcf4cliZOcKAJkq-DNBXEZ46W4j3p4ycg-Q"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-[#0F172A] tracking-tight">CAREERAI</span>
              <span className="text-xs text-[#64748B] font-medium">AI Career Intelligence</span>
            </div>
          </div>

          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-full self-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="text-[11px] font-mono text-emerald-700 uppercase font-semibold">
              Neural Engine v3.4 Active
            </span>
          </div>
        </div>

        <div className="px-4 py-1">
          <div className="h-[1px] w-full bg-[#E2E8F0]"></div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex flex-col gap-1 px-4 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100 shadow-xs'
                    : 'text-[#334155] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-xl ${
                      isActive ? 'text-indigo-600' : 'text-[#64748B]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-1">
          <div className="h-[1px] w-full bg-[#E2E8F0]"></div>
        </div>

        {/* Telemetry & System */}
        <div className="px-4 pt-2">
          <span className="text-[10px] font-mono uppercase text-[#94A3B8] px-3 font-bold tracking-wider">
            Telemetry &amp; System
          </span>
        </div>
        <nav className="flex flex-col gap-1 px-4 py-2">
          {telemetryItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-[#334155] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-[#64748B]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-mono text-[11px] font-semibold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Profile Strip at Bottom */}
      <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <img
              alt="Alex Kumar Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100"
              src={profile?.avatar || "https://lh3.googleusercontent.com/aida/AEtjO1UWB0ymMYniAJrp9yN7dTh9Znj0pzG8dUwilRdAeoMKU5jFjwCvb1fhSSehIsVFY3shdi_-MeNdYWiUi-xvVpsaH2mEDqZHXdfcQqNmz1oYPI7GoXTLGJEu6L0-9_tEB1G0xfYSjG6vDNSCWY2aL9BJp3LZMUMgE_2gX8vcnhqvZdb6mthRvyKl8bzK1RcJuYkh6-Jf6YcmWLekQgc5GE_noaxlfO8Tc6Jt6EP14-G6_4DfV-xxtBJ6mQ"}
            />
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-[#0F172A] truncate">
                {profile?.name || 'Alex Kumar'}
              </span>
              <span className="text-xs text-[#64748B] truncate">
                Target: {targetRole}
              </span>
            </div>
          </div>

          <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${readiness}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-mono text-indigo-600 font-bold">
              Readiness {readiness}%
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenRoleModal}
                className="text-[#64748B] hover:text-indigo-600 transition-colors p-1"
                title="Simulate Role Switch"
              >
                <span className="material-symbols-outlined text-lg">alt_route</span>
              </button>
              <button
                className="text-[#64748B] hover:text-[#0F172A] transition-colors p-1"
                title="Settings"
              >
                <span className="material-symbols-outlined text-lg">settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
