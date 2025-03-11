import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

const TaskList = () => {
 
  const { tasks, deleteTask, markAsCompleted, editTask, getTasks } = useTasks();
  
  
  const [editingIndex, setEditingIndex] = useState(null);
  
 
  const [editedText, setEditedText] = useState("");

  // useEffect para obtener las tareas cuando el componente se monta
  useEffect(() => {
    getTasks(); 
  }, [getTasks]); 

  // Función para habilitar la edición de una tarea
  const handleEdit = (index, name) => {
    setEditingIndex(index); // Guardamos el índice de la tarea en edición
    setEditedText(name); // Cargamos el nombre actual de la tarea en el input
  };

  // Función para guardar la edición de la tarea
  const saveEdit = (index) => {
    const task = tasks[index]; // Obtenemos la tarea correspondiente
    editTask(task.id, editedText); // Llamamos a la función de edición del contexto
    setEditingIndex(null); // Salimos del modo edición
  };

  // Función para cambiar el estado de una tarea (pendiente ↔ completada)
  const handleCheckboxChange = (task) => {
    const newStatus = task.status === "completada" ? "pendiente" : "completada"; // Alternamos el estado
    markAsCompleted(task.id, newStatus); // Llamamos a la función del contexto
  };

  return (
    <ul>
      {tasks.length === 0 ? ( // Si no hay tareas, mostramos un mensaje
        <p>No hay tareas disponibles</p>
      ) : (
        tasks.map((task, index) => ( 
          <li key={task.id}>
           
            <input
              type="checkbox"
              checked={task.status === "completada"}
              onChange={() => handleCheckboxChange(task)} 
            />
            
           
            {editingIndex === index ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={() => saveEdit(index)} 
                onKeyPress={(e) => e.key === "Enter" && saveEdit(index)} 
              />
            ) : (
              // Texto de la tarea editable
              <span
                style={{
                  textDecoration: task.status === "completada" ? "line-through" : "none", 
                }}
                onClick={() => handleEdit(index, task.name)}  
              >
                {task.name}  
              </span>
            )}
            
           
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
