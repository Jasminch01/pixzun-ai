import React from "react";
import { Modal } from "@/components/Modal";
import PricingCard from "./PricingCard";

const pricingPlans = [
  {
    title: "Premium",
    price: "19",
    period: "Per month",
    features: [
      "No watermark",
      "High quality images",
      "Enhanced images",
      "1000 Credits",
    ],
    buttonText: "Get premium",
    pricingId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICING_ID as string,
  },
  {
    title: "Enterprise",
    price: "99",
    period: "Per month",
    features: [
      "No watermark",
      "High quality images",
      "Enhanced images",
      "Lifetime access to credits",
      "5000 Credits",
    ],
    buttonText: "Get Enterprise",
    pricingId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRICE_PRICING_ID as string,
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
      modalSize="2xl:w-[55rem] lg:w-[50rem] md:w-[40rem] md:h-[40rem] h-[46rem] static"
      gradientSize=" 2xl:w-[50rem] xl:w-[50rem] md:w-[40rem] lg:w-[40rem] h-[30rem]"
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
            pricingId={plan.pricingId}
          />
        ))}
      </div>
    </Modal>
  );
};

export default PricingModal;
