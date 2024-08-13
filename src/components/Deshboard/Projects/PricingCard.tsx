import { Check } from "@/components/Svg";
import axiosInstance from "@/utils/axiosInstance";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import CheckOutModal from "@/components/CheckOutModal";
import CheckoutForm from "@/components/CheckrouForm";
import { useUserContext } from "@/app/context/ContextProvider";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  features,
  buttonText,
}) => {
  const { setIsPaymentModalOpen, setSelectedPrice } = useUserContext();
  const openModal = () => {
    setSelectedPrice(price);
    setIsPaymentModalOpen(true);
  };

  // const handleToggleAutoRenew = () => {
  //   setIsAutoRenew(!isAutoRenew);
  // };

  return (
    <>
      <div
        onClick={openModal} // Open modal instead of triggering payment directly
        className={`relative flex flex-col
        justify-between bg-pricing-gradient
        text-white
        rounded-lg shadow-md py-6 text-left
        ease-in-out h-full
        ${title === "Enterprise" && "border-primary border"}
        `}
      >
        {title === "Enterprise" && (
          <button className="text-white bg-button-gradient rounded-full px-3 py-2 absolute right-24 top-[5.50rem]">
            Best value
          </button>
        )}
        {title === "Enterprise" && (
          <div
            className={`absolute bg-gradient-to-b
             from-[#A82AD8] to-[#A82AD8] 
             blur-3xl rounded opacity-50
             md:w-[20rem] md:h-[10rem] h-[10rem] w-[20rem] top-10`}
          ></div>
        )}
        <div className="lg:px-16 px-10 mt-10 relative z-10">
          <div>
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p className="relative text-base font-bold ml-2">
              <span className="absolute top-0 -left-2 text-lg">$</span>
              <span
                className={`md:text-6xl text-4xl pl-2 ${
                  price === "0" ? "text-white" : "gradient-text3"
                }`}
              >
                {price}
              </span>
              <span className="font-normal ml-3">{period}</span>
            </p>
            <p className="font-bold text-lg mt-3">Features:</p>
          </div>
          <ul className="list-none p-0 my-5">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-5">
                <Check
                  strokeColour={`${
                    price === "0" ? "#ffffff" : "url(#gradient)"
                  }`}
                />
                <li className="py-2">{feature}</li>
              </div>
            ))}
          </ul>
          {title === "Premium" && (
            <div className="mb-3">
              <div className="flex justify-center">
                <div className="flex text-center items-center gap-2">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    {/* <input
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      checked={isAutoRenew}
                      onChange={handleToggleAutoRenew}
                      className="toggle-checkbox absolute block size-4 rounded-full bg-button-gradient appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10 transform ${isAutoRenew ? 'translate-x-4' : ''}"
                    /> */}
                    <label
                      htmlFor="toggle"
                      className="toggle-label block overflow-hidden h-6 w-10 rounded-full bg-white cursor-pointer"
                    ></label>
                  </div>
                  <label className="text-lg">Auto Renew</label>
                </div>
              </div>
              <p className="text-center">Next renewal: 1 July 2024</p>
            </div>
          )}
        </div>
        <div className="text-center relative z-10">
          <button
            className={`${
              price === "0" ? "border" : "bg-button-gradient"
            } cursor-pointer rounded-full md:w-44 md:h-[54px] px-3 py-2`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
