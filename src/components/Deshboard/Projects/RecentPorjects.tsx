import React, { useEffect, useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import FavouriteProject from "./FavouritePorject";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { DotPulse } from "@/components/loadingComponent";
import axios from "axios";
import { useClerk } from "@clerk/nextjs";

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
  const { user } = useClerk();

  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance(
        `/api/project?email=${user?.emailAddresses[0].emailAddress}`
      );
      setFavoriteProjects(
        response.data.data.filter((project: Project) => project.isFavourite)
      );
      return response.data.data;
    } catch (error) {
      console.error("Error during get project :", error);
      return [];
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
      const response = await axiosInstance.put(`/api/project/${projectId}`, {
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
        const response = await axiosInstance.delete(
          `/api/project/${projectId}`
        );
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
    const favouriteToggle = async () => {
      try {
        const response = await axiosInstance.put(
          `/api/project/favourite/${projectId}`,
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

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-44">
        <DotPulse />
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
      <p className="md:text-xl text-lg text-center md:text-left">
        Recent Projects
      </p>

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
          {recentProjects.map((project: Project) => (
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

      <p className="md:text-xl text-lg mt-5 xl:mt-5 lg:mt-0 text-center md:text-left">
        Favorite Projects
      </p>

      {favoriteProjects.length > 0 ? (
        <Swiper
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 10 },
            640: { slidesPerView: 2.2, spaceBetween: 10 },
            768: { slidesPerView: 3.2, spaceBetween: 10 },
            1024: { slidesPerView: 4.5, spaceBetween: 10 },
          }}
          className="mt-5 mb-5 lg:mb-0"
        >
          {favoriteProjects.map((project: Project) => (
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
    </div>
  );
};

export default RecentProjects;
