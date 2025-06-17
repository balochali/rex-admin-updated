import { satoshiMedium } from "@/libs/fonts";
import React from "react";

const OrdersTable = ({ orders }) => {
  // Make sure we handle both single order object and array of orders
  const ordersList = Array.isArray(orders) ? orders : orders ? [orders] : [];

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-sm shadow">
        <table className="mx-8 w-[85rem]">
          <thead>
            <tr className={`bg-gray-50 ${satoshiMedium.className}`}>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">
                Order #
              </th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">
                Product
              </th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">
                Quantity
              </th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">
                Price
              </th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">
                Customer
              </th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">
                Address
              </th>
              <th className="py-4 px-6 text-left text-gray-600 font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((order) => (
              <tr
                key={order.id}
                className={`border-t border-gray-200 bg-white text-sm ${satoshiMedium.className} cursor-pointer hover:bg-gray-100`}
              >
                <td className="py-4 px-6 font-bold">
                   #{order.orderNumber}
                </td>
                <td className="py-4 px-6">
                   {order.items && order.items.length > 0
                    ? order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-sm"
                            />
                          )}

                          <div>
                            <p className="font-medium">{item.name}</p>
                            {(item.color || item.size) && (
                              <p className="text-gray-500 text-xs">
                                {item.color && `${item.color}`}
                                {item.size && ` - ${item.size}`}
                              </p>)
                            }
                          </div>
                        </div>
                      ))
                    : "N/A"}
                </td>
                <td className="py-4 px-6 text-center">
                   {order.items && order.items.length > 0
                    ? order.items.reduce((total, item) => total + item.quantity, 0)
                    : 0 }
                </td>
                <td className="py-4 px-6 text-center">
                   Rs. {order.finalAmount}
                </td>
                <td className="py-4 px-6">
                   {order.firstName} {order.lastName}
                   <div className="text-gray-500 text-xs">
                     {order.email}
                   </div>
                </td>
                <td className="py-4 px-6">
                   {order.address}
                   {order.city && <div>{order.city}</div>}
                   {order.country && <div>{order.country}</div>}
                </td>
                <td className="py-4 px-6 text-center">
                   <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.orderStatus === "ORDER_PLACED"
                        ? "bg-blue-100 text-blue-800"
                        : order.orderStatus === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : order.orderStatus === "DELIVERED"
                        ? "bg-green-100 text-green-800"
                        : order.orderStatus === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                   >
                    {order.orderStatus?.replace("_", " ")}
                   </span>
                </td>
              </tr>
            ))}
            {ordersList.length === 0 && (
              <tr className="border-t border-gray-200 bg-white">
                <td colSpan={8} className="py-8 px-6 text-center text-gray-500">
                   No orders found
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersTable;
