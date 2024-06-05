import React, { ReactNode, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
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
          <div
            className="fixed inset-0 z-50 bg-black opacity-50"
          ></div>
          <div className="relative flex items-center justify-center mt-[16rem] md:mt-[15rem] 2xl:mt-[18rem]">
            {/* Gradient Background */}
            <div className="absolute bg-gradient-to-b from-[#A82AD8] to-[#A82AD8] blur-3xl rounded md:w-[40rem] md:h-[20rem] h-[10rem] w-[20rem] opacity-65"></div>
            <dialog
              ref={modalRef}
              className="relative mb-40 md:mt-[25rem] z-40 rounded modal p-[1px] md:w-[40rem] md:h-[25rem] bg-gradient-to-r from-[#A82AD8] to-[#A82AD8] border-none shadow-none outline-none"
            >
              <div className="rounded p-5 h-full bg-[#222532] flex flex-col justify-center items-center space-y-5">
                <IoClose
                  onClick={onClose}
                  className="modal-close-btn fill-white text-2xl absolute top-2 right-2 cursor-pointer"
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
