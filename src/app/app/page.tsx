"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { Brand, Folder, Leaf } from "@/components/Svg";
import { Modal } from "@/components/Modal";
import RecentProjects from "@/components/Deshboard/Projects/RecentPorjects";
import Link from "next/link";
import { useUserContext } from "../context/ContextProvider";
import axios from "axios";

const Page: React.FC = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projectName, setProjectName] = useState<string>("");

  const { currentUser, loading } = useUserContext();

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

  interface Project {
    _id: string;
    name: string;
    createdAt: string; // or Date if preferred
  }

  // Function to get the latest project
  const getLatestProject = (projects: Project[]): Project | null => {
    if (!projects || projects.length === 0) {
      return null;
    }

    return projects.reduce((latestProject, currentProject) => {
      return new Date(currentProject.createdAt) >
        new Date(latestProject.createdAt)
        ? currentProject
        : latestProject;
    });
  };

  const handleCreateNewProjects = () => {
    //create db insert
    //project name
    const payload = {
      name: projectName,
    };
    const createProject = async () => {
      try {
        const res = await axios.put(
          `https://pixzun-server.vercel.app/api/${currentUser.email}/create-project`,
          payload
        );
        const projects: Project[] = res.data.data.projects;
        const latestProject = getLatestProject(projects);
        if (latestProject?._id) {
          window.location.href = "/app/create-project";
        }
      } catch (error) {
        console.error(error);
      }
    };

    createProject();
    setIsNewProjectModalOpen(false);
  };

  // Open modals if the user is new
  useEffect(() => {
    if (isNewUser) {
      const welcomeTimer = setTimeout(() => {
        setIsWelcomeModalOpen(true);
      }, 5000);
      return () => clearTimeout(welcomeTimer);
    }
  }, [isNewUser]);

  return (
    <div className="mt-32">
      <Container>
        <div className="flex justify-center">
          <div className="md:w-[600px] rounded p-px bg-gradient-to-r from-[#A82AD8] to-[#4940D8]">
            <div className="rounded md:p-5 p-2 bg-[#222532] flex justify-center items-center space-x-5">
              <div
                className="cursor-pointer"
                onClick={() => setIsNewProjectModalOpen(true)}
              >
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
                <Leaf />
              </div>
            </div>
          </Modal>
        )}

        {isNewProjectModalOpen && (
          <Modal
            isOpen={isNewProjectModalOpen}
            onClose={handleNewProjectModalClose}
            modalSize={"md:h-[15rem] md:w-[30rem]"}
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

        {/* TO DO: Show projects */}
        {/*recent project fetch from db*/}
        {/* {RecentProject ? ( */}
        <RecentProjects />
        {/* ) : ( */}
        {/* <div className="mt-[10.50rem]">
            <p className="text-gray-400 text-center text-sm md:text-base">
              You don’t have any projects yet!
            </p>
          </div> */}
        {/* // )} */}
        {/* favourite project fetch from db
        {FavouriteProject ? (
          <RecentProjects />
        ) : (
          <div className="mt-[10.50rem]">
            <p className="text-gray-400 text-center text-sm md:text-base">
              You don’t have any projects yet!
            </p>
          </div>
        )} */}
      </Container>
    </div>
  );
};

export default Page;
