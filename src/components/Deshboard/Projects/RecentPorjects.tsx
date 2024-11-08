import React, { useRef, useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import FavouriteProject from "./FavouritePorject";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { DotPulse } from "@/components/loadingComponent";
import { useClerk } from "@clerk/nextjs";

interface ImageDetail {
  urls: string[];
  _id: string;
}
// Define types for the project
interface Project {
  _id: string;
  name: string;
  isFavourite: boolean;
  images: ImageDetail[];
  // Add any other fields that your project object contains
}

type MenuOpenState = {
  [projectId: string]: boolean;
};

const RecentProjects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"recent" | "favourite">("recent");
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);
  const [menuOpen, setMenuOpen] = useState<MenuOpenState>({});
  const { user } = useClerk();
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Function to fetch projects
  const fetchProjects = async (): Promise<Project[]> => {
    const response = await axiosInstance(
      `/api/project?email=${user?.emailAddresses[0].emailAddress}`
    );
    setFavoriteProjects(
      response.data.data.filter((project: Project) => project.isFavourite)
    );
    return response.data.data;
  };

  // Use React Query to fetch data
  const {
    data: recentProjects = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: fetchProjects,
    queryKey: ["recentProject"],
    retry: 1,
  });

  // Function to toggle the menu open/close state
  const handleMenuToggle = (projectId: string) => {
    setMenuOpen((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  // Function to rename a project
  const handleRename = async (projectId: string, newName: string) => {
    try {
      const response = await axiosInstance.put(`/api/project/${projectId}`, {
        name: newName,
      });
      if (response.data.data) {
        refetch();
      }
    } catch (error) {
      console.error("Error during rename request:", error);
    }
  };

  // Function to delete a project
  const handleDelete = (projectId: string) => {
    const deleteProject = async () => {
      try {
        const response = await axiosInstance.delete(
          `/api/project/${projectId}`
        );
        if (response.data.data) {
          refetch();
        }
      } catch (error) {
        console.error("Error during delete request:", error);
      }
    };
    deleteProject();
  };

  // Function to toggle a project as favorite
  const handleFavoriteToggle = (projectId: string, newState: boolean) => {
    const favouriteToggle = async () => {
      try {
        const response = await axiosInstance.put(
          `/api/project/favourite/${projectId}`,
          { state: newState }
        );
        if (response.data.data) {
          refetch();
        }
      } catch (error) {
        console.error("Error during favorite toggle request:", error);
      }
    };
    favouriteToggle();
  };

  // Handle clicking outside of the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      for (const key in containerRefs.current) {
        if (
          menuOpen[key] &&
          containerRefs.current[key] &&
          !containerRefs.current[key]?.contains(target)
        ) {
          setMenuOpen((prevState) => ({
            ...prevState,
            [key]: false,
          }));
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-44">
        <DotPulse />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center mt-44">
        <p className="text-gray-400 text-center text-sm md:text-base">
          Something went wrong while fetching projects!
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
    <div className="text-white xl:mt-16 px-5 lg:mt-5 mt-10">
      {/* Tabs */}
      <div className="flex mb-4 space-x-10">
        <button
          className={`relative py-2 text-white ${
            activeTab === "recent"
              ? "before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-gradient-to-r from-[#A82AD8] to-[#4940D8]"
              : "opacity-75 hover:opacity-100"
          }`}
          onClick={() => setActiveTab("recent")}
        >
          Recent Projects
        </button>
        <button
          className={`relative py-2 text-white ${
            activeTab === "favourite"
              ? "before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-gradient-to-r from-[#A82AD8] to-[#4940D8]"
              : "opacity-75 hover:opacity-100"
          }`}
          onClick={() => setActiveTab("favourite")}
        >
          Favorite Projects
        </button>
      </div>

      {/* Content */}
      {activeTab === "recent" ? (
        <>
          {recentProjects.length > 0 ? (
            <Swiper
              spaceBetween={15}
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 10 },
                640: { slidesPerView: 2.2, spaceBetween: 10 },
                768: { slidesPerView: 3.2, spaceBetween: 10 },
                1024: { slidesPerView: 4.5, spaceBetween: 10 },
              }}
              className="xl:mt-5 lg:mt-0"
            >
              {recentProjects.map((project) => (
                <SwiperSlide key={project._id}>
                  <div
                    ref={(el) => {
                      containerRefs.current[project._id] = el;
                    }}
                  >
                    <ProjectCard
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
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="mt-10">
              <p className="text-gray-400 text-center text-sm md:text-base">
                You don't have any recent projects!
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {favoriteProjects.length > 0 ? (
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 10 },
                640: { slidesPerView: 2.2, spaceBetween: 10 },
                768: { slidesPerView: 3.2, spaceBetween: 10 },
                1024: { slidesPerView: 4.5, spaceBetween: 10 },
              }}
              className="xl:mt-10 lg:mt-0"
            >
              {favoriteProjects.map((project) => (
                <SwiperSlide key={project._id}>
                  <div
                    ref={(el) => {
                      containerRefs.current[project._id] = el;
                    }}
                  >
                    <FavouriteProject
                      project={project}
                      handleMenuToggle={handleMenuToggle}
                      menuOpen={menuOpen}
                      handleFavoriteToggle={handleFavoriteToggle}
                      isFavorite={true}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="mt-10">
              <p className="text-gray-400 text-center text-sm md:text-base">
                You don't have any favorite projects!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecentProjects;
