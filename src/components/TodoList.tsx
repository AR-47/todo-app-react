import { useState } from "react";
import { TodoCard } from "./TodoCard";
import { data } from "../data";

export interface ITodo {
  id: number;
  title: string;
  description: string;
  status: "completed" | "pending";
  creationDate: string;
}

export function TodoList(): JSX.Element {
  const [todos, setTodos] = useState<ITodo[]>(data);

  return (
    <div>
      {todos.map((todoItem: ITodo) => (
        <TodoCard key={todoItem.id} todo={todoItem} />
      ))}
    </div>
  );
}
