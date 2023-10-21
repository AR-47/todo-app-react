import "../styles/todoItem.css";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "./TodoApp";
import { todoItemProps } from "../interfaces";
import {
  Button,
  Input,
  FormControl,
  Box,
  HStack,
  Text,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons";

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

  const handleEditTodo = () => {
    axios
      .patch(`${baseUrl}items/${id}`, {
        description: updatedTodoDescription,
        status: todo.status,
      })
      .then(() => {
        refreshTodos();
      })
      .catch((error) =>
        console.log(`Caught error in handleEditTodo > patch request: ${error}`)
      );
    setIsEditing((prev) => (prev === true ? false : true));
  };

  return (
    <Flex justify="space-between" className="todo-card">
      <Box className="todo-content">
        {isEditing === false ? (
          <Text fontSize="2xl">{todo.description}</Text>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditTodo();
            }}
          >
            <FormControl>
              <InputGroup w="100%">
                <Input
                  name="description"
                  type="text"
                  value={updatedTodoDescription}
                  onChange={(e) => setUpdatedTodoDescription(e.target.value)}
                />
                <InputRightElement>
                  <Button type="submit">
                    <CheckIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </form>
        )}
      </Box>
      <Box className="todo-actions">
        <HStack spacing="3" direction="row" align="center">
          <Button
            onClick={() => {
              setIsEditing((prev) => (prev === false ? true : false));
              setUpdatedTodoDescription(todo.description);
            }}
          >
            {isEditing === false ? <EditIcon /> : <CloseIcon />}
          </Button>
          {isEditing === false && (
            <Button onClick={() => onUpdateStatus(id)}>
              {todo.status === "pending" ? <CheckIcon /> : <RepeatClockIcon />}
            </Button>
          )}
          <Button onClick={(e) => onDelete(id)}>
            <DeleteIcon />
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
}
