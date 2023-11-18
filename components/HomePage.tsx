import React from "react";
import Booking from "./Booking";
import MapPage from "./MapPage";

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-between  gap-4 py-4 min-h-[height]">
      <div className="col-span-1 md:col-span-2 md:order-2">
        <MapPage />
      </div>
      <div className="col-span-1 md:col-span-1">
        <Booking />
      </div>
    </div>
  );
};

export default HomePage;
