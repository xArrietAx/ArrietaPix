import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup
} from "@chakra-ui/react";

export default function Stats() {
  return (
      <StatGroup gap={5} w="90%" maxW={"7xl"} mx="auto" >
        <Stat>
          <StatLabel fontSize={{base:"xl", lg:"2xl"}} textColor={"white"} >Increase</StatLabel>
          <StatNumber textColor={"green.500"} fontSize={{base:"lg", lg:"xl"}} fontFamily={"cursive"} >345,670</StatNumber>
          <StatHelpText textColor={"white"}>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel fontSize={{base:"xl", lg:"2xl"}} textColor={"white"} >Decrease</StatLabel>
          <StatNumber textColor={"red.500"} fontSize={{base:"lg", lg:"xl"}} fontFamily={"cursive"} >45</StatNumber>
          <StatHelpText textColor={"white"}>
            <StatArrow type="decrease" />
            3.05%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel fontSize={{base:"xl", lg:"2xl"}} textColor={"white"} >Actually</StatLabel>
          <StatNumber textColor={"yellow.500"} fontSize={{base:"lg", lg:"xl"}} fontFamily={"cursive"} >480K</StatNumber>
        </Stat>
      </StatGroup>
  );
}