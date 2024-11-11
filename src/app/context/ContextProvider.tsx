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
import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

interface UserContextType {
  currentUser: any;
  loading: boolean;
  refetch: () => Promise<QueryObserverResult>;
  isPricingModalOpen: boolean;
  setIsPricingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPriceId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;
  handleSubscriptionPayment: () => Promise<void>;
  clientSecret: string;
  selectedPrice: string;
  selectedPriceId: string;
  setNewRole: React.Dispatch<React.SetStateAction<string>>;
  setCreditIncrement: React.Dispatch<React.SetStateAction<string>>;
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
  const [selectedPriceId, setSelectedPriceId] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [newRole, setNewRole] = useState("");
  const [creditIncrement, setCreditIncrement] = useState("");
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

  const {
    data: currentUser = {},
    refetch,
    isLoading,
  } = useQuery({
    queryFn: fetchUser,
    queryKey: ["user", user?.emailAddresses[0].emailAddress],
    // enabled: !!isLoaded && !!user,
  });

  const handleSubscriptionPayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded.");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      console.error("CardElement not found.");
      return;
    }
    const toastId = toast.loading("Processing...");
    try {
      // Collect necessary data for subscription creation
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          email: user?.emailAddresses[0].emailAddress,
          name: user?.fullName,
        },
      });
      // Create a subscription on the server
      const response = await axiosInstance.post("/api/create-subscription", {
        email: user?.emailAddresses[0].emailAddress,
        priceId: selectedPriceId,
        name: user?.fullName,
        paymentMethod: paymentMethod.paymentMethod?.id,
      });
      // setIsPaymentModalOpen(false);

      const { clientSecret, subscriptionId } = response.data;
      setClientSecret(clientSecret);

      // Confirm the payment using the CardElement if required
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        console.log(result.error);
      } else if (result.paymentIntent?.status === "succeeded") {
        // Handle success (e.g., update user's subscription status)
        toast.success("Payment succeeded!", { duration: 3000, id: toastId });

        // Optionally, update the user’s credits or role based on subscription
        const res = await axiosInstance.post(`/api/get-credit`, {
          newRole,
          creditIncrement,
          subscriptionId,
        });

        if (res.data.data.modifiedCount) {
          refetch(); // Refetch user data or subscription status
          setIsPaymentModalOpen(false); // Close payment modal
        }
      }
    } catch (error: any) {
      toast.error(`Payment error`, { duration: 3000, id: toastId });
      setIsPaymentModalOpen(false); // Close payment modal
      // Handle error (e.g., display a generic error message to the user with toast)
    }
  };
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
        setSelectedPriceId,
        selectedPriceId,
        setSelectedPrice,
        selectedPrice,
        handleSubscriptionPayment,
        clientSecret,
        setNewRole,
        setCreditIncrement,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
