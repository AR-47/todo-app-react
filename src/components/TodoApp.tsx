import { useEffect, useState } from "react";
import { ITodo } from "../interfaces";
import { TodoItem } from "./TodoItem";
import { NewTodoInput } from "./NewTodoInput";
import { Header } from "./Header";
import axios from "axios";
import { sortByAscDates, sortByDescDates } from "../utils/compareTwoDates";
import { baseUrl } from "../utils/baseUrl";
import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";
import "../styles/todoApp.css";
import { FaClipboardList, FaCircleCheck } from "react-icons/fa6";

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

        <Flex justify="right" align="center" mt={2} mb={5}>
          <Text as="b" w="80px">
            Sort by
          </Text>
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

        <Center>
          {allTodos.length === 0 && (
            <Heading as="h2" size={"lg"}>
              Your to-do list is empty
            </Heading>
          )}
        </Center>

        <Box>
          {sortedPendingTodos.length > 0 && (
            <HStack>
              <FaClipboardList />
              <Heading as="h2" size={"lg"}>
                Ongoing
              </Heading>
            </HStack>
          )}
          {sortedPendingTodos.map((todoItem: ITodo) => (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              todo={todoItem}
              handleUpdateStatus={handleUpdateStatus}
              fetchAndStoreTodos={fetchAndStoreTodos}
            />
          ))}
        </Box>

        <Box>
          {sortedCompletedTodos.length > 0 && (
            <HStack>
              <FaCircleCheck />
              <Heading as="h2" size={"lg"}>
                Completed
              </Heading>
            </HStack>
          )}
          {sortedCompletedTodos.map((todoItem: ITodo) => (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              todo={todoItem}
              handleUpdateStatus={handleUpdateStatus}
              fetchAndStoreTodos={fetchAndStoreTodos}
            />
          ))}
        </Box>
      </Flex>
    </div>
  );
}
