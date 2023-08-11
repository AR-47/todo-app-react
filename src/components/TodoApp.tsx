import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import axios from "axios";
import { sortByAscDates, sortByDescDates } from "../utils/compareTwoDates";

export interface ITodo {
  id: number;
  title: string;
  description: string;
  status: "completed" | "pending";
  creationDate: Date;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://adil-todo-app.onrender.com/"
    : "http://localhost:5050/";

export function TodoApp(): JSX.Element {
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newestLast");

  const pendingTodos = allTodos.filter(
    (todoItem: ITodo) => todoItem.status === "pending"
  );
  const completedTodos = allTodos.filter(
    (todoItem: ITodo) => todoItem.status === "completed"
  );

  async function fetchTodos() {
    try {
      const response = await axios.get(baseUrl + "items");
      const todos: ITodo[] = response.data;
      const sortedTodos: ITodo[] = [...todos];

      switch (sortBy) {
        case "newestLast":
          sortedTodos.sort((a, b) =>
            sortByAscDates(a.creationDate, b.creationDate)
          );
          break;
        case "newestFirst":
          sortedTodos.sort((a, b) =>
            sortByDescDates(a.creationDate, b.creationDate)
          );
          break;
        default:
          break;
      }

      setAllTodos(sortedTodos);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [sortBy]);

  const handleAddNewTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const currentDate = new Date();
    axios
      .post(baseUrl + "items", {
        title: newTodoTitle,
        description: newTodoDescription,
        status: "pending",
        creationDate: currentDate,
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

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "newestLast":
        setSortBy("newestLast");
        break;
      case "newestFirst":
        setSortBy("newestFirst");
        break;
      default:
        break;
    }
    fetchTodos();
  };

  return (
    <div>
      <form onSubmit={handleAddNewTodo}>
        <input
          name="title"
          type="text"
          value={newTodoTitle}
          placeholder="Enter a title"
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <br></br>

        <input
          name="description"
          type="text"
          value={newTodoDescription}
          placeholder="Enter the description"
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
        <br></br>

        <button type="submit">Add</button>
      </form>
      <h2>My to-do list</h2>
      <p>Sort by</p>
      <select name="sortPendingTodosBy" onChange={handleSortBy}>
        <option value="newestLast">Oldest to newest</option>
        <option value="newestFirst">Newest to oldest</option>
      </select>

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