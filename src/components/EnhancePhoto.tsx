import Image from "next/image";
import React from "react";
import { Star } from "./Svg";

const EnhancePhoto: React.FC = () => {
  return (
    <div className="mt-32 md:px-5 xl:px-0 px-5">
      <div className="text-center">
        <p className="text-white font-bold md:text-3xl text-2xl">
          Get Inspired: AI-Enhanced Photos
        </p>
        <p className="text-gray-400 md:text-base text-sm md:w-[500px] mx-auto mt-5 lg:mt-7">
          Pick a best product background that perfectly capture your  unique
          brand style.
        </p>
      </div>
      <div className=" relative flex items-center justify-center mt-[5.56rem]">
        <div className="absolute bg-bg-lighter2 blur-3xl lg:w-[700px] lg:h-[400px] md:w-[500px] md:h-[300px] w-[100px] h-[180px] rounded -z-10"></div>
        <Star/>
        <div className="p-3 bg-white/5 backdrop-blur-md rounded flex ">
          <div>
            <Image src={"/fd-2.png"} alt="ai-image" className="rounded-tl rounded-bl" width={500} height={500} />
          </div>
          <div>
            <Image src={"/fd-1.png"} alt="ai-image" className="rounded-tr rounded-br" width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancePhoto;
