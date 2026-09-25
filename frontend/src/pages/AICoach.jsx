import React, { useState, useEffect, useRef } from 'react';
import ModelTrainerModal from '../components/ModelTrainerModal';
import StructuredResponseCard from '../components/StructuredResponseCard';

export default function AICoach({ profile, onOpenAuditModal }) {
  const [messages, setMessages] = useState([]);
  const [savedMemory, setSavedMemory] = useState([]);
  const [activeContext, setActiveContext] = useState(null);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);
  const [modelMetrics, setModelMetrics] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendProgressEmail = async () => {
    setIsSendingEmail(true);
    setEmailStatusMsg('');
    try {
      const res = await fetch('/api/progress/email-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'vabhijit516@gmail.com' }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailStatusMsg('Progress report email dispatched to vabhijit516@gmail.com!');
        setTimeout(() => setEmailStatusMsg(''), 5000);
      }
    } catch (e) {
      console.error(e);
      setEmailStatusMsg('Failed to send progress email');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const fetchHistory = () => {
    fetch('/api/coach/messages')
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) setMessages(data.messages);
        if (data.savedMemory) setSavedMemory(data.savedMemory);
        if (data.activeContext) setActiveContext(data.activeContext);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const prompt = textToSend || inputText;
    if (!prompt.trim() || loading) return;

    setInputText('');
    setLoading(true);

    // Optimistic user message
    const tempUserMsg = {
      id: `temp-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: prompt,
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const res = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [...prev.filter((m) => m.id !== tempUserMsg.id), tempUserMsg, data.message]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearContext = async () => {
    try {
      const res = await fetch('/api/coach/clear', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setMessages(data.chatHistory);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const quickPrompts = [
    'Can I start Deep Learning now or do I need prerequisites?',
    'AI Engineer or Data Scientist: which one should I choose?',
    'What is my biggest skill gap for Data Scientist?',
    'Generate a 30-day sprint plan to close my ML deficit',
    'How do I crack the FAANG ML system design round?',
    'Evaluate my resume ATS alignment for Senior L4 Data Scientist',
    'What career can I choose with my background?'
  ];

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Command Header & Telemetry Band */}
      <section className="relative w-full pt-4 pb-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] font-mono text-[11px] uppercase font-bold tracking-wider">
                Advisory Layer // Live Neural Link
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono text-[11px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                OpenAI GPT-4o API
              </span>
              <span className="px-2.5 py-0.5 rounded bg-sky-50 border border-sky-300 text-sky-800 font-mono text-[11px] font-bold">
                Recipient: vabhijit516@gmail.com
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              AI CAREER COACH
            </h1>
            <p className="text-sm text-[#475569] leading-relaxed">
              Powered by OpenAI GPT-4o, Custom RAG Multi-Domain Knowledge Base, Bloom's L1-L5 Thinking Levels, and Skill Dependency Graphs.
            </p>
          </div>

          {/* Action Cluster */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            <button
              onClick={handleSendProgressEmail}
              disabled={isSendingEmail}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
              title="Email progress and career roadmap to vabhijit516@gmail.com"
            >
              <span className="material-symbols-outlined text-base">{isSendingEmail ? 'sync' : 'forward_to_inbox'}</span>
              <span>{isSendingEmail ? 'Sending...' : 'Email Progress to vabhijit516@gmail.com'}</span>
            </button>
            <button
              onClick={() => setIsTrainerModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-base">model_training</span>
              <span>Train Model Lab</span>
            </button>
            <button
              onClick={handleClearContext}
              className="px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#334155] text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <span className="material-symbols-outlined text-base text-[#64748B]">layers_clear</span>
              <span>Clear Context</span>
            </button>
            <button
              onClick={onOpenAuditModal}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <span className="material-symbols-outlined text-base">download_for_offline</span>
              <span>Export Audit</span>
            </button>
          </div>
        </div>

        {/* Active Context Pill & Telemetry Strip */}
        <div className="mt-4 p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-[#EEF2FF] text-[#4F46E5]">
              <span className="material-symbols-outlined text-sm">hub</span>
            </span>
            <span className="font-mono text-[11px] text-[#4F46E5] uppercase font-bold">
              Active Context:
            </span>
            <span className="text-xs font-semibold text-[#0F172A] truncate">
              {profile?.name || 'Alex Kumar'}
            </span>
            <span className="text-[#CBD5E1] font-mono">•</span>
            <span className="px-2 py-0.5 rounded bg-[#F1F5F9] font-mono text-[11px] text-[#334155] border border-[#E2E8F0]">
              Target: {profile?.targetRole || 'Data Scientist'}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] font-mono text-[11px] font-bold border border-[#BFDBFE]">
              {profile?.readinessScore || 72}% Readiness
            </span>
            <span className="text-[#CBD5E1] font-mono">•</span>
            <span className="px-2 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626] font-mono text-[11px] font-bold border border-[#FECACA] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">warning</span>
              Gap: ML / Statistical Modeling
            </span>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            <span className="font-mono text-[11px] text-[#64748B]">
              Model: <strong className="text-indigo-600 font-bold">CareerAI-Neural-v3.4 (Trained)</strong>
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>
      </section>

      {/* Split Analytical Cockpit */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* LEFT COLUMN: Structured Tracks & Persistent Neural Memory */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Quick Guided Tracks */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-lg">alt_route</span>
                <h3 className="text-xs font-bold text-[#0F172A] uppercase font-mono">
                  Guided Coaching Tracks
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#64748B]">4 Modules</span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleSendMessage('How do I crack the FAANG ML system design round?')}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                    ML System Design (Mock)
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Two-stage retrieval, scoring, &amp; latency SLAs
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-600 text-base">
                  play_arrow
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSendMessage('Generate a 30-day sprint plan to close my ML deficit')}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                    30-Day ML Deficit Sprint
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Close gap from 31% to 75%+ with vectorized code
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-600 text-base">
                  play_arrow
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSendMessage('Evaluate my resume ATS alignment for Senior L4 Data Scientist')}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                    Resume ATS &amp; Keywords
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Audit missing L4 tags &amp; impact quantification
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-600 text-base">
                  play_arrow
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSendMessage('How much salary and equity should I negotiate for this target?')}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                    Salary &amp; Equity Negotiation
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Tier-1 tech percentiles &amp; counter-offer strategies
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-600 text-base">
                  play_arrow
                </span>
              </button>
            </div>
          </div>

          {/* Persistent Neural Memory Pins */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-lg">memory</span>
                <h3 className="text-xs font-bold text-[#0F172A] uppercase font-mono">
                  Persistent Vector Memory
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Synced
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {savedMemory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-800">{item.title}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      item.color === 'rose'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : item.color === 'emerald'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Live Chat Console */}
        <div className="lg:col-span-8 flex flex-col rounded-2xl bg-white border border-[#E2E8F0] shadow-sm overflow-hidden min-h-[640px]">
          {/* Chat Window Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[500px]">
            {messages.map((msg) => {
              const isAI = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-start ${isAI ? '' : 'flex-row-reverse'}`}
                >
                  {isAI ? (
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-lg">smart_toy</span>
                    </div>
                  ) : (
                    <img
                      alt="Alex Kumar"
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E2E8F0] shrink-0"
                      src={profile?.avatar || "https://lh3.googleusercontent.com/aida/AEtjO1UWB0ymMYniAJrp9yN7dTh9Znj0pzG8dUwilRdAeoMKU5jFjwCvb1fhSSehIsVFY3shdi_-MeNdYWiUi-xvVpsaH2mEDqZHXdfcQqNmz1oYPI7GoXTLGJEu6L0-9_tEB1G0xfYSjG6vDNSCWY2aL9BJp3LZMUMgE_2gX8vcnhqvZdb6mthRvyKl8bzK1RcJuYkh6-Jf6YcmWLekQgc5GE_noaxlfO8Tc6Jt6EP14-G6_4DfV-xxtBJ6mQ"}
                    />
                  )}

                  <div
                    className={`max-w-3xl rounded-2xl p-4 text-xs leading-relaxed ${
                      isAI
                        ? 'bg-slate-50 border border-slate-200 text-slate-800'
                        : 'bg-indigo-600 text-white ml-auto'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between pb-2 mb-2 border-b text-[10px] font-mono ${
                        isAI ? 'border-slate-200 text-slate-400' : 'border-indigo-400/40 text-indigo-100'
                      }`}
                    >
                      <span className="font-bold flex items-center gap-1.5">
                        {isAI ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>{msg.model || 'CareerAI Neural Engine (Trained)'}</span>
                          </>
                        ) : (
                          'Alex Kumar'
                        )}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Content Formatted Body */}
                    {isAI ? (
                      <StructuredResponseCard
                        content={msg.content}
                        telemetry={msg.telemetry}
                      />
                    ) : (
                      <div className="whitespace-pre-line font-medium text-white">{msg.content}</div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 items-start animate-fadeIn">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-500 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
                  <span>Synthesizing vector recommendations &amp; market intelligence...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pill Strip */}
          <div className="px-6 py-2.5 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold shrink-0">
              Suggestions:
            </span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-[11px] text-slate-700 hover:text-indigo-700 transition-colors shadow-2xs font-medium"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Console Area */}
          <div className="p-4 bg-white border-t border-[#E2E8F0]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Ask your AI Career Coach about system design, closing gaps, salary negotiation, or resume tailoring..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:bg-white text-xs pl-4 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Send</span>
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Model Training & Telemetry Modal */}
      <ModelTrainerModal
        isOpen={isTrainerModalOpen}
        onClose={() => setIsTrainerModalOpen(false)}
        onTrainingComplete={(metrics) => {
          setModelMetrics(metrics);
        }}
      />
    </div>
  );
}
