"use client";
import React from "react";
import {
  FiTag,
  FiPercent,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { satoshiMedium } from "@/libs/fonts";

const DiscountsTable = ({ coupons, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "No expiry";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatus = (coupon) => {
    const now = new Date();
    const isExpired = coupon.expiresAt && new Date(coupon.expiresAt) < now;
    const isMaxUsed = coupon.maxUses && coupon.timesUsed >= coupon.maxUses;

    if (isExpired || isMaxUsed) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          <FiXCircle className="mr-1" />
          {isExpired ? "Expired" : "Max used"}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <FiCheckCircle className="mr-1" />
        Active
      </span>
    );
  };

  return (
    <div className={`${satoshiMedium.className} mt-8`}>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Code
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Discount
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Usage
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Expires
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  <div className="flex items-center">
                    <FiTag className="mr-2 text-gray-400" />
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {coupon.code}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {coupon.description || "No description"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    {coupon.discountType === "PERCENTAGE" ? (
                      <FiPercent className="mr-1 text-gray-400" />
                    ) : (
                      <FiDollarSign className="mr-1 text-gray-400" />
                    )}
                    {coupon.discountValue}
                    {coupon.discountType === "PERCENTAGE" ? "%" : "₨"}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {coupon.timesUsed} / {coupon.maxUses || "∞"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiCalendar className="mr-1 text-gray-400" />
                    {formatDate(coupon.expiresAt)}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {getStatus(coupon)}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(coupon)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(coupon.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscountsTable;
