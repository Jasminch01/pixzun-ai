import React, { useState } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  onPayment: () => Promise<void>; // Assume onPayment returns a promise
  selectedPrice: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onPayment,
  selectedPrice,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await onPayment(); // Trigger the payment process
    } finally {
      setLoading(false); // Always set loading to false after payment completes
    }
  };

  return (
    <div className="md:w-[30rem] w-[15rem]">
      <form onSubmit={handleSubmit}>
        {/* Card Number */}
        <label>
          Card Number
          <CardNumberElement
            className="border py-3 px-5 rounded"
            options={{ style: { base: { fontSize: "16px" } } }}
          />
        </label>

        {/* Expiration Date and CVC */}
        <div className="md:flex gap-5 my-5">
          <div className="w-full">
            <label>
              Expiry Date
              <CardExpiryElement
                className="border py-3 px-5 rounded"
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </label>
          </div>
          <div className="w-full">
            <label>
              CVC
              <CardCvcElement
                className="border py-3 px-5 rounded"
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-bg-gradient w-full py-3 rounded text-white"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Processing..." : `Pay $${selectedPrice}.00`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
