import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import Pagination from '../components/Pagination'
import axios from 'axios'

const Collection = () => {
    const [products, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    const fetchProducts = async (page) => {
        try {
          //const res = await axios.get(adminProductsUrl);
          const res = await axios.get(`http://localhost:7226/products?pageNumber=${page}&pageSize=${pageSize}`)
          if (res.status >= 200 && res.status < 300) {
            const data = Array.isArray(res.data.data) ? res.data.data : [];    
            setTotalPages(res.data.totalPages);    
            setProduct(data);
          }
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      };
    
    useEffect(() => {
    fetchProducts(currentPage);
    }, [currentPage]);

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1 = {'ALL'} text2 ={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>
            </p>
        </div>

        <div className='grid gird-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {products.length > 0 ? (
            products.map((item, index) => (
                <ProductItem
                key={index}
                productId={item.productId}
                image={item.imageUrl}
                name={item.name}
                price={item.price}
                />
            ))
            ) : (
            <p>No products available</p> // Fallback message if products is not an array or empty
            )}
        </div>
        <div className='flex flex-col items-center mt-6'>
            <Pagination   
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            />  
        </div>
    </div>
  )
}

export default Collection
