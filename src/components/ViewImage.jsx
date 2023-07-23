import { VStack, Box, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";

const ViewImage = ({ isOpen, setOpen, image }) => {
  const [isLargerThan1536] = useMediaQuery("(min-width: 1536px)");

  return (
    <VStack
      position={"absolute"}
      top={0}
      left={0}
      zIndex={654546456}
      display={isOpen ? "flex" : "none"}
      w={"100vw"}
      h={"100vh"}
      bg={"blackAlpha.700"}
      overflow={"auto"}
    >
      <Box display={"flex"} justifyContent={"end"} w={"full"} py={5} px={7}>
        <Box
          as="i"
          className="bi bi-x-lg"
          fontSize={{ base: "30px", "2xl": "40px" }}
          textColor={"white"}
          cursor={"pointer"}
          onClick={() => setOpen(false)}
        />
      </Box>
      <Box w={"95%"} py={8}>
        <Image
          src={`https://ik.imagekit.io/adk19eqcy/${image}`}
          alt="image"
          width={isLargerThan1536 ? 725 : 525}
          height={isLargerThan1536 ? 725 : 525}
          style={{ margin: "auto" }}
        />
      </Box>
    </VStack>
  );
};

export default ViewImage;
