import dynamic from "next/dynamic";
import { useState } from "react";
import { Grid, Text } from "@chakra-ui/react";
import { Photos } from "./Photos";

const ViewImage = dynamic(() => import("@/components/ViewImage"));

const TheGrid = ({ PhotosList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");

  return (
    <>
      {PhotosList.length === 0 ? (
        <Text mt={5} fontSize={{ base: "xl", sm: "3xl" }} textAlign={"center"}>
          You currently have nothing! <i className="bi bi-emoji-frown"></i>
        </Text>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(auto-fill, minmax(min(18em, 100%), 1fr))",
            "2xl": "repeat(auto-fill, minmax(min(22em, 100%), 1fr))",
          }}
          gap={3}
          p={5}
        >
          {PhotosList.map(photo => {
            return (
              <Photos
                photos={photo}
                key={photo._id}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                image={image}
                setImage={setImage}
              />
            );
          })}
        </Grid>
      )}
      <ViewImage isOpen={isOpen} setOpen={setIsOpen} image={image} />
    </>
  );
};

export default TheGrid;
