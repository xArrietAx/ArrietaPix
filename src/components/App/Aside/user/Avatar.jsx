import { useRouter } from "next/router";
import {useState, useContext} from "react"
import { DataContext } from "@/Context/DataContext";
import { IKContext, IKImage } from "imagekitio-react";
import { Input, FormLabel, Box, Flex, useToast, Spinner, useMediaQuery } from "@chakra-ui/react";
import { generateBase64 } from "@/utils/GenerateBase64";

import axios from "axios";

export const Avatar = () => {
  
  const [isLargerThan1536] = useMediaQuery('(min-width: 1536px)')

  let Router = useRouter()

  let {Avatar, setAvatar} = useContext(DataContext)

  let toast = useToast()

  const [Loading, setLoading] = useState(false)

  async function upload(e) {
    setLoading(true)
    let file = e.target.files[0];
      if (file) {
        try{
          let base64 = await generateBase64(file)
          let res = await axios.post("/api/UploadAvatar", {base64} )
          setAvatar(res.data)
         toast({
              description: "The avatar has been update",
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
            return setLoading(false)
          } catch(err){
            setLoading(false)
            console.log(err);
            if (err.response?.data.redirect) {
              toast({
                title: 'Error',
                description: err.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
              return Router.push("/Auth/Signin")
            }
            if (err.response?.data.message) {
              return toast({
                title: 'Error',
                description: err.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
              }) 
            }
            if (err) {
              return toast({
                title: 'Error',
                description: err,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
            }
          }
       }
  }

  return (
    <Box>
      <Input hidden type="file" id="file" onChange={e => upload(e)} />
        <FormLabel
          htmlFor="file"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          ml={100}
          my={0}
          rounded={"full"}
          fontSize={{base:"md", "2xl":"xl"}}
          textColor={"white"}
          bg={"gray.800"}
          cursor={"pointer"}
        >
          <i className="bi bi-plus-circle" />
        </FormLabel>
      <Flex alignItems={"center"} justifyContent={"center"}>
        {Loading && <Spinner mr={2} textColor={"orange.400"} />}
      <IKContext
        publicKey="public_v6o7kSg2pAS53Q22IVfi4Ualinw="
        urlEndpoint="https://ik.imagekit.io/adk19eqcy" 
        transformationPosition="path">
        <IKImage 
        style={{width:isLargerThan1536 ? "95px" : "70px" , height:isLargerThan1536 ? "95px" : "70px" , borderRadius:"50%"}}
          path={Avatar}
          transformation={[
            {
              height: "250",
              width: "250"
            },
          ]}
        />
      </IKContext>
      </Flex>
    </Box>
  );

};
