import { DataContext } from "@/Context/DataContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useToast, useDisclosure, Box, Tooltip } from "@chakra-ui/react";
import axios from "axios";

const Modal = dynamic(() => import("../Modals/Modal"))

export const LogOut = () => {
  const {
    setUsername,
    setAvatar,
    setAlbumsList,
    setPhotosList,
    setTotalFiles,
  } = useContext(DataContext);

  let Router = useRouter();

  let toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleLogOut() {
    try {
      let res = await axios.post("/api/Auth/LogOut");
      toast({
        title: res.data.message,
        description: "we'll be waiting for you",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      Router.push("/");
      setUsername("Unknown")
      setAvatar("")
      setAlbumsList([])
      setPhotosList([])
      return setTotalFiles(0)
    } catch (err) {
      return toast({
        title: "Error",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Tooltip label="Logout">
        <Box
          as="i"
          className="bi bi-box-arrow-left"
          fontSize={{ base: "20px", "2xl": "25px" }}
          textColor={"white"}
          cursor={"pointer"}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        action={handleLogOut}
        msg={"Are you sure to close the session?"}
      />
    </>
  );
};
