import React from "react";
import { Modal } from "@/components/Modal";
import PricingCard from "./PricingCard";

const pricingPlans = [
  {
    title: "Premium",
    price: "19",
    period: "Per month",
    features: [
      "Generate 25 pictures a day",
      "No watermark",
      "High quality images",
      "Enhanced images",
      "1000 Credits",
    ],
    buttonText: "Get premium",
    pricingId : 'price_1Px0HIA1JY3LMKw5Q2MuSLmE'
  },
  {
    title: "Enterprise",
    price: "99",
    period: "Per month",
    features: [
      "Generate unlimited pictures",
      "No watermark",
      "High quality images",
      "Enhanced images",
      "Lifetime access to credits",
      "5000 Credits",
    ],
    buttonText: "Get Enterprise",
    pricingId : 'price_1Px16FA1JY3LMKw5eQnEwePG'
  },
];

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalSize=" w-[55rem] h-[46rem] static"
      gradientSize=" w-[50rem] h-[30rem]"
      marginTop="lg:-mt-[18rem]"
    >
      <p className="text-white text-2xl font-bold">Subscribe</p>
      <div className="pricing-cards flex flex-col md:flex-row justify-around items-center space-y-10 md:space-y-0 md:space-x-4">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            period={plan.period}
            features={plan.features}
            buttonText={plan.buttonText}
            pricingId= {plan.pricingId}
          />
        ))}
      </div>
    </Modal>
  );
};

export default PricingModal;
