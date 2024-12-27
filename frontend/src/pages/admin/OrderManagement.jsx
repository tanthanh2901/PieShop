import React, { useState, useEffect } from 'react';
import { getOrderApi } from '../../api/OrderApi';
import axios from 'axios';
import { adminOrdersUrl, updateOrder } from '../../constant/ShopApi';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    // Fetch orders from API on component mount
    const fetchOrders = async () => {
      try {
        const response = await axios.get(adminOrdersUrl); // Call the API with token
        const fetchedOrders = response.data || [];
        if (!Array.isArray(fetchedOrders)) {
          throw new Error('API response is not an array');
        }   
        
        // Transform API response into the required format for UI
        const transformedOrders = fetchedOrders.map(order => ({
          id: order.orderId,
          status: convertStatus(order.status),
          products: order.orderDetailsDto.map(item => ({
            productName: item.productName, // Replace with actual product name if available
            quantity: item.quantity,
            price: item.unitPrice,
            imageUrl: item.imageUrl, // Placeholder image, replace as needed
          })),
          orderDate: new Date(order.orderDate).toLocaleDateString(),
          totalAmount: order.totalAmount
        }));

        setOrders(transformedOrders); // Update state with the transformed data
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders(); 
  }, []);

  const filteredOrders = selectedStatus === 'All' ? orders : orders.filter(order => order.status === selectedStatus);
  function onClickFurfillOrder(orderId) {
    const response = axios.post(`${updateOrder}?orderId=${orderId}&status=1`)    
    try {
      if(response.status === 200){
        alert("Fulfill order successfully")
      }
    } catch (error) {
      console.error('Error: ', error);

    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {/* Order Status Tabs */}
      <div className="mb-6">
        {['All', 'Pending', 'Confirmed', 'Shipping', 'Delivered', 'Canceled'].map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 mr-2 ${selectedStatus === status ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        filteredOrders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="font-semibold">Order ID: {order.id}</h3>
            <div className="flex flex-col space-y-4">
              {/* Iterate through each product in the order */}
              {order.products.map((product, index) => (
                <div key={index} className="flex items-center justify-between border-b py-2">
                  {/* Product Image and Name */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{product.productName}</h4>
                      <p className="text-gray-500">Quantity: {product.quantity}</p>
                      <p className="text-gray-500">Price: ${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div className="flex justify-between mt-2">
              <p className="text-gray-500">Order Date: {order.orderDate}</p>
              <p className="text-lg font-semibold">Total price: ${order.totalAmount.toFixed(2)}</p>
              {/* Order Status */}
              <div className="text-right">
                <p className={`mt-1 font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </p>
                <div className="mt-2">
                  {order.status === 'Pending' && (
                    <button onClick={() => onClickFurfillOrder(order.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Furfill
                    </button>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Helper function to get different colors for order statuses
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-500';
    case 'Confirmed':
      return 'text-orange-600';
    case 'Shipping':
      return 'text-blue-500';
    case 'Delivered':
      return 'text-green-600';
    case 'Canceled':
      return 'text-red-600';
    default:
      return 'text-gray-500';
}
};

// Helper function to convert status from API to human-readable string
const convertStatus = (status) => {
  switch (status) {
    case 0:
      return 'Pending';
    case 1:
      return 'Confirmed';
    case 2:
      return 'Shipping';
    case 3:
      return 'Delivered';
    case 4:
      return 'Canceled'; 
    default:
      return 'Unknown';
  }
};

export default OrderManagement;
