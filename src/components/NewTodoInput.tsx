import { newTodoInputProps } from "../interfaces";
import {
  FormControl,
  Input,
  Button,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import "../styles/newTodoInput.css";

export function NewTodoInput({
  onSubmitNewTodo,
  newTodo,
  setNewTodo,
}: newTodoInputProps): JSX.Element {
  return (
    <form className="new-todo-form" onSubmit={onSubmitNewTodo}>
      <Center>
        <FormControl>
          <InputGroup>
            <Input
              name="description"
              type="text"
              placeholder="Add a new task"
              variant="filled"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <InputRightElement>
              <Button variant="solid" colorScheme="gray" type="submit">
                Add
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Center>
    </form>
  );
}
