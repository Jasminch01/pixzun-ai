import axios from "axios";
import React, { ReactNode, useEffect, useRef } from "react";
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoClose,
} from "react-icons/io5";
import { MdDelete, MdOutlineFileDownload } from "react-icons/md";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  showPrevImage: () => void;
  showNextImage: () => void;
  selectedImage: number;
  projectImage: [string];
}

const ImageMOdal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  showPrevImage,
  showNextImage,
  selectedImage,
  projectImage,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await axios.get(imageUrl, { responseType: "blob" });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imageUrl.split("/").pop() || "image.jpg");
      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-20 bg-[#1B1D29]"></div>

      {/* Modal Container */}
      <div className={`fixed inset-0 z-20 flex items-center justify-center`}>
        {/* Modal */}
        <dialog
          ref={modalRef}
          className={`z-40 rounded modal p-[1px] bg-gradient-to-r border-none shadow-none outline-none`}
        >
          <div className="relative rounded h-full flex flex-col justify-center items-center">
            <IoClose
              onClick={onClose}
              className="z-50 fill-white text-2xl absolute top-2 right-2 cursor-pointer"
              style={{ position: "fixed" }}
            />
            <button
              onClick={() => handleDownload(projectImage[selectedImage])}
              className="absolute z-50 top-0 right-10  text-white rounded-full p-2"
              style={{ position: "fixed" }}
            >
              <MdOutlineFileDownload size={24} />
            </button>
            <button
              // onClick={() => handleDelete(selectedImageIndex)}
              className="absolute z-50 top-0 right-20  text-white rounded-full p-2"
              style={{ position: "fixed" }}
            >
              <MdDelete size={24} />
            </button>
            <button
              onClick={showPrevImage}
              disabled={selectedImage === 0}
              className="absolute left-2 top-1/2 transform -translate-y-1/2  text-white rounded-full p-2"
              style={{ zIndex: 50, position: "fixed" }}
            >
              <IoChevronBackSharp size={26} />
            </button>
            <button
              onClick={showNextImage}
              disabled={selectedImage === projectImage.length - 1}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full p-2 cursor-pointer"
              style={{ zIndex: 50, position: "fixed" }}
            >
              <IoChevronForwardSharp size={26} />
            </button>
            {children}
          </div>
        </dialog>
      </div>
    </>
  );
};

export default ImageMOdal;
