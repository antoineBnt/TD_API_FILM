// Modal.jsx
import React from "react";
import { motion } from "framer-motion";

function Modal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 backdrop-blur-[16px]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg max-w-md w-full relative backdrop-blur"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &#10005;
        </button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="text-gray-700">{content}</div>
      </motion.div>
    </div>
  );
}

export default Modal;
