import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Stack,
  useToast,
  FormLabel
} from "@chakra-ui/react";
import axios from "axios";
import { emails } from "@/utils/regex";

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

  async function submit(data) {
    setIsLoading(true);
    try {
      let res = await axios.post("/api/Auth/Resetpassword", data);
      toast({
        title: "Success",
        description: res.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      Router.push(`/Auth/Verify-key/${res.data.email}`);
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
      <Stack spacing={3}>


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

        <Button type="submit" isLoading={isLoading} colorScheme="teal">
          Send
        </Button>
      </Stack>
    </form>
  );
}