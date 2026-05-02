import clsx from "clsx";
import type { TodoListType } from "../lib/types";
import TodoItem from "./TodoItem";

interface Props {
  list: TodoListType;
  className?: string;
}

export default function TodoList({ list, className }: Props) {
  const { title, items } = list;

  return (
    <div
      className={clsx(
        "w-sm min-h-96 overflow-y-auto flex flex-col items-stretch gap-2 rounded-xl bg-stone-900 text-zinc-100 group",
        className,
      )}
    >
      <input
        className="clear-input text-stone-400 p-4 rounded-t-lg text-4xl font-bold group-hover:text-stone-50 transition-colors duration-300"
        defaultValue={title}
      />
      <div className="flex flex-col items-stretch gap-8 p-3">
        {items.map((item) => (
          <TodoItem key={`todo_item_${item.name}`} item={item} />
        ))}
      </div>
    </div>
  );
}
