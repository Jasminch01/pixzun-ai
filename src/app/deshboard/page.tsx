"use client";
import React, { useRef, useEffect, useState } from "react";
import Container from "@/components/Container";
import { Brand, Folder, Leaf } from "@/components/Svg";
import { Modal } from "@/components/Modal";

const Page: React.FC = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  // Handle modal close
  const handleModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    setIsModalOpen(false);
  };

  // Open modal if the user is new
  useEffect(() => {
    if (isNewUser) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isNewUser]);

  // Show modal when isModalOpen changes
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isModalOpen]);

  return (
    <div className="min-h-screen mt-60">
      <Container>
        <div className="flex justify-center">
          <div className="md:w-[600px] rounded p-px bg-gradient-to-r from-[#A82AD8] to-[#4940D8]">
            <div className="rounded md:p-5 p-2 bg-[#222532] flex justify-center items-center space-x-5">
              <Folder />
              <p className="text-white text-sm md:text-base">
                Create New Project
              </p>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div className="text-white text-center space-y-5">
              <div className="flex justify-center">
                <Brand />
              </div>
              <p className="font-semibold text-xl md:text-2xl">
                Congratulations!
              </p>
              <p className="text-sm md:text-base">
                You have earned a free token to enhance your image
              </p>
              <div className="flex justify-center items-center space-x-2">
                <p className="md:text-2xl text-center text-sm">+1</p>
                <Leaf />
              </div>
            </div>
          </Modal>
        )}
        {/* TO DO : if have projects show's projects */}
        <div className="mt-[10.50rem]">
          <p className="text-gray-400 text-center text-sm md:text-base">
            You don’t have any projects yet!
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Page;
