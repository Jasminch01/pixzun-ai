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
  handleRename: (projectId: string, newName: string) => void;
  handleDelete: (projectId: string) => void;
  handleFavoriteToggle: (projectId : string, newState: boolean) => void;
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
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(project.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        inputRef.current &&
        !inputRef.current.contains(target) &&
        !target.closest(".options-menu")
      ) {
        // Cancel editing if editing
        if (isEditing) {
          setNewName(project.name); // Reset name to original
        }
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, project.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleRenameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isEditing) {
      handleRename(project._id, newName);
    }
    setIsEditing(!isEditing);
  };

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
              project.images[0]?.urls[1] || "https://via.placeholder.com/150"
            }
            alt={project.name}
            width={50}
            height={50}
            className="size-28 object-cover rounded-full"
          />
        </div>
        <div className="absolute bottom-2 left-2">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={newName}
              onChange={handleNameChange}
              className="text-white bg-transparent border-none outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className="text-white">{project.name}</p>
          )}
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
        <div className="absolute bottom-2 right-2 z-20">
          <div className="relative">
            <AiOutlineEllipsis
              className={`text-white cursor-pointer`}
              size={20}
              onClick={(e) => {
                e.stopPropagation();
                handleMenuToggle(project._id);
              }}
            />
            {menuOpen[project._id] && (
              <div className="absolute right-0 bg-gray-800 rounded-md shadow-lg mt-2 options-menu">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRenameClick(e);
                  }}
                >
                  {isEditing ? "Save" : "Rename"}
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(project._id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
