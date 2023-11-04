export interface ITodo {
  id: number;
  description: string;
  status: "completed" | "pending";
  creationDate: Date;
  dueDate: Date;
}

export interface newTodoInputProps {
  fetchAndStoreTodos: () => Promise<void>;
}

export interface todosTableProps {
  sortedTodos: ITodo[];
  fetchAndStoreTodos: () => Promise<void>;
}

export interface editableInputAreaProps {
  todo: ITodo;
  fetchAndStoreTodos: () => Promise<void>;
}
