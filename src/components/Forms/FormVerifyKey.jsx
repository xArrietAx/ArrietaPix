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
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { verifyKey } from "@/const/regex";

export function Form() {

  let Router = useRouter()
  
  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  async function submit(data) {
    setIsLoading(true)
    if (!isLoading) {
      try {
        await axios.post(`/api/Auth/Verifykey/${Router.query.email}`, data)
        Router.push("/Auth/Change-password")
     } catch (err) {
        toast({
         title: 'Error',
         description: err.response.data.message,
         status: 'error',
         duration: 5000,
         isClosable: true,
       })
     }
    }
    reset()
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Stack spacing={6}>
      <FormControl id="key" isRequired isInvalid={errors.key}>
        <FormLabel textColor={"white"}>Verify key</FormLabel>
        <Input textColor={"white"} type="text" {...register("key", {
            required:"The key is required",
            min: {
                value: 4,
                message:"Provide a valid key"
            },
            minLength: {
              value: 4,
              message:"Provide a valid key"
          },
            max: {
                value: 10,
                message:"Provide a valid key"
            },
            maxLength: {
              value: 10,
              message:"Provide a valid key"
          },
            pattern: {
                value: verifyKey,
                message:"Provide a valid key"
            }
        })} />
          <FormErrorMessage>
          {errors.key && errors.key.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isLoading} colorScheme="teal" >
        Send
     </Button>
      </Stack>
    </form>
  );
}
