import React from "react";
import ReviewSwiper from "./swipers/ReviewSwiper";

const Reviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      clientName: "Jhon smith",
      clientImg:
        "https://lh3.googleusercontent.com/a-/ALV-UjVNR5THHVht9Fpg6Hf4wopCT9qYoz9OMxObk7NUFxSyzg=w60-h60-p-rp-mo-ba3-br100",
      review: ` I highly recommend Smol AIto any business looking to harness the power of AI for growth and innovation. Their cutting-edge technology and exceptional customer support are truly unmatched.`,
    },
    {
      id: 2,
      clientName: "Rudiger wolf",
      clientImg: "https://i.ibb.co/rpVWLNv/conference-9153534.png",
      review: `I highly recommend Smol AIto any business looking to harness the power of AI for growth and innovation. Their cutting-edge technology and exceptional customer support are truly unmatched`,
    },
    {
      id: 3,
      clientName: "Thiago rudes",
      clientImg:
        "https://lh3.googleusercontent.com/a/ACg8ocJOrlIlBwZUHVpkv5dOv1memp8WoETCGR22bfaMl9Nv=w60-h60-p-rp-mo-br100",
      review: `I highly recommend Smol AIto any business looking to harness the power of AI for growth and innovation. Their cutting-edge technology and exceptional customer support are truly unmatched. ⭐️⭐️⭐️⭐️⭐️`,
    },
    {
      id: 3,
      clientName: "Thiago rudes",
      clientImg:
        "https://lh3.googleusercontent.com/a/ACg8ocJOrlIlBwZUHVpkv5dOv1memp8WoETCGR22bfaMl9Nv=w60-h60-p-rp-mo-br100",
      review: `I highly recommend Smol AIto any business looking to harness the power of AI for growth and innovation. Their cutting-edge technology and exceptional customer support are truly unmatched. ⭐️⭐️⭐️⭐️⭐️`,
    },
  ];

  return (
    <div className="md:px-20 px-5 xl:px-0 mt-48 text-center">
      <p className=" text-white font-bold text-3xl lg:text-3xl xsm:text-2xl">
        What our customers {"Say’s"}
      </p>
      <p className="text-base text-gray-400  mt-5">
      Trusted feedback from our Customers honest opinions and satisfied testimonials
      </p>
      <ReviewSwiper reviews={reviews}></ReviewSwiper>
    </div>
  );
};

export default Reviews;
