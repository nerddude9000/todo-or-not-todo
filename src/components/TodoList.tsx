import clsx from "clsx";
import type { TodoListType } from "../lib";
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
        "w-sm min-h-96 overflow-y-auto flex flex-col items-stretch gap-2 rounded-lg bg-zinc-100 text-zinc-900 group",
        className,
      )}
    >
      <h2 className="bg-slate-100 p-4 rounded-t-lg text-4xl font-bold group-hover:bg-white transition-colors duration-500">
        {title}
      </h2>
      <div className="flex flex-col items-stretch gap-8 p-3">
        {items.map((item) => (
          <TodoItem key={`todo_item_${item.name}`} item={item} />
        ))}
      </div>
    </div>
  );
}
