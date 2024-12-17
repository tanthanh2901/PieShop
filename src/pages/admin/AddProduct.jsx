import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminCategoriesUrl } from '../../constant/ShopApi';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(adminCategoriesUrl);
        const status = res.status;
        if(status >= 200 && status <= 300) {
          setCategories(res.data);
        }
      } catch (error) {
        
      }
    }
    fetchCategories();
  }
  ,[categories]);

  const handleAdd = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const imageInput = document.getElementById("image1");
    const name = event.target.form[1].value;
    const description = event.target.form[2].value;
    const price = parseFloat(event.target.form[3].value) || 0;
    const stock = parseInt(event.target.form[4].value) || 0;
    const category = parseInt(event.target.form[5].value) || 0;

    if (imageInput.files.length > 0) {
        formData.append("Image", imageInput.files[0]);
    }
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("Stock", stock);
    formData.append("CategoryId", category);

    try {
        const response = await fetch("https://localhost:7226/admin/products/create", {
            method: "POST",
            body: formData, // FormData includes the correct content type
        });

        if (response.ok) {
            const newProduct = await response.json();
            alert("Product added successfully!");
            console.log(newProduct);
        } else {
            const error = await response.json();
            console.error("Error:", error);
            alert("Failed to add product.");
        }
    } catch (error) {
        console.error("Error adding product:", error);
        alert("An error occurred.");
    }
};


  return (
    <div>
      <form className="flex flex-col w-full items-start gap-3">
        {/* Add Product Form */}
        <div>
          <p className="mb-2">Upload Image</p>
          <div>
            <label htmlFor="image1">
              <input type="file" id="image1" />
            </label>
          </div>
        </div>
        <div className='w-full'>
          <p className='mb-2'>Product Name</p>
          <input 
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            type="text" 
            required
            placeholder="Enter product name" />
        </div>
        <div className='w-full'>
          <p className='mb-2'>Product Description</p>
          <textarea 
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter product description"
            required
            />
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
          <div>
            <p className='mb-2'>Product Price</p>
            <input className='w-full px-3 py-2 sm:w-[120px] border border-gray-300 rounded' type="number" placeholder="Enter price" />
          </div>
          <div>
            <p className='mb-2'>Stock</p>
            <input className='w-full px-3 py-2 sm:w-[120px] border border-gray-300 rounded' type="number" placeholder="Enter stock" />
          </div>
          <div>
            <p className='mb-2'>Category</p>
            <select className='w-full px-3 py-2'>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className='w-32 py-3 text-white rounded bg-indigo-600 hover:bg-indigo-700' onClick={handleAdd}>Add Product</button>
      </form>
    </div>
  );
};


export default AddProduct
