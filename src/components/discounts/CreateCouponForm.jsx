"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiTag,
  FiPercent,
  FiDollarSign,
  FiCalendar,
  FiMinusCircle,
  FiCheck,
} from "react-icons/fi";
import { satoshiMedium } from "@/libs/fonts";

const CreateCouponForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    maxUses: "",
    minOrderValue: "",
    expiresAt: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create coupon");
      }

      router.push("/dashboard/discounts");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`max-w-2xl p-2 bg-white ${satoshiMedium.className}`}>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Coupon Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Code *
            </label>
            <div className="relative">
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className={`w-full px-4 py-2 border border-gray-300 rounded-sm ${satoshiMedium.className}`}
                placeholder="e.g. SUMMER25"
                required
                maxLength={20}
              />
              <span
                className={`absolute right-3 top-2.5 text-xs text-gray-500 ${satoshiMedium.className}`}
              >
                {formData.code.length}/20
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2 border border-gray-300 rounded-sm ${satoshiMedium.className}`}
              placeholder="Optional description for this coupon"
              rows={3}
            />
          </div>

          {/* Discount Type & Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Type *
              </label>
              <div className="flex border border-gray-300 rounded-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, discountType: "PERCENTAGE" })
                  }
                  className={`${
                    satoshiMedium.className
                  } text-sm cursor-pointer flex-1 py-2 px-4 flex items-center justify-center gap-2 ${
                    formData.discountType === "PERCENTAGE"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-50"
                  }`}
                >
                  <FiPercent />
                  Percentage
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, discountType: "FLAT" })
                  }
                  className={`${
                    satoshiMedium.className
                  } text-sm cursor-pointer flex-1 py-2 px-4 flex items-center justify-center gap-2 ${
                    formData.discountType === "FLAT"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-50"
                  }`}
                >
                  <FiDollarSign />
                  Flat Amount (PKR)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.discountType === "PERCENTAGE"
                  ? "Percentage Off *"
                  : "Discount Amount *"}
              </label>
              <div className="relative">
                <span
                  className={`absolute right-3 top-2.5 text-gray-500 ${satoshiMedium.className}`}
                >
                  {formData.discountType === "PERCENTAGE" ? "%" : "₨"}
                </span>
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-sm ${satoshiMedium.className}`}
                  placeholder={
                    formData.discountType === "PERCENTAGE"
                      ? "e.g. 25"
                      : "e.g. 1000"
                  }
                  required
                  min="0"
                  max={formData.discountType === "PERCENTAGE" ? "100" : ""}
                  step={formData.discountType === "PERCENTAGE" ? "1" : "1"}
                />
              </div>
            </div>
          </div>

          {/* Max Uses & Min Order Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Uses (optional)
              </label>
              <input
                type="number"
                name="maxUses"
                value={formData.maxUses}
                onChange={handleChange}
                className={`w-full px-4 py-2 border border-gray-300 rounded-sm ${satoshiMedium.className}`}
                placeholder="e.g. 100"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Order Value (optional)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="minOrderValue"
                  value={formData.minOrderValue}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-sm ${satoshiMedium.className}`}
                  placeholder="e.g. 5000"
                  min="0"
                  step="1"
                />
                <span
                  className={`absolute right-3 top-2.5 text-gray-500 ${satoshiMedium.className}`}
                >
                  ₨
                </span>
              </div>
            </div>
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date (optional)
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleChange}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md ${satoshiMedium.className}`}
                min={new Date().toISOString().slice(0, 16)}
              />
              <FiCalendar className="absolute right-3 top-2.5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/discounts")}
            className={`px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${satoshiMedium.className}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-70 ${satoshiMedium.className}`}
          >
            {isLoading ? (
              "Creating..."
            ) : (
              <>
                <FiCheck />
                Create Coupon
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCouponForm;
