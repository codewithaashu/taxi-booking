"use client";
import { CarContext } from "@/context/CarContext";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // const { selectedCar, setSelectedCar } = useContext(CarContext);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (elements == null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }
    const { data } = await axios.post("/api/create-intent", { amount: 1489 });
    const clientSecret = data;
    console.log(clientSecret);
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });
  };
  return (
    <div className="flex justify-center w-full  items-center  h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md border-[2px] border-gray-400 p-5 shadow-md"
      >
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="w-full bg-yellow-500 mt-5 p-2 text-base font-medium "
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
