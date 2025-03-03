import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  ModalContent,
  useToast,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const handleDelete = async (productID) => {
    const { success, message } = await deleteProduct(productID);
    if (success) {
      toast({
        title: "success",
        description: message,
        status: "success",
        position: "top",
      });
    } else {
      toast({
        title: "error",
        description: message,
        status: "error",
        position: "top",
      });
    }
  };
  const handleUpdate = async (productID, updatedProduct) => {
    const { success, message } = await updateProduct(productID, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "error",
        description: "error occured",
        status: "error",
        position: "top",
      });
    } else {
      toast({
        title: "success",
        description: "updated succesfully",
        status: "success",
        position: "top",
      });
    }
  };
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          {product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdate(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
