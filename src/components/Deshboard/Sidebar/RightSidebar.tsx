"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DotPulse } from "@/components/loadingComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Panel } from "@/components/Svg";

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
  const [isMinimize, setIsMinimize] = useState(false);
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
  const reverseGeneratedResult = [...generatedResults].reverse();
  return (
    <div className="relative lg:fixed lg:top-40 lg:right-0 xl:h-[30rem] 2xl:h-[40rem] order-1 mt-5  mb-32 lg:mt-0">
      {/* Arrow Icon position absolutely on the left of the sidebar */}
      <div
        className={`absolute top-1/2 transform  -translate-y-1/2 size-7 -left-[25px] z-30 cursor-pointer rounded-full lg:flex items-center justify-center hidden rotate-180`}
        onClick={() => setIsMinimize(!isMinimize)}
      >
        <Panel />
      </div>

      {/* Sidebar Content */}
      <div
        id="right-sidebar"
        className={`lg:h-full transition-all duration-300 ease-in-out lg:overflow-y-auto custom-scrollbar-right relative ${
          isMinimize ? "lg:w-10 xl:w-10" : "lg:w-60 xl:w-80"
        } lg:border lg:border-r-0 lg:rounded lg:border-primary lg:px-0`}
      >
        <div
          className={` ${
            isMinimize ? "hidden" : ""
          } lg:p-6 text-white text-base font-bold lg:sticky top-0 z-10 lg:transition-colors lg:duration-300 py-5 ${
            isScrolled ? "lg:bg-[#1B1D29] lg:py-5" : ""
          }`}
        >
          <div className={``}>
            <p>My Creation</p>
          </div>
        </div>

        <div
          className={`xl:p-4 flex-col justify-center items-center ${
            isMinimize ? "hidden" : "flex"
          } ${(loading || generatedResults.length === 0) && "h-[50vh]"} `}
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
                  {reverseGeneratedResult.map((image, index) => {
                    // Calculate the correct reversed index
                    const reversedIndex =
                      reverseGeneratedResult.length - 1 - index;

                    return (
                      <SwiperSlide
                        key={reversedIndex}
                        onClick={() => openModal(reversedIndex)}
                      >
                        <div
                          key={reversedIndex}
                          onClick={() => openModal(reversedIndex)}
                          className="relative p-[1px] rounded cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500"
                        >
                          {/* Image inside a gradient border */}
                          <div className="rounded overflow-hidden bg-[#1B1D29]">
                            <Image
                              src={image}
                              alt="generatedImage"
                              width={200}
                              height={200}
                              className="size-20 md:size-32 rounded cursor-pointer object-cover"
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              {/* Grid for large devices */}
              <div
                className={`${
                  isMinimize
                    ? "hidden"
                    : "lg:grid lg:grid-cols-2 xl:grid-cols-2 gap-4"
                } hidden `}
              >
                {reverseGeneratedResult.map((image, index) => {
                  // Calculate the reversed index
                  const reversedIndex =
                    reverseGeneratedResult.length - 1 - index;
                  return (
                    <div
                      key={reversedIndex}
                      onClick={() => openModal(reversedIndex)}
                      className="relative p-[1px] rounded cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500"
                    >
                      {/* Image inside a gradient border */}
                      <div className="rounded overflow-hidden bg-[#1B1D29]">
                        <Image
                          src={image}
                          alt={"generatedImage"}
                          width={200}
                          height={200}
                          className="xl:w-[130px] xl:h-[120px] object-cover w-24 h-24 rounded"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-white text-center text-sm">
              You don’t created anything yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
