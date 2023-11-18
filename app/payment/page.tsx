import { Metadata } from "next";
import Layout from "./layout";
export const metadata: Metadata = {
  title: "Go Taxis | Payment",
  description:
    "A Taxi-Booking Website | Go Taxis | India No.1 Taxi Booking Website | Launch in Bhopal,Indore,Gwalior and Jabalpur.",
};
const page = () => {
  return <Layout />;
};

export default page;
