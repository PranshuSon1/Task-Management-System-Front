import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, user, loading } = useAuth();
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
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center bg-transparent">
      <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900/90 lg:flex">
        <div className="flex flex-1 flex-col justify-between bg-slate-950 p-8 text-white lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Create account</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Build a workspace that feels effortlessly organized.</h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
              Bring clarity to your work with priorities, due dates, and a modern dashboard designed to stay focused.
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            Start with a few details and step into a cleaner way to manage every task.
          </div>
        </div>

        <div className="flex-1 p-8 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-300">Register</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Create your account</h2>
            </div>

            {error && <div className="mb-6 rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-700/50 dark:bg-rose-900/20 dark:text-rose-200">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="name">Name</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input-field mt-2" placeholder="Alex Johnson" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field mt-2" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field mt-2" placeholder="Choose a strong password" />
              </div>
              <button type="submit" disabled={isSubmitting} className="button-primary w-full gap-2">
                {isSubmitting ? 'Creating account…' : 'Create account'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
