import React, { createContext, useState, useContext, useCallback } from "react";


const TaskContext = createContext();


export const useTasks = () => {
  return useContext(TaskContext);
};


export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // Estado para almacenar la lista de tareas
  const [filter, setFilter] = useState('all'); // Estado para manejar el filtro de tareas ('all', 'active', 'completed')

  // Función para obtener las tareas desde la API
  const getTasks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  }, []);

  // Devolver Tareas por su estado
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return task.status !== 'completada';
    if (filter === 'completed') return task.status === 'completada';
    return true;
  });

  // Función para agregar una nueva tarea a la lista
  const addTask = async (newTask) => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]); // Agrega la nueva tarea a la lista
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  // Función para eliminar una tarea de la lista y de la API
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, { method: "DELETE" });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Elimina la tarea localmente
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  // Función para marcar una tarea como completada o activa
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

  // Función para editar el nombre de una tarea 
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
        tasks: filteredTasks, // Se proporciona la lista de tareas filtrada
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
