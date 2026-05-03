import clsx from "clsx";
import type { TodoItemType } from "../lib/types";
import { CalendarCheckIcon, CalendarPlusIcon, TrashIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoTask, putTodoTask } from "../lib/api";

interface Props {
  item: TodoItemType;
}

export default function TodoItem({ item }: Props) {
  const queryClient = useQueryClient();

  const mutationUpdate = useMutation({
    mutationFn: putTodoTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", item.list_id] }),
  });

  const mutationDelete = useMutation({
    mutationFn: deleteTodoTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", item.list_id] }),
  });

  const onNameChange = (newName: string) => {
    mutationUpdate.mutate({ id: item.id, name: newName });
  };

  const onCheckedChange = (isChecked: boolean) => {
    mutationUpdate.mutate({ id: item.id, done: isChecked });
  };

  const onDelete = () => {
    mutationDelete.mutate({ id: item.id });
  };

  return (
    <div
      className={clsx(
        "relative flex flex-col items-stretch justify-between bg-stone-800 shadow p-6 min-h-32 border-2 hover:shadow-none hover:border-stone-700 border-transparent transition-all",
        item.done && "italic bg-stone-600",
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
        value={item.name}
        onChange={(e) => onNameChange(e.target.value)}
      />

      <div className="flex items-center justify-between *:text-stone-500 text-sm *:flex *:items-center *:gap-1.5">
        {/* @TODO: Add dates */}
        <p>
          <CalendarPlusIcon />
        </p>
        <input
          type="checkbox"
          className="accent-orange-500 size-7"
          checked={item.done}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
        <p>
          <CalendarCheckIcon />
        </p>
      </div>
    </div>
  );
}
