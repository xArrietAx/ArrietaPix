import { IKContext, IKImage } from "imagekitio-react";
import { GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Right = () => {
  return (
    <GridItem as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <IKContext
        publicKey="public_v6o7kSg2pAS53Q22IVfi4Ualinw="
        urlEndpoint="https://ik.imagekit.io/adk19eqcy"
        transformationPosition="path"
      >
        <IKImage
          path={"Albums.svg?updatedAt=1684250979843"}
          style={{ width: "100%", maxWidth: "500px", margin: "auto" }}
        />
      </IKContext>
    </GridItem>
  );
};
export default Right;