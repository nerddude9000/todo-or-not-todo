import type { TodoItemType, TodoListType } from "./types";

export async function getTodoLists(): Promise<TodoListType[]> {
  const res = await fetch("http://localhost:8000/api.php?resource=lists", {
    method: "GET",
  });

  if (!res.ok) alert(`${res.status}: ${res.statusText}`);

  const data: TodoListType[] = await res.json();

  return data;
}

export async function postTodoList(): Promise<void> {
  const res = await fetch("http://localhost:8000/api.php?resource=lists", {
    method: "POST",
  });

  if (!res.ok) alert(`${res.status}: ${res.statusText}`);
}
