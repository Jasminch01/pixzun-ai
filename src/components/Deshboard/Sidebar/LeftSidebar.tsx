"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Panel } from "@/components/Svg";

const naturalImages = [
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 1",
    prompt:
      "Majestic mountain landscape+ with snow-capped peaks+, green hills+, and a clear blue lake- reflecting the scenery.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 2",
    prompt:
      "Rainy street+ with reflective pavement+, soft streetlight glow+, and figures moving through the rain-.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 3",
    prompt:
      "Mediterranean seaside+ with white-washed buildings+, blue accents+, and a small harbor with boats+.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 4",
    prompt:
      "Tropical rainforest+ with tall trees+, vibrant flowers+, and a waterfall+ cascading into a clear pool-.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 5",
    prompt:
      "Japanese garden+ with koi pond+, blooming cherry trees+, and stone lanterns+ creating a peaceful scene-.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 6",
    prompt:
      "City park+ with green lawns+, tall trees+, a pond+, and urban skyline- in the background.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 7",
    prompt:
      "Coastal cliffside+ with towering cliffs+, ocean waves crashing on rocks+, and seagulls- flying above.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 8",
    prompt:
      "Winter wonderland+ with snow-covered trees+, frozen lake+, and soft sunset colors- in the sky.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 9",
    prompt:
      "Countryside farm+ with a rustic barn+, green fields+, and crops+ ready for harvest.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp1_hw1dse.jpg",
    alt: "Image 10",
    prompt:
      "Rose petals+ scattered across a pure white background- with vibrant red and pink hues+.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp3_voyqlk.jpg",
    alt: "Image 11",
    prompt:
      "Forest clearing+ with tall trees+, wildflowers+, and a stream winding through the grass-.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp2_angngu.jpg",
    alt: "Image 12",
    prompt:
      "Urban nightscape+ with illuminated skyscrapers+, neon signs+, and wet pavement- reflecting streetlights.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp5_crnoux.jpg",
    alt: "Image 13",
    prompt:
      "Mountain landscape+ with towering snow-capped peaks+, green hills+, and a clear lake- reflecting the scenery.",
  },
];

const monochromeImages = [
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp1_hw1dse.jpg",
    alt: "Image 10",
    prompt:
      "rose petals+ scattered across a flat, pure white background-, with a focus on vibrant red and pink hues+. Emphasize the contrast between the colorful petals+ and the solid white background-.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp3_voyqlk.jpg",
    alt: "Image 11",
    prompt:
      "A serene forest clearing+, tall trees+ surrounding an open grassy area+ bathed in soft sunlight+, with wildflowers+ and a gentle stream+ winding through the scene. --v 5 --ar 16:9 --q 2",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp2_angngu.jpg",
    alt: "Image 12",
    prompt:
      "A vibrant urban nightscape+, with skyscrapers+ illuminated by glowing windows+ and neon lights+, creating a lively city scene+. Reflections on wet pavement+ add to the realism. --v 5 --ar 16:9 --q 2",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp5_crnoux.jpg",
    alt: "Image 13",
    prompt:
      "A majestic mountain landscape+, featuring snow-capped peaks+, rolling green hills+, and a crystal-clear lake+ reflecting the scene. Sky is a vibrant blue+. --v 5 --ar 16:9 --q 2",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 3",
    prompt:
      "A picturesque Mediterranean seaside+, with white-washed buildings+ and blue accents+ overlooking a sparkling sea+. Cobblestone streets+, flowers in pots+, and a small harbor+ add charm. --v 5 --ar 16:9 --q 2",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 4",
    prompt:
      "A lush tropical rainforest+, showcasing dense vegetation+, tall trees+, and vibrant flowers+. A waterfall+ cascades into a clear pool+. Light filters through the canopy+, creating a humid atmosphere+. --v 5 --ar 16:9 --q 2",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 5",
    prompt:
      "A tranquil Japanese garden+, with a serene koi pond+, manicured plants+, stone lanterns+, and cherry blossoms+ gently falling into the water. Essence of Zen+. --v 5 --ar 16:9 --q 2",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 6",
    prompt:
      "A 4K city park+, featuring green lawns+, tall trees+ for shade, winding paths+, benches+, and a small pond+ with ducks+. Urban skyline+ in the background. --v 5 --ar 16:9 --q 2",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 7",
    prompt:
      "A dramatic coastal cliffside+, with towering cliffs+ overlooking the ocean+ and waves+ crashing against the rocky shore+. Seagulls+ fly above+. --v 5 --ar 16:9 --q 2",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 8",
    prompt:
      "A magical winter wonderland+, snow-covered forest+ with tall evergreens+ and a frozen lake+. Gentle sunset colors+ in the sky add warmth. --v 5 --ar 16:9 --q 2",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 9",
    prompt:
      "A peaceful countryside farm+, featuring a rustic barn+, green fields+, and crops+ ready for harvest. Grazing animals+ and a dirt path+. --v 5 --ar 16:9 --q 2",
  },
];

