import React from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  onPayment: () => void; // Pass the payment handler
  selectedPrice: string;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onPayment,
  selectedPrice,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onPayment();
  };

  return (
    <div className="md:w-[30rem] w-[15rem]">
      <form onSubmit={handleSubmit}>
        {/* Card Number */}
        <label>
          Card Number
          <CardNumberElement
            className="border py-3 px-5 rounded "
            options={{ style: { base: { fontSize: "16px" } } }}
          />
        </label>

        {/* Expiration Date */}
        <div className=" md:flex gap-5 my-5">
          <div className="w-full">
            <label>
              Expiry Date
              <CardExpiryElement
                className="border py-3 px-5 rounded "
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </label>
          </div>
          <div className="w-full">
            <label>
              CVC
              <CardCvcElement
                className="border py-3 px-5 rounded "
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </label>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-black w-full py-3 rounded text-white"
          >
            Pay {` $${selectedPrice}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
