import Link from "next/link"
import { Flex, Text } from "@chakra-ui/react";
import { AlbumsContainer } from "./AlbumsContainer";

export const Middle = ({onClose}) => {
  return (
    <Flex flexDirection={"column"} mt={4} bg={"gray.900"} >
        <Text as={Link} href={"/Dashboard"} px={2} py={4} textColor={"white"} fontSize={{base:"md", "2xl":"xl"}} fontWeight={"semibold"} cursor={"pointer"} _hover={{
            bg:"gray.700"
        }} onClick={onClose}>All</Text>
        <AlbumsContainer close={onClose} />
    </Flex>
  )
}
