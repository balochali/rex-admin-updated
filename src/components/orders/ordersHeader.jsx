"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiXCircle,
  FiPlusCircle,
} from "react-icons/fi";
import { satoshiMedium } from "@/libs/fonts";

const OrdersHeader = ({ orders, loading }) => {
  // Calculate stats from orders array
  const stats = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        acc.totalOrders++;
        acc.totalRevenue += order.finalAmount || 0;

        switch (order.orderStatus) {
          case "ORDER_PLACED":
            acc.placedOrders++;
            break;
          case "COMPLETED":
          case "DELIVERED":
            acc.completedOrders++;
            break;
          case "CANCELLED":
            acc.cancelledOrders++;
            break;
        }

        return acc;
      },
      {
        totalOrders: 0,
        placedOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0,
        totalRevenue: 0,
      }
    );
  }, [orders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className={`mb-8 ${satoshiMedium.className}`}>
      {/* Title and Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-light text-gray-800">Order Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Total Orders
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.totalOrders}
              </h3>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <FiPackage className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Placed Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Placed Orders
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.placedOrders}
              </h3>
              <p className="text-blue-500 text-xs mt-1 flex items-center">
                <FiClock className="mr-1" />
                Awaiting fulfillment
              </p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <FiClock className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Completed
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.completedOrders}
              </h3>
              <p className="text-green-500 text-xs mt-1 flex items-center">
                <FiCheckCircle className="mr-1" />
                Successfully delivered
              </p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <FiCheckCircle className="text-green-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Cancelled Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Cancelled
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.cancelledOrders}
              </h3>
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <FiXCircle className="mr-1" />
                Order cancelled
              </p>
            </div>
            <div className="bg-red-50 p-2 rounded-lg">
              <FiXCircle className="text-red-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Total Revenue
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                Rs.{stats.totalRevenue.toLocaleString()}
              </h3>
              <p className="text-purple-500 text-xs mt-1 flex items-center">
                <FiTruck className="mr-1" />
                All completed orders
              </p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <FiTruck className="text-purple-500 text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;
