export const exportTasksToCSV = (tasks) => {
  if (!tasks || !tasks.length) {
    alert("No tasks available to export.");
    return;
  }

  // 1. Define CSV Headers
  const headers = ['Title', 'Description', 'Status', 'Priority', 'Due Date'];
  
  // 2. Map data to rows
  const rows = tasks.map(task => [
    `"${task.title}"`,
    `"${task.description || ''}"`,
    task.status,
    task.priority,
    new Date(task.dueDate).toLocaleDateString()
  ]);

  // 3. Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(e => e.join(','))
  ].join('\n');

  // 4. Create Blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "tasks_export.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};