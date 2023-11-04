import axios from "axios";
import { ITodo, todosTableProps } from "../interfaces";
import {
  Button,
  Box,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { baseUrl } from "../utils/baseUrl";
import { EditableTextArea } from "./EditableTextArea";
import { EditableDateArea } from "./EditableDateArea";

export function TodosTable({
  sortedTodos,
  fetchAndStoreTodos,
}: todosTableProps): JSX.Element {
  const handleUpdateStatus = (todo: ITodo) => {
    const newStatus = todo.status === "pending" ? "completed" : "pending";
    axios
      .patch(`${baseUrl}items/${todo.id}`, {
        status: newStatus,
      })
      .then(() => fetchAndStoreTodos())
      .catch((error) => console.log(error));
  };

  const handleDeleteTodo = (id: number) => {
    axios
      .delete(`${baseUrl}items/${id}`)
      .then(() => {
        fetchAndStoreTodos();
      })
      .catch((error) => console.log(error));
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Task</Th>
            <Th>Due Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedTodos.map((todo: ITodo) => (
            <Tr key={todo.id}>
              <Td w="65%">
                <EditableTextArea
                  todo={todo}
                  fetchAndStoreTodos={fetchAndStoreTodos}
                ></EditableTextArea>
              </Td>
              <Td>
                <EditableDateArea
                  todo={todo}
                  fetchAndStoreTodos={fetchAndStoreTodos}
                ></EditableDateArea>
              </Td>
              <Td>
                <Box className="todo-actions">
                  <HStack spacing="3" direction="row" align="center">
                    <Button onClick={() => handleUpdateStatus(todo)}>
                      {todo.status === "pending" ? (
                        <CheckIcon />
                      ) : (
                        <RepeatClockIcon />
                      )}
                    </Button>
                    <Button onClick={(e) => handleDeleteTodo(todo.id)}>
                      <DeleteIcon />
                    </Button>
                  </HStack>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
