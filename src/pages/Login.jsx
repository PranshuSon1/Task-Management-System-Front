import React, { useEffect, useState } from 'react';
import { ArrowRight, Clock3, LayoutGrid, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true });
    }
  }, [loading, user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center bg-transparent">
      <div className="w-full max-w-6xl overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-white/85 shadow-[0_35px_90px_-40px_rgba(15,23,42,0.38)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 lg:flex">
        <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.28),_transparent_42%),linear-gradient(135deg,_#0f172a_0%,_#111827_40%,_#1e293b_100%)] p-8 text-white lg:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.14),transparent_45%,rgba(255,255,255,0.06))]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-indigo-100">
              <Sparkles className="h-3.5 w-3.5" />
              Welcome back
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">A calmer way to manage your day.</h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
              Jump back into your priorities, review deadlines, and keep momentum going from a workspace that feels as polished as your plans.
            </p>
          </div>

          <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <LayoutGrid className="h-4 w-4" />
                Focused view
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">Stay centered on what matters most with a clear overview of your work.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Clock3 className="h-4 w-4" />
                On schedule
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">Keep deadlines visible and your day moving without the usual overwhelm.</p>
            </div>
          </div>

          <div className="relative mt-8 rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Today at a glance</p>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-medium text-emerald-300">3 tasks due</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              You are on track with your current priorities.
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 sm:p-10 lg:p-12">
          <div className="mx-auto flex h-full max-w-md flex-col justify-center">
            <div className="mb-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-300">Sign in</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Access your workspace</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Pick up where you left off and keep your flow intact.</p>
            </div>

            {error && <div className="mb-6 rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-700/50 dark:bg-rose-900/20 dark:text-rose-200">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field mt-2" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field mt-2" placeholder="Enter your secure password" />
              </div>
              <button type="submit" disabled={isSubmitting} className="button-primary w-full gap-2">
                {isSubmitting ? 'Signing in…' : 'Sign in'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              New to the app?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
