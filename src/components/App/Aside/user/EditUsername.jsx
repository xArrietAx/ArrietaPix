import { Box, useDisclosure } from "@chakra-ui/react";
import Modal from "@/components/Modals/ChangeUsernameModal";

const EditUsername = ({setUsername}) => {
    
  const { onClose, isOpen, onToggle } = useDisclosure();

  return (
    <>
        <Box as="i"
        className="bi bi-pencil-fill"
          position={"absolute"}
          left={"-30"}
          top={"-5px"}
          fontSize={"14px"}
          opacity={0.5}
          textColor={"gray.400"}
          cursor={"pointer"}
          _hover={{ opacity: 1 }}
          onClick={onToggle}
        />
      <Modal onClose={onClose} isOpen={isOpen} setUsername={setUsername} />
    </>
  );
};

export default EditUsername