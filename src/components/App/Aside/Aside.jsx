import { Flex } from "@chakra-ui/react";
import { Top } from "./Top/Top";
import { User } from "./user/User";
import { Bottom } from "./Bottom/Bottom";
import { Middle } from "./Middle/Middle";

export const Aside = ({isOpen, onClose}) => {
  return (
    <Flex
      position={{ base: "absolute", md: "static" }}
      right={isOpen === false ? "1300px" : "0"}
      zIndex={15}
      flexDirection={"column"}
      w={"full"}
      minH={"100vh"}
      maxW={{ md: "270px", "2xl":"350px" }}
      boxShadow={"dark-lg"}
      bg={"gray.900"}
      transition={"right 600ms ease-in-out"}
      overflow={"auto"}
    >
        <Top onClose={onClose} />
        <User />
        <Middle onClose={onClose} />
        <Bottom />
    </Flex>
  );
};
