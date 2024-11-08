import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './Authentification/Login';
import Register from './Authentification/Register';
import Dashboard from './Admin/Dashboard'; 
import Trainee from './Trainee';
import GestionTasks from './Admin/GestionTasks'; 
import ViewAllTasks from './Admin/ViewAllTasks'; 
import ViewUsers from './Admin/ViewUsers'; 
import ViewComments from './Admin/ViewComments';
import Navbar from './Layouts/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/GestionTasks" element={isLoggedIn ? <GestionTasks /> : <Navigate to="/login" />} />
        <Route path="/ViewAllTasks" element={isLoggedIn ? <ViewAllTasks /> : <Navigate to="/login" />} />
        <Route path="/ViewUsers" element={isLoggedIn ? <ViewUsers /> : <Navigate to="/login" />} />
        <Route path="/ViewComments" element={isLoggedIn ? <ViewComments /> : <Navigate to="/login" />} />
        <Route path="/trainee" element={isLoggedIn ? <Trainee /> : <Navigate to="/login" />} />
        
      </Routes>
    </Router>
  );
}

export default App;
