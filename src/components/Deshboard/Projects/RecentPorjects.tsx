"use client";
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
  id: number;
  name: string;
  image: string;
}

const initialProjects: Project[] = [
  // {
  //   id: 1,
  //   name: "Project 1",
  //   image: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 2,
  //   name: "Project 2",
  //   image: "https://via.placeholder.com/150",
  // },
  // {
  //   id: 3,
  //   name: "Project 3",
  //   image: "https://via.placeholder.com/150",
  // },
];

const RecentProjects: React.FC = () => {
  const [recentProjects, setRecentProjects] =
    useState<Project[]>(initialProjects);
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);
  const [menuOpen, setMenuOpen] = useState<{ [key: number]: boolean }>({});

  const handleMenuToggle = (projectId: number) => {
    setMenuOpen((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  const handleRename = (projectId: number) => {
    console.log(`Rename project with id: ${projectId}`);
    // Implement rename functionality here
  };

  const handleDelete = (projectId: number) => {
    console.log(`Delete project with id: ${projectId}`);
    setRecentProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
    setFavoriteProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  const handleFavoriteToggle = (project: Project) => {
    if (favoriteProjects.some((favProject) => favProject.id === project.id)) {
      // Remove from favorite projects
      setFavoriteProjects((prevFavorites) =>
        prevFavorites.filter((favProject) => favProject.id !== project.id)
      );
      // Add back to recent projects
      setRecentProjects((prevRecent) => [...prevRecent, project]);
    } else {
      // Add to favorite projects
      setFavoriteProjects((prevFavorites) => [...prevFavorites, project]);
      // Remove from recent projects
      setRecentProjects((prevRecent) =>
        prevRecent.filter((recentProject) => recentProject.id !== project.id)
      );
    }
  };

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
                key={project.id}
                project={project}
                handleMenuToggle={handleMenuToggle}
                menuOpen={menuOpen}
                handleRename={handleRename}
                handleDelete={handleDelete}
                handleFavoriteToggle={handleFavoriteToggle}
                isFavorite={favoriteProjects.some(
                  (favProject) => favProject.id === project.id
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
                key={project.id}
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
