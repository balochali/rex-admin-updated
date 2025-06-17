"use client";

import { ghetoshark } from "@/libs/fonts";
import React, { useEffect, useState } from "react";
import OrdersTable from "./ordersTable";
import axios from "axios";
import config from "../../libs/config.json";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const orders = await axios.get(`${config.BASE_URL}/api/orders`);
    if (orders.data.message === "Orders fetched successfully") {
      setOrders(orders.data.data);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="w-full mt-16">
        <p
          className={`${ghetoshark.className} text-5xl uppercase font-bold mb-10 text-center`}
        >
          Orders
        </p>
        <OrdersTable orders={orders} />
      </div>
    </>
  );
};

export default Orders;
