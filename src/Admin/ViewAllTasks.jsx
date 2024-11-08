import React from 'react';

export default function ViewAllTasks() {
  // Exemple de données, remplace-les par celles de ton API
  const tasks = [
    { user: 'John Doe', title: 'Task 1', createDate: '2024-09-01', status: 'Done' },
    { user: 'Jane Smith', title: 'Task 2', createDate: '2024-09-02', status: 'In Progress' },
    { user: 'Emily Davis', title: 'Task 3', createDate: '2024-09-03', status: 'Pending' },
    { user: 'John Doe', title: 'Task 1', createDate: '2024-09-01', status: 'Done' },
    { user: 'Jane Smith', title: 'Task 2', createDate: '2024-09-02', status: 'In Progress' },
    { user: 'Emily Davis', title: 'Task 3', createDate: '2024-09-03', status: 'Pending' },
    // Ajoute d'autres tâches ici
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 to-white">
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 max-w-6xl">
        <table className="w-full table-fixed bg-white text-gray-800 shadow-sm">
          <thead>
            <tr className="bg-gray-300">
              <th className="w-1/4 py-4 px-6 text-left font-bold uppercase">Users</th>
              <th className="w-1/4 py-4 px-6 text-left font-bold uppercase">Tasks Title</th>
              <th className="w-1/4 py-4 px-6 text-left font-bold uppercase">Create Date</th>
              <th className="w-1/4 py-4 px-6 text-left font-bold uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="py-4 px-6">{task.user}</td>
                  <td className="py-4 px-6 truncate">{task.title}</td>
                  <td className="py-4 px-6">{task.createDate}</td>
                  <td className="py-4 px-6">
                    <span 
                      className={`text-white py-1 px-2 rounded-full text-xs ${
                        task.status === 'Done' ? 'bg-green-500' : 
                        task.status === 'In Progress' ? 'bg-yellow-500' : 
                        task.status === 'Pending' ? 'bg-gray-500' : 
                        'bg-gray-700'
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center border-b border-gray-300">Aucun résultat trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
