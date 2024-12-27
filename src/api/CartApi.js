import axios from "axios";
import { getCart, getNumberCartProducts, addToCart, updateQuantityCartItem, removeFromCart, cleaerCart, checkout } from "../constant/ShopApi";

// get cart
export function getProductsFromCart(){
    return axios.get(getCart, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
//getNumberOfCartProducts
export function getNumberOfCartProducts(){
    return axios.get(getNumberCartProducts, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// clear cart
export function clearCartProducts(token){
    return axios.delete(`${cleaerCart}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        }
    });
}

// remove product in cart
export function deleteCartProduct(productID) {
    return axios.delete(`${removeFromCart}?productId=${productID}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }).catch((error) => {
      console.error('Error deleting product:', error.response || error.message);
    });
  }
  
// add product in cart
export function addProductToCart(productId){
    return axios.post(`${addToCart}?productId=${productId}&quantity=1`, null, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// update product in cart
export function updateProductInCart(cartItemId, quantity){
    return axios.put(`${updateQuantityCartItem}?cartItemId=${cartItemId}&quantity=${quantity}`, null, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

