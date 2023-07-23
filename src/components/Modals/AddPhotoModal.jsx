import { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import Form from "../Forms/FormUploadPhoto";

export default function AddPhoto({ onClose, isOpen }) {

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  let {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  async function Close() {
    onClose();
    reset();
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={Close}
      >
        <ModalOverlay />
        <ModalContent w={"90%"} mx={"auto"} bg={"gray.900"} textColor={"white"}>
          <ModalHeader>Add new photo</ModalHeader>
          <ModalBody>
            <Form register={register} handleSubmit={handleSubmit} errors={errors} Close={Close} initialRef={initialRef} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}