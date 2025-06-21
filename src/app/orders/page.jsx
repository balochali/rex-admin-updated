"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Orders from "@/components/orders";

const OrdersPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  // Protect route
  useEffect(() => {
    if (user === null) {
      router.replace("/login"); // send them to login
    }
  }, [user, router]);

  // While deciding, you can show a spinner or fallback
  if (user === null) return null;

  return (
    <div className="w-full h-screen flex p-6">
      <Orders />
    </div>
  );
};

export default OrdersPage;
