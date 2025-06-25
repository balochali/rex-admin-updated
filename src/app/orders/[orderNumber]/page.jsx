"use client";
import React from "react";
import OrderDetailsByNumber from "@/components/orders/orderDetails/OrderDetailsByNumber";
import { useParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";

const OrderDetailsPage = () => {
  const { orderNumber } = useParams();
  const { orders } = useProducts();

  // Find the order with matching orderNumber
  const order = Array.isArray(orders) 
    ? orders.find((o) => o.orderNumber === Number(orderNumber))
    : null;

  return (
    <div className="py-8">
      <OrderDetailsByNumber order={order} />
    </div>
  );
};

export default OrderDetailsPage;