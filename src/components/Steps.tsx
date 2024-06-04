import React from "react";
import { FaUpload } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { BiChip } from "react-icons/bi";
import { CarvLine1, CarvLine2 } from "./Svg";

const Steps: React.FC = () => {
  return (
    <div className="mt-[11.50rem] xl:px-0 px-5">
      <div className="text-white text-center mb-36">
        <p className="lg:text-4xl md:text-3xl text-2xl font-bold">Follow three steps</p>
        <p className="text-gray-400 text-base mt-5">
          Pick a best product background that perfectly captur
          <br /> your unique brand style.
        </p>
      </div>
      <div className="lg:flex lg:justify-between mt-20 relative lg:space-y-0 space-y-10">
        <div className="flex flex-col items-center">
          <div className="p-5 bg-shape-gradient rounded-tl-3xl rounded-tr-xl rounded-br-3xl">
            <FaUpload size={45} fill="white" />
          </div>
          <div className="text-gray-400 mt-8">
            <p className="mt-2 text-center font-bold text-white text-lg">
              Upload your photo
            </p>
            <p className="text-center text-base w-[300px] mt-[0.90rem]">
              Upload your product photos that you want to change.
            </p>
          </div>
        </div>
        <CarvLine1 />
        <div className="flex flex-col items-center">
          <div className="p-5 bg-shape-gradient rounded-tl-3xl rounded-tr-xl rounded-br-3xl">
            <BiChip size={45} fill="white" />
          </div>
          <div className="text-gray-400 mt-8">
            <p className="mt-2 text-center font-bold text-white text-lg">
              AI Image Processing
            </p>
            <p className="text-center text-base w-[300px] mt-[0.90rem]">
              Our powerful AI models will analyze your photo and perform various
              enhancements.
            </p>
          </div>
        </div>
        <CarvLine2 />
        <div className="flex flex-col items-center">
          <div className="p-5 bg-shape-gradient rounded-tl-3xl rounded-tr-xl rounded-br-3xl">
            <FaWandMagicSparkles size={45} fill="white" />
          </div>
          <div className="text-gray-400 mt-8">
            <p className="mt-2 text-center font-bold text-white text-lg">
              Production Ready Output
            </p>
            <p className="text-center text-base w-[300px] mt-[0.90rem]">
              Get your professional quality product photos ready for marketing
              and ads
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
