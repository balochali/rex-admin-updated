"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ghetoshark, satoshiMedium } from "@/libs/fonts";
import { useAuth } from "@/context/AuthContext";
import { FiPlusCircle } from "react-icons/fi";

/* ------------ Icons ------------ */
import {
  LayoutDashboard,
  Package,
  CreditCard,
  ClipboardList,
  Users,
  MessageCircle,
  LogOut,
  Tag,
} from "lucide-react";

/* ------------ Nav items ------------ */
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Products", icon: Package, path: "/products" },
  { label: "Discounts", icon: Tag, path: "/discounts" },
  { label: "Payments", icon: CreditCard, path: "/payments" },
  { label: "Orders", icon: ClipboardList, path: "/orders" },
  { label: "Customers", icon: Users, path: "/customers" },
  { label: "Chat", icon: MessageCircle, path: "/chat" },
];

const SideBar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  /* hide non‑dashboard items if not signed in */
  const visibleItems = user
    ? navItems
    : navItems.filter((i) => i.label === "Dashboard");

  return (
    <div className="pt-6 bg-gradient-to-b from-gray-900 to-black h-screen text-white pl-6 flex flex-col border-r border-gray-800">
      {/* Logo */}
      <div className="flex items-center px-4 mb-8">
        <Image
          src="/logo/RexLogoWhite.png"
          width={300}
          height={300}
          alt="rex logo"
          className="w-12"
        />
        <h3 className={`${ghetoshark.className} text-4xl font-semibold ml-2`}>
          REX
        </h3>
      </div>

      {/* Navigation */}
      <div className="flex flex-col mt-2 pr-6 gap-1 flex-1">
        {visibleItems.map(({ label, icon: Icon, path }) => {
          const isActive = pathname === path;
          return (
            <Link href={path} key={label}>
              <div
                className={`
                relative overflow-hidden rounded-lg py-3 px-4 mb-1
                ${
                  isActive
                    ? "bg-primary/20 border-l-4 border-primary"
                    : "hover:bg-gray-800"
                }
                transition-all duration-300 cursor-pointer
                flex items-center gap-3
              `}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-primary" : "text-gray-300"
                  }`}
                />
                <span
                  className={`${satoshiMedium.className} text-sm ${
                    isActive ? "text-white font-medium" : "text-gray-300"
                  }`}
                >
                  {label}
                </span>
                {isActive && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Logout (bottom) */}
      {user && (
        <div className="pr-6 mb-6 mt-auto">
          <div
            onClick={logout}
            className="
              relative overflow-hidden rounded-lg py-3 px-4
              hover:bg-gray-800 transition-all duration-300
              cursor-pointer flex items-center gap-3
              border border-gray-700
            "
          >
            <LogOut className="w-5 h-5 text-gray-300" />
            <span
              className={`${satoshiMedium.className} text-sm text-gray-300`}
            >
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
