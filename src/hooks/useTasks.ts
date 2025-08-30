import { useState, useCallback, useEffect } from 'react';
import type { Task } from '@/types';

const TASKS_STORAGE_KEY = 'ai-companion-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }, [tasks]);

  const addTask = useCallback((task: Task) => {
    setTasks(prev => [task, ...prev]);
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const removeTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.completed));
  }, []);

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

  return {
    tasks,
    addTask,
    toggleTask,
    removeTask,
    clearCompleted,
    completedCount,
    pendingCount,
  };
}