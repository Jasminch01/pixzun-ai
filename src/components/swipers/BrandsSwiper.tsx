"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination, FreeMode } from "swiper/modules";
import Image from "next/image";


type Tbrands = {
    id: number;
    tag: string;
    brandLogo: string;
  };
  
  interface BrandsSwiperProps {
    brands: Tbrands[];
  }

const BrandsSwiper: React.FC<BrandsSwiperProps> = ({ brands }) => {

  return (
    <div className="relative mt-36 swiper-container">
    <Swiper
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
    >
      {brands.map((brand) => {

        return (
          <SwiperSlide key={brand.id}>
            <div>
              <div className="flex justify-center  items-center h-full mt-auto">
                <Image
                  alt={brand.tag}
                  src={brand.brandLogo}
                  width={500}
                  height={500}
                  className={`${
                    brand.tag === 'hillValley-logo' ? 'w-[310px] h-[144px]' : 'w-44 h-44'
                  }`}
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  </div>
  );
};

export default BrandsSwiper;
