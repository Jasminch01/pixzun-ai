import React from "react";
import Image from "next/image";
import { AiOutlineEllipsis } from "react-icons/ai";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

interface Project {
  id: number;
  name: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
  handleMenuToggle: (projectId: number) => void;
  menuOpen: { [key: number]: boolean };
  handleRename: (projectId: number) => void;
  handleDelete: (projectId: number) => void;
  handleFavoriteToggle: (project: Project) => void;
  isFavorite: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  handleMenuToggle,
  menuOpen,
  handleRename,
  handleDelete,
  handleFavoriteToggle,
  isFavorite,
}) => {
  return (
    <div className="p-[1px] bg-gradient-to-r from-[#A82AD8] to-[#4940D8] rounded-md">
      <div className="relative bg-[#1E202D] w-60 h-64 rounded-md p-3 flex flex-col justify-center items-center">
        <div className="">
          <Image
            // src={project.image}
            src={'https://via.placeholder.com/150'}
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
            className={`absolute top-2 right-2 cursor-pointer text-white`}
            size={20}
            onClick={() => handleFavoriteToggle(project)}
          />
        ) : (
          <IoIosHeartEmpty
            className={`absolute top-2 right-2 cursor-pointer text-white`}
            size={20}
            onClick={() => handleFavoriteToggle(project)}
          />
        )}
        <div className="absolute bottom-2 right-2">
          <AiOutlineEllipsis
            className="text-white cursor-pointer"
            size={20}
            onClick={() => handleMenuToggle(project.id)}
          />
          {menuOpen[project.id] && (
            <div className="absolute right-0 bg-gray-800 rounded-md shadow-lg mt-2">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                onClick={() => handleRename(project.id)}
              >
                Rename
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                onClick={() => handleDelete(project.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
