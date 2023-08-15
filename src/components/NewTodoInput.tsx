import { newTodoInputProps } from "../interfaces";

export function NewTodoInput({
  onSubmitNewTodo,
  newTodo,
  setNewTodo,
}: newTodoInputProps): JSX.Element {
  return (
    <form onSubmit={onSubmitNewTodo}>
      <input
        name="description"
        type="text"
        placeholder="Add a new task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit" className="btn btn-success btn-sm">
        Add
      </button>
    </form>
  );
}
