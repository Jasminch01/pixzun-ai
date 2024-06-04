"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { Star } from "./Svg";

const EnhancePhoto: React.FC = () => {
  const images = ["/fd-1.png", "/fd-2.png"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="mt-32 md:px-5 xl:px-0 px-5">
      <div className="text-center">
        <p className="text-white font-bold lg:text-4xl md:text-3xl text-2xl">
          Get Inspired: AI-Enhanced Photos
        </p>
        <p className="text-gray-400 md:text-base text-sm md:w-[500px] mx-auto mt-5 lg:mt-7">
          Pick a best product background that perfectly capture your unique
          brand style.
        </p>
      </div>
      <div className="relative flex items-center justify-center mt-[5.56rem]">
        <div className="absolute bg-bg-lighter2 blur-3xl lg:w-[700px] lg:h-[400px] md:w-[500px] md:h-[300px] w-[100px] h-[180px] rounded -z-10"></div>
        <Star />
        <div className="p-3 bg-white/5 backdrop-blur-md rounded flex">
          <div>
            <Image
              src={"/fd-2.png"}
              alt="ai-image"
              className="rounded-tl rounded-bl"
              width={500}
              height={500}
            />
          </div>
          <div className="relative">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-xl text-white md:p-2 p-1 rounded-sm border border-gray-300"
            >
              <IoMdArrowDropleft className="md:text-3xl text-xl text-gray-700" />
            </button>
            <Image
              src={images[currentIndex]}
              alt="ai-image"
              className="rounded-tr rounded-br"
              width={500}
              height={500}
            />
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-xl text-white md:p-2 p-1 rounded-sm border border-gray-300"
            >
              <IoMdArrowDropright className="md:text-3xl text-xl text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancePhoto;
