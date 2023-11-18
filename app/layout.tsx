import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Go Taxis |A Booking Website",
  description:
    "A Taxi-Booking Website | Go Taxis | India No.1 Taxi Booking Website | Launch in Bhopal,Indore,Gwalior and Jabalpur.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
