"use client";

import React, { useEffect } from "react";
import Login from "@/components/login";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <div>
        <Login />
      </div>
    </>
  );
};

export default Page;
