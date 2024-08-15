import React from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CheckOutModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 z-10 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8">
        <button onClick={onClose} className="absolute top-0 right-0 p-4 ">
          <IoClose className="modal-close-btn z-30 fill-white text-2xl absolute top-2 right-2 cursor-pointer" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default CheckOutModal;
