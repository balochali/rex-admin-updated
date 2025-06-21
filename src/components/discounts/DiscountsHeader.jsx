"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  FiTag,
  FiPlusCircle,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiXCircle,
} from "react-icons/fi";
import Modal from "../products/Modal";
import CreateCouponForm from "./CreateCouponForm";
import { satoshiMedium } from "@/libs/fonts";

const DiscountsHeader = ({ coupons, loading }) => {
  const [showCouponModal, setShowCouponModal] = useState(false);

  // Calculate stats from coupons array
  const stats = useMemo(() => {
    const now = new Date();
    return coupons.reduce(
      (acc, coupon) => {
        acc.totalCoupons++;

        // Check if coupon is active (not expired and not maxed out)
        const isActive =
          (!coupon.expiresAt || new Date(coupon.expiresAt) > now) &&
          (!coupon.maxUses || coupon.timesUsed < coupon.maxUses);

        if (isActive) {
          acc.activeCoupons++;
        } else {
          acc.expiredCoupons++;
        }

        // Calculate total discounts in PKR (assuming each use applies to an average order value)
        acc.totalDiscounts += coupon.timesUsed * 28000; // Example: ₨28,000 per use

        return acc;
      },
      {
        totalCoupons: 0,
        activeCoupons: 0,
        expiredCoupons: 0,
        totalDiscounts: 0,
      }
    );
  }, [coupons]);

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
        <h1 className="text-3xl font-light text-gray-800">
          Coupon Code Management
        </h1>
        <button
          className={`relative flex items-center gap-2 bg-black text-white border border-black px-4 py-2 rounded-sm cursor-pointer overflow-hidden group ${satoshiMedium.className}`}
          onClick={() => setShowCouponModal(true)}
        >
          <span className="absolute left-0 top-0 w-0 h-full bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
          <FiPlusCircle className="text-lg relative z-10 group-hover:text-black transition-colors duration-500" />
          <span className="text-sm font-medium relative z-10 group-hover:text-black transition-colors duration-500">
            Create Coupon
          </span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Coupons */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Total Coupons
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.totalCoupons}
              </h3>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <FiTag className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Active Coupons */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Active Coupons
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.activeCoupons}
              </h3>
              <p className="text-green-500 text-xs mt-1 flex items-center">
                <FiCheckCircle className="mr-1" />
                Currently active
              </p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <FiCheckCircle className="text-green-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Expired/Used Coupons */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Expired/Used
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.expiredCoupons}
              </h3>
              <p className="text-amber-500 text-xs mt-1 flex items-center">
                <FiXCircle className="mr-1" />
                No longer valid
              </p>
            </div>
            <div className="bg-amber-50 p-2 rounded-lg">
              <FiClock className="text-amber-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Total Discounts Given */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Potential Discounts
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                Rs. {stats.totalDiscounts.toLocaleString()}
              </h3>
              <p className="text-blue-500 text-xs mt-1 flex items-center">
                <FiDollarSign className="mr-1" />
                Total potential
              </p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <FiDollarSign className="text-purple-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {showCouponModal && (
        <Modal
          onClose={() => setShowCouponModal(false)}
          title="Create Coupon Code"
          size="lg"
          isOpen={showCouponModal}
        >
          <CreateCouponForm
            onSuccess={() => {
              setShowCouponModal(false);
              // Refresh coupons after creation
              axios
                .get(`${config.BASE_URL}/api/coupon`)
                .then((res) => setCoupons(res.data.data || []));
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default DiscountsHeader;
