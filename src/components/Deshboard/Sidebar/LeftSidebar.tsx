"use client";
import React, { useEffect, useState } from "react";
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

const LeftSidebar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
  }, []);

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
              className="w-full h-auto object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
