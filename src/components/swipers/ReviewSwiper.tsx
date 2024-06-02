// JavaScript/TypeScript code
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
type Treview = {
  id: number;
  clientName: string;
  clientImg: string;
  review: string;
};

interface ReviewSwiperProps {
  reviews: Treview[];
}

const ReviewSwiper: React.FC<ReviewSwiperProps> = ({ reviews }) => {
  const [swiper, setSwiper] = useState<any>(null); // State to hold swiper instance

  const handleSlidePrev = () => {
    swiper?.slidePrev(); // Go to previous slide
  };

  const handleSlideNext = () => {
    swiper?.slideNext(); // Go to next slide
  };

  const handleSwiperInit = (swiper: any) => {
    setSwiper(swiper); // Save swiper instance to state
  };
  const [showFullContentMap, setShowFullContentMap] = useState<
    Record<number, boolean>
  >({});

  const handleToggleContent = (reviewId: number) => {
    setShowFullContentMap((prevShowFullContentMap) => ({
      ...prevShowFullContentMap,
      [reviewId]: !prevShowFullContentMap[reviewId],
    }));
  };

  return (
    <div className="relative mt-36 swiper-container lg:px-10 xl:px-0 px-0">
      <Swiper
        onSwiper={handleSwiperInit}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          865: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper"
        allowTouchMove={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
      >
        {reviews.map((review) => {
          const truncatedReview =
            review.review.length === 118
              ? review.review
              : review.review.slice(0, 119);

          const showFullContent = showFullContentMap[review.id];

          return (
            <SwiperSlide key={review.id}>
              <div className="relative pt-16">
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10">
                  <Image
                    alt="client-image"
                    src={review.clientImg}
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-10 group border hover:border-primary border-gray-500 p-10 bg-gray-400 rounded-lg transition-all backdrop-blur-md backdrop-filter bg-opacity-10 mb-20">
                  <div className="absolute inset-0 flex justify-center items-center z-0">
                    <div className="hidden group-hover:block absolute bg-bg-card-lighter blur-3xl lg:w-[300px] lg:h-[400px] md:w-[500px] md:h-[300px] w-[100px] h-[180px] rounded -z-10 transition-opacity duration-300 ease-in-out"></div>
                  </div>
                  <div className="mt-10">
                    <p className="text-white">
                      {showFullContent
                        ? review.review
                        : truncatedReview + "..."}
                    </p>
                    {review.review.length > 118 && (
                      <button
                        onClick={() => handleToggleContent(review.id)}
                        className="font-bold text-blue-500"
                      >
                        {showFullContent ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <div className="space-y-2">
                      <p className="text-lg text-white">{review.clientName}</p>
                      <div className="flex">
                        <FaStar className="text-amber-500 text-2xl" />
                        <FaStar className="text-amber-500 text-2xl" />
                        <FaStar className="text-amber-500 text-2xl" />
                        <FaStar className="text-amber-500 text-2xl" />
                        <FaStar className="text-amber-500 text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className="absolute top-1/2 xl:-left-5 -left-5 lg:left-0 transform -translate-y-1/2 z-10 cursor-pointer prev bg-white/5 backdrop-blur-md rounded-full p-3"
        onClick={handleSlidePrev}
      >
        <IoArrowBackOutline className="text-2xl text-white" />
      </div>
      <div
        className="absolute top-1/2 xl:-right-5 -right-5 lg:right-0 transform -translate-y-1/2 z-10 cursor-pointer next bg-white/5 backdrop-blur-md rounded-full p-3"
        onClick={handleSlideNext}
      >
        <IoArrowForwardOutline className="text-2xl text-white" />
      </div>
    </div>
  );
};

export default ReviewSwiper;
