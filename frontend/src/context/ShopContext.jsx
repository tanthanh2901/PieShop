import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
//import {products} from '../assets/assets'
import { getAllProducts } from "../constant/ShopApi";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await fetch(getAllProducts);

            if (!response.ok) {
            throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.data);
        } catch (err) {
            console.log(err.message);
        } 
        };

        fetchProducts();
    }, []);
    
    const currency = '$';
    const delivery_fee = 10;

    const value = {
        products, currency, delivery_fee
    }

    return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider;