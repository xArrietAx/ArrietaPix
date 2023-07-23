import { HStack } from "@chakra-ui/react";
import { LogOut } from "@/components/Buttons/LogOut";
import { DeleteAccount } from "@/components/Buttons/DeleteAccount";

export const Bottom = () => {

  return (
    <HStack justifyContent={"space-between"} px={5} py={3} mt={"auto"} bg={"gray.800"} >
       <LogOut />
       <DeleteAccount />
  </HStack>
  )
}
