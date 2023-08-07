import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

function SingleProduct({ product }) {

    const handleDelete = (id)=>{
        try {
            axios.delete(`http://localhost:4000/product/delete/${id}`).then((res)=>{
                console.log("deleted successfully", res.data.product)
              
            })
        } catch (error) {
            console.log("Failed to fetch data from backend")
            console.log(error)
            
        }
    }
  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={product.image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{product.name}</Heading>
            <Text>{product.category}</Text>
            <Text>
              {product.description}
            </Text>
            <Text>Location: {product.location}</Text>
            <Text>Date: {product.postedAt}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${product.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={()=>{
                handleDelete(product._id)
            }}>
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SingleProduct;
