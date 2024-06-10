import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
// Define the type for the image objects
type TImage = {
  src: string;
  alt: string;
  label: string;
};

// Arrays of images to be displayed in the marquee
export const BeforeAfterMarque: React.FC = () => {
  const imagesPair1: TImage[] = [
    { src: "/before-1.png", alt: "Before-Image-1", label: "Before" },
    { src: "/after-1.png", alt: "After-Image-1", label: "After" },
  ];
  const imagesPair2: TImage[] = [
    { src: "/before-2.png", alt: "Before Image 2", label: "Before" },
    { src: "/after-2.png", alt: "After Image 2", label: "After" },
  ];
  const imagesPair3: TImage[] = [
    { src: "/before-3.png", alt: "Before Image 2", label: "Before" },
    { src: "/after-3.png", alt: "After Image 2", label: "After" },
  ];
  return (
    <Marquee gradient={false} speed={30}>
      <div className="flex ml-20">
        {imagesPair1.map((image, index) => (
          <div key={index} className="relative flex">
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
              className="lg:w-[19.50rem] lg:h-[25rem] w-[200px] h-[200px]"
            />
            <span className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-xs font-bold rounded">
              {image.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex ml-20 mt-24">
        {imagesPair2.map((image, index) => (
          <div key={index} className="relative flex">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={400}
              className="lg:w-[19.50rem] lg:h-[25rem] w-[200px] h-[200px]"
            />
            <span className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-xs font-bold rounded">
              {image.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex ml-20 mt-20">
        {imagesPair3.map((image, index) => (
          <div key={index} className="relative flex">
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
              className="lg:w-[19.50rem] lg:h-[25rem] w-[200px] h-[200px]"
            />
            <span className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-xs font-bold rounded">
              {image.label}
            </span>
          </div>
        ))}
      </div>
    </Marquee>
  );
};



export const BeforeAfterMarque2: React.FC = () => {
  const imagesPair1: TImage[] = [
    { src: "/before-4.png", alt: "Before-Image-1", label: "Before" },
    { src: "/after-4.png", alt: "After-Image-1", label: "After" },
  ];
  const imagesPair2: TImage[] = [
    { src: "/before-2.png", alt: "Before Image 2", label: "Before" },
    { src: "/after-2.png", alt: "After Image 2", label: "After" },
  ];
  const imagesPair3: TImage[] = [
    { src: "/before-3.png", alt: "Before Image 2", label: "Before" },
    { src: "/after-3.png", alt: "After Image 2", label: "After" },
  ];
  const imagesPair4: TImage[] = [
    { src: "/before-1.png", alt: "Before Image 2", label: "Before" },
    { src: "/after-1.png", alt: "After Image 2", label: "After" },
  ];
  return (
    <Marquee gradient={false} speed={40}>
      <div className="flex ml-20">
        {imagesPair1.map((image, index) => (
          <div key={index} className="relative flex">
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
              className="lg:w-[19.50rem] lg:h-[25rem] w-[200px] h-[200px]"
            />
            <span className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-xs font-bold rounded">
              {image.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex ml-20 mt-24">
        {imagesPair2.map((image, index) => (
          <div key={index} className="relative flex">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={400}
              className="lg:w-[22.50rem] lg:h-[25rem] w-[200px] h-[200px]"
            />
            <span className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-xs font-bold rounded">
              {image.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex ml-20 mt-24">
        {imagesPair3.map((image, index) => (
          <div key={index} className="relative flex">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={400}
              className="lg:w-[19.50rem] lg:h-[25rem] w-[200px] h-[200px]"
            />
            <span className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-xs font-bold rounded">
              {image.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex ml-20 mt-24">
        {imagesPair4.map((image, index) => (
          <div key={index} className="relative flex">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={400}
              className="lg:w-[19.50rem] lg:h-[25rem] w-[200px] h-[200px]"
            />
            <span className="absolute top-2 right-2 bg-white text-black px-2 py-1 text-xs font-bold rounded">
              {image.label}
            </span>
          </div>
        ))}
      </div>
    </Marquee>
  );
};

