import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/taskSlice';

const TaskForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createTask(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel-card dark:panel-card-dark mb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">Quick add</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Create a new task</h3>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Add a title, choose a due date, and prioritize the work that matters most.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
          <input
            {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
            className="input-field mt-2"
            placeholder="Plan product review meeting"
          />
          {errors.title && <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{errors.title.message}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Due Date</label>
            <input
              type="date"
              {...register('dueDate', { required: 'Due date is required' })}
              className="input-field mt-2"
            />
            {errors.dueDate && <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{errors.dueDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Priority</label>
            <select
              {...register('priority')}
              className="input-field mt-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <button type="submit" className="button-primary w-full sm:w-auto">
          Save task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;