"use client";

import { Task } from "@/app/page";

const TodoItem = ({
  task,
  ToggleTask,
  DestroyTask,
  EditTask,
}: {
  task: Task;
  ToggleTask: (id: number) => void;
  DestroyTask: (id: number) => void;
  EditTask: (id: number, newContent: string) => void;
}) => {
  return (
    <li className="w-full flex justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-2">
      <div className="flex items-center gap-2">
        <input
          className="size-5"
          type="checkbox"
          checked={task.completed}
          onChange={() => ToggleTask(task.id)}
        />
        <span
          className={
            (task.completed ? "line-through" : "") +
            "  w-36 overflow-hidden text-ellipsis"
          }
        >
          {task.title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer bg-emerald-700 hover:bg-emerald-800 rounded-sm px-2 py-0.5 text-white"
          onClick={() => {
            const newContent = prompt("Nhập nội dung cho task");
            if (newContent) EditTask(task.id, newContent);
          }}
        >
          Edit
        </button>
        <span
          className="text-2xl mr-2 cursor-pointer select-none text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-slate-400"
          onClick={() => {
            if (confirm("Bạn có chắc chắn muốn xoá task?"))
              DestroyTask(task.id);
          }}
        >
          x
        </span>
      </div>
    </li>
  );
};

export default TodoItem;
