import { IKContext, IKImage } from "imagekitio-react";
import { GridItem, Flex } from "@chakra-ui/react";
import { MenuDots } from "@/components/Menu.jsx";

export const Photos = ({ photos, setIsOpen, setImage }) => {
  return (

      <GridItem
      rounded={"md"}
      bg={"gray.100"}
      overflow={"hidden"}
      cursor={"pointer"}
      position={"relative"}
    >
      <IKContext
        publicKey="public_v6o7kSg2pAS53Q22IVfi4Ualinw="
        urlEndpoint="https://ik.imagekit.io/adk19eqcy"
        transformationPosition="path"
      >
        <IKImage
          path={photos.Url}
          transformation={[
            {
              height: "450",
              width: "600",
            },
          ]}
          onClick={() => {
            setImage(photos.Url), setIsOpen(true);
          }}
        />
      </IKContext>
      <Flex position={"absolute"} bottom={0} right={0}>
        <MenuDots PhotoId={photos._id} photoUrl={photos.Url} />
      </Flex>
    </GridItem>
  );
};
