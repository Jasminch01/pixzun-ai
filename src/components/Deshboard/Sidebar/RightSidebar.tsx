"use client";
import React from "react";
import Image from "next/image";
import { DotPulse } from "@/components/loadingComponent";

interface RightSidebarProps {
  generatedResults: string[];
  loading: boolean;
  openModal: (index: number) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  generatedResults,
  loading,
  openModal,
}) => {
  return (
    <div className="fixed top-40 right-0 h-[40rem] w-80 overflow-y-auto custom-scrollbar border-r-0 border-2 border-gray-400 rounded">
      <div className="p-6 text-white text-base font-bold">My Creation</div>
      <div
        className={`p-4 flex flex-col justify-center items-center ${
         ( loading || generatedResults.length === 0) && "h-[50vh]"
        } `}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <DotPulse />
          </div>
        ) : generatedResults.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {generatedResults.map((image, index) => (
              <div key={index} onClick={() => openModal(index)}>
                <Image
                  src={image}
                  alt={"generatedImage"}
                  width={200}
                  height={200}
                  className="w-[104px] h-[118px] rounded-md cursor-pointer object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center text-sm">
            You don’t created anything yet
          </p>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
