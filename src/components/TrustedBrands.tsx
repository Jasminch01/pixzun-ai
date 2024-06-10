import BrandsSwiper from "./swipers/BrandsSwiper";

const TrustedBrands = () => {
  const brands = [
    {
      id: 1,
      tag: "hillValley-logo",
      brandLogo: "/HillValley_logo.png",
    },
    {
      id: 3,
      tag: "Stan-visual-logo",
      brandLogo: "/ST-logo.png",
    },
    {
      id: 3,
      tag: "logo",
      brandLogo: "/Vector.png",
    },
  ];
  return (
    <div className="mt-36">
      <div className="text-center">
        <p className="lg:text-4xl md:text-3xl text-2xl font-bold text-white">Who trust us</p>
        <p className="text-base text-gray-400 mt-5">Partnered with Industry Leaders Who Trust Our Expertise</p>
      </div>
      <div>
        <BrandsSwiper brands={brands}/>
      </div>
    </div>
  );
};

export default TrustedBrands;
