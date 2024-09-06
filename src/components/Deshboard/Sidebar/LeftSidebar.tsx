"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { MdArrowLeft } from "react-icons/md";

const naturalImages = [
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 1",
    prompt:
      "Create a 4K realistic background of a majestic mountain landscape. Include snow-capped peaks, rolling green hills, and a clear blue lake reflecting the scenery. Add a bright blue sky with a few clouds. Ensure the textures of the rocks, trees, and water are detailed and realistic.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 2",
    prompt:
      "A moody 4K rainy street background, capturing the reflective surfaces of wet pavement and the soft glow of streetlights. The scene includes rows of buildings, with raindrops falling and puddles forming on the ground. Umbrellas, cars with headlights on, and blurred figures moving through the rain add to the realism. The atmosphere is melancholic yet beautiful, with detailed textures on the wet surfaces and the overall scene. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 3",
    prompt:
      "A stunning 4K Mediterranean seaside background, featuring white-washed buildings with blue accents overlooking a sparkling blue sea. The scene includes narrow cobblestone streets, colorful flowers in pots, and a small harbor with boats gently bobbing in the water. The sky is clear, and the sunlight casts warm, golden light across the scene. The atmosphere is idyllic and peaceful, with attention to detail in the architecture, water, and landscape. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 4",
    prompt:
      "A lush 4K tropical rainforest background, showcasing dense vegetation with tall trees, broadleaf plants, and vibrant flowers. A waterfall cascades into a clear pool, surrounded by moss-covered rocks. The light filters through the thick canopy, creating a rich, humid atmosphere. The scene is vibrant and full of life, with detailed textures on the plants, water, and rocks. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 5",
    prompt:
      "A tranquil 4K Japanese garden background, featuring a serene koi pond surrounded by meticulously manicured plants, stone lanterns, and wooden bridges. Cherry blossom trees are in full bloom, with petals gently falling into the water. The scene captures the essence of Zen, with a calm and peaceful atmosphere. The details in the plants, water, and garden elements are highly realistic. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 6",
    prompt:
      "A 4K city park background, featuring well-maintained green lawns, tall trees providing shade, and winding paths for walking. The scene includes benches, a small pond with ducks, and people enjoying the outdoors. The urban skyline is visible in the background, adding a blend of nature and city life to the scene. The atmosphere is relaxed and inviting, with realistic details in the foliage, water, and people. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 7",
    prompt:
      'A dramatic 4K coastal cliffside background, featuring towering cliffs overlooking the ocean. The waves crash against the rocky shore, and seagulls can be seen flying above. The sky is partly cloudy, with sunlight breaking through to illuminate the cliffs and water. The scene is powerful and awe-inspiring, with detailed textures on the rocks, waves, and sky. --v 5 --ar 16:9 --q 2 --style realistic.."',
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 8",
    prompt:
      "A magical 4K winter wonderland background, showcasing a snow-covered forest with tall evergreen trees and a frozen lake. The sky is a soft, pale blue with a hint of sunset colors, and the snow glistens under the gentle light. The scene feels peaceful and serene, with detailed textures on the snow, ice, and trees. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 9",
    prompt:
      "A picturesque 4K countryside farm background, featuring a rustic barn, rolling green fields, and rows of crops ready for harvest. The scene includes a wooden fence, grazing animals, and a dirt path leading through the landscape. The sky is clear with a few clouds, and the lighting is warm, capturing the peaceful simplicity of rural life. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp1_hw1dse.jpg",
    alt: "Image 10",
    prompt:
      "rose petals scattered across a flat, pure white background. The background should be completely white, smooth, and uninterrupted. The rose petals should be vibrant, with deep red and pink hues, and should be naturally spread out across the surface. Ensure the white background is crisp and clean, with no other colors or textures visible. The image should emphasize the contrast between the colorful petals and the solid white background, with detailed textures on the petals and soft shadows to add depth.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp3_voyqlk.jpg",
    alt: "Image 11",
    prompt:
      "A serene 4K forest clearing background, featuring tall trees surrounding an open grassy area bathed in soft, dappled sunlight. Wildflowers bloom throughout the clearing, and a small stream winds through the scene, adding a gentle flow of water. The atmosphere is calm and peaceful, with detailed textures on the tree bark, leaves, and grass. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp2_angngu.jpg",
    alt: "Image 12",
    prompt:
      "A 4K urban nightscape background, capturing the energy of a bustling city after dark. The scene includes skyscrapers illuminated with glowing windows, neon signs, and streetlights casting a warm glow on the streets below. Cars and pedestrians move through the scene, with reflections on wet pavement adding to the realism. The atmosphere is vibrant and dynamic, perfect for a lively city setting. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp5_crnoux.jpg",
    alt: "Image 13",
    prompt:
      "A breathtaking 4K mountain landscape background, featuring towering snow-capped peaks, rolling green hills, and a crystal-clear lake reflecting the surrounding scenery. The sky is a vibrant blue with wisps of clouds, and the lighting casts natural shadows across the terrain. The scene is peaceful and majestic, with detailed textures on the rocks, trees, and water. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
];
const monochromeImages = [
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp1_hw1dse.jpg",
    alt: "Image 10",
    prompt:
      "rose petals scattered across a flat, pure white background. The background should be completely white, smooth, and uninterrupted. The rose petals should be vibrant, with deep red and pink hues, and should be naturally spread out across the surface. Ensure the white background is crisp and clean, with no other colors or textures visible. The image should emphasize the contrast between the colorful petals and the solid white background, with detailed textures on the petals and soft shadows to add depth.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp3_voyqlk.jpg",
    alt: "Image 11",
    prompt:
      "A serene 4K forest clearing background, featuring tall trees surrounding an open grassy area bathed in soft, dappled sunlight. Wildflowers bloom throughout the clearing, and a small stream winds through the scene, adding a gentle flow of water. The atmosphere is calm and peaceful, with detailed textures on the tree bark, leaves, and grass. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp2_angngu.jpg",
    alt: "Image 12",
    prompt:
      "A 4K urban nightscape background, capturing the energy of a bustling city after dark. The scene includes skyscrapers illuminated with glowing windows, neon signs, and streetlights casting a warm glow on the streets below. Cars and pedestrians move through the scene, with reflections on wet pavement adding to the realism. The atmosphere is vibrant and dynamic, perfect for a lively city setting. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283977/temp5_crnoux.jpg",
    alt: "Image 13",
    prompt:
      "A breathtaking 4K mountain landscape background, featuring towering snow-capped peaks, rolling green hills, and a crystal-clear lake reflecting the surrounding scenery. The sky is a vibrant blue with wisps of clouds, and the lighting casts natural shadows across the terrain. The scene is peaceful and majestic, with detailed textures on the rocks, trees, and water. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 3",
    prompt:
      "A stunning 4K Mediterranean seaside background, featuring white-washed buildings with blue accents overlooking a sparkling blue sea. The scene includes narrow cobblestone streets, colorful flowers in pots, and a small harbor with boats gently bobbing in the water. The sky is clear, and the sunlight casts warm, golden light across the scene. The atmosphere is idyllic and peaceful, with attention to detail in the architecture, water, and landscape. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 4",
    prompt:
      "A lush 4K tropical rainforest background, showcasing dense vegetation with tall trees, broadleaf plants, and vibrant flowers. A waterfall cascades into a clear pool, surrounded by moss-covered rocks. The light filters through the thick canopy, creating a rich, humid atmosphere. The scene is vibrant and full of life, with detailed textures on the plants, water, and rocks. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 5",
    prompt:
      "A tranquil 4K Japanese garden background, featuring a serene koi pond surrounded by meticulously manicured plants, stone lanterns, and wooden bridges. Cherry blossom trees are in full bloom, with petals gently falling into the water. The scene captures the essence of Zen, with a calm and peaceful atmosphere. The details in the plants, water, and garden elements are highly realistic. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 6",
    prompt:
      "A 4K city park background, featuring well-maintained green lawns, tall trees providing shade, and winding paths for walking. The scene includes benches, a small pond with ducks, and people enjoying the outdoors. The urban skyline is visible in the background, adding a blend of nature and city life to the scene. The atmosphere is relaxed and inviting, with realistic details in the foliage, water, and people. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 7",
    prompt:
      'A dramatic 4K coastal cliffside background, featuring towering cliffs overlooking the ocean. The waves crash against the rocky shore, and seagulls can be seen flying above. The sky is partly cloudy, with sunlight breaking through to illuminate the cliffs and water. The scene is powerful and awe-inspiring, with detailed textures on the rocks, waves, and sky. --v 5 --ar 16:9 --q 2 --style realistic.."',
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 8",
    prompt:
      "A magical 4K winter wonderland background, showcasing a snow-covered forest with tall evergreen trees and a frozen lake. The sky is a soft, pale blue with a hint of sunset colors, and the snow glistens under the gentle light. The scene feels peaceful and serene, with detailed textures on the snow, ice, and trees. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1723283627/tamp_dhxqij.jpg",
    alt: "Image 9",
    prompt:
      "A picturesque 4K countryside farm background, featuring a rustic barn, rolling green fields, and rows of crops ready for harvest. The scene includes a wooden fence, grazing animals, and a dirt path leading through the landscape. The sky is clear with a few clouds, and the lighting is warm, capturing the peaceful simplicity of rural life. --v 5 --ar 16:9 --q 2 --style realistic.",
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
            absolute top-1/2 transform -translate-y-1/2 bg-[#1B1D29] size-7 border border-white -right-3 z-30 cursor-pointer rounded-full lg:flex items-center justify-center hidden`}
        onClick={() => setIsMinimize(!isMinimize)}
      >
        {!isMinimize ? (
          <IoIosArrowBack color="white" />
        ) : (
          <IoIosArrowForward color="white" size={20} />
        )}
      </div>

      <div
        id="left-sidebar"
        className={`relative overflow-hidden lg:overflow-y-auto lg:overflow-x-hidden lg:h-full custom-scrollbar ${
          isMinimize ? "lg:w-10 xl:w-10" : "lg:w-60 xl:w-80"
        } lg:border-2 lg:border-l-0 lg:rounded lg:border-gray-400 lg:px-5 lg:pb-5`}
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
