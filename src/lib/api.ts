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

export async function putTodoList({
  id,
  newTitle,
}: {
  id: number;
  newTitle: string;
}): Promise<void> {
  const res = await fetch("http://localhost:8000/api.php?resource=lists", {
    method: "PUT",
    body: JSON.stringify({
      id,
      title: newTitle,
    }),
  });

  if (!res.ok) alert(`${res.status}: ${res.statusText}`);
}

export async function deleteTodoList({ id }: { id: number }): Promise<void> {
  const res = await fetch("http://localhost:8000/api.php?resource=lists", {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
  });

  if (!res.ok) alert(`${res.status}: ${res.statusText}`);
}

export async function getTodoTasks(id: number): Promise<TodoItemType[]> {
  const res = await fetch(
    `http://localhost:8000/api.php?resource=tasks&list_id=${id}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) alert(`${res.status}: ${res.statusText}`);

  const data: TodoItemType[] = await res.json();

  return data;
}

export async function postTodoTask({
  list_id,
}: {
  list_id: number;
}): Promise<void> {
  const res = await fetch("http://localhost:8000/api.php?resource=tasks", {
    method: "POST",
    body: JSON.stringify({
      list_id,
    }),
  });

  if (!res.ok) alert(`${res.status}: ${res.statusText}`);
}

export async function putTodoTask({
  id,
  name,
  done,
}: {
  id: number;
  name?: string;
  done?: boolean;
}): Promise<void> {
  const res = await fetch("http://localhost:8000/api.php?resource=tasks", {
    method: "PUT",
    body: JSON.stringify({
      id,
      name,
      done,
    }),
  });

  if (!res.ok) alert(`${res.status}: ${res.statusText}`);
}

export async function deleteTodoTask({ id }: { id: number }): Promise<void> {
  const res = await fetch("http://localhost:8000/api.php?resource=tasks", {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
  });

  if (!res.ok) alert(`${res.status}: ${res.statusText}`);
}
