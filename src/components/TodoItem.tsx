import clsx from "clsx";
import type { TodoItemType } from "../lib";
import { CalendarCheckIcon, CalendarPlusIcon, TrashIcon } from "lucide-react";

interface Props {
  item: TodoItemType;
}

export default function TodoItem({ item }: Props) {
  const overdue =
    new Date(item.date_added).getTime() - new Date(item.date_due).getTime() < 0;

  return (
    <button
      className={clsx(
        "relative flex flex-col items-stretch gap-2 bg-white shadow p-4 min-h-16 hover:shadow-none transition-all",
        item.done && "italic bg-blue-200",
        !item.done && overdue && "border-2 border-red-500",
      )}
    >
      <button className="absolute top-2 right-2 font-black text-xl text-red-500">
        <TrashIcon />
      </button>
      <h3
        className={clsx("text-xl font-semibold", item.done && "line-through")}
      >
        {item.name}
      </h3>
      <div className="flex items-center justify-between *:text-zinc-500 text-sm *:flex *:items-center *:gap-1.5">
        <p>
          <CalendarPlusIcon /> {item.date_added}
        </p>
        <p>
          <CalendarCheckIcon /> {item.date_due}
        </p>
      </div>
    </button>
  );
}
