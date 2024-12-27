import React, {useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';

function CartCard(props) {
    const {currency } = useContext(ShopContext);
    
    const { numberIndex, product, onChangeQuantity, onClickIncrementQuantity, onClickDecrementQuantity, onClickRemoveProduct } = props;
    const { productName, imageUrl, price, quantity } = product;

    const productIndex = numberIndex;

    const onClickDecrement = (event) => {
      onClickDecrementQuantity(productIndex);
    }

    const onClickIncrement = (event) => {
      onClickIncrementQuantity(productIndex);
    }
    
    const onChangeQuantityCartItem= (event) => {
      onChangeQuantity(event, productIndex);
    }

    const onClickRemove = (_event)=>{
      onClickRemoveProduct(productIndex)
  }

  return (
    <div className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
      <div className=' flex items-start gap-6'> 
        <img className="w-16 sm:w-20" src={imageUrl} alt={productName} />
        <div>
            <p className='text-xs sm:text-lg font-medium'>{productName}</p>
            <div className='flex items-center gap-5 mt-2'>
                <p>{currency} {price}</p>
            </div>
        </div>
      </div>
      <div>
        <button className="btn btn-link px-2" onClick={onClickDecrement}>
          -
        </button>
        <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
          name="quantity"
          type="number" 
          value={quantity} 
          onChange={onChangeQuantityCartItem}/>
        <button className="btn btn-link px-2" onClick={onClickIncrement}>
          +
        </button>
      </div>
      <img className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="clear item" onClick={onClickRemove}/>
    </div>
  )
}

export default CartCard
