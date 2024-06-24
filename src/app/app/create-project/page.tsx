"use client";
import { IoMdImages } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";
import RightSidebar from "@/components/Deshboard/Sidebar/RightSidebar";
import LeftSidebar from "@/components/Deshboard/Sidebar/LeftSidebar";
import { useEffect, useState } from "react";
import Image from "next/image";
import PricingModal from "@/components/Deshboard/Projects/PricingModal";
import { useUserContext } from "@/app/context/ContextProvider";
// import { dotSpinner } from "ldrs";

// dotSpinner.register();
interface Project {
  name: string;
  createdAt: string; // or Date if you prefer to store it as Date
}

const project: React.FC = () => {
  const [imageUploaded, setImageUploaded] = useState(true);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [isFreeUser, setIsFreeUser] = useState(true);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const { currentUser, loading } = useUserContext();
  const [projectName, setProjectName] = useState<string>("");

  const openModal = () => setIsPricingModalOpen(true);
  const closeModal = () => setIsPricingModalOpen(false);

  //get latest Project Name
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
  //set project name
  useEffect(() => {
    if (!loading && currentUser) {
      const latestProject = getLatestProject(currentUser.projects);
      setProjectName(latestProject ? latestProject.name : "");
    }
  }, [currentUser, loading]);

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-80 mr-64 mt-[5rem] p-6">
        <p className="text-white text-center text-lg">{`${projectName}`}</p>
        <div className="flex items-center justify-center mt-[5.56rem] relative">
          <div className="absolute bg-bg-lighter blur-3xl md:w-[30rem] md:h-[20rem] w-[300px] h-[200px] rounded -z-10"></div>

          {/* Image Upload */}
          {!imageUploaded && !imageUploadLoading ? (
            <div className="bg-secondary size-[20rem] text-white border-dashed border-gray-400 border-2 rounded flex flex-col justify-center items-center px-5">
              <IoMdImages size={70} className="mb-9 text-2xl" />
              <p className="text-center mb-3">
                <span className="font-bold">Click to upload </span>or drag and
                drop
              </p>
              <p className="text-sm text-center">
                Supported formats: JPG, PNG (MAX 10MB)
              </p>
            </div>
          ) : imageUploadLoading ? (
            <div className="bg-secondary size-[20rem] text-white rounded flex flex-col justify-center items-center">
              {/* <l-dot-spinner size="50" speed="1" color="white"></l-dot-spinner> */}
              {"loading..."}
            </div>
          ) : (
            <div className="bg-secondary size-[20rem] text-white rounded flex justify-center items-center overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/after-2.png"
                  alt="uploaded image"
                  layout="fill"
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Input Prompt */}
        </div>
        <div className="flex justify-center mt-10">
          <div className="w-[35rem]">
            <textarea
              name=""
              id=""
              rows={4}
              className="rounded-md w-full bg-transparent p-3 border-2 border-gray-400 border-opacity-50 outline-none focus:border-primary focus:shadow-primary-blur text-white placeholder-gray-500"
              placeholder="Type whatever you want to do with AI"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div className="w-[35rem] ">
            <div className="flex justify-end gap-5">
              {isFreeUser && (
                <button
                  className="bg-button-gradient p-3 rounded-full text-white"
                  onClick={openModal}
                >
                  Remove WaterMark
                </button>
              )}
              <button className="text-white flex items-center gap-2 bg-button-gradient p-3 rounded-full">
                <FaWandMagicSparkles />
                {imageUploadLoading && !imageUploaded
                  ? // <l-dot-spinner
                    //   size="20"
                    //   speed="1"
                    //   color="white"
                    // ></l-dot-spinner>
                    "loading..."
                  : "Generate"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />

      {/* Pricing Modal */}
      <PricingModal isOpen={isPricingModalOpen} onClose={closeModal} />
    </div>
  );
};

export default project;
