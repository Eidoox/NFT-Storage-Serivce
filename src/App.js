import {Button , HStack , Container, Flex , FormControl , FormLabel, Input,Box,Link,VStack,StackDivider } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react';
import { useEffect } from 'react'
import { NFTStorage } from 'nft.storage'


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isloaded,setloadingstate]=useState(false);
  const [isuploaded,setuploadingstate]=useState("Loading..");

  const [metadataurl,setmetadataurl]=useState("");
  const [imageurl,setimageurl]=useState("");
  var NFT_STORAGE_API_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFFMTg5NTcxNWUzMzY5MzcyYkNlZDBBNTJkREQ2OTFlZjQxMGIzNWEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NDI0NzI3OTUyNSwibmFtZSI6Im5mdHN0b3JhZ2VzZXJ2aWNlIn0.B3yPIgF7R4fX4HAa0Cmro9V6tZ4Jjj1P6dCNI7CHR2o';
  
  const uploadnft = async () => {
    setuploadingstate("Loading..");
    setloadingstate(false);
    setmetadataurl("");
    setimageurl("");

    const nftname = document.getElementById('imagename').value;
    const nftdescription = document.getElementById('imagedescription').value;
    const nftuploadedimage = document.getElementById("uploadimage").files;

      const client = new NFTStorage({
        token: NFT_STORAGE_API_KEY
        });

        const metadata = await client.store({
            name: nftname,
            description: nftdescription,
            image: nftuploadedimage[0],
        })

        const metadata_before_edit = metadata.url;
        const nftmetadatalink = metadata_before_edit.replace("ipfs://", "https://ipfs.io/ipfs/");
        const image_before_edit= metadata.data.image.href;
        const imagelink = image_before_edit.replace("ipfs://", "https://ipfs.io/ipfs/");

        setmetadataurl(nftmetadatalink);
        setimageurl(imagelink);
        
      
        if (nftmetadatalink && imagelink){
          setloadingstate(true);
          setuploadingstate("Uploaded");
        }
      
      
       
     
    }

    useEffect(() => {
      document.body.style.zoom = "125%";
    }, []);
  
  return (
    <VStack
    divider={<StackDivider borderColor='gray.200' />}
    spacing={4}
    align='stretch'
    >
    
      <Box bgGradient='linear(to-r, cyan.900,azure,dimgrey)' height="775px">
      <br></br>  <br></br><br></br>
      <Flex justify="center" fontWeight='extrabold' fontSize="39px" >
              Welcome to NFT.Storage Service
      </Flex>
      <br></br>
              <Container  border='1px' borderColor='black' height="420px" borderWidth={4} borderRadius= "30px">
                <FormControl justify="center">
                    <br></br>
                    <FormLabel htmlfor= "imagename" fontSize="20px" color="black" fontWeight="extrabold">Name</FormLabel>
                    <Input id = "imagename" type='text' placeholder="eg. My NFT" variant='outline' borderColor='black' borderWidth={2} color="black" fontWeight="bold" />
                    <br></br><br></br>
                    <FormLabel htmlfor= "imagedescription" fontSize="20px" color="black" fontWeight="extrabold">Description</FormLabel>
                    <Input id = "imagedescription" type='text' placeholder="eg. Special NFT"  variant='outline' borderColor='black' borderWidth={2} color="black" fontWeight="bold"/>
                    <br></br><br></br>
                    <Flex justify="center" fontWeight='extrabold' fontSize="22px" color="black">
                          Choose your image
                    </Flex>
                      <br></br>
                    <Flex justify="center" ml="100px">
                          <input id= 'uploadimage' type='file' justify="center"  />
                    </Flex>
                    <br></br>
                      <Button 
                          backgroundColor="cyan.900"
                          fontWeight='extrabold'
                          colorScheme='green' 
                          variant='solid'
                          borderRadius= "100px"
                          width="110px"
                          height="50px"
                          ml="186px"
                          type='submit'
                          onClick= { ()=>
                            {
                              onOpen();
                              uploadnft();
                            }
                        
                          }
                          >Upload
                      </Button>

                </FormControl>
              </Container>
              <br></br>
                <Box fontSize="13px" fontWeight="bold">
                    <Flex justify="center" mt={110}>
                      Made with {"\u2665" } By: Eidoox
                    </Flex>
                    <HStack spacing='24px' justify="center" color="blue.500" >
                      <Link href="https://www.linkedin.com/in/eidoox/">Linkedin</Link> 
                      <Link href="https://github.com/Eidoox">GitHub</Link>
                      
                      <Link href="https://eidoox.hashnode.dev/"> Blogs</Link>
                    </HStack>
                </Box>
              
              <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent mr={380}>
                  <ModalHeader>{isuploaded}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody >
                    <Flex justify="center">
                      {!isloaded ? (
                        <Spinner
                          thickness='4px'
                          speed='0.65s'
                          emptyColor='gray.200'
                          color='blue.500'
                          size='xl'
                          justify="center"
                          
                        />
                      ) : (

                        <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={4}
                        align='stretch'
                        >
                          <Box fontWeight="bold" >
                            Metadata Url: <Link href= {metadataurl} color="blue">Link</Link>
                          </Box>
                          <Box fontWeight="bold" ml={3}>
                            Image Url: <Link href= {imageurl} color="blue">Link</Link>
                          </Box>
                        
                        </VStack>
                        

                        

                      )
                      }
                

                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
                </ModalContent>

              </Modal>
    

      
      </Box>
     
    </VStack>


  );
}

export default App;
