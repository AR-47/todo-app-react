import { newTodoInputProps } from "../interfaces";
import {
  FormControl,
  Input,
  Button,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "./TodoApp";

export function NewTodoInput({
  fetchAndStoreTodos,
}: newTodoInputProps): JSX.Element {
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");

  const handleAddNewTodo = () => {
    try {
      const currentDate = new Date();
      axios
        .post(baseUrl + "items", {
          description: newTodoDescription,
          status: "pending",
          creationDate: currentDate,
        })
        .then(() => {
          setNewTodoDescription("");
          fetchAndStoreTodos();
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="new-todo-form">
      <Center mt={8}>
        <FormControl>
          <InputGroup>
            <Input
              name="description"
              type="text"
              placeholder="Add a new task"
              variant="filled"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
            />
            <InputRightElement>
              <Button
                variant="ghost"
                colorScheme="gray"
                onClick={handleAddNewTodo}
              >
                <AddIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Center>
    </form>
  );
}
