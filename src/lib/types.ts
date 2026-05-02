export type TodoItemType = {
  name: string;
  date_added: string;
  date_due: string;
  done: boolean;
};

export type TodoListType = {
  title: string;
  items: TodoItemType[];
};
