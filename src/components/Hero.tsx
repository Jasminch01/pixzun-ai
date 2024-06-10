import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="text-center text-white px-5 md:px-0">
        <p className="lg:text-6xl md:text-4xl text-3xl font-bold">
          Make Standout Content <br/> With Stunning{" "}
          <span className="gradient-text">AI</span>
        </p>
        <p className="mt-7 hidden md:block md:text-base text-sm text-gray-400">
          Elevate your brand with our AI-powered product image solutions. <br />
          giving you professional, high-quality visuals effortlessly.
        </p>
        <p className="mt-6 w-[300px] mx-auto text-sm md:hidden text-gray-400">
          Elevate your brand with our AI-powered product image solutions. giving
          you professional, high-quality visuals effortlessly.
        </p>
        <div className="mt-11">
          <button className="bg-button-gradient md:h-[68px] md:w-[197px] md:px-0 md:py-0 px-3 py-2 text-sm md:text-base rounded-full text-white">
            Get started
          </button>
        </div>
        <div className=" relative flex items-center justify-center mt-[5.56rem]">
          <div className="absolute bg-bg-lighter blur-3xl md:w-[700px] md:h-[521px] w-[300px] h-[200px] rounded -z-10"></div>
          <div className=" p-3 bg-white/5 backdrop-blur-md rounded">
            <iframe
              className="lg:w-[894px] lg:h-[521px] md:w-[600px] md:h-[400px] w-[300px] h-[200px] rounded"
              src="https://www.youtube.com/embed/TU1gMloI0kc?autoplay=1&mute=1&loop=1&playlist=TU1gMloI0kc"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
