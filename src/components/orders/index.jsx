"use client";

import { ghetoshark } from "@/libs/fonts";
import React, { useEffect, useState } from "react";
import OrdersTable from "./ordersTable";
import axios from "axios";
import config from "../../libs/config.json";
import OrdersHeader from "./ordersHeader";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    const orders = await axios.get(`${config.BASE_URL}/api/orders`);
    if (orders.data.message === "Orders fetched successfully") {
      setOrders(orders.data.data);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log("Orders", orders);
  return (
    <>
      <div className="w-full mt-2">
        <OrdersHeader orders={orders} loading={loading} />
        <OrdersTable orders={orders} />
      </div>
    </>
  );
};

export default Orders;
