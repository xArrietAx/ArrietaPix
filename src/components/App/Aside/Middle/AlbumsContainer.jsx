import dynamic from "next/dynamic";
import { useContext } from "react";
import { DataContext } from "@/Context/DataContext";
import { Box, Text, HStack, Tooltip, useDisclosure, Spinner } from "@chakra-ui/react";

const Modal = dynamic(() => import("@/components/Modals/AddAlbumModal"))
const Albums = dynamic(() => import("./Albums"), {
  ssr:false,
  loading:() => <HStack justifyContent={"center"} my={10}><Spinner color="red.500" size={"md"} /></HStack>
})

export const AlbumsContainer = () => {

  let {AlbumsList, setAlbumsList} = useContext(DataContext)

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box p={2}>
        <HStack spacing={5}>
          <Text textColor={"white"} fontSize={{base:"md", "2xl":"xl"}} fontWeight={"semibold"}>
            Albums
          </Text>
          <Tooltip label="Add new album">
            <Box cursor={"pointer"} onClick={onOpen}>
              <i className="bi bi-plus-circle" style={{ color: "red" }}></i>
            </Box>
          </Tooltip>
        </HStack>
        <Albums AlbumsList={AlbumsList} setAlbumsList={setAlbumsList} />
      </Box>
      <Modal isOpen={isOpen} setAlbums={setAlbumsList} onClose={onClose} />
    </>
  );
};
