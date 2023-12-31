"use client";

import { useRouter } from "next/navigation";
import Hero from "./Hero";
import NavigationBox from "./NavigationBox";
import { useContext, useState } from "react";
import { CarContext } from "@/context/CarContext";
import { PaymentMethodContext } from "@/context/PaymentMethodContext";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
const Booking = () => {
  const router = useRouter();
  const [addressList, setAddressList] = useState<any>(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const { selectedCar } = useContext(CarContext);
  const { selectedPaymentMethod } = useContext(PaymentMethodContext);
  /* Function for clicking button */
  const handleBtnClick = () => {
    router.push("/payment");
  };
  return (
    <div className="px-6 " onClick={() => setAddressList(null)}>
      <div className="text-xl font-medium mb-1">Booking</div>
      <div className="px-5 py-3 border-[1px]  w-full border-gray-100 bg-white rounded-md shadow-md">
        <NavigationBox
          addressList={addressList}
          setAddressList={setAddressList}
        />
        <Hero />
        <button
          className="w-full p-1 mt-4 text-white text-base font-semibold bg-[#b01aa7] rounded-md"
          onClick={handleBtnClick}
          disabled={
            !source || !destination || !selectedCar || !selectedPaymentMethod
          }
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
