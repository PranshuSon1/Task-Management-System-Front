import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/taskSlice';
import TaskForm from '../components/TaskForm';
import ThemeToggle from '../components/ThemeToggle';
import { exportTasksToCSV } from '../utils/exportToCsv';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);
  const { user, logout } = useAuth();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const totalTasks = tasks.length;
  const highPriorityCount = tasks.filter((task) => task.priority === 'High').length;
  const dueSoonCount = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const diff = dueDate.getTime() - Date.now();
    return diff >= 0 && diff <= 3 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="page-shell bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 rounded-[2rem] bg-white/95 p-6 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)] dark:bg-slate-900/90 dark:[box-shadow:0_30px_60px_-40px_rgba(0,0,0,0.55)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-300">Task Manager</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Welcome back{user?.name ? `, ${user.name}` : ''}.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Stay on top of your deadlines, prioritize the right work, and move tasks from idea to done.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => exportTasksToCSV(tasks)}
              className="button-primary"
            >
              📥 Export CSV
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={logout}
              className="button-secondary"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="panel-card dark:panel-card-dark">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Total tasks</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">{totalTasks}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Tasks waiting for your next action.</p>
          </div>
          <div className="panel-card dark:panel-card-dark">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">High priority</p>
            <p className="mt-4 text-4xl font-semibold text-rose-600 dark:text-rose-400">{highPriorityCount}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Top priority items that need attention.</p>
          </div>
          <div className="panel-card dark:panel-card-dark">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Due soon</p>
            <p className="mt-4 text-4xl font-semibold text-indigo-600 dark:text-indigo-300">{dueSoonCount}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Tasks due within the next 72 hours.</p>
          </div>
        </div>

        <TaskForm />

        {isLoading && <p className="text-sm font-semibold text-sky-600 dark:text-sky-300 animate-pulse">Loading tasks...</p>}
        {error && <p className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700 dark:border-rose-700/50 dark:bg-rose-900/20 dark:text-rose-200">Error: {error}</p>}

        {!isLoading && !error && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tasks.length === 0 ? (
              <div className="panel-card dark:panel-card-dark col-span-full text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">No tasks yet</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">Create your first task to get started.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Add a task above and watch your work organize into a clean, focus-ready list.
                </p>
              </div>
            ) : (
              tasks.map((task) => {
                const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';
                const priorityColor = task.priority === 'High'
                  ? 'bg-rose-500'
                  : task.priority === 'Medium'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500';

                return (
                  <div
                    key={task._id}
                    className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{task.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {task.description || 'A clear task with a deadline and priority set.'}
                        </p>
                      </div>
                      <span className={`tag-pill ${priorityColor}`}>{task.priority || 'Low'}</span>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                      <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">Due {dueDate}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;