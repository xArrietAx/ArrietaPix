import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { usernames, emails, passwords } from "@/utils/regex";

export function Form() {
  let Router = useRouter();

  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function submit(data) {
    setIsLoading(true);
    try {
      let res = await axios.post("/api/Auth/Signup", data);
      toast({
        title: "Account created",
        description: res.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      Router.push("/Auth/Signin");
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: err.response.data.message,
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


        <FormControl id="username" isRequired isInvalid={errors.username}>
          <FormLabel textColor={"white"}>Username</FormLabel>
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

        <FormControl id="email" isRequired isInvalid={errors.email}>
          <FormLabel textColor={"white"}>Email address</FormLabel>
          <Input
            textColor={"white"}
            type="email"
            {...register("email", {
              required: "The email is required",
              minLength: {
                value: 2,
                message: "The min length is 2 characters",
              },
              pattern: {
                value: emails,
                message: "Please provide a valid email",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl id="password" isRequired isInvalid={errors.password}>
          <FormLabel textColor={"white"}>Password</FormLabel>
          <InputGroup>
            <Input
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
              h={"full"}
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

        <Button type="submit" isLoading={isLoading} colorScheme="teal">
          Signup
        </Button>
      </Stack>
    </form>
  );
}
