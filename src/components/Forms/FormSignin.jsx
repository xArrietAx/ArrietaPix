import { useRouter } from "next/router";
import Link from "next/link";
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
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { emails, passwords } from "@/utils/regex";

export function Form() {

  let Router = useRouter()

  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast()

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  async function submit(data) {
    setIsLoading(true)
      try {
        let res = await axios.post("/api/Auth/Signin", data)
        toast({
          title: res.data.message,
          description: 'We were waiting for you!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
       return Router.push("/Dashboard")
      } catch (err) {
        console.log(err);
        toast({
          title: 'Error',
          description: err.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    reset()
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
     <Stack spacing={6}>
      
     <FormControl id="email" isRequired isInvalid={errors.email}>
        <FormLabel textColor={"white"}>Email address</FormLabel>
        <Input textColor={"white"} type="email"  {...register("email", {
              required: "The email is required",
              minLength: {
                value: 2,
                message: "The min length is 2 characters",
              },
              pattern: {
                value: emails,
                message: "Please provide a valid email",
              },
            })} />
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

        <Link href={"/Auth/Reset-password"} style={{ color: "skyblue" }}>
          Forget your password?
        </Link>

      </FormControl>

      <Button type="submit" isLoading={isLoading} colorScheme="teal" >
        Signin
     </Button>
      
     </Stack>
    </form>
  );
}
