import React, { useState, useEffect } from 'react'
import ProductItem from '../../components/admin/ProductItem';
import { adminProductsUrl } from '../../constant/ShopApi';
import ModalComponent from '../../components/ModalComponent';
import Pagination from '../../components/Pagination';
import axios from 'axios';

const ProductManagement = () => {
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    const [selectedProductId, setSelectedProductId] = useState(null); // Track which category to delete
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchProducts = async (page) => {
        try {
          //const res = await axios.get(adminProductsUrl);
          const res = await axios.get(`http://localhost:7226/admin/products?pageNumber=${page}&pageSize=${pageSize}`)
          console.log(res)

          if (res.status >= 200 && res.status < 300) {
            const data = Array.isArray(res.data.data) ? res.data.data : [];    
            setTotalPages(res.data.totalPages);    
            setProduct(data);
          }
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      };
    
    useEffect(() => {
    fetchProducts(currentPage);
    }, [currentPage]);

    const updateProduct = async (categoryId, updatedCategory) => {
    try {
        const res = await axios.put(`${adminCategoriesUrl}/${categoryId}`, updatedCategory);
        if (res.status >= 200 && res.status < 300) {
        alert('Category updated successfully!');
        fetchProducts();
        }
    } catch (error) {
        console.error('Failed to update category:', error);
        alert('Failed to update category.');
    }
    };

    const deleteProduct = async () => {
    try {
        const res = await axios.delete(`${deleteProduct}${selectedProductId}`);
        if (res.status >= 200 && res.status < 300) {
        alert('Category deleted successfully!');
        fetchProducts();
        setIsModalOpen(false); // Close the modal
        }
    } catch (error) {
        console.error('Failed to delete category:', error);
        alert('Failed to delete category.');
    }
    };
    
      
    return (
    <div>
        <p className='mb-2'>Products List</p>
        <div className='flex flex-col gap-2'>
            <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b className="text-center">Action</b>
            </div>
            <div>
                {product.map((product) => (
                    <ProductItem 
                    key={product.productId} // Always provide a unique key when mapping components
                    product={product}
                    onUpdate={(productId) => updateCategory(productId, { /* Pass updated data */ })}
                    onDelete={(productId) => {
                      setIsModalOpen(true); // Open modal
                      setSelectedProductId(productId); // Set the category to delete
                    }}
     
                    />
                ))}
            </div>
        </div>
        <ModalComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modal={{
          message: 'Are you sure you want to delete this product?',
          handle: deleteProduct, // Pass the delete handler
        }}
      />
      <div className='flex flex-col items-center mt-6'>
        <Pagination   
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

      </div>
    </div>
  )
}

export default ProductManagement
