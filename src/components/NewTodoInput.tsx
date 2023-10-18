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

export function NewTodoInput({
  onSubmitNewTodo,
  newTodo,
  setNewTodo,
}: newTodoInputProps): JSX.Element {
  return (
    <form className="new-todo-form" onSubmit={onSubmitNewTodo}>
      <Center mt={8}>
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
              <Button variant="ghost" colorScheme="gray" type="submit">
                <AddIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Center>
    </form>
  );
}
