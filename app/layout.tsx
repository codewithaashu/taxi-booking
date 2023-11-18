"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SourceCoordinateContext } from "../context/SourceCoordinateContext";
import { useEffect, useState } from "react";
import { DestinationCoordinateContext } from "@/context/DestinationCoordinateContext";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { CarContext } from "@/context/CarContext";
import { PaymentMethodContext } from "@/context/PaymentMethodContext";
import { RouteDataContext } from "@/context/RouteDataContext";

const outfit = Outfit({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sourceCoordinate, setSourceCoordinate] = useState<any>(null);
  const [destinationCoordinate, setDestinationCoordinate] = useState<any>(null);
  const [source, setSource] = useState<any>("");
  const [destination, setDestination] = useState<any>("");
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
  const [route, setRoute] = useState<any>(null);
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      const { latitude, longitude } = position.coords;
      setSourceCoordinate({ latitude, longitude });
    });
  };
  useEffect(() => {
    getUserLocation();
  }, []);
  return (
    <ClerkProvider>
      <SourceCoordinateContext.Provider
        value={{ sourceCoordinate, setSourceCoordinate }}
      >
        <DestinationCoordinateContext.Provider
          value={{ destinationCoordinate, setDestinationCoordinate }}
        >
          <SourceContext.Provider value={{ source, setSource }}>
            <DestinationContext.Provider
              value={{ destination, setDestination }}
            >
              <CarContext.Provider value={{ selectedCar, setSelectedCar }}>
                <PaymentMethodContext.Provider
                  value={{ selectedPaymentMethod, setSelectedPaymentMethod }}
                >
                  <RouteDataContext.Provider value={{ route, setRoute }}>
                    <html lang="en">
                      <body className={outfit.className}>{children}</body>
                    </html>
                  </RouteDataContext.Provider>
                </PaymentMethodContext.Provider>
              </CarContext.Provider>
            </DestinationContext.Provider>
          </SourceContext.Provider>
        </DestinationCoordinateContext.Provider>
      </SourceCoordinateContext.Provider>
    </ClerkProvider>
  );
}
