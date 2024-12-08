import Image from "next/image";
import React from "react";

const Counter: React.FC = () => {
  return (
    <div className="mt-48">
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-y-10 lg:gap-y-10 xl:gap-y-0">
        <div className="flex-col items-center flex">
          <div className="mb-auto">
            <Image
              src={"/copy-image.svg"}
              width={20}
              height={20}
              layout="responsive"
              alt="images-logo"
            />
          </div>
          <div className="text-center mt-4">
            <p className="font-bold text-4xl gradient-text2">12000+</p>
            <p className="text-gray-400 mt-1">
              Photos <br /> are generated
            </p>
          </div>
        </div>
        <div className="flex-col items-center flex">
          <div className="mb-auto">
            <Image src={"/time.svg"} width={80} height={80} alt="images-logo" />
          </div>
          <div className="text-center mt-4">
            <p className="font-bold text-4xl gradient-text2">20</p>
            <p className="text-gray-400 mt-1">
              Second to <br /> enhanced images
            </p>
          </div>
        </div>
        <div className="flex-col items-center flex">
          <div className="mb-auto">
            <Image
              src={"/Union.svg"}
              width={20}
              height={20}
              layout="responsive"
              alt="images-logo"
            />
          </div>
          <div className="text-center mt-4">
            <p className="font-bold text-4xl gradient-text2">300+</p>
            <p className="text-gray-400 mt-1">
              Customers <br /> in 4 countries
            </p>
          </div>
        </div>
        <div className="flex-col items-center flex">
          <div className="my-auto">
            <Image
              src={"/file.svg"}
              width={20}
              height={20}
              layout="responsive"
              alt="images-logo"
            />
          </div>
          <div className="text-center mt-4">
            <p className="font-bold text-4xl gradient-text2">500+</p>
            <p className="text-gray-400 mt-1">
              Product <br /> tamplates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
