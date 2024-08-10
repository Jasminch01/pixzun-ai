"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

const images = [
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 1",
    prompt:
      "Create a 4K realistic background of a majestic mountain landscape. Include snow-capped peaks, rolling green hills, and a clear blue lake reflecting the scenery. Add a bright blue sky with a few clouds. Ensure the textures of the rocks, trees, and water are detailed and realistic.",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 2",
    prompt:
      "A moody 4K rainy street background, capturing the reflective surfaces of wet pavement and the soft glow of streetlights. The scene includes rows of buildings, with raindrops falling and puddles forming on the ground. Umbrellas, cars with headlights on, and blurred figures moving through the rain add to the realism. The atmosphere is melancholic yet beautiful, with detailed textures on the wet surfaces and the overall scene. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 3",
    prompt:
      "A stunning 4K Mediterranean seaside background, featuring white-washed buildings with blue accents overlooking a sparkling blue sea. The scene includes narrow cobblestone streets, colorful flowers in pots, and a small harbor with boats gently bobbing in the water. The sky is clear, and the sunlight casts warm, golden light across the scene. The atmosphere is idyllic and peaceful, with attention to detail in the architecture, water, and landscape. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 4",
    prompt:
      "A lush 4K tropical rainforest background, showcasing dense vegetation with tall trees, broadleaf plants, and vibrant flowers. A waterfall cascades into a clear pool, surrounded by moss-covered rocks. The light filters through the thick canopy, creating a rich, humid atmosphere. The scene is vibrant and full of life, with detailed textures on the plants, water, and rocks. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 5",
    prompt:
      "A tranquil 4K Japanese garden background, featuring a serene koi pond surrounded by meticulously manicured plants, stone lanterns, and wooden bridges. Cherry blossom trees are in full bloom, with petals gently falling into the water. The scene captures the essence of Zen, with a calm and peaceful atmosphere. The details in the plants, water, and garden elements are highly realistic. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 6",
    prompt:
      "A 4K city park background, featuring well-maintained green lawns, tall trees providing shade, and winding paths for walking. The scene includes benches, a small pond with ducks, and people enjoying the outdoors. The urban skyline is visible in the background, adding a blend of nature and city life to the scene. The atmosphere is relaxed and inviting, with realistic details in the foliage, water, and people. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 7",
    prompt:
      'A dramatic 4K coastal cliffside background, featuring towering cliffs overlooking the ocean. The waves crash against the rocky shore, and seagulls can be seen flying above. The sky is partly cloudy, with sunlight breaking through to illuminate the cliffs and water. The scene is powerful and awe-inspiring, with detailed textures on the rocks, waves, and sky. --v 5 --ar 16:9 --q 2 --style realistic.."',
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 8",
    prompt:
      "A magical 4K winter wonderland background, showcasing a snow-covered forest with tall evergreen trees and a frozen lake. The sky is a soft, pale blue with a hint of sunset colors, and the snow glistens under the gentle light. The scene feels peaceful and serene, with detailed textures on the snow, ice, and trees. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 9",
    prompt:
      "A picturesque 4K countryside farm background, featuring a rustic barn, rolling green fields, and rows of crops ready for harvest. The scene includes a wooden fence, grazing animals, and a dirt path leading through the landscape. The sky is clear with a few clouds, and the lighting is warm, capturing the peaceful simplicity of rural life. --v 5 --ar 16:9 --q 2 --style realistic.",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 10",
    prompt:
      "A 4K desert oasis background, showcasing a tranquil body of water surrounded by tall, slender palm trees and vibrant green vegetation. The surrounding desert features rolling sand dunes under a clear, sunny sky. The contrast between the lush oasis and the arid desert creates a stunning, realistic scene. The atmosphere is both serene and dramatic, highlighting the beauty of this natural contrast. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 11",
    prompt:
      "A serene 4K forest clearing background, featuring tall trees surrounding an open grassy area bathed in soft, dappled sunlight. Wildflowers bloom throughout the clearing, and a small stream winds through the scene, adding a gentle flow of water. The atmosphere is calm and peaceful, with detailed textures on the tree bark, leaves, and grass. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 12",
    prompt:
      "A 4K urban nightscape background, capturing the energy of a bustling city after dark. The scene includes skyscrapers illuminated with glowing windows, neon signs, and streetlights casting a warm glow on the streets below. Cars and pedestrians move through the scene, with reflections on wet pavement adding to the realism. The atmosphere is vibrant and dynamic, perfect for a lively city setting. --v 5 --ar 16:9 --q 2 --style realistic",
  },
  {
    src: "https://via.placeholder.com/100",
    alt: "Image 13",
    prompt:
      "A breathtaking 4K mountain landscape background, featuring towering snow-capped peaks, rolling green hills, and a crystal-clear lake reflecting the surrounding scenery. The sky is a vibrant blue with wisps of clouds, and the lighting casts natural shadows across the terrain. The scene is peaceful and majestic, with detailed textures on the rocks, trees, and water. --v 5 --ar 16:9 --q 2 --style realistic.",
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure this runs only on the client side
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
        return () => sidebar.removeEventListener("scroll", handleScroll);
      }
    }
  }, []);

  const handleImageClick = (prompt: string) => {
    setInputPrompt(prompt);
    handleSubmit();
  };

  return (
    <div
      id="left-sidebar"
      className="fixed top-40 left-0 h-[40rem] overflow-y-auto custom-scrollbar w-80 border-2 border-l-0 rounded border-gray-400 px-5 pb-5"
    >
      <div
        className={`sticky top-0 z-10 transition-colors duration-300 py-5 ${
          isScrolled ? "bg-[#1B1D29] py-5" : ""
        }`}
      >
        <p className="text-white text-base font-bold">Use Templates</p>
        <div className="flex gap-3 mt-4">
          <button className="w-full p-2 gradient text-white rounded">
            Monocrome
          </button>
          <button className="w-full p-2 gradient text-white rounded">
            Natural
          </button>
        </div>
      </div>
      <div className="mt-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={200}
              height={200}
              onClick={() => handleImageClick(image.prompt || "")}
              className="w-full h-auto object-cover rounded-md cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
