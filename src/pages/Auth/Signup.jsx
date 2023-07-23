import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Container
} from '@chakra-ui/react';
import { Form } from "@/components/Forms/FormSignup.jsx";

export default function Signup() {
  return (
  <>
  <Head>
        <title>Signup</title>
      </Head>
      <Box bg={"blackAlpha.900"} bgImage={"https://images.unsplash.com/photo-1483401757487-2ced3fa77952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"} bgSize={"cover"} bgRepeat={"no-repeat"}>
      <Container maxW={"4xl"}>
      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
     >
      <Stack w={"full"} maxW={"xl"} py={12}>
        <Stack>
          <Heading fontSize={"4xl"} textColor={"white"} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} textAlign={"center"} textColor={"gray.400"} >
            To enjoy all of our cool features
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'xl'}
          p={8}>
            <Form />
            <Stack pt={6}>
              <Text align={'center'} textColor={"white"}>
                Already have an account? <Link href={"/Auth/Signin"} style={{color:"skyblue"}} >Sign in</Link>
              </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </Container>
      </Box>
  </>
  );
}