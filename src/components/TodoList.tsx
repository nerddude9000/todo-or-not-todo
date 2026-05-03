import clsx from "clsx";
import type { TodoListType } from "../lib/types";
import TodoItem from "./TodoItem";
import { useState } from "react";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTodoList,
  getTodoTasks,
  postTodoTask,
  putTodoList,
} from "../lib/api";

interface Props {
  list: TodoListType;
  className?: string;
}

export default function TodoList({ list, className }: Props) {
  const [title, setTitle] = useState(list.title);

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["tasks", list.id],
    queryFn: () => getTodoTasks(list.id),
  });

  const mutationUpdate = useMutation({
    mutationFn: putTodoList,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
  });

  const mutationDelete = useMutation({
    mutationFn: deleteTodoList,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
  });

  const mutationAddTask = useMutation({
    mutationFn: postTodoTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", list.id] }),
  });

  const onTitleChange = (newTitle: string) => {
    mutationUpdate.mutate({ id: list.id, newTitle });
    setTitle(newTitle);
  };

  const onDelete = () => {
    mutationDelete.mutate({ id: list.id });
  };

  return (
    <div
      className={clsx(
        "relative w-sm overflow-y-auto flex flex-col items-stretch gap-2 rounded-2xl bg-stone-900 text-zinc-100 group",
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
        className="clear-input text-stone-400 p-4 rounded-t-lg text-4xl font-bold group-hover:text-stone-50"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <div className="flex flex-col items-stretch gap-4 p-4">
        {query.data?.map((item) => (
          <TodoItem key={`todo_item_${item.id}`} item={item} />
        ))}
        <button
          className="flex items-center justify-center bg-stone-800 text-stone-200 w-full min-h-16 text-xl font-semibold self-start rounded-xl shadow"
          onClick={() => mutationAddTask.mutate({ list_id: list.id })}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
