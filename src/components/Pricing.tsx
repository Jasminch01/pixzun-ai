import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { Check } from "./Svg";

const Pricing: React.FC = () => {
  const plans = [
    {
      title: "Free",
      price: "0",
      // period: "Per month",
      features: ["Generate 2 pictures", "Watermark", "High quality images"],
      buttonText: "Get free",
    },
    {
      title: "Premium",
      price: "19",
      // period: "Per month",
      features: [
        "Generate 25 pictures a day",
        "No watermark",
        "High quality images",
        "Enhanced images",
        "1000 Credits",
      ],
      buttonText: "Get premium",
    },
    {
      title: "Enterprise",
      price: "99",
      // period: "Per year",
      features: [
        "Generate unlimited pictures",
        "No watermark",
        "High quality images",
        "Enhanced images",
        "5000 Credits",
      ],
      buttonText: "Get Enterprise",
    },
  ];
  return (
    <div className="mt-36 px-5 xl:px-0">
      <div className="text-center">
        <p className="lg:text-4xl md:text-3xl text-2xl font-bold text-white">Pricing</p>
        <p className="text-gray-400 mt-5">
          Choose the perfect plan that fits your budget and requirements.
        </p>
      </div>
      <div className="xl:grid-cols-3 grid md:grid-cols-2 grid-cols-1 gap-y-10 gap-5 flex-col mt-[8.56rem] md:gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="flex relative group flex-col justify-between bg-pricing-gradient text-white hover:border-primary border border-secondary rounded-lg shadow-md py-6 text-left transition-transform transform hover:scale-105 duration-300 ease-in-out"
          >
            <div className="absolute inset-0 flex justify-center items-center z-0">
              <div className="hidden group-hover:block absolute bg-bg-card-lighter blur-3xl lg:w-[500px] lg:h-[700px] md:w-[500px] md:h-[300px] w-[100px] h-[180px] rounded -z-10 transition-opacity duration-300 ease-in-out"></div>
            </div>
            <div className="lg:px-16 px-10 mt-10 relative z-10">
              <div>
                <h2 className="text-xl font-bold mb-4">{plan.title}</h2>
                <p className="relative text-base font-bold ml-2">
                  <span className="absolute top-0 -left-2 text-lg">$</span>
                  <span
                    className={`md:text-6xl text-4xl pl-2 ${
                      plan.price === "0" ? "text-white" : "gradient-text3"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {/* <span className="font-normal ml-3">{plan.period}</span> */}
                </p>
                <p className="font-bold text-lg mt-3">Features:</p>
              </div>
              <ul className="list-none p-0 my-5">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-5">
                    <Check
                      strokeColour={`${
                        plan.price === "0" ? "#ffffff" : "url(#gradient)"
                      }`}
                    />
                    <li className="py-2">{feature}</li>
                  </div>
                ))}
              </ul>
            </div>
            <div className="text-center relative z-10">
              <button
                className={`${
                  plan.price === "0" ? "border" : "bg-button-gradient"
                } cursor-pointer rounded-full md:w-44 md:h-[54px] px-3 py-2`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
