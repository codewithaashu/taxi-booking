"use client";
import { CarContext } from "@/context/CarContext";
import { RouteDataContext } from "@/context/RouteDataContext";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext } from "react";

const CheckoutForm = () => {
  const stripe: any = useStripe();
  const elements = useElements();

  const { selectedCar } = useContext(CarContext);
  const { route } = useContext<any>(RouteDataContext);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (elements == null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }
    // calculate amount
    const amt: any = Math.floor(
      (route.distance / 1000) * selectedCar.priceRate
    ).toFixed(2);
    const amount = amt * 100;
    const { data } = await axios.post("/api/create-intent", { amount });
    const clientSecret = data;
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
      {selectedCar && route && (
        <form
          onSubmit={handleSubmit}
          className="max-w-md border-[2px] border-gray-400 p-5 shadow-md"
        >
          <PaymentElement />
          <button
            type="submit"
            disabled={!stripe || !elements}
            className="w-full bg-[#b01aa7] text-white mt-5 p-2 text-base font-medium "
          >
            Pay
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
