"use client";

import { Task } from "@/app/page";
import TodoItem from "./TodoItem";

const TodoList = ({
  tasks,
  ToggleTask,
  DestroyTask,
  EditTask,
}: {
  tasks: Task[];
  ToggleTask: (id: number) => void;
  DestroyTask: (id: number) => void;
  EditTask(id: number, newContent: string): void;
}) => {
  return (
    <ul className="h-72 overflow-auto w-full flex gap-8 flex-col">
      {tasks.map((task) => (
        <TodoItem
          task={task}
          ToggleTask={ToggleTask}
          DestroyTask={DestroyTask}
          EditTask={EditTask}
          key={task.id}
        />
      ))}
    </ul>
  );
};

export default TodoList;
