"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { Brand, Folder, Leaf, LeafBright } from "@/components/Svg";
import { Modal } from "@/components/Modal";
import RecentProjects from "@/components/Deshboard/Projects/RecentPorjects";
import { useUserContext } from "../context/ContextProvider";
import axiosInstance from "@/utils/axiosInstance";

const Page: React.FC = () => {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projectName, setProjectName] = useState<string>("");
  const { currentUser, isprojectsLoading } = useUserContext();

  // Handle modal close
  const handleWelcomeModalClose = () => {
    setIsWelcomeModalOpen(false);
  };

  const handleNewProjectModalClose = () => {
    setIsNewProjectModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleCreateNewProjects = async () => {
    if (!projectName.trim()) {
      alert("Project name cannot be empty");
      return;
    }

    const payload = {
      name: projectName,
    };

    try {
      const res = await axiosInstance.post(
        `/api/project/create-project`,
        payload
      );

      if (res.data.data) {
        const newProject = res.data.data;
        window.location.href = `/app/create-project/${newProject._id}`;
      }
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsNewProjectModalOpen(false);
    }
  };

  // Open modals if the user is new
  useEffect(() => {
    if (currentUser) {
      const createdAt = new Date(currentUser?.createdAt);
      const now = new Date();
      const diffInMillis = now.getTime() - createdAt.getTime();
      const isNewUser = diffInMillis <= 2 * 60 * 1000;

      if (isNewUser) {
        const welcomeTimer = setTimeout(() => {
          setIsWelcomeModalOpen(true);
        }, 5000);
        return () => clearTimeout(welcomeTimer);
      }
    }
  }, [currentUser]);

  return (
    <div className="xl:mt-32 lg:mt-2 mt-28">
      <Container>
        <div className="flex justify-center">
          {/* adjust height width for small devices */}
          <div
            onClick={
              isprojectsLoading
                ? () => setIsNewProjectModalOpen(false)
                : () => setIsNewProjectModalOpen(true)
            }
            className="cursor-pointer xl:w-[32rem] w-[15rem] lg:w-[25rem] rounded p-px bg-gradient-to-r from-[#A82AD8] to-[#4940D8]"
          >
            <div className="rounded xl:p-5 p-2 lg:p-3 bg-[#222532] flex justify-center items-center space-x-5">
              <div>
                <Folder />
              </div>
              <p className="text-white text-sm md:text-base">
                Create New Project
              </p>
            </div>
          </div>
        </div>

        {isWelcomeModalOpen && (
          <Modal
            isOpen={isWelcomeModalOpen}
            onClose={handleWelcomeModalClose}
            modalSize={"md:h-[25rem] md:w-[40rem]"}
            gradientSize={"md:h-[25rem] md:w-[30rem] h-[15rem] w-[20rem]"}
            marginTop={"-mt-[5rem]"}
          >
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
                <LeafBright />
                <Leaf />
              </div>
            </div>
          </Modal>
        )}

        {isNewProjectModalOpen && (
          <Modal
            isOpen={isNewProjectModalOpen}
            onClose={handleNewProjectModalClose}
            modalSize={"md:h-[15rem] md:w-[30rem] w-[20rem]"}
            gradientSize={"md:h-[10rem] md:w-[25rem] h-[15rem] w-[20rem]"}
            marginTop={"-mt-[7rem]"}
          >
            <div className="text-white md:w-[20rem]">
              <p className="mb-3">Project Name</p>
              <input
                type="text"
                name="project-name"
                onChange={handleInputChange}
                className="border-0 border-b-2 border-gray-400 focus:outline-none bg-transparent text-white px-2 w-full"
                placeholder="Enter Project Name"
              />
              <div className=" flex justify-end mt-10">
                <div className="p-[1px] bg-button-gradient rounded-full">
                  <button
                    onClick={handleCreateNewProjects}
                    className="px-3 py-2 bg-secondary rounded-full"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
        <RecentProjects />
      </Container>
    </div>
  );
};

export default Page;
