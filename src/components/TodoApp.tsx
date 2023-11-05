import { useEffect, useState } from "react";
import { ITodo } from "../interfaces";
import { TodosTable } from "./TodosTable";
import { NewTodoInput } from "./NewTodoInput";
import { Header } from "./Header";
import axios from "axios";
import { sortByAscDates, sortByDescDates } from "../utils/compareTwoDates";
import { baseUrl } from "../utils/baseUrl";
import { Box, Center, Flex, Heading, Select, Text } from "@chakra-ui/react";
import "../styles/todoApp.css";

type sortByState = "addedFirst" | "addedLast" | "dueFirst" | "dueLast";

export function TodoApp(): JSX.Element {
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);
  const [sortBy, setSortBy] = useState<sortByState>("addedFirst");

  useEffect(() => {
    fetchAndStoreTodos();
  }, []);

  const compareFunctions = {
    addedFirst: (a: ITodo, b: ITodo) =>
      sortByAscDates(a.creationDate, b.creationDate),
    addedLast: (a: ITodo, b: ITodo) =>
      sortByDescDates(a.creationDate, b.creationDate),
    dueFirst: (a: ITodo, b: ITodo) => sortByAscDates(a.dueDate, b.dueDate),
    dueLast: (a: ITodo, b: ITodo) => sortByDescDates(a.dueDate, b.dueDate),
  };

  const sortedTodos = sortTodos();

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
    return [...allTodos].sort(compareFunction);
  }

  function handleSorting(sortMethod: string) {
    switch (sortMethod) {
      case "addedFirst":
        setSortBy("addedFirst");
        break;
      case "addedLast":
        setSortBy("addedLast");
        break;
      case "dueFirst":
        setSortBy("dueFirst");
        break;
      case "dueLast":
        setSortBy("dueLast");
        break;
      default:
        break;
    }
  }

  return (
    <Flex direction="column" className="todo-app">
      <Header />
      <NewTodoInput fetchAndStoreTodos={fetchAndStoreTodos} />

      <Flex justify="left" align="center" mt={2} mb={5}>
        <Text as="b" w="80px">
          Sort by
        </Text>
        <Box w="250px">
          <Select
            name="sortTodosBy"
            onChange={(e) => handleSorting(e.target.value)}
          >
            <option value="addedFirst">Created time: Oldest to newest</option>
            <option value="addedLast">Created time: Newest to oldest</option>
            <option value="dueFirst">Due time: First to last</option>
            <option value="dueLast">Due time: Last to first</option>
          </Select>
        </Box>
      </Flex>

      {allTodos.length === 0 ? (
        <Center>
          <Heading as="h2" size={"lg"}>
            Your to-do list is empty
          </Heading>
        </Center>
      ) : (
        <TodosTable
          sortedTodos={sortedTodos}
          fetchAndStoreTodos={fetchAndStoreTodos}
        />
      )}
    </Flex>
  );
}
