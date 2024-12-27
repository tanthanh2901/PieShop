import React from 'react';

const CategoryItem = ({ category, onUpdate, onDelete }) => { 
  return (
    <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
      <p>{category.name}</p>
      <p>{category.description}</p>
      <p className='text-right md:text-center space-x-2'>
        <button
          onClick={() => onUpdate(category.categoryId)}
          className='text-blue-600 hover:underline'
        >
          Update
        </button>
        <button
          onClick={() => onDelete(category.categoryId)}
          className='text-red-600 hover:underline'
        >
          Delete
        </button>
      </p>    
    </div>
  );
};

export default CategoryItem;
