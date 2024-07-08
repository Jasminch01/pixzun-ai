import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import { useUserContext } from "@/app/context/ContextProvider";
import { treadmill } from "ldrs";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import FavouriteProject from "./FavouritePorject";

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
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get(`/project`);
      setFavoriteProjects(
        response.data.data.filter((project: Project) => project.isFavourite)
      );
      return response.data.data;
    } catch (error) {
      console.error("Error during get request:", error);
    } finally {
      setLoading(false);
    }
  };
  const { data: recentProjects = [], refetch } = useQuery({
    queryFn: async () => await fetchProjects(),
    queryKey: ["recentProject"],
  });

  const handleMenuToggle = (projectId: string) => {
    setMenuOpen((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  const handleRename = async (projectId: string, newName: string) => {
    try {
      const response = await axiosInstance.put(`/project/${projectId}`, {
        name: newName,
      });
      if (response.data.data) {
        refetch();
      }
    } catch (error) {
      console.error("Error during rename request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (projectId: string) => {
    const deleteProject = async () => {
      try {
        const response = await axiosInstance.delete(`/project/${projectId}`);
        if (response.data.data) {
          refetch();
        }
      } catch (error) {
        console.error("Error during delete request:", error);
      } finally {
        setLoading(false);
      }
    };
    deleteProject();
  };

  const handleFavoriteToggle = (projectId: string, newState: boolean) => {
    console.log(newState);
    const favouriteToggle = async () => {
      try {
        const response = await axiosInstance.put(
          `/project/favourite/${projectId}`,
          {
            state: newState,
          }
        );
        if (response.data.data) {
          refetch();
        }
      } catch (error) {
        console.error("Error during favorite toggle request:", error);
      } finally {
        setLoading(false);
      }
    };
    favouriteToggle();
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
            {recentProjects.map((project: Project) => (
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
              <FavouriteProject
                key={project._id}
                project={project}
                handleMenuToggle={handleMenuToggle}
                menuOpen={menuOpen}
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
