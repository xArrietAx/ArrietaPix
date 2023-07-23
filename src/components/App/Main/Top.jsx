import { Flex, Box } from "@chakra-ui/react";
import { Logo } from "@/components/Logo";

export const Top = ({onOpen}) => {
  return (
    <Flex justifyContent={"space-between"} p={4}>
      <Box display={{base:"block", md:"none"}} >
        <Logo textColor={"black"} />
      </Box>

      <Box display={{ base: "block", md: "none" }} onClick={onOpen} cursor={"pointer"} >
      <i className="bi bi-list"  style={{fontSize:"22px"}}></i>
      </Box>
      
    </Flex>
  );
};
