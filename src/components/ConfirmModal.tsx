import React, { useEffect, useRef } from "react";

interface ImageDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const ImageDeleteConfirmationModal: React.FC<
  ImageDeleteConfirmationModalProps
> = ({ isOpen, onClose, onConfirmDelete }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      className="fixed bg-gray-800 rounded z-40 flex items-center justify-center p-5"
    >
      <div className="">
        <h2 className="text-sm text-white mb-4">
          Are you sure you want to delete this asset?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 text-sm rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmDelete}
            className="bg-red-500 text-white p-2 text-sm rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ImageDeleteConfirmationModal;
