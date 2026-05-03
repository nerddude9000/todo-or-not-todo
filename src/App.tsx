import TodoList from "./components/TodoList";
import {
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getTodoLists, postTodoList } from "./lib/api";

export default function App() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["lists"], queryFn: getTodoLists });

  const mutation = useMutation({
    mutationFn: postTodoList,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <header className="w-screen h-16 flex items-center justify-center bg-transparent text-stone-100">
        <a
          href="https://github.com/nerddude9000/todo-or-not-todo"
          target="_blank"
          className="font-light italic text-lg"
        >
          To do, or not to do...
        </a>
      </header>
      <main className="p-8 flex-1 flex items-stretch gap-16 max-w-none">
        {query.data?.map((list) => (
          <TodoList key={`todo_${list.id}`} list={list} />
        ))}
        <button
          className="bg-orange-800 text-stone-200 w-sm min-h-24 text-xl font-semibold self-start rounded-2xl"
          onClick={() => mutation.mutate()}
        >
          Create a new list
        </button>
      </main>
    </QueryClientProvider>
  );
}
