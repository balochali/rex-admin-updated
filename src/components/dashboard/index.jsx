"use client";

import React from "react";
import DashboardHeader from "./DashboardHeader";
import SalesChart from "./SalesChart";
import DiscountButton from "./DiscountButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { satoshiMedium } from "@/libs/fonts";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      {user ? (
        <div className="p-12">
          <DashboardHeader title="Dashboard" />
          <div className="mt-10">
            <SalesChart />
          </div>
          <div className="mt-10">
            <DiscountButton />
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
          <div className="max-w-md w-full rounded-xs shadow-xl p-8 text-center shadow-xl border border-gray-200">
            <h2
              className={`text-2xl font-bold text-black ${satoshiMedium.className}`}
            >
              Welcome to Our Dashboard
            </h2>
            <p className={`${satoshiMedium.className} text-slate-900 mt-5`}>
              Please log in to access your personalized dashboard and view your
              sales analytics.
            </p>
            <button
              onClick={handleLogin}
              className={`${satoshiMedium.className} mt-5 text-white hover:text-black border relative group overflow-hidden bg-black w-full h-10 rounded-xs cursor-pointer transition-all duration-300`}
            >
              <span className="relative z-10 transition-all duration-300 group-hover:tracking-widest">
                Log In
              </span>
              <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 group-hover:w-full z-0" />
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default Dashboard;
