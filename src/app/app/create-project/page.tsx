"use client";
import { IoMdImages } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";
import RightSidebar from "@/components/Deshboard/Sidebar/RightSidebar";
import LeftSidebar from "@/components/Deshboard/Sidebar/LeftSidebar";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import PricingModal from "@/components/Deshboard/Projects/PricingModal";
import { useUserContext } from "@/app/context/ContextProvider";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import axiosInstance from "@/utils/axiosInstance";

interface Project {
  name: string;
  createdAt: string; // or Date if you prefer to store it as Date
}

const Project: React.FC = () => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [isFreeUser, setIsFreeUser] = useState(true);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const { currentUser, loading } = useUserContext();
  const [projectName, setProjectName] = useState<string>("");
  const [inputPrompt, setInputPrompt] = useState("");

  //on dorp callback function
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedImage(res.data.url);
      setImageUploaded(true);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    const payload = { inputPrompt, uploadedImage };

    try {
      const response = await axiosInstance.post(`/api/project/generate`, payload);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error during post request:", error);
    }
  };

  const openModal = () => setIsPricingModalOpen(true);
  const closeModal = () => setIsPricingModalOpen(false);
  // Get latest Project Name
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
  // Set project name
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
        <p className="text-white text-center text-lg">{projectName}</p>
        <div className="flex items-center justify-center mt-[5.56rem] relative">
          <div className="absolute bg-bg-lighter blur-3xl md:w-[30rem] md:h-[20rem] w-[300px] h-[200px] rounded -z-10"></div>
          {/* image upload to cloudinary */}
          <div
            {...getRootProps()}
            className={`bg-secondary size-[20rem] text-white border-dashed border-gray-400 border-2 rounded flex flex-col justify-center items-center px-5 cursor-pointer ${
              imageUploaded && "hidden"
            }`}
          >
            <input {...getInputProps()} />
            <IoMdImages size={70} className="mb-9 text-2xl" />
            <p className="text-center mb-3">
              <span className="font-bold">Click to upload </span>or drag and
              drop
            </p>
            <p className="text-sm text-center">
              Supported format: JPG, PNG (MAX 10MB)
            </p>
          </div>
          {imageUploadLoading ? (
            <div className="bg-secondary size-[20rem] text-white rounded flex flex-col justify-center items-center">
              {"Loading..."}
            </div>
          ) : imageUploaded ? (
            <div className="bg-secondary size-[20rem] text-white rounded flex justify-center items-center overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={uploadedImage}
                  alt="uploaded image"
                  layout="fill"
                  className="object-contain"
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Input Prompt */}
        <div className="flex justify-center mt-10">
          <div className="w-[35rem]">
            <textarea
              onChange={handleInputChange}
              rows={4}
              className="rounded-md w-full bg-transparent p-3 border-2 border-gray-400 border-opacity-50 outline-none focus:border-primary focus:shadow-primary-blur text-white placeholder-gray-500"
              placeholder="Type whatever you want to do with AI"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <div className="w-[35rem]">
            <div className="flex justify-end gap-5">
              {isFreeUser && (
                <button
                  className="bg-button-gradient p-3 rounded-full text-white"
                  onClick={openModal}
                >
                  Remove Watermark
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="text-white flex items-center gap-2 bg-button-gradient p-3 rounded-full"
              >
                <FaWandMagicSparkles />
                {imageUploadLoading && !imageUploaded
                  ? "Loading..."
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

export default Project;
