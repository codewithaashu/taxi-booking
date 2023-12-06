import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <div
      className="grid grid-cols-2 px-5 py-4 border-b-[1px] border-gray-100 shadow-sm"
      style={{ background: "rgb(249 248 248 / 80%)" }}
    >
      <div className="flex md:justify-between col-span-1 items-center">
        <div className="px-3">
          {/* <Image
            src="/Go-Taxis-Logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="w-full"
          /> */}
          <h1 className="text-xl font-bold">goTaxis</h1>
        </div>
        <div className="hidden md:grid md:grid-cols-3">
          <h2 className="text-lg font-medium text-gray-500 col-span-1 cursor-pointer hover:text-gray-800 hover:scale-100">
            Home
          </h2>
          <h2 className="text-lg font-medium text-gray-500  col-span-1 cursor-pointer hover:text-gray-800 hover:scale-100">
            Booking
          </h2>
          <h2 className="text-lg font-medium text-gray-500  col-span-1 cursor-pointer hover:text-gray-800 hover:scale-100">
            Contact Us
          </h2>
        </div>
      </div>
      <div className="justify-self-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Header;
