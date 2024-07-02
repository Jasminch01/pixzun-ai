import React, { ReactNode, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  gradientSize?: string;
  modalSize?: string; // Combined height and width prop
  marginTop?: string; // Optional marginTop prop
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  gradientSize = "md:w-[40rem] md:h-[20rem] h-[10rem] w-[20rem] ",
  modalSize = "md:w-[40rem] md:h-[25rem] mb-40 relative ", // Default size
  marginTop = "mt-[16rem] md:mt-[15rem] 2xl:mt-[18rem]", // Default margin-top
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40 bg-black opacity-50"></div>

          {/* Modal Container */}
          <div className= {` fixed inset-0 z-50 flex items-center justify-center ${marginTop}`}>
            {/* Gradient Background */}
            <div
              className={`absolute bg-gradient-to-b from-[#A82AD8] to-[#A82AD8] blur-3xl rounded opacity-50 ${gradientSize}`}
            ></div>

            {/* Modal */}
            <dialog
              ref={modalRef}
              className={`z-40 rounded modal p-[1px] bg-gradient-to-r from-[#A82AD8] to-[#A82AD8] border-none shadow-none outline-none ${modalSize}`}
            >
              <div className="rounded p-5 h-full bg-[#222532] flex flex-col justify-center items-center space-y-5">
                <IoClose
                  onClick={onClose}
                  className="modal-close-btn z-30 fill-white text-2xl absolute top-2 right-2 cursor-pointer"
                />
                {children}
              </div>
            </dialog>
          </div>
        </>
      )}
    </>
  );
};
