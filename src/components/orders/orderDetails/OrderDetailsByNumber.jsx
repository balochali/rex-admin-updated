"use client";
import React, { useState } from "react";
import {
  FiPackage,
  FiUser,
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiTruck,
  FiPhone,
  FiCreditCard,
  FiHome,
  FiMail,
  FiEdit,
  FiBox,
  FiRotateCcw,
} from "react-icons/fi";
import { satoshiMedium } from "@/libs/fonts";
import Link from "next/link";
import axios from "axios";
import config from "@/libs/config";

const OrderStatus = {
  ORDER_PLACED: "ORDER_PLACED",
  PACKAGING: "PACKAGING",
  SHIPPED: "SHIPPED",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  RETURNED: "RETURNED",
};

const OrderDetailsByNumber = ({ order }) => {
  const [currentStatus, setCurrentStatus] = useState(order?.orderStatus || "");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!order) {
    return (
      <div className={`${satoshiMedium.className} p-8 text-center`}>
        <p>Order not found</p>
        <Link
          href="/orders"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      const response = await axios.patch(
        `${config.BASE_URL}/api/orders/${order.id}/status`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCurrentStatus(newStatus);
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case OrderStatus.ORDER_PLACED:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <FiClock className="mr-1" />
            Order Placed
          </span>
        );
      case OrderStatus.PACKAGING:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            <FiBox className="mr-1" />
            Packaging
          </span>
        );
      case OrderStatus.SHIPPED:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            <FiTruck className="mr-1" />
            Shipped
          </span>
        );
      case OrderStatus.OUT_FOR_DELIVERY:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
            <FiTruck className="mr-1" />
            Out for Delivery
          </span>
        );
      case OrderStatus.DELIVERED:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <FiCheckCircle className="mr-1" />
            Delivered
          </span>
        );
      case OrderStatus.CANCELLED:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <FiXCircle className="mr-1" />
            Cancelled
          </span>
        );
      case OrderStatus.RETURNED:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            <FiRotateCcw className="mr-1" />
            Returned
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            <FiPackage className="mr-1" />
            {status?.replace("_", " ") || "Unknown"}
          </span>
        );
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case "PAID":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <FiCheckCircle className="mr-1" />
            Paid
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <FiClock className="mr-1" />
            Pending
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <FiXCircle className="mr-1" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            <FiCreditCard className="mr-1" />
            {status || "Unknown"}
          </span>
        );
    }
  };

  const getNextStatusOptions = () => {
    switch (currentStatus) {
      case OrderStatus.ORDER_PLACED:
        return [OrderStatus.PACKAGING, OrderStatus.CANCELLED];
      case OrderStatus.PACKAGING:
        return [OrderStatus.SHIPPED, OrderStatus.CANCELLED];
      case OrderStatus.SHIPPED:
        return [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.RETURNED];
      case OrderStatus.OUT_FOR_DELIVERY:
        return [OrderStatus.DELIVERED, OrderStatus.RETURNED];
      case OrderStatus.DELIVERED:
        return [OrderStatus.RETURNED];
      case OrderStatus.CANCELLED:
      case OrderStatus.RETURNED:
        return [];
      default:
        return Object.values(OrderStatus).filter(
          (status) => status !== currentStatus
        );
    }
  };

  const nextStatusOptions = getNextStatusOptions();
  const totalQuantity =
    order.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div className={`${satoshiMedium.className} p-6 max-w-6xl mx-auto`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Order #{order.orderNumber}
        </h1>
        <div className="flex space-x-2">
          {getStatusBadge(currentStatus)}
          {getPaymentStatusBadge(order.paymentStatus)}
        </div>
      </div>

      {/* Status Update Section */}
      {nextStatusOptions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FiEdit className="mr-2" /> Update Order Status
          </h2>
          <div className="flex flex-wrap gap-2">
            {nextStatusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                disabled={isUpdating}
                className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  isUpdating
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : getStatusButtonClass(status)
                }`}
              >
                {getStatusButtonLabel(status)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-black">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FiPackage className="mr-2" /> Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date</span>
              <span className="font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Items</span>
              <span className="font-medium">{totalQuantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Rs. {order.totalAmount}</span>
            </div>
            {order.discount && (
              <div className="flex justify-between text-red-600">
                <span>Discount</span>
                <span>- Rs. {order.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                Rs. {order.shippingCost || "0"}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>Rs. {order.finalAmount}</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FiUser className="mr-2" /> Customer Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <FiUser className="mt-1 mr-2 text-gray-400" />
              <div>
                <p className="font-medium">
                  {order.firstName} {order.lastName}
                </p>
                <p className="text-sm text-gray-600">{order.email}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FiPhone className="mt-1 mr-2 text-gray-400" />
              <p className="text-gray-600">{order.phone}</p>
            </div>
            {order.newsSubscription && (
              <div className="text-sm text-blue-600 flex items-center">
                <FiMail className="mr-1" /> Subscribed to newsletter
              </div>
            )}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FiTruck className="mr-2" /> Shipping Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <FiMapPin className="mt-1 mr-2 text-gray-400" />
              <div>
                <p className="font-medium">{order.address}</p>
                {order.apartment && (
                  <p className="text-sm text-gray-600">{order.apartment}</p>
                )}
                <p className="text-sm text-gray-600">
                  {order.city}, {order.country}
                </p>
                {order.postalCode && (
                  <p className="text-sm text-gray-600">
                    Postal Code: {order.postalCode}
                  </p>
                )}
              </div>
            </div>
            {!order.billingSameAsShipping && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <FiHome className="mr-2" /> Billing Address
                </h3>
                <p className="text-sm text-gray-600">{order.billingAddress}</p>
                <p className="text-sm text-gray-600">
                  {order.billingCity}, {order.country}
                </p>
                {order.billingPostalCode && (
                  <p className="text-sm text-gray-600">
                    Postal Code: {order.billingPostalCode}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items?.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16">
                        <img
                          className="h-16 w-16 object-cover rounded-sm"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.color && <span>{item.color}</span>}
                          {item.size && <span> • {item.size}</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Rs. {item.priceAtPurchase}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Rs.{" "}
                    {(parseFloat(item.priceAtPurchase) * item.quantity).toFixed(
                      2
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <FiCreditCard className="mr-2" /> Payment Information
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-medium capitalize">
              {order.paymentMethod?.replace(/_/g, " ") || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Status</span>
            {getPaymentStatusBadge(order.paymentStatus)}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/orders"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Orders
        </Link>
      </div>
    </div>
  );
};

// Helper functions for status buttons
const getStatusButtonClass = (status) => {
  switch (status) {
    case OrderStatus.ORDER_PLACED:
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case OrderStatus.PACKAGING:
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case OrderStatus.SHIPPED:
      return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200";
    case OrderStatus.OUT_FOR_DELIVERY:
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case OrderStatus.DELIVERED:
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case OrderStatus.CANCELLED:
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case OrderStatus.RETURNED:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const getStatusButtonLabel = (status) => {
  switch (status) {
    case OrderStatus.ORDER_PLACED:
      return "Mark as Order Placed";
    case OrderStatus.PACKAGING:
      return "Mark as Packaging";
    case OrderStatus.SHIPPED:
      return "Mark as Shipped";
    case OrderStatus.OUT_FOR_DELIVERY:
      return "Mark as Out for Delivery";
    case OrderStatus.DELIVERED:
      return "Mark as Delivered";
    case OrderStatus.CANCELLED:
      return "Cancel Order";
    case OrderStatus.RETURNED:
      return "Mark as Returned";
    default:
      return status.replace("_", " ");
  }
};

export default OrderDetailsByNumber;
