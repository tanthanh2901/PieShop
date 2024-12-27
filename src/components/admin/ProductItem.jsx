import React from 'react';

const ProductItem = ({ product, onUpdate, onDelete }) => {
  return (
    <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
      <img className='w-12' src={product.imageUrl} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <p className='text-right md:text-center space-x-2'>
        <button
          onClick={() => onUpdate(product.productId)}
          className='text-blue-600 hover:underline'
        >
          Update
        </button>
        <button
          onClick={() => onDelete(product.productId)}
          className='text-red-600 hover:underline'
        >
          Delete
        </button>
      </p>    </div>
  );
};

export default ProductItem;
