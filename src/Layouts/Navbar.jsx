import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-800 to-purple-600 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold hover:text-gray-300 transition duration-200">Home</Link>
        <div className="space-x-4">
          <Link to="/GestionTasks" className="text-white hover:text-gray-300 transition duration-200">Tasks</Link>
          <Link to="/ViewAllTasks" className="text-white hover:text-gray-300 transition duration-200">View Tasks</Link>
          <Link to="/ViewUsers" className="text-white hover:text-gray-300 transition duration-200">Users</Link>
          <Link to="/ViewComments" className="text-white hover:text-gray-300 transition duration-200">Comments</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
