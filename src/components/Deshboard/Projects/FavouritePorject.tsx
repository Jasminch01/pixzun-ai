import React from "react";
import Image from "next/image";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

interface ImageDetail {
  urls: string[];
  _id: string;
}

interface Project {
  _id: string;
  name: string;
  isFavourite: boolean;
  images: ImageDetail[];
}

interface ProjectCardProps {
  project: Project;
  handleMenuToggle: (projectId: string) => void;
  menuOpen: { [key: string]: boolean };
  handleFavoriteToggle: (projectId: string, newState: boolean) => void;
  isFavorite: boolean;
}

const FavouriteProject: React.FC<ProjectCardProps> = ({
  project,
  handleFavoriteToggle,
  isFavorite,
}) => {
  const handleCardClick = () => {
    window.location.href = `/app/create-project/${project._id}`;
  };

  return (
    <div
      className="relative p-[1px] hover:border-transparent hover:bg-gradient-to-r hover:from-[#A82AD8] hover:to-[#4940D8] rounded-md cursor-pointer transition-all"
      onClick={handleCardClick}
    >
      <div className="relative bg-[#1E202D] w-full xl:h-64 lg:h-52 h-52 rounded-md p-3 flex flex-col justify-center items-center border hover:border-[#969696] hover:border-0 transition-all">
        <div>
          <Image
            src={
              project.images[0]?.urls[1] || "https://via.placeholder.com/150"
            }
            alt={project.name}
            width={50}
            height={50}
            className="size-28 object-cover rounded-full"
          /> 
        </div>
        <div className="absolute bottom-2 left-2">
          <p className="text-white">{project.name}</p>
        </div>
        {isFavorite ? (
          <IoIosHeart
            className="absolute top-2 right-2 cursor-pointer text-white"
            size={20}
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle(project._id, false);
            }}
          />
        ) : (
          <IoIosHeartEmpty
            className="absolute top-2 right-2 cursor-pointer text-white"
            size={20}
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle(project._id, true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FavouriteProject;
