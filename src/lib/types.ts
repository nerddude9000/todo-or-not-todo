export type TodoItemType = {
  id: number;
  name: string;
  done: boolean;
  list_id: number;
  date_added: string;
};

export type TodoListType = {
  id: number;
  title: string;
};
