import { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white w-[90%] max-w-[600px] md:w-[600px] p-6 rounded-lg shadow-lg relative my-10">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
