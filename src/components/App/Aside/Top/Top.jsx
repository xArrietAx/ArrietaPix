import { Flex, Box} from "@chakra-ui/react";
import { Logo } from "@/components/Logo";

export const Top = ({onClose}) => {
  return (
    <Flex flexWrap={"wrap"} alignItems={"center"} justifyContent={"space-between"} px={5} py={3} bg={"gray.800"} >
      <Logo />
    <Box display={{ base: "block", md: "none" }} onClick={onClose} cursor={"pointer"} >
      <i className="bi bi-x-lg" style={{ color: "white" }}></i>
    </Box>
  </Flex>
  )
}