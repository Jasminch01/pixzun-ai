"use client";
import { IoMdImages } from "react-icons/io";
import { FaDownload, FaWandMagicSparkles } from "react-icons/fa6";
import RightSidebar from "@/components/Deshboard/Sidebar/RightSidebar";
import LeftSidebar from "@/components/Deshboard/Sidebar/LeftSidebar";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import PricingModal from "@/components/Deshboard/Projects/PricingModal";
import { useUserContext } from "@/app/context/ContextProvider";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useParams } from "next/navigation";
import { MdOutlineFileDownload } from "react-icons/md";
import axiosInstance from "@/utils/axiosInstance";

interface Project {
  name: string;
  createdAt: string; // or Date if you prefer to store it as Date
}

const Project: React.FC = () => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string[]>([]);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [isFreeUser, setIsFreeUser] = useState(true);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const { currentUser, loading } = useUserContext();
  const [projectName, setProjectName] = useState<string>("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [loadingResult, setLoadingResult] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<string[]>([]); // Array to store generated image URLs
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index of the current image pair

  const { id } = useParams();

  // Fetch project details using the project ID
  useEffect(() => {
    if (id && currentUser) {
      const fetchProjectDetails = async () => {
        try {
          const response = await axiosInstance.get(`project/${id}`);
          const project = response.data.data;
          setProjectName(project.name);
          if (project.images.length > 0) {
            setUploadedImage(project.images[0].urls);
          }
        } catch (error) {
          console.error("Error fetching project details:", error);
        }
      };
      fetchProjectDetails();
    }
  }, [id, currentUser]);

  //on drop callback function
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const res = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedImage([res.data.url]); // Update to store as an array
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
    if (!inputPrompt || !imageUploaded || countWords(inputPrompt) < 5) {
      return; // Prevent submission if conditions are not met
    }

    setLoadingResult(true); // Set loading state

    const payload = { propmt: inputPrompt, image: uploadedImage[0] };
    try {
      const response = await axiosInstance.post(
        `/project/${id}/generate`,
        payload,
        { withCredentials: true }
      );

      // Assuming response.data.data contains an array of URLs
      setGeneratedResults(response.data.data.images.slice(-1)[0].urls); // Store the generated result URLs
      console.log(response.data.data.images[8].urls);
      setLoadingResult(false); // Reset loading state
    } catch (error) {
      console.error("Error during post request:", error);
      setLoadingResult(false); // Reset loading state on error
    }
  };

  const openModal = () => setIsPricingModalOpen(true);
  const closeModal = () => setIsPricingModalOpen(false);

  // Function to count words in inputPrompt
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).length;
  };

  const handleNextImage = () => {
    if (currentImageIndex < generatedResults.length - 2) {
      setCurrentImageIndex(currentImageIndex + 2);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex >= 2) {
      setCurrentImageIndex(currentImageIndex - 2);
    }
  };

  //dowload file
  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: "blob", // Ensure response type is blob
      });

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imageUrl.split("/").pop() || "image.jpg");
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
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
            <div className="flex">
              {/* Display generated images with download links */}
              {generatedResults.slice(0, 2).map((imageUrl, index) => (
                <div
                  key={index}
                  className="bg-secondary size-[20rem] rounded flex justify-center items-center overflow-hidden relative ml-4"
                >
                  <div className="absolute top-2 right-2 z-10">
                    <a
                      href={imageUrl}
                      download={imageUrl.split("/").pop() || "image.jpg"} // Specify filename for download
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default behavior of anchor tag
                        handleDownload(imageUrl); // Call download function on click
                      }}
                    >
                      <MdOutlineFileDownload size={24} className="text-white" />
                    </a>
                  </div>
                  <div className="relative w-full h-full z-0">
                    <Image
                      src={imageUrl}
                      alt={`generated image ${index}`}
                      layout="fill"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
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
                  className="bg-button-gradient p-3 rounded-full text-white opacity-50 cursor-not-allowed"
                  onClick={openModal}
                  disabled={true}
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
                <FaWandMagicSparkles />
                {loadingResult ? "Loading..." : "Generate"}
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
