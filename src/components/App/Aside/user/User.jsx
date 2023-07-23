import dynamic from "next/dynamic";
import { VStack, Spinner } from "@chakra-ui/react";
import UploadFile from "@/components/Buttons/UploadFile";

const Info = dynamic(() => import("./Info"), {
  ssr:false,
  loading:() => <VStack justifyContent={"center"} w={"full"} h={"170px"} ><Spinner color="red.500" size={{base:"md", md:"lg"}} /></VStack>
})

export const User = () => {
  return (
    <VStack justifyContent={"center"} p={5} bg={"blackAlpha.200"} >
      <Info />
      <UploadFile />
    </VStack>
  )
}
