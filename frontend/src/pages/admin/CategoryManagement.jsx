import AddCategory from '../../components/admin/AddCategory';
import CategoryItem from '../../components/admin/CategoryItem';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminCategoriesUrl, deleteCategoryApi, updateCategoryApi } from '../../constant/ShopApi';
import ModalComponent from '../../components/ModalComponent';
import ModalUpdateCategory from '../../components/ModalUpdateCategory';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Track which category to delete
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(adminCategoriesUrl);
      if (res.status >= 200 && res.status < 300) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(
        `${updateCategoryApi}`,
        updatedCategory
      );
      if (response.status === 204) {
        alert('Category updated successfully!');
        fetchCategories(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update category:', error);
      throw new Error('Update failed');
    }
  };
  

  const deleteCategory = async () => {
    try {
      const res = await axios.delete(`${deleteCategoryApi}${selectedCategoryId}`);
      if (res.status >= 200 && res.status < 300) {
        alert('Category deleted successfully!');
        fetchCategories();
        setIsModalOpen(false); // Close the modal
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category.');
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category); // Set the category to edit
    setIsModalUpdateOpen(true); // Open the modal
  };


  return (
    <div>
      <AddCategory />
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Categories List</h2>
        <div className="flex flex-col gap-2">
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
            <b>Name</b>
            <b>Description</b>
            <b className="text-center">Action</b>
          </div>
          <div>
            {categories.map((category) => (
              <CategoryItem
                key={category.categoryId} // Always provide a unique key when mapping components
                category={category}
                onUpdate={() => handleEditClick(category)} 
                onDelete={(categoryId) => {
                  setIsModalOpen(true); // Open modal
                  setSelectedCategoryId(categoryId); // Set the category to delete
                }}
              />
            ))}
          </div>
          {categories.length === 0 && (
            <p className="text-center text-gray-500">No categories available. Start adding one!</p>
          )}
        </div>
      </div>

      <ModalComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modal={{
          message: 'Are you sure you want to delete this category?',
          handle: deleteCategory, // Pass the delete handler
        }}
      />

      <ModalUpdateCategory 
        open={isModalUpdateOpen}
        onClose={() => setIsModalUpdateOpen(false)}
        categoryData={selectedCategory} // Pass the selected category data
        onUpdate={(updatedCategory) => {
          updateCategory(updatedCategory); // Update the category
          setIsModalUpdateOpen(false); // Close the modal after success
        }}
      />
    </div>
  );
};

export default CategoryManagement;
