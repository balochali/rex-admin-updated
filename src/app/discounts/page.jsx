"use client";

import React, { useState, useEffect } from "react";
import DiscountsHeader from "@/components/discounts/DiscountsHeader";
import DiscountsTable from "@/components/discounts/DiscountTable";
import axios from "axios";
import config from "@/libs/config.json"

const Discounts = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.BASE_URL}/api/coupon`);
        setCoupons(response.data.data || []);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);
  return (
    <>
      <div className="p-4 mt-2">
        <DiscountsHeader coupons={coupons} loading={loading} />
        <div className="mt-5">
          <DiscountsTable
            coupons={coupons}
            onEdit={(coupon) => handleEdit(coupon)}
            onDelete={(id) => handleDelete(id)}
          />
        </div>
      </div>
    </>
  );
};

export default Discounts;
