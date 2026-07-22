import React, { useEffect } from 'react';
import TaskForm from './TaskForm';

const NewTaskModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6"
      onClick={() => onClose?.()}
      role="presentation"
    >
      <div
        className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_35px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-300">
              New task
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
              Create a task
            </h3>
          </div>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-6">
          <TaskForm onCancel={onClose} className="mb-0" />
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;

