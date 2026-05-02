import clsx from "clsx";
import type { TodoItemType } from "../lib/types";
import { CalendarCheckIcon, CalendarPlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  item: TodoItemType;
}

export default function TodoItem({ item }: Props) {
  // @TODO: add this
  const overdue = false;
  const [name, setName] = useState(item.name);
  const [done, setDone] = useState(item.done);

  const onNameChange = (newName: string) => {
    setName(newName);
  };

  const onCheckedChange = (isChecked: boolean) => {
    setDone(isChecked);
  };

  const onDelete = () => {};

  return (
    <div
      className={clsx(
        "relative flex flex-col items-stretch justify-between bg-stone-800 shadow p-6 min-h-32 border-2 hover:shadow-none hover:border-stone-700 border-transparent transition-all",
        item.done && "italic bg-stone-600",
        !item.done && overdue && "border-2 border-red-500",
      )}
    >
      <button
        className="absolute top-2 right-2 font-black *:size-4 text-red-500"
        onClick={onDelete}
      >
        <TrashIcon />
      </button>

      <input
        className={clsx(
          "clear-input text-xl font-semibold",
          item.done && "line-through",
        )}
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />

      <div className="flex items-center justify-between *:text-stone-500 text-sm *:flex *:items-center *:gap-1.5">
        <p>
          <CalendarPlusIcon /> {item.date_added}
        </p>
        <input
          type="checkbox"
          className="accent-orange-500 size-7"
          checked={done}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
        <p>
          <CalendarCheckIcon /> {item.date_due}
        </p>
      </div>
    </div>
  );
}
