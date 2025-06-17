"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ghetoshark, satoshiMedium } from "@/libs/fonts";
import { useAuth } from "@/context/AuthContext";

/* ------------ Icons ------------ */
import {
  LayoutDashboard,
  Package,
  CreditCard,
  ClipboardList,
  Users,
  MessageCircle,
  LogOut,
} from "lucide-react";

/* ------------ Nav items ------------ */
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Products", icon: Package, path: "/products" },
  { label: "Payments", icon: CreditCard, path: "/payments" },
  { label: "Orders", icon: ClipboardList, path: "/orders" },
  { label: "Customers", icon: Users, path: "/customers" },
  { label: "Chat", icon: MessageCircle, path: "/chat" },
];

const buttonClass = (isActive) =>
  `${satoshiMedium.className} font-medium p-0.5 h-10 w-full text-sm cursor-pointer ${
    isActive ? "border-white" : "border-transparent"
  } text-white relative group overflow-hidden bg-black border rounded-sm transition-all duration-300 drop-shadow-lg flex items-center gap-2`;

const labelSpan =
  "pl-2 relative z-10 flex items-center gap-2 transition-all duration-300 group-hover:text-black uppercase";

const bgSpan =
  "absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 group-hover:w-full z-0";

const SideBar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  /* hide non‑dashboard items if not signed in */
  const visibleItems = user
    ? navItems
    : navItems.filter((i) => i.label === "Dashboard");

  return (
    <div className="pt-6 bg-black h-screen text-white pl-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/rex/rexlogo.svg"
          width={300}
          height={300}
          alt="rex logo"
          className="invert w-20"
        />
        <h3 className={`${ghetoshark.className} text-6xl font-semibolds`}>
          REX
        </h3>
      </div>

      {/* Navigation */}
      <div className="flex flex-col mt-8 pr-6 gap-2 flex-1">
        {visibleItems.map(({ label, icon: Icon, path }) => {
          const isActive = pathname === path;
          return (
            <Link href={path} key={label}>
              <button className={buttonClass(isActive)}>
                <span className={labelSpan}>
                   <Icon className="w-5 h-5" />
                   {label}
                </span>
                <span className={bgSpan} />
              </button>
            </Link>
          );
        })}
      </div>

      {/* Logout (bottom) */}
      {user && (
        <div className="pr-6 mb-4">
          <button onClick={logout} className={buttonClass(false)}>
            <span className={labelSpan}>
              <LogOut className="w-5 h-5" />
              Logout
            </span>
            <span className={bgSpan} />
          </button>
        </div>
      )}

    </div>
  )
};

export default SideBar;
