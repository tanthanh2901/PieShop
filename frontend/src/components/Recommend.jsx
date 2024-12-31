import React, {useContext, useState, useEffect} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const Recommend = () => {
    const { products } = useContext(ShopContext)

    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        setBestSeller(products.slice(0,5));
    },[])
    
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1 = {'RECOMMEND'} text2 ={'PIE'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>
                    Our recommended pies are crafted with the finest ingredients and bursting with flavor
                </p>
            </div>

            <div className='grid gird-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item, index) => (
                    <ProductItem key={index} productId={item.productId} image={item.imageUrl} name={item.name} price={item.price}/>
                ))
                
            }
            </div>
            
        </div>
    )
}

export default Recommend
