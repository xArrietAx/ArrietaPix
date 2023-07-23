import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Flex,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import DefaultImage from "../../../public/DefaultImage.png";
import { generateBase64 } from "@/utils/GenerateBase64";
import { DataContext } from "@/Context/DataContext";
import { albumsName } from "@/utils/regex";

export default ({ errors, handleSubmit, register, Close, initialRef }) => {
  
  let Router = useRouter();

  let {id} = Router.query
  let {setPhotosList, setTotalFiles} = useContext(DataContext)

  const [isLoading, setIsLoading] = useState(false)
  const [PreviewImage, setPreviewImage] = useState("");

  let toast = useToast();

  async function submit(data) {
    if (PreviewImage) {
      setIsLoading(true);
      data.base64 = PreviewImage;
      if (id !== undefined) data.AlbumId = id;
        try {
          let res = await axios.post("/api/UploadPhoto", data);
          setTotalFiles(res.data.totalFiles)
          setPhotosList(res.data.photos)
          Close();
        } catch (err) {          
          setIsLoading(false)
          console.log(err);
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
          return toast({
            title: "Error",
            description: err.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
    } else {
      return toast({
        title: "Error",
        description: "The file is required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  async function setThePreviewImage(e) {
    try {
      let file = e.target.files[0];
      let base64 = await generateBase64(file);
      setPreviewImage(base64);
    } catch (err) {
      console.log(err);
      return toast({
        title: "Error",
        description: err,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <VStack spacing={4}>
        <FormControl isRequired isInvalid={errors.album}>
          <FormLabel>Choose Album</FormLabel>
          <Input
            ref={initialRef}
            placeholder="Ejem: Family, Vacations, Me"
            {...register("album", {
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
            {errors.album && errors.album.message}
          </FormErrorMessage>
        </FormControl>
        <FormLabel
          w={"full"}
          h={10}
          p={2}
          rounded={"md"}
          bg={"gray.700"}
          textAlign={"center"}
          cursor={"pointer"}
        >
          Choose Photo
          <Input hidden type="file" onChange={(e) => setThePreviewImage(e)} />
        </FormLabel>

        <Image
          src={PreviewImage || DefaultImage}
          width={400}
          height={400}
          alt="preview image"
          loading="lazy"
        />
      </VStack>
      <Flex justifyContent={"end"} gap={3} py={5}>
      <Button type="submit" isLoading={isLoading} colorScheme="teal" variant='outline' _hover={{bg:"gray.800"}} >
        Upload
     </Button>
        <Button colorScheme="red" onClick={Close}>Cancel</Button>
      </Flex>
    </form>
  );
};
