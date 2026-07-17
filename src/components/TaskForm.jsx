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
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 transition-colors">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Create New Task</h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Title</label>
        <input 
          {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Due Date</label>
          <input 
            type="date"
            {...register('dueDate', { required: 'Due date is required' })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Priority</label>
          <select {...register('priority')} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;