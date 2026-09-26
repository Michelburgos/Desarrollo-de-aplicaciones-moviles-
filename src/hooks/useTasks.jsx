import { useState, useEffect } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas guardadas al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Guardar tareas cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id, title) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === Number(id) ? { ...task, title } : task
      )
    );
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTask = (id) => tasks.find((task) => task.id === Number(id));

  return { tasks, addTask, updateTask, toggleTask, deleteTask, getTask };
}