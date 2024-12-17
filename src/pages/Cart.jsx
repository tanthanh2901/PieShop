import React, { useState, useEffect, useContext } from 'react';
import { getProductsFromCart, clearCartProducts, deleteCartProduct, updateProductInCart } from '../api/CartApi';
import Title from '../components/Title';
import CartCard from '../components/CartCard';
import CartSummary from '../components/CartSummary';
import { CartContext } from '../context/CartContext';

function Cart() {

  const token = localStorage.getItem('jwt'); // Get the token from localStorage

  const { cartProducts, setCartProducts, updateCart, numberOfCartProducts } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (Array.isArray(cartProducts)) {
      const newTotalPrice = cartProducts.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
      setTotalPrice(newTotalPrice);
    }
  }, [cartProducts]);

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    await updateCart(cartItemId, newQuantity);
  };
  
  function onClickIncrementQuantity(cartItemId) {
  if(cartProducts) {
    const updatedCartProducts = cartProducts.map((product) => {      
    if(product.cartItemId == cartItemId) {
        const newQuantity = product.quantity + 1;
        return {...product, quantity: newQuantity }
      }
      return product;
    });
    setCartProducts(updatedCartProducts);
    const updatedProduct = updatedCartProducts.find(product => product.cartItemId === cartItemId);
    if (updatedProduct) {
      handleUpdateQuantity(cartItemId, updatedProduct.quantity);
    }
  }

}
function onClickDecrementQuantity(cartItemId) {
  if(cartProducts) {
    const updatedCartProducts = cartProducts.map((product) => {      
    if(product.cartItemId == cartItemId) {
      if(product.quantity - 1 > 0) {
        const newQuantity = product.quantity - 1;
        return {...product, quantity: newQuantity }
      } 
    }
      return product;
    });
    setCartProducts(updatedCartProducts)
    const updatedProduct = updatedCartProducts.find(product => product.cartItemId === cartItemId);
    if (updatedProduct) {
      handleUpdateQuantity(cartItemId, updatedProduct.quantity);
    }  }
}

function onClickRemoveProduct(cartItemId) {
  removeCartProducts(cartItemId);
}

const removeCartProducts = async (cartItemId)=>{
  const product = cartProducts.find(product => product.cartItemId == cartItemId); 
  const productId = product.productId;
  console.log(productId);
  const updatedCartProducts = cartProducts.filter(product => product.cartItemId != cartItemId)
  const res = await deleteCartProduct(productId, token);
  if(200<=res.status&&res.status<300){
      setCartProducts(updatedCartProducts)
  }
}
function onChangeQuantity(event, cartItemId) {
  const newQuantity = parseInt(event.target.value, 10);
  if(newQuantity > 0 && cartProducts && Array.isArray(cartProducts)) {
    const updatedCartProducts = cartProducts.map((product) => {      
    if(product.cartItemId == cartItemId) {
      return {...product, quantity: newQuantity }     
    }
      return product;
    });
    setCartProducts(updatedCartProducts);
    updateCart(cartItemId, newQuantity);
  }
}

  return (
    <div className='border-t pt-14'>
      <div className=' text-2xl mb-3'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <Title text1 = {'YOUR'} text2 ={'CART'}/>         
        </div>
        <div>
        {/* {
          cartProducts.map((product) => (
              <CartCard 
              key={product.cartItemId} 
              numberIndex={product.cartItemId}
              product={product}
              onClickIncrementQuantity={onClickIncrementQuantity}
              onClickDecrementQuantity={onClickDecrementQuantity}
              onClickRemoveProduct={onClickRemoveProduct}
              onChangeQuantity={onChangeQuantity}
              />             
          ))          
        } */}
        {
          Array.isArray(cartProducts) ? (
            cartProducts.map((product) => (
              <CartCard
                key={product.cartItemId}
                numberIndex={product.cartItemId}
                product={product}
                onClickIncrementQuantity={onClickIncrementQuantity}
                onClickDecrementQuantity={onClickDecrementQuantity}
                onClickRemoveProduct={onClickRemoveProduct}
                onChangeQuantity={onChangeQuantity}
              />
            ))
          ) : (
            <p>Loading cart...</p>
          )
        }

        </div>
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartSummary
              items={numberOfCartProducts}
              total={totalPrice}
            />   
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
