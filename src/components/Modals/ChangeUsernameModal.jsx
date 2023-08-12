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
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { usernames } from "@/const/regex";

export default function changeUsernameModal({ onClose, isOpen, setUsername }) {
  let {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  let toast = useToast();

  let Router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function changeUsername(data) {
    setIsLoading(true);
    try {
      let res = await axios.post("/api/ChangeUsername", data);
      setUsername(res.data.newUsername);
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

  const initialRef = useRef(null);
  const finalRef = useRef(null);

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
          <ModalHeader>Change Username</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(changeUsername)} noValidate>
              <FormControl id="username" isRequired isInvalid={errors.username}>
                <FormLabel>New Username</FormLabel>
                <Input
                  textColor={"white"}
                  type="text"
                  {...register("username", {
                    required: "The username is required",
                    minLength: {
                      value: 3,
                      message: "The min length is 3 characters",
                    },
                    maxLength: {
                      value: 16,
                      message: "The max length is 16 characters",
                    },
                    pattern: {
                      value: usernames,
                      message:
                        "Please provide username valid like: john_doe, mary123, _ArrietA_",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
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
                  Change
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
