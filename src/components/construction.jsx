"use client";
import React from "react";
import Link from "next/link";
import { ghetoshark, aptos } from "@/libs/fonts";
import { useAuth } from "@/context/AuthContext";

const Construction = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div>
        {/* Status message */}
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
          <p className={`${ghetoshark.className} text-2xl ml-2`}>
            The Construction is going on
          </p>
        </div>

        {/* Auth button */}
        {!user && (
          <Link href="/login">
            <button
              className={`mt-2 uppercase w-full bg-black text-white ${aptos.className} py-1 rounded-xs cursor-pointer hover:tracking-widest transition-all duration-300 hover:font-semibold`}
            >
              Login
            </button>
          </Link>
        )}

      </div>
    </div>
  )
};

export default Construction;
