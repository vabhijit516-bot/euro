import React, { useState, useEffect } from 'react';
import NotificationCenterPopover from './NotificationCenterPopover';
import ResourceSearchModal from './ResourceSearchModal';
import SupabaseAuthModal from './SupabaseAuthModal';

export default function Header({ profile, onOpenRoleModal, onOpenAuditModal, onProfileSwitched }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [profiles, setProfiles] = useState([]);
  const [activeId, setActiveId] = useState('alex');

  const readiness = profile?.readinessScore || 72;
  const targetRole = profile?.targetRole || 'Data Scientist';

  useEffect(() => {
    fetch('/api/profiles')
      .then((res) => res.json())
      .then((data) => {
        if (data.profiles) setProfiles(data.profiles);
        if (data.activeStudentId) setActiveId(data.activeStudentId);
      })
      .catch(console.error);

    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (data.unreadCount !== undefined) setUnreadCount(data.unreadCount);
      })
      .catch(console.error);
  }, [profile]);

  // Keyboard shortcut ⌘K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState('');

  const handleSendProgressEmail = async () => {
    setIsSendingEmail(true);
    setEmailStatusMsg('');
    try {
      const res = await fetch('/api/progress/email-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'vabhijit516@gmail.com' })
      });
      const data = await res.json();
      if (data.success) {
        setEmailStatusMsg('Progress email sent to vabhijit516@gmail.com!');
        setTimeout(() => setEmailStatusMsg(''), 4500);
      }
    } catch (e) {
      console.error(e);
      setEmailStatusMsg('Error sending email');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleSwitchStudent = async (studentId) => {
    try {
      const res = await fetch('/api/profile/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId })
      });
      const data = await res.json();
      if (data.success && data.profile) {
        setActiveId(studentId);
        if (onProfileSwitched) onProfileSwitched(data.profile);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] z-40 flex items-center justify-between px-8 shadow-xs">
      {/* Global Search with ⌘K - Opens Section 8 Knowledge Retrieval */}
      <div className="flex items-center gap-6 flex-1 max-w-2xl">
        <div
          onClick={() => setIsSearchModalOpen(true)}
          className="relative flex items-center w-full max-w-sm cursor-pointer group"
        >
          <span className="material-symbols-outlined absolute left-3 text-[#94A3B8] group-hover:text-indigo-600 transition-colors pointer-events-none text-lg">
            search
          </span>
          <input
            readOnly
            className="w-full bg-[#F1F5F9] group-hover:bg-indigo-50/40 border border-transparent group-hover:border-indigo-200 text-[#0F172A] placeholder:text-[#94A3B8] text-sm pl-9 pr-12 py-1.5 rounded-lg cursor-pointer transition-all"
            placeholder="Search intelligence, curriculum, skills..."
            type="text"
          />
          <span className="absolute right-3 px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0] font-mono text-[10px] text-[#64748B] shadow-2xs">
            ⌘K
          </span>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
          <span className="material-symbols-outlined text-indigo-600 text-base">
            auto_awesome
          </span>
          <span className="font-mono text-[11px] text-[#475569] truncate">
            Insight: <span className="text-[#0F172A] font-semibold">{profile?.criticalGapsCount || 3} critical skill gaps identified</span>
          </span>
        </div>
      </div>

      {/* Right Telemetry Cluster */}
      <div className="flex items-center gap-3">
        {/* Target role indicator pill with interactive click to switch */}
        <button
          onClick={onOpenRoleModal}
          className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
          title="Click to simulate target career goal"
        >
          <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
          <span className="font-mono text-[11px] text-[#0F172A] font-semibold">
            {targetRole} ({readiness}% Ready)
          </span>
          <span className="material-symbols-outlined text-xs text-indigo-600">swap_horiz</span>
        </button>

        {/* Audit Report trigger */}
        <button
          onClick={onOpenAuditModal}
          className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-indigo-600 transition-colors"
          title="Official Career Audit Report"
        >
          <span className="material-symbols-outlined text-xl">description</span>
        </button>

        {/* Notification bell with Popover (Section 10) */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors relative flex items-center justify-center cursor-pointer"
            title="Study Reminders & Alerts"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            )}
          </button>

          <NotificationCenterPopover
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        {/* Supabase Auth & Login Button */}
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Sign In / Register with Supabase"
        >
          <span className="material-symbols-outlined text-sm">lock</span>
          <span>Supabase Auth</span>
        </button>

        {/* Email Progress Report to vabhijit516@gmail.com */}
        <button
          onClick={handleSendProgressEmail}
          disabled={isSendingEmail}
          className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          title="Email full progress report to vabhijit516@gmail.com"
        >
          <span className="material-symbols-outlined text-sm">{isSendingEmail ? 'sync' : 'mail'}</span>
          <span>{isSendingEmail ? 'Sending...' : 'Email Progress'}</span>
        </button>

        {/* Multi-Student Profile Switcher (Section 3 & Section 15 of Problem 3) */}
        <div className="flex items-center gap-2 pl-3 border-l border-[#E2E8F0]">
          <img
            alt={profile?.name || 'Alex Kumar'}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E2E8F0]"
            src={profile?.avatar || "https://lh3.googleusercontent.com/aida/AEtjO1UWB0ymMYniAJrp9yN7dTh9Znj0pzG8dUwilRdAeoMKU5jFjwCvb1fhSSehIsVFY3shdi_-MeNdYWiUi-xvVpsaH2mEDqZHXdfcQqNmz1oYPI7GoXTLGJEu6L0-9_tEB1G0xfYSjG6vDNSCWY2aL9BJp3LZMUMgE_2gX8vcnhqvZdb6mthRvyKl8bzK1RcJuYkh6-Jf6YcmWLekQgc5GE_noaxlfO8Tc6Jt6EP14-G6_4DfV-xxtBJ6mQ"}
          />
          <select
            value={activeId}
            onChange={(e) => handleSwitchStudent(e.target.value)}
            className="text-xs font-semibold text-[#0F172A] bg-transparent border-0 focus:outline-none cursor-pointer py-1"
            title="Switch Student Profile (Section 3)"
          >
            {profiles.length > 0 ? (
              profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.targetRole})
                </option>
              ))
            ) : (
              <option value="alex">Alex Kumar (Data Scientist)</option>
            )}
          </select>
        </div>
      </div>

      {/* Global Resource Search Modal */}
      <ResourceSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Supabase Authentication & Resend Modal */}
      <SupabaseAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          if (onProfileSwitched) {
            onProfileSwitched({
              ...profile,
              name: user.user_metadata?.name || user.email.split('@')[0],
              email: user.email,
              targetRole: user.user_metadata?.targetRole || 'Data Scientist'
            });
          }
        }}
      />
      {/* Email Dispatch Confirmation Toast */}
      {emailStatusMsg && (
        <div className="absolute top-16 right-8 mt-2 px-4 py-2.5 rounded-xl bg-indigo-900 text-white text-xs font-mono font-bold shadow-xl border border-indigo-700 flex items-center gap-2 animate-bounce z-50">
          <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
          <span>{emailStatusMsg}</span>
        </div>
      )}
    </header>
  );
}
