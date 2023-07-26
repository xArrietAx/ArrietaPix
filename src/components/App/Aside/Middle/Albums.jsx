import { Box, Text, HStack } from "@chakra-ui/react";
import { DeleteAlbum } from "./DeleteAlbum";
import Link from "next/link";

const Albums = ({AlbumsList, setAlbumsList, onClose}) => {
  return (
    <Box px={3} py={2}>
      {AlbumsList.length === 0
        ? <Text mt={5} fontWeight={"500"} textAlign={"center"} textColor={"gray.500"}>Add an album</Text>
        : AlbumsList.map((album) => {
            return (
              <HStack justifyContent={"space-between"} key={album._id} onClick={onClose}>
                <Text
                  as={Link}
                  href={`/Dashboard/Album/${album._id}`}
                  p={2}
                  rounded={5}
                  fontSize={{ base: "md", "2xl": "lg" }}
                  textColor={"gray.400"}
                  cursor={"pointer"}
                  _hover={{
                    bg: "gray.700",
                    textColor: "white",
                  }}
                >
                  {album.name}
                </Text>
                <DeleteAlbum id={album._id} setAlbums={setAlbumsList} />
              </HStack>
            );
          })}
    </Box>
  );
};

export default Albums