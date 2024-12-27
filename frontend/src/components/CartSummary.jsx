import React from 'react';
import Title from '../components/Title';
import { useNavigate  } from 'react-router-dom';


const CartSummary = ({items, total}) => {
  const navigate = useNavigate();

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1 = {'CART'} text2 ={'TOTALS'}/>
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
              <p>Items:</p>
              <p>{items}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Total:</p>
                <p>${total}</p>
            </div>
            <div className='w-full text-end'>
              <button onClick={() => navigate('/placeOrder')} className='bg-black text-white text-sm my-8 px-8 py-3'>
                PROCEED TO CHECKOUT
              </button>
            </div>
        </div>
    </div>
  )
}

export default CartSummary
