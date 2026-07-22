import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/taskSlice';

const TaskForm = ({ onCancel, className = '' }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      priority: 'Medium',
      status: 'Pending',
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createTask({ ...data, status: data.status || 'Pending' }));
    reset();
    if (onCancel) onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`mb-6 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_25px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90 ${className}`}
    >
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
          <input
            {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
            className="input-field mt-2"
            placeholder="e.g. Plan product review meeting"
          />
          {errors.title && <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Priority</label>
          <select {...register('priority')} className="input-field mt-2">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="input-field mt-2"
          placeholder="Add context, notes, or acceptance criteria (optional)"
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3 items-end">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Status</label>
          <select {...register('status')} className="input-field mt-2">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Due date</label>
          <input type="date" {...register('dueDate', { required: 'Due date is required' })} className="input-field mt-2" />
          {errors.dueDate && <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{errors.dueDate.message}</p>}
        </div>

        <div className="flex justify-end gap-3">
          <button type="submit" className="button-primary">
            Save task
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;