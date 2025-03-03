import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

const TaskList = () => {
  const { tasks, deleteTask, markAsCompleted, editTask, getTasks } = useTasks();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleEdit = (index, name) => {
    setEditingIndex(index);
    setEditedText(name);
  };

  const saveEdit = (index) => {
    const task = tasks[index];
    editTask(task.id, editedText);  
    setEditingIndex(null);
  };


  const handleCheckboxChange = (task) => {
    const newStatus = task.status === "completada" ? "pendiente" : "completada";
    markAsCompleted(task.id, newStatus); 
  };

  return (
    <ul>
      {tasks.length === 0 ? (
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
