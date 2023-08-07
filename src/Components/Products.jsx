import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Box, Center, Grid, Heading ,Text} from '@chakra-ui/react';
import SingleProduct from './SingleProduct';
import Pagination from './Pagination';

function Products(props) {

    const [product, setProduct]  = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        try {
            axios.get(`https://rich-blue-elephant-sari.cyclic.app/products`).then((res)=>{
                setProduct(res.data.product)
                setLoading(false)
                console.log(res)
            })
        } catch (error) {
            console.log("Failed to fetch data from backend")
            console.log(error)
            
        }
    }, [])
    return (
        <div>
            <Center>

                    <Heading>This is product page</Heading>
            </Center>

            {
                loading && <Text> Loading... </Text>
            }

            <Grid width = "80%" m={"auto"} templateColumns='repeat(2, 1fr)' gap={10}>

            {
                product.length>0 && (
                    
                    product.map((element, index)=>{
                        return(
                            <SingleProduct key = {index} product = {element} />
                        )
                    })
                    )    
                }
                </Grid>


                <Pagination />
            

            
        </div>
    );
}

export default Products;