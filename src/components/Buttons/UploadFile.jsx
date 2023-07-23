import dynamic from "next/dynamic";

import { useDisclosure, Button } from "@chakra-ui/react";

const Modal = dynamic(() => import("../Modals/AddPhotoModal"))

const UploadFile = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
    <Button w={"full"} maxW={"sm"} colorScheme="red" _hover={{bg:"red.600"}} textColor={"white"} onClick={onOpen}>
      UPLOAD
    </Button>
    <Modal isOpen={isOpen} onClose={onClose} />
    </>
  ) 
}

export default UploadFile