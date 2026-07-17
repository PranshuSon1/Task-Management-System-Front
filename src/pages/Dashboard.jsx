import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/taskSlice';
import TaskForm from '../components/TaskForm';
import ThemeToggle from '../components/ThemeToggle';
import { exportTasksToCSV } from '../utils/exportToCsv';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Task Dashboard</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => exportTasksToCSV(tasks)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              📥 Export CSV
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Task Form */}
        <TaskForm />

        {/* Loading and Error States */}
        {isLoading && <p className="text-blue-500 font-semibold animate-pulse">Loading tasks...</p>}
        {error && <p className="text-red-500 font-semibold bg-red-100 p-3 rounded">Error: {error}</p>}

        {/* Task List (Responsive Grid) */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {tasks.map(task => (
              <div key={task._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-blue-500 transition-colors">
                <h4 className="text-lg font-bold dark:text-white">{task.title}</h4>
                <div className="flex justify-between items-center mt-4">
                  <span className={`px-2 py-1 rounded text-xs text-white ${task.priority === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    {task.priority}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;