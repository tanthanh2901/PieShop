import { getOrder, getOrders, getPendingOrders, getCanceledOrders, getConfirmOrders, getShippingOrders, getDeliveredOrders, updateOrder, deleteOrder } from "../constant/ShopApi";
import axios from "axios";

export function getOrderApi(token) {
    return axios.get(getOrder, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        }
    })
}