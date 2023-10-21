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
  refreshTodos: () => Promise<void>;
}

export interface newTodoInputProps {
  newTodo: string;
  onSubmitNewTodo: (e: { preventDefault: () => void }) => void;
  setNewTodo: (newTodo: string) => void;
}
