"use client";
import DehsboardAppbar from "@/components/Deshboard/DeshboardAppbar";
import { ContextProvider } from "../context/ContextProvider";
import QueryProvider from "../context/QueryProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Elements stripe={stripePromise}>
        <QueryProvider>
          <ContextProvider>
            <DehsboardAppbar />
            {children}
          </ContextProvider>
        </QueryProvider>
      </Elements>
    </section>
  );
}
