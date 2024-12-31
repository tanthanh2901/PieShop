import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestPie = () => {
    const { products } = useContext(ShopContext)

    const [latestCollection, setLatestCollection] = useState([])

    useEffect(() => {
        setLatestCollection(products.slice(0,5));
    },[])
    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1 = {'LATEST'} text2 ={'PIE'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>
                Explore our latest collection of delicious, freshly baked pies
            </p>
        </div>

        <div className='grid gird-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestCollection.map((item, index) => (
                    <ProductItem key={index} productId={item.productId} image={item.imageUrl} name={item.name} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default LatestPie
