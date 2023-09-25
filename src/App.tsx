import { ChakraProvider } from "@chakra-ui/react";
import { TodoApp } from "./components/TodoApp";

function App(): JSX.Element {
  return (
    <ChakraProvider>
      <TodoApp />
    </ChakraProvider>
  );
}

export default App;
