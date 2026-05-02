import { useState } from "react";
import type { TodoListType } from "./lib";
import TodoList from "./components/TodoList";
import { PopupKind, useAppState } from "./lib/stores";

export default function App() {
  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    // Dummy data
    {
      title: "Test",
      items: [
        {
          name: "Web Project",
          done: false,
          date_added: "2026-05-01",
          date_due: "2026-05-08",
        },
        {
          name: "Something else",
          done: true,
          date_added: "1850-10-01",
          date_due: "1922-01-15",
        },
      ],
    },
  ]);

  // @TODO: add api integration

  return (
    <>
      <header className="w-screen h-16 flex items-center justify-center bg-transparent text-stone-100">
        <a
          href="https://github.com/nerddude9000/todo-or-not-todo"
          target="_blank"
          className="font-light italic text-lg"
        >
          To do, or not to do...
        </a>
      </header>
      <main className="p-8 flex-1 flex items-stretch gap-16">
        {todoLists.map((list) => (
          <TodoList key={`todo_${list.title}`} list={list} />
        ))}
      </main>
    </>
  );
}
