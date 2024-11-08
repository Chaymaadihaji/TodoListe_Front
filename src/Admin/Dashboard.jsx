import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '/src/Layouts/Navbar';

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-200">
      <div className="flex flex-wrap justify-center gap-6">
        <Card title="Task Management" route="/GestionTasks" />
        <Card title="View All Tasks" route="/ViewAllTasks" />
        <Card title="View Users" route="/ViewUsers" />
        <Card title="User Comments" route="/ViewComments" />
      </div>
    </div>
  );
}

const Card = ({ title, route }) => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80 h-80 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 flex flex-col items-center justify-between">
      <h3 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">{title}</h3>
      <p className="text-gray-600 text-center mb-4">Explore the {title.toLowerCase()} section.</p>
      <button 
        onClick={() => navigate(route)} // Navigate to the specified route
        className="bg-blue-600 text-white rounded-full px-6 py-2 transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Open
      </button>
    </div>
  );
}
