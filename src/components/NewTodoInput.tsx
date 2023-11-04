import { newTodoInputProps } from "../interfaces";
import { FormControl, Input, Button, Center, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import "../styles/newTodoInput.css";

export function NewTodoInput({
  fetchAndStoreTodos,
}: newTodoInputProps): JSX.Element {
  const [newDescription, setNewDescription] = useState<string>("");
  const [newDueDate, setNewDueDate] = useState<string>("");

  function handleAddNewTodo() {
    try {
      axios
        .post(baseUrl + "items", {
          description: newDescription,
          dueDate: newDueDate,
        })
        .then(() => {
          setNewDescription("");
          setNewDueDate("");
          fetchAndStoreTodos();
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Center mt={8}>
      <FormControl className="new-todo-form">
        <Flex>
          <Input
            name="description"
            type="text"
            placeholder="What's on your mind..."
            variant="filled"
            value={newDescription}
            mr={1}
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <Input
            w="230px"
            size="md"
            type="date"
            variant="filled"
            mr={1}
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <Button onClick={handleAddNewTodo}>
            <AddIcon />
          </Button>
        </Flex>
      </FormControl>
    </Center>
  );
}
