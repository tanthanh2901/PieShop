import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import img from '../assets/p_img1.png'
import { addProductToCart } from '../api/CartApi';
import { CartContext } from '../context/CartContext';
import { getProductDetails } from '../constant/ShopApi';

const Product = () => {
  const {productId} = useParams();
  const [productData, setProductData] = useState(null);
  const {currency} = useContext(ShopContext)
  const {addProductToCartAndUpdateCount} = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${getProductDetails}/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProductData(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProductDetails();
  }, [productId]);

  async function handleAddToCart(productId) {
    await addProductToCartAndUpdateCount(productId);
  }

  // Function to trigger handleAddToCart when clicking the button
  function onclickAddToCart() {
    handleAddToCart(productId); // Call the function with the correct productId
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className='w-full sm:w-[80%]'>
            <img src={productData?.imageUrl} alt="product's image" className='w-full h-auto'/>
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData?.name || 'Product Name Not Available'}</h1>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData?.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData?.description}</p>
          
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 my-8" onClick={onclickAddToCart}>ADD TO CART</button>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;
