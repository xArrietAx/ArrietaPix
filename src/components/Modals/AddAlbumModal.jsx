import { useRouter } from "next/router";
import { useRef, useState } from "react";
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
import { albumsName } from "@/const/regex";

export default function AddAlbumModal({ onClose, isOpen, setAlbums }) {
  let Router = useRouter();

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
      let res = await axios.post("/api/AddAlbum", data);
      setAlbums(res.data);
    } catch (err) {
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
      toast({
        title: "Error",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    Close();
  }

  async function Close() {
    onClose();
    setIsLoading(false);
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
          <ModalHeader>Add new album</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(submit)} noValidate>
              
              <FormControl isRequired isInvalid={errors.name}>
                <FormLabel>
                  Name
                </FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Ejem: Family, Vacations, Me"
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
                      message: "The name is invalid. It must not have trailing spaces and it can only consist of letters and numbers.",
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
                  Add
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
