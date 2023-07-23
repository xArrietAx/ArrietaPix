import Head from "next/head";
import { Flex, Box } from "@chakra-ui/react";
import Stats from "@/components/Stats.jsx";
import { Hero } from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Flex
        flexDirection={"column"}
        minH={"100vh"}
        bg={"blackAlpha.900"}
        bgImage={
          "https://images.unsplash.com/photo-1483401757487-2ced3fa77952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
        }
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
      >
        <Hero />
        <Box as={"footer"} mt={"auto"} p={5} bg={"blackAlpha.600"}>
          <Stats />
        </Box>
      </Flex>
    </>
  );
}
