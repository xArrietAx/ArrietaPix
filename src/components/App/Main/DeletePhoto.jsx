import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "@/Context/DataContext";
import {
    MenuItem,
    useDisclosure,
    useToast
  } from '@chakra-ui/react'
  import Modal from "../../Modals/Modal";
  import axios from "axios";

export const DeletePhoto = ({PhotoId}) => {

  let Router = useRouter()
  let {id} = Router.query

let {setPhotosList, setTotalFiles} = useContext(DataContext)

  const { isOpen, onOpen, onClose } = useDisclosure()

  let toast = useToast()

  async function deletePhoto(Photoid) {
    try {
        let res = await axios.post("/api/DeletePhoto", {Photoid, Albumid: id})
        setTotalFiles(res.data.TotalFiles)
        setPhotosList(res.data.Photos)
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
      <MenuItem onClick={onOpen} fontSize={{base:"sm", sm:"md"}}>Delete</MenuItem>
    <Modal action={deletePhoto} isOpen={isOpen} id={PhotoId} onClose={onClose} msg={"Are you sure to delete this photo?"} />
    </>
  )
}
