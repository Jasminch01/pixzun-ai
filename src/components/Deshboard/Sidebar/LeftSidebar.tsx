"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Panel } from "@/components/Svg";

const tamplateImages = [
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733157718/lpwel3tlmyd0r1i4reet_gqaopi.jpg",
    alt: "Image 1",
    name: "bright and sturdy",
    prompt:
      "Create an image of a bright and sturdy pastel backdrop with a designated area for product placement. The background should convey a sense of reliability and versatility, making it a perfect canvas for showcasing various products. Ensure that the lighting is optimal to accentuate the featured items and make them stand out, reflections, dslr, in focus, 4k, unsplash",
    nagative_propmt:
      "grey scale, text, watermark, patterns, deformed, human, fingers, blurry",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733150305/ztfpxpgv2cjfc7ewfntw_x8g08c.jpg",
    alt: "Image 2",
    name: "Magical",
    prompt:
      "A photo of a pastel gradient backdrop, advertising photography style with studio lighting, natural shadows, and a DSLR focus, 4K resolution, unsplash-style quality. In the scene, a subject is standing on a purple studio table, surrounded by pumpkins and smoke, set against a deep purple background. The atmosphere is magical, eerie, and enchanting, with bright lighting highlighting the composition.",
    nagative_propmt:
      "dark, grey, textures, bad geometry, out of focus, bad art, deformed, b&w, blurry, dark, hair, products, props, watermark, text, floating, flowers",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733150750/tik4ysy6hxo0d5ef4nkt_zbjh81.jpg",
    alt: "Image 3",
    name: "Magical",
    prompt:
      "A photo of a pastel gradient backdrop, advertising photography style with studio light, natural shadows, DSLR, in focus, 4K resolution, unsplash-quality. Standing on a white platform, surrounded by lavender, with a pastel purple background, this product photography captures the scene with soft lighting, clean composition, and a serene, elegant atmosphere",
    nagative_propmt:
      " ugly, deformed, noisy, distorted, grainy, dark, black, low,quality ",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733151055/wbvazlnov8mfbzshl37b_yuz6q1.jpg",
    alt: "Image 4",
    name: "Mars",
    prompt:
      "A photo of a pastel gradient backdrop, advertising photography style with studio light, natural shadows, DSLR, in focus, 4K resolution, unsplash-quality. In the middle of Mars, with a surreal and otherworldly atmosphere, the scene features dusty red terrain under soft lighting, blending the ethereal backdrop with the Martian landscape for a unique and striking composition.",
    nagative_propmt: "ugly",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733151462/suwh4sqlwcyvtvrgig_lupwmc.jpg",
    alt: "Image 5",
    name: "Bedroom",
    prompt:
      "A photo of a pastel gradient backdrop, advertising photography style with studio light, natural shadows, DSLR, in focus, 4K resolution, unsplash-quality. On a warm-toned wooden nightstand next to a plush, comfortable bed with soft, neutral-toned linens. The bedroom is cozy and inviting, with soft, diffused lighting in the background, creating a relaxing and serene atmosphere perfect for showcasing the product in focus",
    nagative_propmt: "ugly",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733151819/h41deizqe5hyvrfyyffw_ycsisy.jpg",
    alt: "Image 6",
    name: "A minimalist space",
    prompt:
      "A photo of a Carrara marble countertop with a kitchen in the background and a window with natural light, natural shadows, sharp focus, DSLR, 4K resolution, unsplash-quality. In a minimalist space with white walls, a simple wooden coffee table, a neutral area rug, and a few carefully chosen decor pieces. Large windows allow natural light to flood in, creating a clean, serene, and modern atmosphere, blending the elegance of the marble countertop with the minimalist interior design.",
    nagative_propmt:
      "ugly, grey scale, text, watermark, patterns, deformed, human, fingers, blurry",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733152301/pr1chojbfy8rc6gnji6i_wqgmun.jpg",
    alt: "Image 7",
    name: "A sun Drenched",
    prompt:
      "A sun-drenched, Scandinavian-inspired dining room with white oak flooring and white walls. A large window overlooks a lush green garden. A simple linen tablecloth graces a wooden table adorned with a ceramic vase filled with wildflowers. Natural light streams through the window, creating a warm and inviting ambiance. Simple, clean, airy",
    nagative_propmt:
      "ugly, grey scale, text, watermark, patterns, deformed, human, fingers, blurry",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733154594/mbxfzjtnfnep5viss1zs_bqchwu.jpg",
    alt: "Image 8",
    name: "Modern living room",
    prompt:
      "In a modern living room, bright daylight, full glass windows, white",
    nagative_propmt: "ugly, sofa legs, dark, black, sofa",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733155312/fbhgbiqd68mddxkla84c_bjhkol.jpg",
    alt: "Image 9",
    name: "Minimalistic living room",
    prompt: "Minimalistic scandinavian living room, product photography",
    nagative_propmt: "ugly",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733156184/k7278yofhoqx29grngyn_ytnrmi.jpg",
    alt: "Image-11",
    name: "Wooden floor",
    prompt: "Standing on a wooden floor, beside flowers",
    nagative_propmt: "ugly",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733156526/mbdxjdbatsax2uxa6tth_qw7hqu.jpg",
    alt: "Image-12",
    name: "Marble floor",
    prompt:
      "A photo of a pastel gradient backdrop, advertising photography style with studio light, natural shadows, DSLR sharpness, in focus, 4K resolution, and unsplash-quality. The scene features a subject standing on a marble floor, with the smooth, reflective surface adding elegance to the composition. The lighting is balanced to highlight the subject, blending the soft pastel backdrop with the sleek marble details for a refined and professional aesthetic.",
    nagative_propmt:
      "ugly, dark, grey, textures, bad geometry, out of focus, bad art, deformed, b&w, blurry, dark, hair, products, props, watermark, text, floating, flowers",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733156746/uyqm5nyp4wchlfkrclsr_doqjsp.jpg",
    alt: "Image-13",
    name: "green monstera plant",
    prompt:
      "A photo of a pastel gradient backdrop, advertising photography style with studio light, natural shadows, DSLR sharpness, in focus, 4K resolution, and unsplash-quality. The scene features a product standing on a white table, positioned beside a vibrant green monstera plant. The composition emphasizes the product with balanced lighting and natural shadows, creating a clean, modern aesthetic ideal for product photography",
    nagative_propmt:
      "ugly, dark, grey, textures, bad geometry, out of focus, bad art, deformed, b&w, blurry, dark, hair, products, props, watermark, text, floating, flowers",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733157157/upb4v1dvkjb62klvhofu_unh4et.jpg",
    alt: "Image-14",
    name: "vibrant green",
    prompt:
      "A photo of a pastel gradient backdrop, advertising photography style with studio light, natural shadows, DSLR sharpness, in focus, 4K resolution, and unsplash-quality. The scene features a product standing on a table, with dried flowers softly blurred in the background, creating a shallow depth of field. The lighting highlights the product, combining elegance and subtle texture for a professional and visually captivating product photography setup.",
    nagative_propmt:
      "ugly, dark, grey, textures, bad geometry, out of focus, bad art, deformed, b&w, blurry, dark, hair, products, props, watermark, text, floating, flowers",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733157512/oieyks9mwzfbqrui9hy5_vs1bbb.jpg",
    alt: "Image-15",
    name: "Green mountain",
    prompt:
      "A photo of a pastel gradient backdrop, advertising photography style with studio light, natural shadows, DSLR sharpness, in focus, 4K resolution, and unsplash-quality. The scene features a product standing on a rock, with a serene forest and majestic mountains softly blurred in the background. The composition blends the natural elements with the pastel gradient backdrop, creating a striking contrast and a visually appealing setting for professional product photography.",
    nagative_propmt:
      "ugly, dark, grey, textures, bad geometry, out of focus, bad art, deformed, b&w, blurry, dark, hair, products, props, watermark, text, floating, flowers",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733158062/lzbm4si2pr2kkrgzvjtm_c5zt9z.jpg",
    alt: "Image-16",
    name: "Kitchen",
    prompt:
      "a photo of a carrara marble counter top with a kitchen in the background and a window with natural light, natural shadow, sharp, dslr, in focus, 4k, unsplash",
    nagative_propmt:
      "fake, 3d render, cartoonish, bad geometry, out of focus, bad art, deformed, b&w, blurry, dark",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733158031/ledwxcng3m1oit1uyaue_esttgn.jpg",
    alt: "Image-17",
    name: "Valentine",
    prompt:
      "a photo of a red studio backdrop, surrounded by small balloon hearts, hard light and shadows, lovecore aesthetic, 8k, 4k, photorealistic, realistic, cinematic composition, volumetric lighting, high-resolution, vivid, professional, lifelike, crisp, flawless, DSLR, sharp, best quality, high quality, highres, proportion",
    nagative_propmt:
      "textures, reflections, text, watermark, deformed, human, fingers, blurry",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733158339/ao2tdfqws8plxcb3vyut_molhjn.jpg",
    alt: "Image-19",
    name: "Light",
    prompt:
      "a realistic photo of a white floor with golden backdrop studio and string lights in the background, studio light, sharp, dslr, in focus, 4k, unsplash",
    nagative_propmt:
      "wooden floor, reflections, text, watermark, deformed, human, fingers, blurry, oversaturated, 3d render",
  },
  {
    src: "https://res.cloudinary.com/ddqt9bodf/image/upload/v1733158526/faafw1ln1tm4ynfghyp6_kocn5j.jpg",
    alt: "Image-19",
    name: "coffee shop",
    prompt:
      "a photo of a coffee shop countertop, winter atmosphere, coffee shop appliances in the background, earth tones, natural light, sharp, dslr, in focus, 4k, unsplash",
    nagative_propmt:
      "deform, duplicated, repeat, oversaturated, bad geometry, out of focus, cartoon, 3d, disfigured, bad art, deformed, poorly drawn, extra limbs, close up, b&w, weird colors, blurry",
  },
];
interface ModalProps {
  handleSubmit: () => Promise<void>;
  setInputPrompt: Dispatch<SetStateAction<string>>;
  setInputNagativePrompt: Dispatch<SetStateAction<string>>;
}

