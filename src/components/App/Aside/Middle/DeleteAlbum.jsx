import { useRouter } from "next/router";
import WarningModal from "@/components/Modals/Modal";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";

export const DeleteAlbum = ({ id, setAlbums }) => {
  let Router = useRouter();

  let toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function deleteAlbum(id) {
    try {
      let res = await axios.post("/api/DeleteAlbum", {id});
      setAlbums(res.data);  
    } catch (err) {
      console.log(err);
      if (err.response?.data.redirect) {
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return Router.push("/Auth/Signin");
      }
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
      <Box as="i" className="bi bi-trash" fontSize={{base:"15px", "2xl":"20px"}} textColor={"#F02F40"} cursor={"pointer"} onClick={onOpen} />
      <WarningModal
        isOpen={isOpen}
        onClose={onClose}
        action={deleteAlbum}
        id={id}
        msg={"Are you sure to delete this album?"}
        title="Delete Album"
      />
    </>
  );
};
