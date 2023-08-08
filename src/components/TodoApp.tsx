import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import axios from "axios";

export interface ITodo {
  id: number;
  title: string;
  description: string;
  status: "completed" | "pending";
  creationDate: string;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://adil-todo-app.onrender.com/"
    : "http://localhost:5050/";

export function TodoApp(): JSX.Element {
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");

  const pendingTodos = allTodos.filter(
    (todoItem: ITodo) => todoItem.status === "pending"
  );
  const completedTodos = allTodos.filter(
    (todoItem: ITodo) => todoItem.status === "completed"
  );

  const fetchTodos = () => {
    axios
      .get(baseUrl + "items")
      .then((response) => {
        setAllTodos(response.data);
      })
      .catch((error) => console.log(`Caught error in fetchTodos: ${error}`));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddNewTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post(baseUrl + "items", {
        title: newTodoTitle,
        description: newTodoDescription,
        status: "pending",
        creationDate: "07-08-23",
      })
      .then(() => {
        setNewTodoTitle("");
        setNewTodoDescription("");
        fetchTodos();
      })
      .catch((error) =>
        console.log(`Caught error in handleAddNewTodo: ${error}`)
      );
  };

  const handleDeleteTodo = (e: { preventDefault: () => void }, id: number) => {
    e.preventDefault();
    axios
      .delete(`${baseUrl}items/${id}`)
      .then(() => {
        console.log(`Deleted todo with ID: ${id}`);
        fetchTodos();
      })
      .catch((error) =>
        console.log(`Caught error in delete request: ${error}`)
      );
  };

  const handleUpdateStatus = (id: number) => {
    debugger;
    const todoWithGivenId = allTodos.find(
      (todoItem: ITodo) => todoItem.id === id
    ) as ITodo;

    if (todoWithGivenId.status === "pending") {
      axios
        .patch(`${baseUrl}items/${id}}`, {
          status: "completed",
        })
        .then(() => fetchTodos())
        .catch((error) =>
          console.log(
            `Caught error in handleUpdateStatus > pending > patch request: ${error}`
          )
        );
    } else {
      axios
        .patch(`${baseUrl}items/${id}}`, {
          status: "pending",
        })
        .then(() => fetchTodos())
        .catch((error) =>
          console.log(
            `Caught error in handleUpdateStatus > completed > patch request: ${error}`
          )
        );
    }
  };

  return (
    <div>
      <button className="create-new-todo-btn">+</button>
      <br></br>
      <form onSubmit={handleAddNewTodo}>
        <label htmlFor="title">Enter a title: </label>
        <input
          name="title"
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <br></br>

        <label htmlFor="description">Enter the description: </label>
        <input
          name="description"
          type="text"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
        <br></br>

        <button type="submit">Submit</button>
      </form>
      <h2>My to-do list</h2>
      {pendingTodos.map((todoItem: ITodo) => (
        <TodoItem
          key={todoItem.id}
          id={todoItem.id}
          todo={todoItem}
          onDelete={handleDeleteTodo}
          onUpdateStatus={handleUpdateStatus}
        />
      ))}
      <h2>Completed</h2>
      {completedTodos.map((todoItem: ITodo) => (
        <TodoItem
          key={todoItem.id}
          id={todoItem.id}
          todo={todoItem}
          onDelete={handleDeleteTodo}
          onUpdateStatus={handleUpdateStatus}
        />
      ))}
    </div>
  );
}
