import { useEffect, useState } from "react";
import { TodoCard } from "./TodoCard";
import { data } from "../data";
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
    ? "https://adil-todo-app.onrender.com/items"
    : "http://localhost:5050/items";

export function TodoList(): JSX.Element {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        console.log(response);
        console.log("Entered the .then function");
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
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

  return (
    <div>
      {todos.map((todoItem: ITodo) => (
        <TodoCard key={todoItem.id} todo={todoItem} />
      ))}
    </div>
  );
}
