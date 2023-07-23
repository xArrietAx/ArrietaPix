import {
  Tag,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  GridItem,
} from "@chakra-ui/react";
import Link from "next/link";

export const Left = () => {
  return (
    <GridItem>
      <Stack spacing={3}>
        <Heading
          textColor={"white"}
          fontSize={{ base: "5xl", lg: "6xl" }}
        >
          The best way to{" "}
          <Text as={"span"} textColor={"red.400"}>
            REMEMBER
          </Text>
        </Heading>
        <Text fontWeight={"semibold"} textColor={"gray.400"}>
          With ArrietaPix, organize your photos into personalized galleries,
          explore our image collections, and share your memories with friends
          and family. Keep your memories organized and accessible at all times
          with ArrietaPix. Welcome!
        </Text>
      </Stack>
      <Stack spacing={10}>
        <Button
          as={Link}
          href={"/Auth/Signin"}
          w={"fit-content"}
          mt={4}
          bg={"red.400"}
          rounded={0}
          fontSize={{base:"sm", sm:"md"}}
          textColor={"white"}
          _hover={{ bg: "red.500" }}
        >
          GET STARTED
        </Button>
        <Flex justifyContent={"center"}>
          <Tag w={"fit-content"} p={2} textColor={"white"} bg={"gray.800"}>
            Save your best moments in the best place!
          </Tag>
        </Flex>
      </Stack>
    </GridItem>
  );
};
