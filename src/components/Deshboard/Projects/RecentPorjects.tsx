import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { useUserContext } from "@/app/context/ContextProvider";

interface Project {
  _id: string;
  name: string;
  image: string;
}

const RecentProjects: React.FC = () => {
  const { currentUser, loading: contextLoading } = useUserContext();
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contextLoading && currentUser) {
      setRecentProjects(currentUser.projects || []);
      setLoading(false);
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
    setRecentProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== projectId)
    );
    setFavoriteProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== projectId)
    );
  };

  const handleFavoriteToggle = (project: Project) => {
    if (favoriteProjects.some((favProject) => favProject._id === project._id)) {
      // Remove from favorite projects
      setFavoriteProjects((prevFavorites) =>
        prevFavorites.filter((favProject) => favProject._id !== project._id)
      );
      // Add back to recent projects
      setRecentProjects((prevRecent) => [...prevRecent, project]);
    } else {
      // Add to favorite projects
      setFavoriteProjects((prevFavorites) => [...prevFavorites, project]);
      // Remove from recent projects
      setRecentProjects((prevRecent) =>
        prevRecent.filter((recentProject) => recentProject._id !== project._id)
      );
    }
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
