"use client";
import CheckoutForm from "@/components/CheckoutForm";
import { CarContext } from "@/context/CarContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";

const page = () => {
  const stripePromise: any = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const options = {
    mode: "payment",
    amount: 14000,
    currency: "inr",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default page;