const LeftSidebar: React.FC<ModalProps> = ({
  handleSubmit,
  setInputPrompt,
  setInputNagativePrompt,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMinimize, setIsMinimize] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sidebar = document.getElementById("left-sidebar");

      const handleScroll = () => {
        if (sidebar && sidebar.scrollTop > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      if (sidebar) {
        sidebar.addEventListener("scroll", handleScroll);
        return () => {
          sidebar.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, []);

  const handleImageClick = (prompt: string, negativePrompt: string) => {
    setInputPrompt(prompt);
    setInputNagativePrompt(negativePrompt);
  };

  return (
    <div className="relative lg:fixed lg:top-40 lg:left-0 xl:h-[30rem] lg:h-[30rem] 2xl:h-[40rem] order-3 mt-5 lg:mt-0">
      {/* Arrow Icon position absolutely within the sidebar */}
      <div
        className={`
            absolute top-1/2 transform -translate-y-1/2  size-7 -right-[25px] z-30 cursor-pointer  lg:flex items-center justify-center hidden `}
        onClick={() => setIsMinimize(!isMinimize)}
      >
        <Panel />
      </div>

      <div
        id="left-sidebar"
        className={`relative transition-all duration-300 ease-in-out overflow-hidden lg:overflow-y-auto lg:overflow-x-hidden lg:h-full custom-scrollbar ${
          isMinimize ? "lg:w-10 xl:w-10" : "lg:w-60 xl:w-80"
        } lg:border lg:border-l-0 lg:rounded lg:border-primary  lg:pb-5`}
      >
        <div
          className={`lg:sticky top-0 z-10 transition-colors lg:duration-300 py-5 ${
            isScrolled && "bg-[#1B1D29]"
          } ${isMinimize ? "hidden" : ""}`}
        >
          <div className="xl:pl-5 lg:pl-5">
            <p className="text-white md:text-base md:font-bold">
              Use Templates
            </p>
          </div>
        </div>

        <div className={`xl:p-5 lg:px-3 md:px-0 ${isMinimize && "hidden"}`}>
          {/* Swiper for mobile and tablet devices */}
          <div className="block lg:hidden">
            <Swiper
              spaceBetween={10}
              breakpoints={{
                320: { slidesPerView: 4.5, spaceBetween: 10 },
                420: { slidesPerView: 4.5, spaceBetween: 10 },
                640: { slidesPerView: 3.5, spaceBetween: 10 },
                768: { slidesPerView: 5, spaceBetween: 10 },
              }}
            >
              {tamplateImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="size-20 md:size-32 object-cover rounded-md cursor-pointer"
                    onClick={() =>
                      handleImageClick(
                        image.prompt,
                        image.nagative_propmt || ""
                      )
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Grid layout for large screens */}
          <div className={`hidden lg:grid lg:grid-cols-2 gap-4 `}>
            {tamplateImages.map((image, index) => (
              <div className="relative hover:p-[1px] rounded-md cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500">
                <div
                  onClick={() =>
                    handleImageClick(image.prompt, image.nagative_propmt || "")
                  }
                  className={`relative group hover:border-0 border border-white rounded-md`}
                >
                  <Image
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="size-20 md:size-32 object-cover rounded-md cursor-pointer"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute hidden group-hover:flex inset-0 bg-gradient-to-t from-black to-transparent opacity-70 rounded-md items-center transition-all ease-in duration-700">
                    <p className="text-white p-2 absolute bottom-0 text-sm">
                      {image.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
