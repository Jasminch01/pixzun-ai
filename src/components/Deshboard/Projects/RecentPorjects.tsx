import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import { useUserContext } from "@/app/context/ContextProvider";
import { treadmill } from "ldrs";
import axiosInstance from "@/utils/axiosInstance";

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

const RecentProjects: React.FC = () => {
  const { currentUser, loading: contextLoading } = useUserContext();
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contextLoading && currentUser) {
      const fetchProjects = async () => {
        try {
          const response = await axiosInstance.get(
            `/project`
          );
          setRecentProjects(response.data.data);
          setFavoriteProjects(
            response.data.data.filter((project: Project) => project.isFavourite)
          );
        } catch (error) {
          console.error("Error during get request:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProjects();
    }
  }, [currentUser, contextLoading]);

  const handleMenuToggle = (projectId: string) => {
    setMenuOpen((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  const handleRename = (projectId: string) => {
    console.log(`Rename project with id: ${projectId}`);
    // Implement rename functionality here
  };

  const handleDelete = (projectId: string) => {
    console.log(`Delete project with id: ${projectId}`);
   
  };

  const handleFavoriteToggle = (projectId: Project) => {
    console.log(`favourite project with id: ${projectId}`);
   
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-44">
        <p className="text-gray-400 text-center text-sm md:text-base">
          Loading...
        </p>
      </div>
    );
  }

  if (recentProjects.length === 0 && favoriteProjects.length === 0) {
    return (
      <div className="flex justify-center items-center mt-44">
        <p className="text-gray-400 text-center text-sm md:text-base">
          You don't have any projects yet!
        </p>
      </div>
    );
  }

  return (
    <div className="text-white mt-16">
      <p className="text-xl">Recent Projects</p>
      {recentProjects.length > 0 ? (
        <>
          <div className="flex gap-5 mt-5">
            {recentProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                handleMenuToggle={handleMenuToggle}
                menuOpen={menuOpen}
                handleRename={handleRename}
                handleDelete={handleDelete}
                handleFavoriteToggle={handleFavoriteToggle}
                isFavorite={favoriteProjects.some(
                  (favProject) => favProject._id === project._id
                )}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10">
          <p className="text-gray-400 text-center text-sm md:text-base">
            You don't have any recent projects!
          </p>
        </div>
      )}
      <p className="text-xl mt-10">Favorite Projects</p>

      {favoriteProjects.length > 0 ? (
        <>
          <div className="flex gap-5 mt-5">
            {favoriteProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                handleMenuToggle={handleMenuToggle}
                menuOpen={menuOpen}
                handleRename={handleRename}
                handleDelete={handleDelete}
                handleFavoriteToggle={handleFavoriteToggle}
                isFavorite={true}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10">
          <p className="text-gray-400 text-center text-sm md:text-base">
            You don't have any favorite projects!
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentProjects;
