import { Cars } from "@/DB/Cars";
import { PaymentMethods } from "@/DB/PaymentMetods";
import { CarContext } from "@/context/CarContext";
import { PaymentMethodContext } from "@/context/PaymentMethodContext";
import { RouteDataContext } from "@/context/RouteDataContext";
import Image from "next/image";
import { useContext } from "react";
const Hero = () => {
  const { selectedCar, setSelectedCar } = useContext(CarContext);
  const { selectedPaymentMethod, setSelectedPaymentMethod } =
    useContext(PaymentMethodContext);
  const { route } = useContext<any>(RouteDataContext);
  return (
    <>
      <div className="mt-2 mb-2 text-base font-semibold">Select Car</div>
      <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-3">
        {Cars.map((currElem, index) => {
          return (
            <div
              className={`py-2 px-3 border-[1px] rounded-md cursor-pointer hover:scale-100 hover:border-[2px] w-full min-w-fit min-h-fit ${
                selectedCar?.type === currElem.type
                  ? "border-[#b01aa7] border-[2px]"
                  : ""
              }`}
              key={index}
              onClick={() => setSelectedCar(currElem)}
            >
              <img
                src={currElem.imgSrc}
                alt="Car"
                className="w-full h-[55px]"
              />
              <div className="flex justify-between mt-2 items-center">
                <div className="text-xs text-gray-500 font-semibold">
                  {currElem.type}
                </div>
                <div className="text-xs font-normal text-black">
                  <span>&#8377; </span>
                  {route
                    ? Math.round((route.distance / 1000) * currElem.priceRate)
                    : currElem.priceRate}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 mb-2 text-base font-semibold">Payment Methods</div>
      <div className="grid grid-cols-5 md:grid-cols-5 w-full gap-3">
        {PaymentMethods.map((currElem, index) => {
          return (
            <img
              src={currElem}
              alt="Payment Methods"
              className={`w-full h-full border-[1px] rounded-md border-gray-200 hover:scale-105 hover:border-[2px] cursor-pointer ${
                selectedPaymentMethod === currElem
                  ? "border-[purple] border-[2px]"
                  : ""
              }`}
              key={index}
              onClick={() => setSelectedPaymentMethod(currElem)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Hero;
