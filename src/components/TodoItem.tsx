import { useState } from "react";
import "../styles/todo.css";
import { ITodo } from "./TodoApp";

interface todoItemProps {
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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="todo-card">
      <div className="todo-content">
        <p>{todo.description}</p>
      </div>
      <div className="todo-actions">
        <button onClick={() => onUpdateStatus(id)}>
          {todo.status === "pending" ? "Mark as completed" : "Mark as pending"}
        </button>
        <button
          onClick={() => {
            console.log(`isEditing state in current render: ${isEditing}`);
            setIsEditing((prev) => (prev === false ? true : false));
          }}
        >
          Edit
        </button>
        <button onClick={(e) => onDelete(e, id)}>Delete</button>
      </div>
    </div>
  );
}
