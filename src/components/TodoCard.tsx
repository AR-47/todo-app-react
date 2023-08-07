import "../styles/todo.css";
import { ITodo } from "./TodoList";

interface todoCardProps {
  key: number;
  id: number;
  todo: ITodo;
  onDelete: (e: { preventDefault: () => void }, id: number) => void;
}

export function TodoCard({ id, todo, onDelete }: todoCardProps): JSX.Element {
  return (
    <div className="todo-card">
      <div className="todo-content">
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
      </div>
      <div className="todo-actions">
        <button>Mark as completed</button>
        <button>Edit</button>
        <button onClick={(e) => onDelete(e, id)}>Delete</button>
      </div>
    </div>
  );
}
