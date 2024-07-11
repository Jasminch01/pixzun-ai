"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  MdOutlineFileDownload,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import Image from "next/image";
import { useUserContext } from "@/app/context/ContextProvider";
import axiosInstance from "@/utils/axiosInstance";
import LeftSidebar from "@/components/Deshboard/Sidebar/LeftSidebar";
import RightSidebar from "@/components/Deshboard/Sidebar/RightSidebar";
import PricingModal from "@/components/Deshboard/Projects/PricingModal";
import { IoMdImages } from "react-icons/io";
import { Modal } from "@/components/Modal";
import ImageMOdal from "@/components/ImageMOdal";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

interface Project {
  name: string;
  createdAt: string; // or Date if you prefer to store it as Date
}

const Project: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string[]>([]);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [isFreeUser, setIsFreeUser] = useState(true);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const { currentUser, loading } = useUserContext();
  const [projectName, setProjectName] = useState<string>("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [loadingResult, setLoadingResult] = useState(false);
  const [loadingProject, setLoadingProject] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  const { id } = useParams();

  const fetchProjectDetails = async () => {
    setLoadingProject(true);
    try {
      const response = await axiosInstance.get(`/api/project/${id}`);
      const project = response.data.data;
      setProjectName(project.name);
      if (project.images.length > 0) {
        const urls = project.images.flatMap(
          (image: { urls: any }) => image.urls
        );
        return urls;
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    } finally {
      setLoadingProject(false);
    }
  };

  const { data: projectImages = [], refetch } = useQuery({
    queryFn: async () => await fetchProjectDetails(),
    queryKey: ["project"],
    enabled: !!id && !!currentUser,
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });
    setImageUploadLoading(true);
    try {
      const res = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedImage([res.data.url]);
      setImageUploaded(true);
      setImageUploadLoading(false);
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
    if (!inputPrompt || !imageUploaded || countWords(inputPrompt) < 5) {
      return;
    }

    setLoadingResult(true);

    const payload = { propmt: inputPrompt, image: uploadedImage[0] };
    try {
      const response = await axiosInstance.post(
        `/api/project/${id}/generate`,
        payload,
        { withCredentials: true }
      );
      refetch();
      setGeneratedResults(response.data.data.images.slice(-1)[0].urls);
      setLoadingResult(false);
    } catch (error) {
      console.error("Error during post request:", error);
      setLoadingResult(false);
    }
  };

  const openModal = () => setIsPricingModalOpen(true);
  const closeModal = () => setIsPricingModalOpen(false);

  const countWords = (text: string) => text.trim().split(/\s+/).length;
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < generatedResults.length - 1 ? prevIndex + 1 : 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 1 ? prevIndex - 1 : generatedResults.length - 1
    );
  };
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

  const showNextImage = () => {
    if (selectedImage !== null && selectedImage < projectImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const showPrevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  //
  const openImageModal = (index: number) => {
    console.log(index);
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <LeftSidebar />
      <div className="flex-1 ml-80 mr-64 mt-[5rem] p-6">
        <p className="text-white text-center text-lg">{projectName}</p>
        <div className="flex items-center justify-center mt-[5.56rem] relative">
          <div className="absolute bg-bg-lighter blur-3xl md:w-[30rem] md:h-[20rem] w-[300px] h-[200px] rounded"></div>
          <div
            {...getRootProps()}
            className={`bg-secondary size-[20rem] text-white border-dashed border-gray-400 border-2 rounded flex flex-col justify-center items-center px-5 cursor-pointer ${
              (imageUploaded || generatedResults.length > 0) && "hidden"
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
          ) : generatedResults.length > 0 ? (
            <div className="flex bg-secondary border-[1px] border-primary border-opacity-50 rounded p-3">
              {/* Always display the first image */}
              <div className="size-[20rem]">
                <div
                  className="relative w-full h-full rounded-l"
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/ddqt9bodf/image/upload/v1720623874/bg_cwjxjb.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute z-[1] top-2 right-2 bg-secondary rounded-full p-2">
                    <a
                      href={generatedResults[0]}
                      download={
                        generatedResults[0].split("/").pop() || "image.jpg"
                      }
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDownload(generatedResults[0]);
                      }}
                    >
                      <MdOutlineFileDownload size={24} className="text-white" />
                    </a>
                  </div>
                  <Image
                    src={generatedResults[0]}
                    alt="generated image 0"
                    layout="fill"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Display the current image with navigation buttons */}
              <div className="size-[20rem]">
                <div className="relative w-full h-full rounded-l bg-white">
                  <div className="absolute z-[1] top-2 right-2 bg-secondary rounded-full p-2">
                    <a
                      href={generatedResults[currentImageIndex]}
                      download={
                        generatedResults[0].split("/").pop() || "image.jpg"
                      }
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDownload(generatedResults[currentImageIndex]);
                      }}
                    >
                      <MdOutlineFileDownload size={24} className="text-white" />
                    </a>
                  </div>
                  <button
                    onClick={handlePrevImage}
                    disabled={selectedImage === 0}
                    className="absolute z-[1] left-2 top-1/2 transform -translate-y-1/2  text-black rounded-full p-2"
                  >
                    <IoChevronBackSharp size={26} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    disabled={selectedImage === generatedResults.length - 1}
                    className="absolute z-[1] right-2 top-1/2 transform -translate-y-1/2 text-black rounded-full p-2 cursor-pointer"
                  >
                    <IoChevronForwardSharp size={26} />
                  </button>
                  <Image
                    src={generatedResults[currentImageIndex]}
                    alt="generated image 0"
                    layout="fill"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ) : imageUploaded ? (
            <div className="bg-secondary size-[20rem] text-white rounded flex justify-center items-center overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={uploadedImage[0]}
                  alt="uploaded image"
                  layout="fill"
                  className="object-contain"
                />
              </div>
            </div>
          ) : null}
        </div>

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
                  className="bg-button-gradient p-3 rounded-full text-white opacity-50 cursor-not-allowed"
                  onClick={openModal}
                >
                  Remove Watermark
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={
                  !imageUploaded || !inputPrompt || countWords(inputPrompt) < 5
                }
                className={`text-white flex items-center gap-2 bg-button-gradient p-3 rounded-full ${
                  (!imageUploaded ||
                    !inputPrompt ||
                    countWords(inputPrompt) < 5) &&
                  "opacity-50 cursor-not-allowed"
                }`}
              >
                {/* <FaWandMagicSparkles /> */}
                {loadingResult ? "Loading..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <RightSidebar
        generatedResults={projectImages}
        loading={loadingProject}
        openModal={openImageModal}
      />

      <PricingModal isOpen={isPricingModalOpen} onClose={closeModal} />

      {isModalOpen && selectedImage !== null && selectedImage >= 0 && (
        <ImageMOdal
          isOpen={isModalOpen}
          onClose={closeImageModal}
          showNextImage={showNextImage}
          showPrevImage={showPrevImage}
          selectedImage={selectedImage}
          projectImage={projectImages}
        >
          <Image
            src={projectImages[selectedImage]}
            alt="Selected Image"
            width={500}
            height={500}
            className="rounded"
          />
        </ImageMOdal>
      )}
    </div>
  );
};

export default Project;
