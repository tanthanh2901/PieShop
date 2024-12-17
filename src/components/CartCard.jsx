import React, {useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';

function CartCard(props) {
    const {currency } = useContext(ShopContext);
    
    const { numberIndex, product, onChangeQuantity, onClickIncrementQuantity, onClickDecrementQuantity, onClickRemoveProduct } = props;
    const { productName, picture, price, quantity } = product;

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
        <img className="w-16 sm:w-20" src='data:image/png;base64,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' alt={productName} />
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
