import "../styles/todo.css";
import { ITodo } from "./TodoList";

interface todoCardProps {
  key: number;
  todo: ITodo;
}

export function TodoCard({ todo }: todoCardProps): JSX.Element {
  return (
    <div className="todo-card">
      <div className="todo-content">
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
      </div>
      <div className="todo-actions">
        <button>Mark as completed</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
