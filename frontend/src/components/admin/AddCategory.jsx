import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminCategoriesUrl, createCategory } from '../../constant/ShopApi';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
 
  const handleAddBtn = async (event) => {
    event.preventDefault();

    if (!name || !description) {
      setMessage('Please fill in all fields.');
      return;
    }

    const newCategory = { name, description };

    try {
      setLoading(true);
      const res = await axios.post(createCategory, newCategory);
      const status = res.status;
      if(status >= 200 && status <= 300) {
        setMessage('Category created successfully!');
        console.log('Response:', res.status);
        // Clear input fields
        setName('');
        setDescription('');
      }
    } catch (error) {
      setMessage('Failed to create category. Please try again.');
      console.error('Error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Category</h2>
        <form className="flex flex-col w-full items-start gap-4">
          <div className="w-full">
            <label className="block mb-2">Category Name</label>
            <input
              className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              type="text"
              placeholder="Type here"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="block mb-2">Category Description</label>
            <textarea
              className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Write content here"
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <button
            onClick={handleAddBtn}
            className={`w-32 py-3 text-white rounded ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Category'}
          </button>
          {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </form>
      </div>
    </>
    
  );
};

export default AddCategory;
