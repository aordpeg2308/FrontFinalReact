// src/App.js
import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider } from './context/AuthContext'; // Importar AuthProvider
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthProvider> 
      <h1>Práctica Final: Gestor de Tareas por Alejandro Ordóñez Pegalajar</h1>
      {isLoggedIn ? (
        <TaskProvider>
          <TaskForm />
          <TaskFilter />
          <TaskList />
        </TaskProvider>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </AuthProvider>
  );
};

export default App;
