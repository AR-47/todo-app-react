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
} from "@chakra-ui/react";

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
        refreshTodos();
      })
      .catch((error) =>
        console.log(`Caught error in handleEditTodo > patch request: ${error}`)
      );
    setIsEditing((prev) => (prev === true ? false : true));
  };

  return (
    <Box className="todo-card">
      <Box className="todo-content">
        {isEditing === false ? (
          <Text fontSize="2xl">{todo.description}</Text>
        ) : (
          <HStack direction="row">
            <form onSubmit={handleEditTodo}>
              <FormControl>
                <Input
                  name="description"
                  type="text"
                  value={updatedTodoDescription}
                  onChange={(e) => setUpdatedTodoDescription(e.target.value)}
                />
                <Button type="submit">Edit</Button>
              </FormControl>
            </form>
          </HStack>
        )}
      </Box>
      <Box className="todo-actions">
        <HStack spacing="3" direction="row" align="center">
          <Button onClick={() => onUpdateStatus(id)}>
            {todo.status === "pending"
              ? "Mark as completed"
              : "Mark as pending"}
          </Button>
          <Button
            onClick={() => {
              setIsEditing((prev) => (prev === false ? true : false));
              setUpdatedTodoDescription(todo.description);
            }}
          >
            {isEditing === false ? "Update" : "Cancel"}
          </Button>
          {!isEditing && (
            <Button onClick={(e) => onDelete(e, id)}>Delete</Button>
          )}
        </HStack>
      </Box>
    </Box>
  );
}
