import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/taskSlice';

const ViewTaskModal = ({ isOpen, task, onClose }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
  });
  const [originalData, setOriginalData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      const nextData = {
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'Pending',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      };
      setFormData(nextData);
      setOriginalData(nextData);
      setIsEditing(true);
    }
  }, [task, isOpen]);

  if (!isOpen || !task) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await dispatch(updateTask({ id: task._id, updates: formData })).unwrap();
      setOriginalData(formData);
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await dispatch(deleteTask(task._id)).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_35px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-300">Task details</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{task.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleUpdate} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={!isEditing}
              className="input-field mt-2 disabled:cursor-default disabled:bg-slate-100 dark:disabled:bg-slate-800"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={!isEditing}
                className="input-field mt-2 disabled:cursor-default disabled:bg-slate-100 dark:disabled:bg-slate-800"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={!isEditing}
                className="input-field mt-2 disabled:cursor-default disabled:bg-slate-100 dark:disabled:bg-slate-800"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Due date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              disabled={!isEditing}
              className="input-field mt-2 disabled:cursor-default disabled:bg-slate-100 dark:disabled:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditing}
              className="input-field mt-2 disabled:cursor-default disabled:bg-slate-100 dark:disabled:bg-slate-800"
            />
          </div>

          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              <button type="submit" className="button-primary">Save changes</button>
              <button type="button" onClick={handleCancel} className="button-secondary">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-700/50 dark:text-rose-300 dark:hover:bg-rose-900/20"
              >
                Delete task
              </button>
            </div>

            <button type="button" onClick={onClose} className="button-secondary">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewTaskModal;
