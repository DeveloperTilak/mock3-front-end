import { Center, Text, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ITEMS_PER_PAGE = 4;

const Pagination=()=> {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`https://rich-blue-elephant-sari.cyclic.app/products?page=${page}`);
      setData(response.data.products || []);
      const totalItems = response.data.totalProduct;
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

   
  useEffect(() => {
    fetchData(currentPage);
    console.log(currentPage);
  }, [currentPage]);

  return (
    <div>
      {data?.map((item) => (
        <div key={item._id}>
          <p>{item.name}</p>
          <p>{item.description}</p>
        </div>
      ))}

      <Center mt={4}>
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </Button>
        <Text mx={2}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Center>
    </div>
  );
}

export default Pagination;
