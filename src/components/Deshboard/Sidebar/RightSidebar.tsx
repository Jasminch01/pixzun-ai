"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DotPulse } from "@/components/loadingComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface RightSidebarProps {
  generatedResults: string[];
  loading: boolean;
  openModal: (index: number) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  generatedResults,
  loading,
  openModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sidebar = document.getElementById("right-sidebar");

      const handleScroll = () => {
        if (sidebar && sidebar.scrollTop > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      if (sidebar) {
        sidebar.addEventListener("scroll", handleScroll);
        return () => sidebar.removeEventListener("scroll", handleScroll);
      }
    }
  }, []);

  return (
    <div
      id="right-sidebar"
      className="lg:fixed lg:top-40 lg:right-0 lg:h-[40rem] lg:w-60 xl:w-80 lg:overflow-y-auto xl:custom-scrollbar lg:border-r-0 lg:border-2 lg:border-gray-400 lg:rounded order-1"
    >
      <div
        className={`lg:p-6 text-white text-base font-bold lg:sticky top-0 z-10 lg:transition-colors lg:duration-300 py-5 ${
          isScrolled ? "lg:bg-[#2B2E3D] lg:py-5" : ""
        }`}
      >
        <p>My Creation</p>
      </div>

      <div
        className={`xl:p-4 flex flex-col justify-center items-center ${
          (loading || generatedResults.length === 0) && "h-[50vh]"
        } `}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <DotPulse />
          </div>
        ) : generatedResults.length > 0 ? (
          <>
            {/* Swiper for mobile and tablet devices */}
            <div className="lg:hidden w-full">
              <Swiper
                spaceBetween={5}
                breakpoints={{
                  320: {
                    slidesPerView: 4.5,
                    spaceBetween: 10,
                  },
                  420: {
                    slidesPerView: 4.5,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                }}
              >
                {generatedResults.map((image, index) => (
                  <SwiperSlide key={index} onClick={() => openModal(index)}>
                    <Image
                      src={image}
                      alt={"generatedImage"}
                      width={200}
                      height={200}
                      className="size-20 md:size-32 rounded cursor-pointer object-cover border"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Grid for large devices */}
            <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {generatedResults.map((image, index) => (
                <div key={index} onClick={() => openModal(index)}>
                  <Image
                    src={image}
                    alt={"generatedImage"}
                    width={200}
                    height={200}
                    className="xl:w-[104px] xl:h-[118px] rounded cursor-pointer object-cover border w-24"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-white text-center text-sm">
            You don’t created anything yet
          </p>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
