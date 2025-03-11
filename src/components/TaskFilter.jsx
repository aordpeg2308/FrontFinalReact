import React from "react";
import { useTasks } from "../context/TaskContext";

function TaskFilter() {
  const { filter, setFilter } = useTasks();   // aqui establecemos la busqueda del filtro cambiando el estado por el que queremos

  return (
    <div className="task-filter">  
      <button
        onClick={() => setFilter("all")} 
        className={filter === "all" ? "active" : ""} 
      >
        Todas
      </button>
      <button
        onClick={() => setFilter("active")} 
        className={filter === "active" ? "active" : ""}
      >
        Activas
      </button>
      <button
        onClick={() => setFilter("completed")} 
        className={filter === "completed" ? "active" : ""} 
      >
        Completadas
      </button>
    </div>
  );
}

export default TaskFilter; 
