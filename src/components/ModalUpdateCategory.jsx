import React, { useState, useEffect } from 'react';

const ModalUpdateCategory = ({ open, onClose, categoryData, onUpdate }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize the form with the existing category data
  useEffect(() => {
    if (open && categoryData) {
      setCategoryName(categoryData.name || '');
      setCategoryDescription(categoryData.description || '');
      setErrorMessage(''); // Clear errors when modal opens
    }
  }, [open, categoryData]);

  // Validate form inputs
  const validateInputs = () => {
    if (!categoryName.trim()) {
      setErrorMessage('Category name is required.');
      return false;
    }
    if (!categoryDescription.trim()) {
      setErrorMessage('Category description is required.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleUpdate = async () => {
    if (!validateInputs()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Pass updated data back to parent via `onUpdate`
      await onUpdate({
        categoryId: categoryData.categoryId,
        name: categoryName,
        description: categoryDescription,
      });
      onClose(); // Close the modal on success
    } catch (error) {
      console.error('Error updating category:', error);
      setErrorMessage('Failed to update the category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent rendering if modal is closed
  if (!open) return null;

  return (
    // Modal Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center bg-black/20 transition-colors"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
        className="bg-white rounded-xl shadow-lg p-6 w-96"
      >
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Update Category</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 text-sm text-red-600">{errorMessage}</div>
        )}

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter category name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Category Description
          </label>
          <textarea
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter category description"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {/* Cancel */}
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          {/* Update */}
          <button
            onClick={handleUpdate}
            className={`px-4 py-2 rounded text-white transition ${
              isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateCategory;
