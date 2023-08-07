import { useEffect, useState } from "react";
import { TodoCard } from "./TodoCard";
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

export function TodoList(): JSX.Element {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");

  useEffect(() => {
    axios
      .get(baseUrl + "items")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(`Caught error in useEffect: ${error}`));
  }, [todos]);

  //   () => {
  // const fetchTodos = async () => {
  //   try {
  //     const response = await axios.get(baseUrl);
  //     console.log(response);
  //     console.log("ENTERED TRY BLOCK");
  //   } catch (error) {
  //     console.log(error);
  //     console.log("ENTERED CATCH BLOCK");
  //   }
  // };
  // fetchTodos();}

  const handleAddNewTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post(baseUrl + "items", {
        title: newTodoTitle,
        description: newTodoDescription,
        status: "pending",
        creationDate: "07-08-23",
      })
      .then(function (response) {
        console.log(response);
        setNewTodoTitle("");
        setNewTodoDescription("");
      })
      .catch((error) =>
        console.log(`Caught error in handleAddNewTodo: ${error}`)
      );
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

      {todos.map((todoItem: ITodo) => (
        <TodoCard key={todoItem.id} todo={todoItem} />
      ))}
    </div>
  );
}
