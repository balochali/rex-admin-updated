"use client";
import React from "react";
import {
  FiPackage,
  FiUser,
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiTruck,
  FiPhone,
} from "react-icons/fi";
import { satoshiMedium } from "@/libs/fonts";
import { useRouter } from "next/navigation";

const OrdersTable = ({ orders }) => {
  const router = useRouter();
  // Handle both single order object and array of orders
  const ordersList = Array.isArray(orders) ? orders : orders ? [orders] : [];

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "ORDER_PLACED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FiClock className="mr-1" />
            Order Placed
          </span>
        );
      case "COMPLETED":
      case "DELIVERED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheckCircle className="mr-1" />
            {status.replace("_", " ")}
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FiXCircle className="mr-1" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <FiPackage className="mr-1" />
            {status?.replace("_", " ") || "Unknown"}
          </span>
        );
    }
  };

  const handleRowClick = (orderNumber) => {
    router.push(`/orders/${orderNumber}`);
  };

  return (
    <div className={`${satoshiMedium.className} mt-8 pb-6`}>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Order #
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Products
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {ordersList.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(order.orderNumber)}
              >
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  <div className="flex items-center">
                    <FiPackage className="mr-2 text-gray-400" />
                    <span className="font-mono">#{order.orderNumber}</span>
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {order.items && order.items.length > 0 ? (
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-sm"
                            />
                          )}
                          <div>
                            <p className="font-medium">
                              {truncateText(item.name, 15)}
                            </p>
                            <div className="text-xs text-gray-500">
                              {item.color && <span>{item.color}</span>}
                              {item.size && <span> • {item.size}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    "N/A"
                  )}
                </td>
                {console.log("Order Table", order)}
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiUser className="mr-2 text-gray-400" />
                    <div>
                      {truncateText(`${order.firstName} ${order.lastName}`, 15)}
                      <div className="text-xs text-gray-500">
                        {order.email}
                        {order.phone && (
                          <div className="flex items-center mt-1">
                            <FiPhone className="mr-1 text-xs" />
                            {order.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiMapPin className="mr-2 text-gray-400" />
                    <div>
                      {truncateText(order.address, 30)}
                      <div className="text-xs text-gray-500">
                        {order.city && `${order.city}, `}
                        {order.country}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                  {order.items && order.items.length > 0
                    ? order.items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )
                    : 0}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span className="font-medium">Rs. {order.finalAmount}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {getStatusBadge(order.orderStatus)}
                </td>
              </tr>
            ))}
            {ordersList.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
