"use client";
import { DestinationCoordinateContext } from "@/context/DestinationCoordinateContext";
import { SourceCoordinateContext } from "@/context/SourceCoordinateContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Cars } from "@/DB/Cars";
import { PaymentMethods } from "@/DB/PaymentMetods";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { CarContext } from "@/context/CarContext";
import { PaymentMethodContext } from "@/context/PaymentMethodContext";
import { useRouter } from "next/navigation";
const Booking = () => {
  const router = useRouter();
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const { selectedCar, setSelectedCar } = useContext(CarContext);
  const { selectedPaymentMethod, setSelectedPaymentMethod } =
    useContext(PaymentMethodContext);
  const [addressList, setAddressList] = useState<any>(null);
  const [isSourceSelect, setIsSourceSelect] = useState<any>(false);
  const { setSourceCoordinate } = useContext<Object | any>(
    SourceCoordinateContext
  );
  const { setDestinationCoordinate } = useContext<Object | any>(
    DestinationCoordinateContext
  );

  /* Function for set source and destination value when user typed */
  const handleChange = (e: any) => {
    const name = e.target.name;
    const enteredValue = e.target.value;
    if (name === "source") {
      setSource(enteredValue);
      setIsSourceSelect(false);
    } else {
      setIsSourceSelect(true);
      setDestination(enteredValue);
    }
  };

  const searchSuggestAPI_URL = `${
    process.env.NEXT_PUBLIC_SEARCH_SUGGEST_API_URL1
  }=${isSourceSelect ? destination : source}&access_token=${
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  }&${process.env.NEXT_PUBLIC_SEARCH_SUGGEST_API_URL2}`;

  /* use effect for address suggestion list api fetcing.Use for autocmplete address  */
  useEffect(() => {
    if ((source && !isSourceSelect) || destination) {
      const debounceFunction = setTimeout(() => {
        getAddressSuggestList();
      }, 1000);
      return () => clearTimeout(debounceFunction);
    }
  }, [source, destination]);
  const getAddressSuggestList = async () => {
    try {
      const res = await fetch(searchSuggestAPI_URL);
      const result = await res.json();
      setAddressList(result.suggestions);
    } catch (err) {
      setAddressList(["No Result Found"]);
    }
  };

  /* To click any suggested address and set to source and destination */
  const getCoordinate = async (id: String | any) => {
    try {
      const getCoordinateAPI_URL = `${process.env.NEXT_PUBLIC_GET_COORDINATE_API_URL}/${id}?session_token=[GENERATED-UUID]&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
      const res = await fetch(getCoordinateAPI_URL);
      const result = await res.json();
      const [longitude, latitude] = result?.features[0].geometry.coordinates;
      !isSourceSelect
        ? setSourceCoordinate({ longitude, latitude })
        : setDestinationCoordinate({ longitude, latitude });
    } catch (err) {
      return err;
    }
  };

  /* Function for selecting any address from address list */
  const handleDropdownSelect = (currElem: any) => {
    setAddressList(null);
    if (isSourceSelect) {
      setDestination(
        currElem?.name + "," + currElem?.place_formatted ??
          currElem?.address + "," + currElem?.full_address
      );
      setIsSourceSelect(false);
    } else {
      setSource(
        currElem?.name + "," + currElem?.place_formatted ??
          currElem?.address + "," + currElem?.full_address
      );
      setIsSourceSelect(true);
    }
    getCoordinate(currElem.mapbox_id);
  };

  /* Function for clicking button */
  const handleBtnClick = () => {
    router.push("/payment");
  };
  return (
    <div className="px-6 " onClick={() => setAddressList(null)}>
      <div className="text-xl font-bold mb-1">Booking</div>
      <div className="p-5 border-[1px] rounded-sm w-full border-gray-100">
        <div className="my-2 relative">
          <div className="text-sm text-gray-400 font-medium mb-1">
            Where From?
          </div>
          <input
            type="text"
            className="border-gray-300 rounded-md border-[1px] outline-none w-full px-2 py-1 text-md"
            value={source}
            name="source"
            onChange={handleChange}
          />
          <div className={`absolute bg-white w-full z-10 px-1 cursor-pointer`}>
            {!isSourceSelect &&
              addressList?.map((currElem: any, index: any) => {
                return (
                  <div
                    className="w-full border-b-[1px] border-gray-300 py-2 px-1 bg-white rounded-sm hover:bg-gray-200"
                    onClick={() => handleDropdownSelect(currElem)}
                    key={index}
                  >
                    <div className="text-sm font-semibold">
                      {currElem?.name}
                    </div>
                    <div className="text-xs font-medium text-gray-500">
                      {currElem?.place_formatted ??
                        currElem?.address + "," + currElem?.full_address}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="my-2 relative">
          <div className="text-sm text-gray-400 font-medium mb-1">
            Where To?
          </div>
          <input
            type="text"
            className="border-gray-300 rounded-md border-[1px] outline-none w-full px-2 py-1 text-md"
            value={destination}
            name="destination"
            onChange={handleChange}
          />
          <div className={`absolute bg-white w-full z-10 px-1 cursor-pointer`}>
            {isSourceSelect &&
              addressList?.map((currElem: any, index: any) => {
                return (
                  <div
                    className="w-full border-b-[1px] border-gray-300 py-2 px-1 bg-white rounded-sm  hover:bg-gray-200"
                    onClick={() => handleDropdownSelect(currElem)}
                    key={index}
                  >
                    <div className="text-sm font-semibold">
                      {currElem?.name}
                    </div>
                    <div className="text-xs font-medium text-gray-500">
                      {currElem?.place_formatted ??
                        currElem?.address + "," + currElem?.full_address}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mt-4 mb-2 text-base font-semibold">Select Car</div>
        <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-3">
          {Cars.map((currElem, index) => {
            return (
              <div
                className={`py-2 px-3 border-[1px] rounded-md cursor-pointer hover:scale-100 hover:border-[2px] w-full min-w-fit min-h-fit ${
                  selectedCar === currElem.type
                    ? "border-yellow-400 border-[2px]"
                    : ""
                }`}
                key={index}
                onClick={() => setSelectedCar(currElem.type)}
              >
                <Image
                  src={currElem.imgSrc}
                  alt="Car"
                  width={80}
                  height={100}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <div className="text-sm text-gray-500 font-medium">
                    {currElem.type}
                  </div>
                  <div className="text-sm font-semibold">
                    <span>&#8377; </span>
                    {50 * currElem.priceRate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 mb-2 text-base font-semibold">Payment Methods</div>
        <div className="grid grid-cols-5 md:grid-cols-5 w-full gap-3">
          {PaymentMethods.map((currElem, index) => {
            return (
              <Image
                src={currElem}
                alt="Payment Methods"
                width={20}
                height={20}
                className={`w-full h-full border-[1px] rounded-md border-gray-200 hover:scale-105 hover:border-[2px] cursor-pointer ${
                  selectedPaymentMethod === currElem
                    ? "border-yellow-400 border-[2px]"
                    : ""
                }`}
                key={index}
                onClick={() => setSelectedPaymentMethod(currElem)}
              />
            );
          })}
        </div>
        <button
          className="w-full p-1 mt-4 text-black text-base font-semibold bg-yellow-400 rounded-md"
          onClick={handleBtnClick}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
