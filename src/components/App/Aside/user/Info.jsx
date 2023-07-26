import { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import { DataContext } from "@/Context/DataContext";
import { Avatar } from "./Avatar";
import EditUsername from "./EditUsername";

const Info = () => {
  const { TotalFiles, Username, setUsername } = useContext(DataContext);

  return (
    <>
      <Avatar />
      <Box>
        <Box position={"relative"}>
          <EditUsername setUsername={setUsername} />
          <Text
            as={"span"}
            display={"block"}
            fontSize={{ base: "lg", "2xl": "2xl" }}
            fontWeight={"semibold"}
            textColor={"white"}
            textAlign={"center"}
          >
            {Username}
          </Text>
        </Box>
        <Text
          as={"span"}
          display={"block"}
          fontSize={{ base: "md", "2xl": "xl" }}
          textAlign={"center"}
          textColor={"gray.500"}
        >
          {`${TotalFiles} total files` || "Unknown files"}
        </Text>
      </Box>
    </>
  );
};

export default Info;
