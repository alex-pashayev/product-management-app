import { Container,Text,Flex, HStack, Button, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { IoMdMoon } from "react-icons/io";
import { MdLightMode } from "react-icons/md";


const Navbar = () => {

    const {colorMode,toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{base:"column", sm:"row"}}>


            <Text as={Link} to="/" fontSize={{base:"22",sm:"28"}} fontWeight={"bold"} textAlign={"center"} bgGradient="linear(to-r, teal.500, cyan.400)" bgClip={"text"}>
                Product store
            </Text>



        <HStack spacing={2} alignItems={"center"}>
            <Button as={Link} to="/create">
                <CiSquarePlus fontSize={20}/>
            </Button>

            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MdLightMode /> : <IoMdMoon />}
            </Button>
        </HStack>


        </Flex>
    </Container>
  )
}

export default Navbar