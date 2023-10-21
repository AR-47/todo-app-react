export interface ITodo {
  id: number;
  description: string;
  status: "completed" | "pending";
  creationDate: Date;
}

export interface todoItemProps {
  id: number;
  todo: ITodo;
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number) => void;
  fetchAndStoreTodos: () => Promise<void>;
}

export interface newTodoInputProps {
  fetchAndStoreTodos: () => Promise<void>;
}
