"use client";
import { satoshiMedium } from "@/libs/fonts";
import { useRouter } from "next/navigation";
import React from "react";

const DiscountButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/discount-code");
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-48 overflow-hidden rounded-xs py-3 bg-black text-white text-sm
        ${satoshiMedium.className} font-medium uppercase cursor-pointer
        group transition-all duration-300 hover:tracking-widest hover:border border-gray-500
      `}
    >
      <span className="relative z-10 flex items-center justify-center w-full transition-all duration-300 group-hover:text-black">
        Add Discount Code
      </span>
      <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 group-hover:w-full z-0" />
    </button>
  );
};

export default DiscountButton;
