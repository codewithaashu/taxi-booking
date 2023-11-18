import type { Metadata } from "next";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
export const metadata: Metadata = {
  title: "Go Taxis | A Booking Website",
  description:
    "A Taxi-Booking Website | Go Taxis | India No.1 Taxi Booking Website | Launch in Bhopal,Indore,Gwalior and Jabalpur.",
};
export default function Home() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}
