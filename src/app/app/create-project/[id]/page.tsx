// app/app/[projectId]/page.tsx

"use client";

import { useParams } from "next/navigation";

const Page: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="mt-20">
      <h1>Project Details Page</h1>
      <p className="text-white">Project ID: {id}</p>
    </div>
  );
};

export default Page;
