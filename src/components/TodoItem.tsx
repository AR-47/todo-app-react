import "../styles/todoItem.css";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "./TodoApp";
import { todoItemProps } from "../interfaces";

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
      .patch(`${baseUrl}items/${id}`, {
        description: updatedTodoDescription,
        status: todo.status,
      })
      .then(() => {
        console.log("in the .then of the axios patch handler function");
        refreshTodos();
      })
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
        <button
          onClick={() => onUpdateStatus(id)}
          className="btn btn-primary btn-sm"
        >
          {todo.status === "pending" ? "Mark as completed" : "Mark as pending"}
        </button>
        <button
          onClick={() => {
            setIsEditing((prev) => (prev === false ? true : false));
            setUpdatedTodoDescription(todo.description);
          }}
          className="btn btn-warning btn-sm"
        >
          {isEditing === false ? "Update" : "Cancel"}
        </button>
        {!isEditing && (
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => onDelete(e, id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
