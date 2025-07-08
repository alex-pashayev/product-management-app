import { Box, Button, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore } from "../store/products.js";


const CreatePage = () => {

  const Handlechnage=(e)=>{
    const {name,value} = e.target;
    setNewproduct ({...newProduct,[name]:value});
  };

  const {createProduct}= useProductStore();
  const toast = useToast();

  const HandleAddProduct = async()=>{
    const {success,message} = await createProduct(newProduct)
    if(!success){
      toast({
        title:"Error",
        description:message,
        status:"error",
        isClosable: true,
      });
    }
    else{
      toast({
        title:"Success",
        description:message,
        status:"success",
        isClosable: true,
      });
      setNewproduct({name:"",price:"",image:""})//  newproduct של  state לאפס את ה  
    }
  };

  const [newProduct,setNewproduct]= useState({
      name:"",
      price:"",
      image:""
    })

  

  return (
    <Box  w="500px" bg={useColorModeValue("white","gray.800")} p={6} rounded="lg" shadow = "md">
      <VStack spacing={4}>  
        <Input placeholder="Name" name="name"  value={newProduct.name} onChange={Handlechnage}/>
        <Input placeholder="Price" name="price" type="number" value={newProduct.price} onChange={Handlechnage}/>
        <Input placeholder="url" name="image" value={newProduct.image} onChange={Handlechnage}/>
        <Button colorScheme='blue' onClick={HandleAddProduct} w='full'> Create Product</Button>
      </VStack>
    </Box>
    
  )
}

export default CreatePage