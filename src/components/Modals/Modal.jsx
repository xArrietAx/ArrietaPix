import { Button, Modal, ModalBody, ModalHeader, ModalOverlay, ModalContent, Text, ModalFooter } from "@chakra-ui/react";

export default function ModalWarning({onClose, isOpen, action, title="WARNING", msg, id}) {

  function toDo(e) {
    action(e.target.id)
    onClose()
  }

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={"90%"} mx={"auto"} textColor={"white"} bg={"gray.900"}>
          <ModalHeader><Text textColor={"red.600"}>{title}</Text></ModalHeader>
          <ModalBody>
            <Text>{msg}</Text>
          </ModalBody>
          <ModalFooter display={"flex"} alignItems={"center"} gap={3}>
            <Button variant='ghost' textColor={"white"} _hover={{
              bg:"transparent"
            }} id={id} onClick={toDo}>Yes, I'm sure</Button>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}