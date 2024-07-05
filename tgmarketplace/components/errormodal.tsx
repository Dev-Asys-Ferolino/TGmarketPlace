// ErrorModal.js
import React from "react";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}
const ErrorModal = ({ message, onClose }: ErrorModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4 ml-[75px]">Error</h2>
        <p>{message}</p>
        <button
          className="bg-red-400 text-white px-4 py-2 rounded mt-5 ml-[62px]"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
