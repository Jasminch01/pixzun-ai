"use client";
import React from "react";
import Image from "next/image";

const images = [
  { src: "https://via.placeholder.com/100", alt: "Image 1" },
  { src: "https://via.placeholder.com/100", alt: "Image 2" },
  { src: "https://via.placeholder.com/100", alt: "Image 3" },
  { src: "https://via.placeholder.com/100", alt: "Image 4" },
  { src: "https://via.placeholder.com/100", alt: "Image 5" },
  { src: "https://via.placeholder.com/100", alt: "Image 6" },
  { src: "https://via.placeholder.com/100", alt: "Image 7" },
  { src: "https://via.placeholder.com/100", alt: "Image 8" },
  { src: "https://via.placeholder.com/100", alt: "Image 9" },
  { src: "https://via.placeholder.com/100", alt: "Image 10" },
  { src: "https://via.placeholder.com/100", alt: "Image 11" },
  { src: "https://via.placeholder.com/100", alt: "Image 12" },
  { src: "https://via.placeholder.com/100", alt: "Image 13" },
  { src: "https://via.placeholder.com/100", alt: "Image 14" },
];

const RightSidebar: React.FC = () => {
  const create = true;

  return (
    <div className="fixed top-40 right-0 h-[40rem] w-80 overflow-y-auto custom-scrollbar border-r-0 border-2 border-gray-400 rounded">
      <div className="p-6 text-white text-base font-bold">My Creation</div>
      <div className="p-4">
        {create ? (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                width={200}
                height={200}
                className="w-full h-auto object-cover rounded-md"
              />
            ))}
          </div>
        ) : (
          <p className="text-white text-center text-sm">
            you don’t created anything yet
          </p>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
