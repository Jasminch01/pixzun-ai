import React from "react";
import {
  BeforeAfterMarque,
  BeforeAfterMarque2,
} from "./Marques/BeforeAfterMarque";
const BeforeAfter: React.FC = () => {
  return (
    <div className="mt-48 mb-32 flex-col justify-center flex">
      <div className="absolute bg-lighter-gradient blur-3xl w-full h-[500px] rounded -z-10"></div>
      <BeforeAfterMarque />
      <BeforeAfterMarque2 />
      <div className="text-center mt-32">
        <button className="text-white bg-button-gradient px-8 py-4 rounded-full">Get started</button>
      </div>
    </div>
  );
};

export default BeforeAfter;