interface ModalProps {
  handleSubmit: () => Promise<void>;
  setInputPrompt: Dispatch<SetStateAction<string>>;
}

const LeftSidebar: React.FC<ModalProps> = ({
  handleSubmit,
  setInputPrompt,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMinimize, setIsMinimize] = useState(false);
  const [activeTab, setActiveTab] = useState("Monochrome");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sidebar = document.getElementById("left-sidebar");

      const handleScroll = () => {
        if (sidebar && sidebar.scrollTop > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      if (sidebar) {
        sidebar.addEventListener("scroll", handleScroll);
        return () => {
          sidebar.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, []);

  const handleImageClick = (prompt: string) => {
    setInputPrompt(prompt);
    handleSubmit();
  };

  return (
    <div className="relative lg:fixed lg:top-40 lg:left-0 lg:h-[40rem] order-3 mt-5 lg:mt-0">
      {/* Arrow Icon position absolutely within the sidebar */}
      <div
        className={`
            absolute top-1/2 transform -translate-y-1/2  size-7 -right-6 z-30 cursor-pointer  lg:flex items-center justify-center hidden `}
        onClick={() => setIsMinimize(!isMinimize)}
      >
        {/* {!isMinimize ? (
          <IoIosArrowBack color="white" />
        ) : (
          <IoIosArrowForward color="white" size={20} />
        )} */}
        <Panel />
      </div>

      <div
        id="left-sidebar"
        className={`relative overflow-hidden lg:overflow-y-auto lg:overflow-x-hidden lg:h-full custom-scrollbar ${
          isMinimize ? "lg:w-10 xl:w-10" : "lg:w-60 xl:w-80"
        } lg:border lg:border-l-0 lg:rounded lg:border-primary lg:px-5 lg:pb-5`}
      >
        <div
          className={`lg:sticky top-0 z-10 transition-colors lg:duration-300 py-5 ${
            isScrolled && "bg-[#1B1D29]"
          } ${isMinimize ? "hidden" : ""}`}
        >
          <div className="">
            <p className="text-white md:text-base md:font-bold">
              Use Templates
            </p>
          </div>
          <div className="gap-3 mt-4 flex">
            {/* Monochrome Tab */}
            <button
              className={`lg:w-full p-2 gradient text-white rounded lg:text-base text-sm ${
                activeTab === "Monochrome" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleTabClick("Monochrome")}
            >
              Monochrome
            </button>
            {/* Natural Tab */}
            <button
              className={`lg:w-full p-2 gradient text-white rounded lg:text-base text-sm ${
                activeTab === "Natural" ? "bg-blue-500" : ""
              }`}
              onClick={() => handleTabClick("Natural")}
            >
              Natural
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4">
          {/* Swiper for mobile and tablet devices */}
          <div className="block lg:hidden">
            <Swiper
              spaceBetween={10}
              breakpoints={{
                320: { slidesPerView: 4.5, spaceBetween: 10 },
                420: { slidesPerView: 4.5, spaceBetween: 10 },
                640: { slidesPerView: 3.5, spaceBetween: 10 },
                768: { slidesPerView: 5, spaceBetween: 10 },
              }}
            >
              {activeTab === "Monochrome"
                ? monochromeImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={200}
                        height={200}
                        className="size-20 md:size-32 object-cover rounded-md cursor-pointer"
                        onClick={() => handleImageClick(image.prompt || "")}
                      />
                    </SwiperSlide>
                  ))
                : naturalImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={200}
                        height={200}
                        className="size-20 md:size-32 object-cover rounded-md cursor-pointer"
                      />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>

          {/* Grid layout for large screens */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-4">
            {activeTab === "Monochrome"
              ? monochromeImages.map((image, index) => (
                  <Image
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="lg:w-full h-auto object-cover rounded-md cursor-pointer"
                    onClick={() => handleImageClick(image.prompt || "")}
                  />
                ))
              : naturalImages.map((image, index) => (
                  <Image
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="lg:w-full h-auto object-cover rounded-md cursor-pointer"
                    onClick={() => handleImageClick(image.prompt || "")}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
