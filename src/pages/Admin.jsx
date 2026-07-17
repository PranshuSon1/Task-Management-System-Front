import React from 'react';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Admin Panel</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This area is protected and only visible to users with the Admin role.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Role-based access</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Admin users can access special management screens and approve or audit tasks.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User management</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Add custom admin-only features here like user reports, audit logs, or role assignment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
