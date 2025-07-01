import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import {Route,Routes} from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";


function App() {
  
  return (
    <Box minH={"100vh"}>
      <VStack spacing="20"> 
        <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/create" element={<CreatePage/>}/>
        </Routes>
      </VStack> 
    </Box>
    
  )
}

export default App
