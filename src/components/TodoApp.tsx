import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import axios from "axios";
import { sortByAscDates, sortByDescDates } from "../utils/compareTwoDates";
import { ITodo } from "../interfaces";
import { NewTodoInput } from "./NewTodoInput";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import "../styles/todoApp.css";
import { Header } from "./Header";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://todo-app-staging.onrender.com"
    : "http://localhost:4000/";

type sortByState = "addedFirst" | "addedLast";

export function TodoApp(): JSX.Element {
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);
  const [sortBy, setSortBy] = useState<sortByState>("addedFirst");

  useEffect(() => {
    fetchAndStoreTodos();
  }, []);

  const pendingTodos = allTodos.filter(
    (todoItem: ITodo) => todoItem.status === "pending"
  );
  const completedTodos = allTodos.filter(
    (todoItem: ITodo) => todoItem.status === "completed"
  );

  const compareFunctions = {
    addedFirst: (a: ITodo, b: ITodo) =>
      sortByAscDates(a.creationDate, b.creationDate),
    addedLast: (a: ITodo, b: ITodo) =>
      sortByDescDates(a.creationDate, b.creationDate),
  };

  const [sortedPendingTodos, sortedCompletedTodos] = sortTodos();

  async function fetchAndStoreTodos() {
    try {
      const response = await axios.get(baseUrl + "items");
      const todos: ITodo[] = response.data;
      setAllTodos(todos);
    } catch (error) {
      console.error(error);
    }
  }

  function sortTodos() {
    const compareFunction = compareFunctions[sortBy];
    return [
      [...pendingTodos].sort(compareFunction),
      [...completedTodos].sort(compareFunction),
    ];
  }

  const handleDeleteTodo = (id: number) => {
    axios
      .delete(`${baseUrl}items/${id}`)
      .then(() => {
        console.log(`Deleted todo with ID: ${id}`);
        fetchAndStoreTodos();
      })
      .catch((error) =>
        console.log(`error found in handleDelete todo ${error}`)
      );
  };

  const handleUpdateStatus = (id: number) => {
    const todoWithGivenId = allTodos.find(
      (todoItem: ITodo) => todoItem.id === id
    ) as ITodo;

    if (todoWithGivenId.status === "pending") {
      axios
        .patch(`${baseUrl}items/${id}`, {
          description: todoWithGivenId.description,
          status: "completed",
        })
        .then(() => fetchAndStoreTodos())
        .catch((error) => console.log(error));
    } else {
      axios
        .patch(`${baseUrl}items/${id}`, {
          description: todoWithGivenId.description,
          status: "pending",
        })
        .then(() => fetchAndStoreTodos())
        .catch((error) => console.log(error));
    }
  };

  const handleSorting = (sortMethod: string) => {
    switch (sortMethod) {
      case "addedFirst":
        setSortBy("addedFirst");
        break;
      case "addedLast":
        setSortBy("addedLast");
        break;
      default:
        break;
    }
  };

  return (
    <div className="todo-app">
      <Flex direction="column">
        <Header />
        <NewTodoInput fetchAndStoreTodos={fetchAndStoreTodos} />
        <Flex justify="right" align="center" mt={2}>
          <Box w="80px">Sort by</Box>
          <Box w="150px">
            <Select
              name="sortTodosBy"
              onChange={(e) => handleSorting(e.target.value)}
            >
              <option value="addedFirst">Oldest first</option>
              <option value="addedLast">Newest first</option>
            </Select>
          </Box>
        </Flex>

        <Box>
          <Text>Pending</Text>
          {sortedPendingTodos.map((todoItem: ITodo) => (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              todo={todoItem}
              onDelete={handleDeleteTodo}
              onUpdateStatus={handleUpdateStatus}
              fetchAndStoreTodos={fetchAndStoreTodos}
            />
          ))}
        </Box>
        <Box>
          <Text>Completed</Text>
          {sortedCompletedTodos.map((todoItem: ITodo) => (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              todo={todoItem}
              onDelete={handleDeleteTodo}
              onUpdateStatus={handleUpdateStatus}
              fetchAndStoreTodos={fetchAndStoreTodos}
            />
          ))}
        </Box>
      </Flex>
    </div>
  );
}
