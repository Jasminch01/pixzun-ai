import Container from "@/components/Container";
import { Folder } from "@/components/Svg";
import React from "react";

const page: React.FC = () => {
  return (
    <div className="min-h-screen mt-60">
      <Container>
        <div className="flex justify-center">
          <div className="w-[600px] rounded p-px bg-gradient-to-r from-[#A82AD8] to-[#4940D8]">
            <div className="rounded p-5 bg-[#222532] flex justify-center items-center space-x-5">
              <Folder />
              <p className=" text-white"> Create New Project</p>
            </div>
          </div>
        </div>
        <div className="mt-44">
            {/* when user's have no project */}
            {/* to do : user's have project show projects */}
            <p className="text-gray-400 text-center">You don’t have any projects yet !</p>
        </div>
      </Container>
    </div>
  );
};

export default page;
