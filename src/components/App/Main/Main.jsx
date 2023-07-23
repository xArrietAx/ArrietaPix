import dynamic from "next/dynamic";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import { Top } from "./Top";

const Grid = dynamic(() => import('./Grid'), {
  ssr: false,
  loading: () => <Box display={"flex"} alignItems={"center"} justifyContent={"center"} minH={"50vh"} >
    <Spinner size={"xl"} color='red.500' />
  </Box>,
})

export const Main = ({ PhotosList, onOpen }) => {
  return (
    <Flex flexDirection={"column"} w={"full"} overflow={"auto"}>
      <Top onOpen={onOpen} />
      <Grid PhotosList={PhotosList} />
    </Flex>
  );
};
