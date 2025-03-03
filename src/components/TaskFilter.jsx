import React from "react";
import { useTasks } from "../context/TaskContext";

function TaskFilter() {
  const { filter, setFilter } = useTasks();  

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
