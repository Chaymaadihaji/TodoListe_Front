import React, { useState, useEffect } from 'react';
import axios from 'axios';

const statusMapping = {
  0: 'Pending',
  1: 'In Progress',
  2: 'Done',
};

export default function GestionTasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]); // Store users fetched from the API
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 0, user_Id: 0 });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchUsers(); // Fetch users on component mount
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('https://localhost:7035/api/RTask/GetAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('https://localhost:7035/api/RUser/GetAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data); // Assign fetched users
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // Use 'name' instead of 'UserName'
    setNewTask((prevTask) => ({ ...prevTask, [name]: value })); // Update state based on input
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');

      const taskToAdd = {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        user_Id: newTask.user_Id,
      };

      const response = await axios.post('https://localhost:7035/api/RTask', taskToAdd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks([...tasks, { ...taskToAdd, id: response.data.id }]); // Update state with new task
      setNewTask({ title: '', description: '', status: 0, user_Id: 0 }); // Reset fields
    } catch (error) {
      if (error.response) {
        console.error('Error adding task:', error.response.data);
      } else {
        console.error('Error adding task:', error.message);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`https://localhost:7035/api/RTask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  const handleUpdateTask = (task) => {
    setEditTask(task);
    setNewTask(task);
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const taskToUpdate = {
        ...newTask,
        user_Id: newTask.user_Id,
      };

      await axios.put(`https://localhost:7035/api/RTask/${editTask.id}`, taskToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(tasks.map((task) => (task.id === editTask.id ? { ...taskToUpdate, id: editTask.id } : task)));
      resetNewTask();
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const resetNewTask = () => {
    setNewTask({ title: '', description: '', status: 0, user_Id: 0 });
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">{editTask ? 'Update Task' : 'Create a New Task'}</h1>

        <form onSubmit={editTask ? handleSaveUpdate : handleAddTask} className="space-y-4">
          <div className="mb-4">
            <label className="block font-semibold text-gray-800">Title:</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-800">Description:</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter task description"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-800">Status:</label>
            <select
              name="status"
              value={newTask.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              {Object.entries(statusMapping).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-800">Assign to User:</label>
            <select
              name="user_Id"
              value={newTask.user_Id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            >
              <option value="0">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.userName} {/* Display the user's username from the API */}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {editTask ? 'Save Changes' : 'Add Task'}
          </button>
        </form>
      </div>

      <h2 className="text-xl font-bold my-6 text-gray-800 text-center">Tasks List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-50 border border-gray-300 p-4 rounded shadow-md text-gray-800">
            <h3 className="text-lg font-bold mb-2">{task.title}</h3>
            <p className="text-gray-600 mb-2">{task.description}</p>
            <p className="text-sm text-gray-500">
              Status: <span className="font-semibold">{statusMapping[task.status]}</span>
            </p>
            <p className="text-sm text-gray-500">
              Assigned to User ID: <span className="font-semibold">{task.user_Id}</span>
            </p>
            <div className="flex justify-between mt-4">
              <button onClick={() => handleUpdateTask(task)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400">
                Edit
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
