import { MenuItem, useDisclosure } from "@chakra-ui/react";
import Modal from "../../Modals/ChangeAlbumModal";

export const ChangeAlbum = ({ PhotoId }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen} fontSize={{base:"sm", sm:"md"}}>Move</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} Photoid={PhotoId} />
    </>
  );
};
