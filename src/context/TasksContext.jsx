import { createContext } from "react";
import { useTasks } from "../hooks/useTasks";
 
export const TasksContext = createContext();
 
export function TasksProvider({ children }) {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, getTask } =
    useTasks();
 
  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTask, toggleTask, deleteTask, getTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}