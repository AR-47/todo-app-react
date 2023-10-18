import { newTodoInputProps } from "../interfaces";
import { FormControl, Input, Button, Center } from "@chakra-ui/react";
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
          <Input
            name="description"
            type="text"
            placeholder="Add a new task"
            variant="filled"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button variant="solid" colorScheme="gray" type="submit">
            Add
          </Button>
        </FormControl>
      </Center>
    </form>
  );
}
