"use client";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect, useRef, useState } from "react";
import { SourceCoordinateContext } from "@/context/SourceCoordinateContext";
import { DestinationCoordinateContext } from "@/context/DestinationCoordinateContext";
import MapRoute from "./MapRoute";
import { RouteDataContext } from "@/context/RouteDataContext";
const MapPage = () => {
  const [screenHeight, setScreeenHeight] = useState<any>(null);
  const { route, setRoute } = useContext<any>(RouteDataContext);
  const { sourceCoordinate, setSourceCoordinate } = useContext(
    SourceCoordinateContext
  );
  const { destinationCoordinate, setDestinationCoordinate } = useContext<
    Object | any
  >(DestinationCoordinateContext);
  const mapRef = useRef<any>();
  /* Use to fly Source Marker */
  useEffect(() => {
    mapRef.current?.flyTo({
      center: [sourceCoordinate.longitude, sourceCoordinate.latitude],
      duration: 1500,
    });
    setScreeenHeight(window.innerHeight * 0.8);
  }, [sourceCoordinate]);

  /* Use to fly Destination Marker */
  useEffect(() => {
    if (destinationCoordinate) {
      mapRef.current?.flyTo({
        center: [
          destinationCoordinate.longitude,
          destinationCoordinate.latitude,
        ],
        duration: 1500,
      });
    }
    //when search and destination both coordinate are present then we execute getDirection function
    if (sourceCoordinate && destinationCoordinate) {
      getDirection();
    }
  }, [destinationCoordinate]);
  const getDirection = async () => {
    const navigationAPI_URL = `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoordinate.longitude},${sourceCoordinate.latitude};${destinationCoordinate.longitude},${destinationCoordinate.latitude}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
    try {
      const res = await fetch(navigationAPI_URL);
      const result = await res.json();
      setRoute(result.routes[0]);
    } catch (err) {
      return err;
    }
  };
  return (
    <div className="w-full pr-3">
      <div className="text-xl font-medium mb-1 px-2">Map</div>
      <div
        className="w-full border-[1px] border-gray-300 rounded-md relative"
        style={{ minHeight: screenHeight }}
      >
        {sourceCoordinate && (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              latitude: sourceCoordinate.latitude ?? -122.4,
              longitude: sourceCoordinate.longitude ?? 37.8,
              zoom: 14,
            }}
            style={{ width: "100%", height: screenHeight }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker
              longitude={sourceCoordinate.longitude}
              latitude={sourceCoordinate.latitude}
              anchor="bottom"
            >
              <img src="./sourceMapPin.png" width={40} height={120} />
            </Marker>
            {destinationCoordinate && (
              <Marker
                longitude={destinationCoordinate.longitude}
                latitude={destinationCoordinate.latitude}
                anchor="bottom"
              >
                <img src="./destinationMapPin.png" width={40} height={120} />
              </Marker>
            )}
            {route?.geometry && (
              <MapRoute coordinates={route.geometry.coordinates} />
            )}
          </Map>
        )}
        {route && (
          <div className="flex flex-wrap gap-5 p-2 w-fit rounded-sm bg-yellow-500 absolute bottom-0 right-0 z-10 text-black">
            <div className="text-sm font-semibold">
              Distance:{" "}
              <span className="text-xs font-medium">
                {(route.distance / 1000).toFixed(2) ?? "NA"} KM
              </span>
            </div>
            <div className="text-sm font-semibold">
              Duration:{" "}
              <span className="text-xs font-medium">
                {(route.duration / 60).toFixed(2) ?? "NA"} Min
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
