import { DotPulse } from "@/components/loadingComponent";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <DotPulse/>
    </div>
  );
};

export default Loading;
