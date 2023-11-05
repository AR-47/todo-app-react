import { useState } from "react";
import { editableInputAreaProps } from "../interfaces";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

export function EditableDateArea({
  todo,
  fetchAndStoreTodos,
}: editableInputAreaProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<string>(todo.dueDate.toString());

  const handleEditDueDate = () => {
    axios
      .patch(`${baseUrl}items/${todo.id}`, {
        dueDate: dueDate,
      })
      .then(() => {
        fetchAndStoreTodos();
        setIsEditing(false);
      })
      .catch((error) => console.log(error));
  };

  const dd = new Date(todo.dueDate).getDate().toString().padStart(2, "0");
  const mm = (new Date(todo.dueDate).getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const yyyy = new Date(todo.dueDate).getFullYear();
  const formattedDueDate = dd + "/" + mm + "/" + yyyy;

  return (
    <Box onClick={() => setIsEditing(true)}>
      {isEditing === false ? (
        <Text>{formattedDueDate}</Text>
      ) : (
        <FormControl>
          <InputGroup>
            <Input
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <InputRightElement>
              <Button onClick={handleEditDueDate}>
                <EditIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      )}
    </Box>
  );
}
