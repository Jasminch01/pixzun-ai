import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AiOutlineEllipsis } from "react-icons/ai";
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
  handleMenuToggle,
  menuOpen,
  handleFavoriteToggle,
  isFavorite,
}) => {
  const handleCardClick = () => {
    window.location.href = `/app/create-project/${project._id}`;
  };

  return (
    <div
      className="relative p-[1px] bg-gradient-to-r from-[#A82AD8] to-[#4940D8] rounded-md cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative z-10 bg-[#1E202D] w-60 h-64 rounded-md p-3 flex flex-col justify-center items-center">
        <div>
          <Image
            src={
              project.images[0]?.urls[2] || "https://via.placeholder.com/150"
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
