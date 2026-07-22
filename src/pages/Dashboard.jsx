import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, Circle, Clock3, FileDown, Flame, Inbox, LayoutDashboard, LogOut, MoonStar, Plus, Search, SunMedium, Sparkles } from 'lucide-react';
import { fetchTasks, fetchTaskById, setSelectedTask } from '../features/taskSlice';
import ThemeToggle from '../components/ThemeToggle';
import NewTaskModal from '../components/NewTaskModal';
import ViewTaskModal from '../components/ViewTaskModal';
// import QuickAddModal from '../components/QuickAddModal';
import { exportTasksToCSV } from '../utils/exportToCsv';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error, selectedTask } = useSelector((state) => state.tasks);
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const openTaskModal = (taskId) => {
    dispatch(fetchTaskById(taskId));
    setIsModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsModalOpen(false);
    dispatch(setSelectedTask(null));
  };

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const totalTasks = tasks.length;
  const highPriorityCount = tasks.filter((task) => task.priority === 'High').length;
  const dueSoonCount = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const diff = dueDate.getTime() - Date.now();
    return diff >= 0 && diff <= 3 * 24 * 60 * 60 * 1000;
  }).length;
  const completedCount = tasks.filter((task) => task.status === 'Completed').length;

  const filteredTasks = tasks.filter((task) => {
    if (activeTab !== 'All') {
      if (activeTab === 'Inprogress') {
        if (task.status !== 'In Progress') return false;
      } else if (task.status !== activeTab) return false;
    }
    if (searchTerm.trim() === '') return true;
    const q = searchTerm.toLowerCase();
    return (task.title || '').toLowerCase().includes(q) || (task.description || '').toLowerCase().includes(q);
  });

  return (
    <div className="page-shell bg-transparent text-slate-900 dark:text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <aside className="w-full shrink-0 rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-[0_25px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 lg:w-72">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/60">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground"><Sparkles className="h-5 w-5" /></div>
            <div>
              <p className="text-base font-semibold leading-tight">Taskly</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Personal workspace</p>
            </div>
          </div>

          <nav className="mt-8 space-y-1.5 text-sm">
            {[
              { label: 'Dashboard', active: true },
              { label: 'All tasks', count: totalTasks },
              { label: 'High priority', count: highPriorityCount },
              { label: 'Completed', count: completedCount },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition ${item.active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
              >
                <span className="flex items-center gap-2 font-medium">
                  {item.label === 'Dashboard' && <LayoutDashboard className="h-4 w-4" />}
                  {item.label === 'All tasks' && <Inbox className="h-4 w-4" />}
                  {item.label === 'High priority' && <Flame className="h-4 w-4" />}
                  {item.label === 'Completed' && <CheckCircle2 className="h-4 w-4" />}
                  {item.label}
                </span>
                {item.count !== undefined ? <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.active ? 'bg-white/20' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>{item.count}</span> : null}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{user?.name?.[0] || 'U'}</div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user?.name || 'User'}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email || 'workspace@taskly.io'}</p>
              </div>
            </div>
            <button type="button" onClick={logout} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_25px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Welcome back</p>
                <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Hi, {user?.name || 'there'} — let’s get to work.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Stay on top of deadlines, prioritize the right work, and move tasks from idea to done.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => exportTasksToCSV(tasks)} className="button-secondary gap-2">
                  <FileDown className="h-4 w-4" /> Export CSV
                </button>
                <ThemeToggle />
                
                <button type="button" onClick={() => setShowCreate((value) => !value)} className="button-primary gap-2">
                  {showCreate ? <Circle className="h-4 w-4" /> : <Plus className="h-4 w-4" />} {showCreate ? 'Close' : 'New task'}
                </button>
              </div>
            </div>
          </header>

          <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Total tasks', value: totalTasks, sub: 'Everything on your plate', tone: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200' },
              { label: 'High priority', value: highPriorityCount, sub: 'Needs your focus first', tone: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300' },
              { label: 'Due within 72h', value: dueSoonCount, sub: 'Coming up soon', tone: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' },
              { label: 'Completed', value: completedCount, sub: 'Shipped and done', tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' },
            ].map((card) => (
              <div key={card.label} className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{card.label}</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
                <p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${card.tone}`}>{card.sub}</p>
              </div>
            ))}
          </section>

          <NewTaskModal isOpen={showCreate} onClose={() => setShowCreate(false)} />

          <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-[0_25px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {['All', 'Pending', 'Inprogress', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab === 'Inprogress' ? 'Inprogress' : tab)}
                    className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${activeTab === tab ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search tasks..." className="input-field pl-9" />
              </div>
            </div>

            {isLoading && <p className="mt-6 text-sm font-semibold text-sky-600 dark:text-sky-300 animate-pulse">Loading tasks...</p>}
            {error && <p className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700 dark:border-rose-700/50 dark:bg-rose-900/20 dark:text-rose-200">Error: {error}</p>}

            {!isLoading && !error && (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {filteredTasks.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50/80 p-8 text-center dark:border-slate-700 dark:bg-slate-800/60 lg:col-span-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">No tasks yet</p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Create your first task to get started.</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Add a task above and watch your work organize into a clean, focus-ready list.</p>
                  </div>
                ) : (
                  filteredTasks.map((task) => {
                    const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';
                    const priorityColor = task.priority === 'High' ? 'bg-rose-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500';
                    const statusTone = task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : task.status === 'In Progress' ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300';

                    return (
                      <button key={task._id} type="button" onClick={() => openTaskModal(task._id)} className="w-full rounded-[1.5rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className={`h-2.5 w-2.5 rounded-full ${priorityColor}`} />
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{task.title}</h3>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{task.description || 'A clear task with a deadline and priority set.'}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-sm font-semibold ${priorityColor} text-white`}>{task.priority || 'Low'}</span>
                        </div>
                        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                          <span className={`rounded-full px-3 py-1 ${statusTone}`}>{task.status || 'Pending'}</span>
                          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800"><Clock3 className="h-3.5 w-3.5" /> Due {dueDate}</span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </section>
        </main>
      </div>

      <ViewTaskModal isOpen={isModalOpen} task={selectedTask} onClose={closeTaskModal} />
      {/* <QuickAddModal isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} /> */}
    </div>
  );
};

export default Dashboard;