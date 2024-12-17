import React, {useContext, useState, useEffect} from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets';
import { UserInfoContext } from '../context/UserInfoContext';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const PlaceOrder = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    shipName: '',
    shipAddress: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
  });
 
  const {userInfo} = useContext(UserInfoContext);
  useEffect(() => {
    if (userInfo && JSON.stringify(userInfo) !== JSON.stringify(user)) {
      setUser(userInfo);
    }
  }, [userInfo, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { totalAmount } = useContext(CartContext);
  const shippingFee = 10.00;

  const [selectedPayment, setSelectedPayment] = useState('1');

  const orderPayload = {
    userId: user.userId,
    shipAddress: user.shipAddress,
    shipName: user.shipName,
    phoneNumber: user.phoneNumber,
    paymentMethodId: selectedPayment
  };

  const [paymentUrl, setPaymentUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      const res = await axios.post("https://localhost:7226/payment/placeOrder", orderPayload);
      if(res.status >= 200 && res.status <= 300) {
        const data = res.data;
        if (orderPayload.paymentMethodId === '1') {
          setMessage(data.message || 'Order placed successfully!');
        } else if (orderPayload.paymentMethodId === '2') {
          setPaymentUrl(data || ''); // Backend should return `paymentUrl`
        }
      }
    } catch (error) {
      setMessage(error.res?.data?.message || 'Failed to place order.');
    }
    

  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4'>
      {/* Delivery Information Section */}
      <div className='flex flex-col gap-4 w-full sm:flex-1'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY '} text2={'INFORMATION'} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="email" 
            placeholder='Email'
            value={user.email || ''}
            onChange={handleChange}
            required
          />          
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ship name</label>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Ship name'
            value={user.shipName || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="">Ship Address</label>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Street'
            value={user.shipAddress || ''}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                type="text" 
                placeholder='City'
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                type="text" 
                placeholder='State'
                required
              />
            </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zipcode</label>
              <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                type="text" 
                placeholder='Zipcode'
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                type="text" 
                placeholder='Country'
                required
              />
            </div>
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">phoneNumber</label>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="number" 
            placeholder='Phone'
            value={user.phoneNumber || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className='flex flex-col gap-4 w-full sm:flex-1'>
      {/* Cart Totals Section */}
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'CART '} text2={'TOTALS'} />
        </div>
        <div className='w-full border border-gray-200 p-4 rounded-lg'>
          <div className='flex justify-between py-1'>
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className='flex justify-between py-1'>
            <p>Shipping Fee</p>
            <p>${shippingFee}</p>
          </div>
          <div className='flex justify-between py-3 border-t mt-2'>
            <p className='text-black font-semibold'>Total</p>
            <p className='text-black font-semibold'>${totalAmount + shippingFee}</p>
          </div>
        </div>

         {/* Payment Method Section */}
         <div className='mt-8'>
            <div className='text-xl sm:text-2xl'>
              <Title text1={'PAYMENT '} text2={'METHOD'} />
            </div>
            <div className='flex gap-4'>
              <label className='flex items-center gap-2'>
                <input 
                  type="radio" 
                  name="payment" 
                  value="1" 
                  checked={selectedPayment === "1"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>             
              </label>
              <label className='flex items-center gap-2'>
                <input 
                  type="radio" 
                  name="payment" 
                  value="2" 
                  checked={selectedPayment === "2"}
                  onChange={(e) => setSelectedPayment(e.target.value)}              
                />
                <img className='h-20 w-20 object-contain mx-4' src={assets.vnpay_logo} alt="Vnpay Logo" />
              </label>
              {/* <label className='flex items-center gap-2 '>
                <input 
                  type="radio" 
                  name="payment" 
                  value="3" 
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                <img className='h-20 w-auto mx-4' src={assets.paypal_logo} alt="Paypal Logo" />
              </label> */}
            </div>
          </div>

          {/* Place Order Button */}
          <div className='w-full text-end'>
            <button 
              onClick={handleCheckout} 
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PLACE ORDER
            </button>
          </div>
          {message && <p className="mt-4 text-green-500">{message}</p>}
          {paymentUrl && (
            <div className="mt-4">
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Proceed to VNPAY Payment
              </a>
            </div>
          )}
      </div>
    </div>
  );
}

export default PlaceOrder;
