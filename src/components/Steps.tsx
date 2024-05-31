import React from "react";
import { FaUpload } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { BiChip } from "react-icons/bi";
import { CarvLine1, CarvLine2 } from "./CarvLine";

const Steps: React.FC = () => {
  return (
    <div className="my-20 xl:px-0 px-5">
      <div className="text-white text-center">
        <p className="md:text-4xl text-2xl font-bold">Follow three steps</p>
        <p className="text-gray-400 text-lg">
          Pick a best product background that perfectly captur
          <br /> your unique brand style.
        </p>
      </div>
      <div className="lg:flex lg:justify-between mt-20 relative lg:space-y-0 space-y-10">
        <div className="flex flex-col items-center">
          <div className="p-5 bg-shape-gradient rounded-tl-3xl rounded-tr-xl rounded-br-3xl">
            <FaUpload size={30} fill="white" />
          </div>
          <div className="text-gray-400  md:text-lg text-sm mt-8">
            <p className="mt-2 text-center font-bold text-white text-lg">
              Upload your photo
            </p>
            <p className="text-center w-[300px]">
              Upload your product photos that you want to change.
            </p>
          </div>
        </div>
        <CarvLine1 />
        <div className="flex flex-col items-center">
          <div className="p-5 bg-shape-gradient rounded-tl-3xl rounded-tr-xl rounded-br-3xl">
            <BiChip size={30} fill="white" />
          </div>
          <div className="text-gray-400  md:text-lg text-sm mt-8">
            <p className="mt-2 text-center font-bold text-white text-lg">
              AI Image Processing
            </p>
            <p className="text-center w-[300px]">
              Our powerful AI models will analyze your photo and perform various
              enhancements.
            </p>
          </div>
        </div>
        <CarvLine2 />
        <div className="flex flex-col items-center">
          <div className="p-5 bg-shape-gradient rounded-tl-3xl rounded-tr-xl rounded-br-3xl">
            <FaWandMagicSparkles size={30} fill="white" />
          </div>
          <div className="text-gray-400  md:text-lg text-sm mt-8">
            <p className="mt-2 text-center font-bold text-white text-lg">
              Production Ready Output
            </p>
            <p className="text-center w-[300px]">
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
