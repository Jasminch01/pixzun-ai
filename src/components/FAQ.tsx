"use client";
import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface AccordionItem {
  title: string;
  content: string;
}

const Faq: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<boolean[]>([]);

  const accordionData: AccordionItem[] = [
    {
      title: "What is pixaura AI?",
      content: `Pixaura AI is an advanced image processing and enhancement tool that leverages artificial intelligence to provide high-quality image editing solutions.`,
    },
    {
      title: "Can I customize the background textures?",
      content: `Absolutely! Customize your background textures with a variety of options to suit your needs.`,
    },
    {
      title: "Do you enhance the photos?",
      content: `Yes, our AI-driven technology ensures that your photos are enhanced with the highest quality and precision.`,
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndices((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div id="faq" className="py-20 px-5 min-h-[80vh] md:px-0 lg:px-0">
      <div className="mb-20 text-white">
        <p className="text-center font-bold text-4xl lg:text-5xl xsm:text-2xl text-white">
          FAQ
        </p>
        <p className={`text-center mt-5 text-base text-gray-400`}>
          Common Inquiries and Helpful Responses
        </p>
      </div>
      <div className="w-full">
        {accordionData.map((section, index) => (
          <div key={index} className="mb-4 space-y-3 w-[800px] mx-auto">
            <div
              className={`flex gap-2 cursor-pointer transition-transform duration-300 ease-in-out`}
              onClick={() => handleToggle(index)}
            >
              <MdKeyboardArrowRight
                size={25}
                className={`text-lg transition-transform duration-300 ${
                  openIndices[index] ? "rotate-90" : ""
                }`}
                color="white"
              />
              <h2
                className="text-lg font-semibold xsm:text-base text-white"
                style={{ textAlign: "left" }}
              >
                {section.title}
              </h2>
            </div>
            {openIndices[index] && (
              <div
                className={`transition-transform duration-500 ease-in-out text-white pl-10`}
              >
                <p className="text-base text-gray-400">{section.content}</p>
              </div>
            )}
            <hr className="border border-gray-400"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
