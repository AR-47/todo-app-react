import "../styles/todo.css";
import { ITodo } from "./TodoApp";

interface todoItemProps {
  key: number;
  id: number;
  todo: ITodo;
  onDelete: (e: { preventDefault: () => void }, id: number) => void;
  onUpdateStatus: (id: number) => void;
}

export function TodoItem({
  id,
  todo,
  onDelete,
  onUpdateStatus,
}: todoItemProps): JSX.Element {
  return (
    <div className="todo-card">
      <div className="todo-content">
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
      </div>
      <div className="todo-actions">
        <button onClick={() => onUpdateStatus(id)}>
          {todo.status === "pending" ? "Mark as completed" : "Mark as pending"}
        </button>
        <button>Edit</button>
        <button onClick={(e) => onDelete(e, id)}>Delete</button>
      </div>
    </div>
  );
}
