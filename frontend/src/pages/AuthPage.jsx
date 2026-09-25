import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AuthPage({ isSignUpDefault = false, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('B.Tech in Computer Science');
  const [targetRole, setTargetRole] = useState('Data Scientist');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
    const payload = isSignUp
      ? { email, password, name, degree, targetRole }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      setSuccessMsg(data.message || 'Authentication successful!');
      if (onAuthSuccess && data.user) {
        onAuthSuccess(data.user);
      }
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
        {/* Banner */}
        <div className="p-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono font-bold tracking-wider">
              Supabase Auth Engine
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-mono font-bold tracking-wider">
              Resend Sync
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {isSignUp ? 'Join CareerAI Platform' : 'Welcome to CareerAI'}
          </h2>
          <p className="text-xs text-indigo-200 mt-1 leading-relaxed">
            {isSignUp
              ? 'Create your personalized student vector, track skill milestones, and receive AI progress emails.'
              : 'Sign in with your verified Supabase credentials to access your roadmap and AI coach.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
              <span className="material-symbols-outlined text-base shrink-0 text-rose-600">error</span>
              <span className="leading-snug">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2.5">
              <span className="material-symbols-outlined text-base shrink-0 text-emerald-600">check_circle</span>
              <span className="leading-snug">{successMsg}</span>
            </div>
          )}

          {isSignUp && (
            <>
              <div>
                <label className="text-[11px] font-mono font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Kumar"
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-indigo-600 font-medium text-slate-900 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                    Degree / Branch
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-600 text-slate-800 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-600 text-slate-800 transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-[11px] font-mono font-bold text-slate-700 block mb-1 uppercase tracking-wider">
              Student Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vabhijit516@gmail.com"
              className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-indigo-600 font-medium text-slate-900 transition-colors"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono font-bold text-slate-700 block mb-1 uppercase tracking-wider">
              Account Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-indigo-600 font-medium text-slate-900 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
          >
            <span className={`material-symbols-outlined text-base ${loading ? 'animate-spin' : ''}`}>
              {loading ? 'sync' : 'fingerprint'}
            </span>
            <span>
              {loading
                ? 'Authenticating with Supabase...'
                : isSignUp
                ? 'Sign Up with Supabase'
                : 'Sign In with Supabase'}
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-600">
          {isSignUp ? (
            <span>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Need an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </span>
          )}

          <Link to="/" className="text-slate-500 hover:text-slate-800 font-medium">
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
