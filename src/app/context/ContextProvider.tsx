"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useUser } from "@clerk/nextjs";
import axiosInstance from "@/utils/axiosInstance";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { useStripe, useElements, CardNumberElement,} from "@stripe/react-stripe-js";

interface UserContextType {
  currentUser: any;
  loading: boolean;
  refetch: () => Promise<QueryObserverResult>;
  isPricingModalOpen: boolean;
  setIsPricingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;
  handlePayment: () => Promise<void>;
  clientSecret: string;
  selectedPrice: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const { isLoaded, user } = useUser();
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (isPaymentModalOpen) {
      setIsPricingModalOpen(false);
    }
  }, [isPaymentModalOpen]);

  const fetchUser = async () => {
    const res = await axiosInstance.get(
      `/api/users/me?email=${user?.emailAddresses[0].emailAddress}`
    );
    return res.data.data;
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded.");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      console.error("CardElement not found.");
      return;
    }

    try {
      // Create PaymentIntent on the server
      const response = await axiosInstance.post("/api/create-payment-intent", {
        amount: parseFloat(selectedPrice),
      });

      const clientSecret = response.data.clientSecret;
      setClientSecret(clientSecret);

      // Confirm the payment using the CardElement
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        console.error("Payment error:", result.error.message);
        // Handle error (e.g., display message to user)
      } else if (result.paymentIntent?.status === "succeeded") {
        setIsPaymentModalOpen(false)
        console.log("Payment successful!");

        // Handle success (e.g., show confirmation message, redirect)
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const {
    data: currentUser = null,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: fetchUser,
    queryKey: ["user", user?.emailAddresses[0].emailAddress],
    enabled: !!isLoaded && !!user,
  });

  // Set loading based on the query's loading state
  const loading = isLoading || !isLoaded;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        loading,
        refetch,
        isPricingModalOpen,
        setIsPricingModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        setSelectedPrice,
        selectedPrice,
        handlePayment,
        clientSecret,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
