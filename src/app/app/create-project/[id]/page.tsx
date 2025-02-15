"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
import { useUserContext } from "@/app/context/ContextProvider";
import axiosInstance from "@/utils/axiosInstance";
import LeftSidebar from "@/components/Deshboard/Sidebar/LeftSidebar";
import RightSidebar from "@/components/Deshboard/Sidebar/RightSidebar";
import PricingModal from "@/components/Deshboard/Projects/PricingModal";
import { IoMdImages } from "react-icons/io";
import ImageMOdal from "@/components/ImageMOdal";
import { IoDocumentsSharp } from "react-icons/io5";
import { Spiner, Spiner2 } from "@/components/loadingComponent";
import { useUser } from "@clerk/nextjs";
import { LeafWhite } from "@/components/Svg";
import { HiOutlinePlusSm } from "react-icons/hi";
import Link from "next/link";
import { GrPowerReset } from "react-icons/gr";
import { FaWandMagicSparkles } from "react-icons/fa6";

interface Project {
  name: string;
  createdAt: string;
}

const Project: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string[]>([]);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const {
    currentUser,
    loading,
    refetch: refatchUser,
    isPricingModalOpen,
    setIsPricingModalOpen,
  } = useUserContext();
  const [projectName, setProjectName] = useState<string>("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [inputNagativePrompt, setInputNagativePrompt] = useState("");
  const [loadingResult, setLoadingResult] = useState(false);
  const [loadingProject, setLoadingProject] = useState(true);
  const [generatedResults, setGeneratedResults] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const { user } = useUser();
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
    if (currentUser?.cradit < 1) {
      openModal();
      return;
    }
    setLoadingResult(true);
    const payload = {
      propmt: inputPrompt,
      negative_prompt: inputNagativePrompt,
      image: uploadedImage[0],
    };
    try {
      const response = await axiosInstance.post(
        `/api/project/${id}/generate`,
        payload
      );
      refetch();
      //refatching the user after generate
      refatchUser();
      const generatedImageUrls = response.data.data.images.slice(-1)[0].urls;
      setGeneratedResults(generatedImageUrls);
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
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const openGetCreditMOdal = () => {
    setIsPricingModalOpen(true);
  };
  const resetGenerate = () => {
    setImageUploaded(false);
    setGeneratedResults([]);
  };
  return (
    <div className="flex justify-center flex-col-reverse lg:flex-row-reverse border-white border-3 px-5 relative lg:static">
      {/* project name for small devices */}
      {generatedResults.length > 0 && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-white md:hidden text-base font-bold text-center mb-5">
            {projectName}
          </p>
        </div>
      )}

      <LeftSidebar
        handleSubmit={handleSubmit}
        setInputPrompt={setInputPrompt}
        setInputNagativePrompt={setInputNagativePrompt}
      />
      {/* input for mobile device */}
      <div className="flex flex-col justify-center mt-10 md:px-0 order-2 lg:hidden ">
        <div className="lg:w-[35rem]">
          <textarea
            onChange={handleInputChange}
            value={!loadingResult && imageUploaded ? inputPrompt : ""}
            rows={2}
            className="rounded-md w-full bg-transparent p-3 border-2 border-primary border-opacity-80 outline-none focus:border-primary focus:shadow-primary-blur text-white placeholder-gray-500 resize-none overflow-y-auto"
            placeholder="Type whatever you want to do with AI"
          ></textarea>
        </div>
        <div className="flex justify-end mt-3">
          <div className="">
            <div className="flex gap-5">
              {currentUser?.role === "free" && (
                <button
                  className={`bg-button-gradient
                p-3 rounded-full
                 text-white opacity-50
                  cursor-not-allowed  ${
                    currentUser?.role === "free" && generatedResults.length > 0
                      ? "block"
                      : "hidden"
                  }`}
                  onClick={openModal}
                >
                  Remove Watermark
                </button>
              )}

              <button
                onClick={handleSubmit}
                disabled={
                  loadingResult ||
                  !imageUploaded ||
                  !inputPrompt ||
                  countWords(inputPrompt) < 3
                }
                className={`text-white gap-2 bg-button-gradient lg:p-3 p-3 ${
                  loadingResult && "w-24"
                } rounded-full ${
                  (!imageUploaded ||
                    !inputPrompt ||
                    countWords(inputPrompt) < 3) &&
                  "opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="text-center flex justify-center items-center gap-3">
                  {loadingResult ? (
                    <Spiner2 />
                  ) : (
                    <p className="flex justify-center items-center gap-3">
                      <FaWandMagicSparkles />
                      Generate
                      <LeafWhite />
                      -1
                    </p>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* dnd components */}
      <div
        className={`xl:mt-[6rem] lg:mt-[9rem] 2xl:mt-[9rem] mt-[5rem] order-4 relative ${
          generatedResults.length > 0 &&
          `mt-[15rem] 2xl:mt-[9rem] xl:mt-[6rem]  order-4 relative flex flex-col justify-center items-center`
        }`}
      >
        <p
          className={`text-white text-lg font-bold text-center ${
            generatedResults.length > 0 && "hidden md:flex"
          }`}
        >
          {projectName}
        </p>
        <div className="flex items-center justify-center xl:mt-[3rem] 2xl:mt-[5rem] mt-3 relative">
          <div className="absolute bg-bg-lighter blur-3xl lg:w-[25rem] lg:h-[20rem] w-[300px] h-[200px] rounded -z-10"></div>
          {/* dnd component */}
          <div
            className={`bg-white/10 xl:size-[16rem] 2xl:size-[22rem] lg:size-[12.90rem] rounded  flex justify-center items-center relative ${
              generatedResults.length > 0
                ? `bg-transparent`
                : "bg-white/10 border-primary/25 border-[0.3px] xl:size-[14rem] size-[12rem] 2xl:size-[22]"
            }`}
          >
            <div
              {...getRootProps()}
              className={`bg-gradient-to-r from-[#1B1D29] to-[#2f334f] size-[11rem] xl:size-[14rem] 2xl:size-[20rem] border-dashed text-white border-gray-400 border-2 rounded flex flex-col justify-center items-center cursor-pointer ${
                (loadingResult ||
                  imageUploadLoading ||
                  imageUploaded ||
                  loadingResult ||
                  generatedResults.length > 0) &&
                "hidden"
              }`}
            >
              <div className="flex flex-col justify-center items-center px-5">
                <input {...getInputProps()} />
                <IoMdImages className="xl:mb-9 text-2xl xl:size-10 lg:size-10 2xl:size-20 size-5]" />
                <p className="text-center mb-3 text-xs lg:text-sm xl:text-base ">
                  <span className="font-bold">Click to upload </span>
                  or drag and drop
                </p>
                <p className="lg:text-sm text-center text-xs">
                  Supported format: JPG, PNG <br /> (MAX 10MB)
                </p>
              </div>
            </div>

            {imageUploadLoading || loadingResult ? (
              <div className="size-[11rem] lg:size-[12rem] xl:size-[15rem] 2xl:size-[20rem] bg-secondary border-[1px] border-primary border-opacity-50 rounded p-3 lg:px-5 flex flex-col justify-center items-center">
                <Spiner />
                {loadingResult && (
                  <p className="text-white text-xs 2xl:text-base xl:text-sm mt-3">
                    Generating images...
                  </p>
                )}
                {imageUploadLoading && (
                  <p className="text-white text-xs 2xl:text-base xl:text-sm mt-3">
                    Uploading...
                  </p>
                )}
              </div>
            ) : generatedResults.length === 1 ? (
              <div className=" bg-secondary border-[1px] border-primary border-opacity-50 rounded p-3 relative">
                {/* Display the current image with navigation buttons */}
                <div className="xl:size-[12rem] size-[12rem] 2xl:size-[20rem]">
                  <div className="relative w-full h-full rounded-l bg-white">
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
                        <MdOutlineFileDownload
                          size={24}
                          className="text-white"
                        />
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
                {/*reset button */}
                <div className="absolute -right-7 bottom-0">
                  <GrPowerReset
                    color="white"
                    className="cursor-pointer"
                    onClick={resetGenerate}
                  />
                </div>
              </div>
            ) : generatedResults.length > 1 ? (
              <div className="md:flex-row gap-5 md:gap-0 flex flex-col bg-secondary border-[1px] border-primary border-opacity-50 rounded p-3 relative">
                {/* Always display the first image */}
                <div className="xl:size-[12rem] size-[12rem] 2xl:size-[20rem]">
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
                        <MdOutlineFileDownload
                          size={24}
                          className="text-white"
                        />
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
                <div className="xl:size-[12rem] size-[12rem] 2xl:size-[20rem]">
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
                        <MdOutlineFileDownload
                          size={24}
                          className="text-white"
                        />
                      </a>
                    </div>
                    <Image
                      src={generatedResults[currentImageIndex]}
                      alt="generated image 0"
                      layout="fill"
                      className="object-contain"
                    />
                  </div>
                </div>
                {/*reset button */}
                <div className="absolute -right-7 bottom-0">
                  <GrPowerReset
                    color="white"
                    className="cursor-pointer"
                    onClick={resetGenerate}
                  />
                </div>
              </div>
            ) : imageUploaded ? (
              <div className="bg-secondary xl:size-[14rem] size-[12rem] 2xl:size-[20rem] text-white rounded flex justify-center items-center overflow-hidden">
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
            <div
              className={`absolute -right-7 bottom-0 ${
                generatedResults.length > 0 || !imageUploaded ? "hidden" : ""
              }`}
            >
              <GrPowerReset
                color="white"
                className="cursor-pointer"
                onClick={resetGenerate}
              />
            </div>
          </div>
        </div>
        {/* input for large divices */}
        <div className="lg:flex flex-col justify-center mt-10 px-5 lg:px-0 hidden">
          <div className="xl:w-[20rem] 2xl:w-[35rem]">
            <textarea
              onChange={handleInputChange}
              value={!loadingResult && imageUploaded ? inputPrompt : ""}
              rows={3}
              className="rounded-md w-full bg-transparent p-3 border-2 border-primary border-opacity-80 outline-none focus:border-primary focus:shadow-primary-blur text-white placeholder-gray-500 resize-none overflow-y-auto"
              placeholder="Type whatever you want to do with AI"
            ></textarea>
          </div>
          <div className="flex justify-end mt-3">
            <div className="">
              <div className="flex gap-5">
                {currentUser?.role === "free" && (
                  <button
                    className={`bg-button-gradient
                p-3 rounded-full
                 text-white opacity-50
                  cursor-not-allowed ${
                    currentUser?.role === "free" && generatedResults.length > 0
                      ? "block"
                      : "hidden"
                  }`}
                    onClick={openModal}
                  >
                    Remove Watermark
                  </button>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={
                    loadingResult ||
                    !imageUploaded ||
                    !inputPrompt ||
                    countWords(inputPrompt) < 3
                  }
                  className={`text-white gap-2 bg-button-gradient md:p-3 p-2 ${
                    loadingResult && "w-24"
                  } rounded-full ${
                    (!imageUploaded ||
                      !inputPrompt ||
                      countWords(inputPrompt) < 3) &&
                    "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="text-center flex justify-center items-center gap-3">
                    {loadingResult ? (
                      <Spiner2 />
                    ) : (
                      <p className="flex justify-center items-center gap-3">
                        <FaWandMagicSparkles />
                        Generate
                        <LeafWhite />
                        -1
                      </p>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RightSidebar
        generatedResults={projectImages}
        loading={loadingProject}
        openModal={openImageModal}
      />
      {/* profile for mobile devices */}
      <div className="fixed z-30 bottom-3 w-full left-0 px-5">
        <div className="">
          <div className="w-full p-3 lg:hidden bg-[#373b4e] rounded-full">
            <div className="flex justify-between items-center relative">
              <Link href={"/app"}>
                <IoDocumentsSharp size={20} color="white" />
              </Link>
              <div
                className="size-12 bg-gredient-button rounded-full absolute bottom-5 left-1/2 transform -translate-x-1/2 ring-4 ring-[#222432] flex justify-center items-center cursor-pointer"
                onClick={openGetCreditMOdal}
              >
                <div className="flex">
                  <LeafWhite />
                  <div className="mt-2">
                    <HiOutlinePlusSm color="white" />
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href={"/app/profile"}
                  className="text-base text-white flex justify-center items-center rounded-full transition-all "
                >
                  <img
                    src={user?.imageUrl}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PricingModal isOpen={isPricingModalOpen} onClose={closeModal} />

      {isModalOpen && selectedImage !== null && selectedImage >= 0 && (
        <ImageMOdal
          isOpen={isModalOpen}
          onClose={closeImageModal}
          showNextImage={showNextImage}
          showPrevImage={showPrevImage}
          selectedImage={selectedImage}
          projectImage={projectImages}
          refetch={refetch}
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
