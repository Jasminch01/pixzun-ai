import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="text-center text-white">
        <p className="text-5xl font-bold">
          Make Standout Content <br></br> With Stunning{" "}
          <span className="gradient-text">AI</span>
        </p>
        <p className="mt-6">
          Elevate your brand with our AI-powered product image solutions. <br />{" "}
          giving you professional, high-quality visuals effortlessly.
        </p>
        <div className="mt-6">
          <button className="bg-button-gradient py-3 px-4 rounded-full text-white">
            Get Started
          </button>
        </div>
        <div className=" relative flex items-center justify-center mt-20">
          <div className="absolute bg-bg-lighter blur-3xl w-[500px] h-[400px] rounded -z-10"></div>
          <div className=" p-2 bg-border-gradient rounded">
            <iframe
              className=" w-[600px] h-[400px]"
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
