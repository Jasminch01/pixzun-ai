import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="text-center text-white px-5 md:px-0">
        <p className="md:text-5xl text-3xl font-bold">
          Make Standout Content <br></br> With Stunning{" "}
          <span className="gradient-text">AI</span>
        </p>
        <p className="mt-6 hidden md:block">
          Elevate your brand with our AI-powered product image solutions. <br />{" "}
          giving you professional, high-quality visuals effortlessly.
        </p>
        <p className="mt-6 w-[300px] mx-auto text-sm md:hidden">
          Elevate your brand with our AI-powered product image solutions. giving
          you professional, high-quality visuals effortlessly.
        </p>
        <div className="mt-6">
          <button className="bg-button-gradient md:py-3 md:px-4 p-2 text-sm md:text-base rounded-full text-white">
            Get Started
          </button>
        </div>
        <div className=" relative flex items-center justify-center mt-20">
          <div className="absolute bg-bg-lighter blur-3xl md:w-[600px] md:h-[400px] w-[400px] h-[200px] rounded -z-10"></div>
          <div className=" p-2 bg-border-gradient rounded">
            <iframe
              className="md:w-[600px] md:h-[400px] w-[300px] h-[200px]"
              src="https://www.youtube.com/embed/TU1gMloI0kc"
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
