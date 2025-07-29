"use client";

import TodoList from "@/components/TodoList";
import { useEffect, useState } from "react";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Play Valorant", completed: false },
    { id: 2, title: "Learn React", completed: true },
    { id: 3, title: "Listen to music", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const ToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    const saveTasks = localStorage.getItem("tasks");
    if (saveTasks) {
      setTasks(JSON.parse(saveTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask.trim(),
          completed: false,
        },
      ]);
      setNewTask("");
    }
  };

  const DestroyTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const EditTask = (id: number, newContent: string) => {
    if (newContent.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: newContent.trim() } : task
        )
      );
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-xl font-bold w-full text-center text-gray-700 dark:text-white ">
          TODO LIST
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter your task here"
            className="border border-gray-700 dark:border-white p-2 bg-transparent text-black dark:text-white outline-none"
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          ></input>
          <button
            className="font-bold border cursor-pointer border-gray-700 bg-gray-700 hover:bg-gray-800 hover:border-gray-800 text-white p-2 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-400 dark:hover:border-gray-400"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <TodoList
          tasks={tasks}
          ToggleTask={ToggleTask}
          DestroyTask={DestroyTask}
          EditTask={EditTask}
        />
      </main>
    </div>
  );
}
