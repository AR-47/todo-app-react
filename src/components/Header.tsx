import { Center, Heading } from "@chakra-ui/react";

export function Header(): JSX.Element {
  return (
    <Center h="100px">
      <Heading className="header" as="h1" size="3xl" mt="25px">
        CheckIt
      </Heading>
    </Center>
  );
}
