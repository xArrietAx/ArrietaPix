import { useRouter } from "next/router";
import { useRef, useState, useContext } from "react";
import { DataContext } from "@/Context/DataContext";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { albumsName } from "@/utils/regex";

export default function AddAlbumModal({ onClose, isOpen, Photoid }) {
  
  let { setPhotosList } = useContext(DataContext);

  let Router = useRouter();
  let { id } = Router.query;

  let toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  let {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  async function submit(data) {
    setIsLoading(true);
    try {
      data.id = Photoid;
      if (id !== undefined) data.Albumid = id;
      let res = await axios.post("/api/ChangeAlbum", data);
      setPhotosList(res.data.Photos);
      toast({
        title: "Changed!",
        description: res.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      if (err.response.data.redirect) {
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
       return Router.push("/Auth/Signin");
      } else {
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    Close();
  }

  async function Close() {
    setIsLoading(false);
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
        <ModalContent w={"90%"} mx={"auto"} textColor={"white"} bg={"gray.900"}>
          <ModalHeader>Move to...</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(submit)} noValidate>
              <FormControl isRequired isInvalid={errors.name}>
                <FormLabel>
                 Album Name
                </FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Where do you move this photo?"
                  {...register("name", {
                    required: "The name is required",
                    minLength: {
                      value: 2,
                      message: "The min length is 2 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "The max length is 20 characters",
                    },
                    pattern: {
                      value: albumsName,
                      message: "The name is invalid",
                    },
                  })}
                />
                <FormErrorMessage textColor={"red.300"}>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <Flex justifyContent={"end"} gap={3} py={5}>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  colorScheme="teal"
                  variant="outline"
                  _hover={{ bg: "gray.800" }}
                >
                  Upload
                </Button>
                <Button colorScheme="red" onClick={Close}>
                  Cancel
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
