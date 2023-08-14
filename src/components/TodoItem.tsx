import { useState } from "react";
import "../styles/todo.css";
import { ITodo, baseUrl } from "./TodoApp";
import axios from "axios";

interface todoItemProps {
  id: number;
  todo: ITodo;
  onDelete: (e: { preventDefault: () => void }, id: number) => void;
  onUpdateStatus: (id: number) => void;
  refreshTodos: () => Promise<void>;
}

export function TodoItem({
  id,
  todo,
  onDelete,
  onUpdateStatus,
  refreshTodos,
}: todoItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedTodoDescription, setUpdatedTodoDescription] = useState<string>(
    todo.description
  );

  const handleEditTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .patch(`${baseUrl}items/${id}}`, { description: updatedTodoDescription })
      .then(() => refreshTodos())
      .catch((error) =>
        console.log(`Caught error in handleEditTodo > patch request: ${error}`)
      );
    setIsEditing((prev) => (prev === true ? false : true));
  };

  return (
    <div className="todo-card">
      <div className="todo-content">
        {isEditing === false ? (
          <p>{todo.description}</p>
        ) : (
          <form onSubmit={handleEditTodo}>
            <input
              name="description"
              type="text"
              value={updatedTodoDescription}
              onChange={(e) => setUpdatedTodoDescription(e.target.value)}
            />
            <button type="submit">Edit</button>
          </form>
        )}
      </div>
      <div className="todo-actions">
        <button onClick={() => onUpdateStatus(id)}>
          {todo.status === "pending" ? "Mark as completed" : "Mark as pending"}
        </button>
        <button
          onClick={() => {
            setIsEditing((prev) => (prev === false ? true : false));
          }}
        >
          {isEditing === false ? "Edit" : "Cancel"}
        </button>
        {!isEditing && <button onClick={(e) => onDelete(e, id)}>Delete</button>}
      </div>
    </div>
  );
}
