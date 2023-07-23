import { useRouter } from "next/router";
import { DataContext } from "@/Context/DataContext";
import { useContext } from "react";
import dynamic from "next/dynamic";
import { useToast, useDisclosure, Box, Tooltip } from "@chakra-ui/react";
import axios from "axios";

const Modal = dynamic(() => import("../Modals/Modal"))

export const DeleteAccount = () => {

  const {
    setUsername,
    setAvatar,
    setAlbumsList,
    setPhotosList,
    setTotalFiles,
  } = useContext(DataContext);

  let Router = useRouter()

  let toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

    async function handleDeleteAccount() {
        try {
          await axios.post("/api/Auth/DeleteAccount")
          Router.push("/");
          setUsername("Unknown")
          setAvatar("")
          setAlbumsList([])
          setPhotosList([])
          return setTotalFiles(0)
        } catch (err) {
          if (err.response.data.redirect) {
            toast({
              title: 'Error',
              description: err.response.data.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
            return Router.push("/Auth/Signin")
          }
          return toast({
              title: 'Error',
              description: err.response.data.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
        }
    }


  return (
    <>
    <Tooltip label="Delete your account">
    <Box as="i" className="bi bi-trash" fontSize={{base:"20px", "2xl":"25px"}} textColor={"#F02F40"} onClick={onOpen} cursor={"pointer"} />
    </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} action={handleDeleteAccount} msg={"You are one step away from deleting your account, are you sure of your decision?"} />
    </>
  )
}
