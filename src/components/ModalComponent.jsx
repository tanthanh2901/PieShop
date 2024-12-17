import React from 'react';

const ModalComponent = ({ open, onClose, modal }) => {
  if (!modal) return null;

  return (
    // Backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? 'visible bg-black/20' : 'invisible'
      }`}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        className={`bg-white rounded-xl shadow-lg p-8 transition-all w-96 ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="text-center">
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Action</h3>
          {/* Message */}
          <p className="text-lg text-gray-600 mb-6">{modal.message}</p>
          {/* Buttons */}
          <div className="flex gap-4">
            {/* Confirm Button */}
            <button
              className="w-full py-2 rounded bg-red-600 text-white text-base font-medium hover:bg-red-700 transition"
              onClick={modal.handle}
            >
              Confirm
            </button>
            {/* Cancel Button */}
            <button
              className="w-full py-2 rounded border border-gray-300 text-base text-gray-600 font-medium hover:bg-gray-200 transition"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
