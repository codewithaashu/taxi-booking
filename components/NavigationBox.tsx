import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { DestinationCoordinateContext } from "@/context/DestinationCoordinateContext";
import { SourceCoordinateContext } from "@/context/SourceCoordinateContext";
import { useContext, useEffect, useState } from "react";

const NavigationBox = (props: any) => {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const { addressList, setAddressList } = props;
  const [isSourceSelect, setIsSourceSelect] = useState<any>(false);
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

  const { setSourceCoordinate } = useContext<Object | any>(
    SourceCoordinateContext
  );
  const { setDestinationCoordinate } = useContext<Object | any>(
    DestinationCoordinateContext
  );

  const searchSuggestAPI_URL = `${
    process.env.NEXT_PUBLIC_SEARCH_SUGGEST_API_URL1
  }=${isSourceSelect ? destination : source}&access_token=${
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  }&${process.env.NEXT_PUBLIC_SEARCH_SUGGEST_API_URL2}`;

  /* use effect for address suggestion list api fetching.Use for autocmplete address  */
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
  return (
    <>
      <div className="py-3 relative">
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
                  <div className="text-sm font-semibold">{currElem?.name}</div>
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
        <div className="text-sm text-gray-400 font-medium mb-1">Where To?</div>
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
                  <div className="text-sm font-semibold">{currElem?.name}</div>
                  <div className="text-xs font-medium text-gray-500">
                    {currElem?.place_formatted ??
                      currElem?.address + "," + currElem?.full_address}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default NavigationBox;
