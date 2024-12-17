import { createContext, useState, useEffect, useContext } from "react";
import { addProductToCart, getNumberOfCartProducts, getProductsFromCart, updateProductInCart } from "../api/CartApi";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [numberOfCartProducts, setNumberOfCartProducts] = useState(0);
  const totalAmount = cartProducts.reduce((total, item) => total + (item.quantity * item.price), 0) 
  // const fetchNumberOfCartProducts = async () => {
  //   try {
  //     const res = await getNumberOfCartProducts();
  //     if (res.status >= 200 && res.status < 300) {
  //       const data = res.data; 
  //       setNumberOfCartProducts(data);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Error:', error.response.data);
  //     }
  //   }
  // };

  const fetchCart  = async () => {
    try {
      const res = await getProductsFromCart();
      if (res.status >= 200 && res.status < 300) {
        const data = Array.isArray(res.data) ? res.data : [];        
        setCartProducts(data);
      }
    } catch (error) {      
        //console.error('Error:', error);
    }
  };

  useEffect(() => {
    // const fetchData = async () => {
      
    //   try {
    //     const cartResponse = await getProductsFromCart();
    //     if (cartResponse.status >= 200 && cartResponse.status < 300) {
    //       const data = Array.isArray(cartResponse.data) ? cartResponse.data : [];        
    //       setCartProducts(data);
    //     }

    //     const countResponse = await getNumberOfCartProducts();
    //     if (countResponse.status >= 200 && countResponse.status < 300) {
    //       const data = countResponse.data; 
    //       setNumberOfCartProducts(data);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching cart data:', error.response?.data || error.message);
    //   }
    // };
  
    fetchCart();
  }, []); // Empty dependency array ensures this runs only once
  
  useEffect(() => {
    if (Array.isArray(cartProducts)) {
      const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);
      setNumberOfCartProducts(totalQuantity);
    }
  }, [cartProducts]); // Only runs when cartProducts changes
  

  const updateCart = async (cartItemId, quantity) => {
    const res = await updateProductInCart(cartItemId, quantity);
    if(res.status >= 200 && res.status <= 300) {
      console.log("cart updated");
    }
  }

  const addProductToCartAndUpdateCount  = async (productId) => {
    try {
      const res = await addProductToCart(productId);
      if(res.status >= 200 && res.status <= 300) {
        console.log('Product added successfully');
        // Fetch the updated cart count
        const countRes = await getNumberOfCartProducts();
        if (countRes.status >= 200 && countRes.status < 300) {
          setNumberOfCartProducts(countRes.data);
        }

      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }
  
  const value = {
    numberOfCartProducts,
    setNumberOfCartProducts,
    cartProducts,
    setCartProducts,
    updateCart,
    addProductToCartAndUpdateCount,
    totalAmount
  };

  return (
    <CartContext.Provider value={value}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
