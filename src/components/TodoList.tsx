import clsx from "clsx";
import type { TodoListType } from "../lib/types";
import TodoItem from "./TodoItem";
import { useState } from "react";
import { TrashIcon } from "lucide-react";

interface Props {
  list: TodoListType;
  className?: string;
}

export default function TodoList({ list, className }: Props) {
  const [title, setTitle] = useState(list.title);
  const [items, _] = useState(list.items);

  const onTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const onDelete = () => {};

  return (
    <div
      className={clsx(
        "relative w-sm min-h-96 overflow-y-auto flex flex-col items-stretch gap-2 rounded-2xl bg-stone-900 text-zinc-100 group",
        className,
      )}
    >
      <button
        className="absolute top-4 right-4 font-black *:size-5 text-red-500"
        onClick={onDelete}
      >
        <TrashIcon />
      </button>

      <input
        className="clear-input text-stone-400 p-4 rounded-t-lg text-4xl font-bold group-hover:text-stone-50 transition-colors duration-300"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <div className="flex flex-col items-stretch gap-4 px-4 py-10">
        {items.map((item) => (
          <TodoItem key={`todo_item_${item.name}`} item={item} />
        ))}
      </div>
    </div>
  );
}
