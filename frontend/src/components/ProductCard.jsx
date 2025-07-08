import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/products";
import { useState } from "react";


const ProductCard = ({product}) => {
    const [updatedProduct,setUpdatedProduct]= useState(product);
    const textColor = useColorModeValue('gray.600' , 'gray.200');
    const bg = useColorModeValue('white' , 'gray.800');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {deleteproduct,updateproduct}=useProductStore();
    const toast = useToast();

    const handleChange= (e)=>{
        const {name,value}= e.target
        setUpdatedProduct ({...updatedProduct,[name]:value});
    }
    const handleUpdate = async (pid,updatedProduct) => {
        await updateproduct(pid,updatedProduct);
        onClose();
        
    }
    const handleDelete= async(pid)=>{
       const {success,message}= await deleteproduct(pid)
       if(!success){
        toast({
            title:'Error',
            description:message,
            status:'error',
            isClosable:true,
        })}
        else{
            toast({
            title:'Success',
            description:message,
            status:'success',
            isClosable:true,
        })
       }

    }


  return (
    <Box shadow={'lg'} rounded={'lg'} overflow={"hidden"} _hover={{transform: 'translateY(-5px)',shadow:'xl'}} bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}/>
        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={2}> 
                {product.name}
            </Heading>
            <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack>
                <IconButton icon={<FiEdit />} onClick={onOpen} colorScheme="blue" />
                <IconButton icon={<MdDelete />} onClick={()=>handleDelete(product._id)} colorScheme="red" />
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product editing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
                <Input placeholder="product Price" name="name" value={updatedProduct.name} onChange={handleChange}  ></Input>
                <Input placeholder="product Name" name="price" value={updatedProduct.price} onChange={handleChange}   ></Input>
                <Input placeholder="product Url" name="image"  value={updatedProduct.image} onChange={handleChange}  ></Input>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={()=> handleUpdate(product._id,updatedProduct)}>update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProductCard