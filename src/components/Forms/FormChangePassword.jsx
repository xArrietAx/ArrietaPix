import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { passwords } from "@/utils/regex";

export function Form() {
  let Router = useRouter();

  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submit(data) {
    setIsLoading(true);
    if (data.password === data.confirmpassword) {
      try {
        let res = await axios.post("/api/Auth/Changepassword", data);
        console.log(res);
        toast({
          title: "Account created",
          description: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return Router.push("/Auth/Signin");
      } catch (err) {
        console.log(err);
        if (err.response.data.redirect) {
          toast({
            title: "Error",
            description: err.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return Router.push("/");
        }
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    reset();
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Stack spacing={6}>
        <FormControl id="password" isRequired isInvalid={errors.password}>
          <FormLabel textColor={"white"}>Password</FormLabel>
          <InputGroup>
            <Input
              mb={5}
              textColor={"white"}
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "The password is required",
                minLength: {
                  value: 8,
                  message: "The min length is 8 characters",
                },
                pattern: {
                  value: passwords,
                  message:
                    "Please provide valid password, the password must: Contain at least one uppercase letter, contain at least one lowercase letter, contain at least one digit, contain at least one special character.",
                },
              })}
            />
            <InputRightElement
              textColor={"gray.300"}
              cursor={"pointer"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              <i
                className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
              ></i>
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={errors.confirmpassword}>
          <FormLabel textColor={"white"}>Confirm password</FormLabel>

          <Input
            textColor={"white"}
            type={"password"}
            mb={5}
            {...register("confirmpassword", {
              required: "The password is required",
              minLength: {
                value: 8,
                message: "The min length is 8 characters",
              },
              pattern: {
                value: passwords,
                message:
                  "Please provide valid password, the password must: Contain at least one uppercase letter, contain at least one lowercase letter, contain at least one digit, contain at least one special character.",
              },
            })}
          />

          <FormErrorMessage>
            {errors.confirmpassword && errors.confirmpassword.message}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit" isLoading={isLoading} colorScheme="teal">
          Send
        </Button>
      </Stack>
    </form>
  );
}
