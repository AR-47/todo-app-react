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

export function EditableTextArea({
  todo,
  fetchAndStoreTodos,
}: editableInputAreaProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskDescription, setTaskDescription] = useState<string>(
    todo.description
  );

  const handleEditDescription = () => {
    axios
      .patch(`${baseUrl}items/${todo.id}`, {
        description: taskDescription,
      })
      .then(() => {
        fetchAndStoreTodos();
        setIsEditing(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box onClick={() => setIsEditing(true)}>
      {isEditing === false ? (
        <Text>{todo.description}</Text>
      ) : (
        <FormControl>
          <InputGroup>
            <Input
              name="description"
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <InputRightElement>
              <Button onClick={handleEditDescription}>
                <EditIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      )}
    </Box>
  );
}
