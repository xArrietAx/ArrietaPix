import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";

export const Logo = (props) => {

  const [textColor, setTextColor] = useState(props.textColor || "white")

  useEffect(() => {
    if (localStorage.getItem("chakra-ui-color-mode") === "dark") setTextColor("white")
  }, [])

  return (
    <Text
      textColor={textColor}
      fontSize={{base:"2xl", "2xl":"3xl"}}
    >
      Arrieta
      <Text as={"span"} textColor={"red.500"}>
        Pix
      </Text>
    </Text>
  )
}