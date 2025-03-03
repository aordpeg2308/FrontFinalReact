import React, { createContext, useState, useContext, useCallback } from "react";


const TaskContext = createContext();


export const useTasks = () => {
  return useContext(TaskContext);
};


export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');  

  
  const getTasks = useCallback(async () => {
    try {
     
      const response = await fetch("http://localhost:3000/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  }, []);

  
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return task.status !== 'completada';
    if (filter === 'completed') return task.status === 'completada';
    return true;
  });

  
  const addTask = async (newTask) => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, { method: "DELETE" });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };


  const markAsCompleted = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),  
      });
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea:", error);
    }
  };

  
  const editTask = (id, newName) => {  
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, name: newName } : task  
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        getTasks,
        addTask,
        deleteTask,
        markAsCompleted,
        editTask,
        filter,
        setFilter, 
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
