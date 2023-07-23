import { Container, Grid, Flex, Spinner } from "@chakra-ui/react";
import { Left } from "./Left";
import dynamic from "next/dynamic";

const Right = dynamic(() => import("./Right"), {
  ssr: false,
  loading: () => (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Spinner size={"xl"} color="red.400" />
    </Flex>
  ),
});

export const Hero = () => {
  return (
    <Container w={"98%"} maxW={"7xl"} py={5} mb={16}>
      <Grid
        minH={"70vh"}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        alignItems={"center"}
        gap={5}
      >
        <Left />
        <Right />
      </Grid>
    </Container>
  );
};
