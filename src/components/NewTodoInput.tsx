import { newTodoInputProps } from "../interfaces";
import { FormControl, Input, Button } from "@chakra-ui/react";

export function NewTodoInput({
  onSubmitNewTodo,
  newTodo,
  setNewTodo,
}: newTodoInputProps): JSX.Element {
  return (
    <form onSubmit={onSubmitNewTodo}>
      <FormControl>
        <Input
          name="description"
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="solid" colorScheme="gray" type="submit">
          Add
        </Button>
      </FormControl>
    </form>
  );
}
