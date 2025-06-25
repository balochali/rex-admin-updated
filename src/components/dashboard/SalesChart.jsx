"use client";
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { FiTrendingUp } from "react-icons/fi";
import { useProducts } from "@/context/ProductContext";
import { satoshiMedium } from "@/libs/fonts";

const COLORS = {
  up: "#10b981", // emerald-500
  down: "#ef4444", // red-500
  neutral: "#64748b", // slate-500
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const trend = payload[0].payload.trend;
    const orderCount = payload[0].payload.orderCount || 0;
    return (
      <div
        className={`bg-white p-4 shadow-lg rounded-lg border border-gray-200 ${satoshiMedium.className}`}
      >
        <p className="text-gray-700">{label}</p>
        <p className="flex items-center mt-1">
          <span className="text-2xl font-bold mr-2">
            PKR {payload[0].value.toLocaleString()}
          </span>
          {trend === "up" ? (
            <FiTrendingUp className="text-emerald-500" />
          ) : trend === "down" ? (
            <span className="text-red-500">↓</span>
          ) : null}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {orderCount} {orderCount === 1 ? "order" : "orders"}
        </p>
        {trend !== "neutral" && (
          <p className="text-sm text-gray-500 mt-1">
            {trend === "up" ? "Increased" : "Decreased"} from last month
          </p>
        )}
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  const { orders } = useProducts();

  const processedData = useMemo(() => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const monthlyData = {};
    const displayMonths = [];

    for (let i = 11; i >= 0; i--) {
      const targetDate = new Date(currentYear, currentMonth - i, 1);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();
      const monthKey = `${year}-${month}`;
      const monthName = `${monthNames[month]} ${
        year === currentYear ? "" : year
      }`.trim();

      const monthData = {
        name: monthName,
        year: year,
        month: month,
        sales: 0,
        orderCount: 0,
        orders: [],
        sortOrder: i,
      };

      monthlyData[monthKey] = monthData;
      displayMonths.unshift(monthData);
    }

    if (orders && orders.length > 0) {
      orders.forEach((order) => {
        const date = new Date(order.createdAt);
        const orderYear = date.getFullYear();
        const orderMonth = date.getMonth();
        const monthKey = `${orderYear}-${orderMonth}`;

        if (monthlyData[monthKey]) {
          monthlyData[monthKey].sales += parseFloat(order.finalAmount || 0);
          monthlyData[monthKey].orderCount += 1;
          monthlyData[monthKey].orders.push(order);
        }
      });
    }

    const sortedData = displayMonths.sort(
      (a, b) => a.year - b.year || a.month - b.month
    );

    const dataWithTrends = sortedData.map((current, index) => {
      let trend = "neutral";
      if (index > 0) {
        const previous = sortedData[index - 1];
        if (current.sales > previous.sales && current.sales > 0) {
          trend = "up";
        } else if (current.sales < previous.sales && previous.sales > 0) {
          trend = "down";
        }
      }

      return {
        ...current,
        trend,
        sales: Math.round(current.sales),
      };
    });

    return dataWithTrends;
  }, [orders]);

  const overallGrowth = useMemo(() => {
    if (processedData.length < 2) return 0;

    const firstMonth = processedData[0].sales;
    const lastMonth = processedData[processedData.length - 1].sales;

    if (firstMonth === 0) return 0;

    return Math.round(((lastMonth - firstMonth) / firstMonth) * 100);
  }, [processedData]);

  const totalSales = useMemo(
    () => processedData.reduce((sum, month) => sum + month.sales, 0),
    [processedData]
  );

  const totalOrders = useMemo(
    () => processedData.reduce((sum, month) => sum + month.orderCount, 0),
    [processedData]
  );

  return (
    <div
      className={`w-full bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${satoshiMedium.className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg text-gray-800">Sales Performance</h3>
          <p className="text-sm text-gray-500">
            {totalOrders} Total Orders • PKR {totalSales.toLocaleString()} Total
            Sales
          </p>
        </div>
        <div
          className={`flex items-center text-sm px-3 py-1 rounded-full ${
            overallGrowth >= 0
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {overallGrowth >= 0 ? (
            <FiTrendingUp className="mr-1" />
          ) : (
            <span className="mr-1">↓</span>
          )}
          <span>
            {Math.abs(overallGrowth)}% Overall{" "}
            {overallGrowth >= 0 ? "Growth" : "Decline"}
          </span>
        </div>
      </div>

      {processedData.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="0"
                vertical={false}
                horizontal={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="name"
                axisLine={true}
                tickLine={true}
                className="text-xs"
                tick={{
                  fill: "#64748b",
                  fontFamily: satoshiMedium.style.fontFamily,
                }}
              />
              <YAxis
                axisLine={true}
                tickLine={true}
                className="text-xs"
                tick={{
                  fill: "#64748b",
                  fontFamily: satoshiMedium.style.fontFamily,
                }}
                tickFormatter={(value) =>
                  `PKR ${value >= 1000 ? (value / 1000).toFixed(0) + "K" : value}`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={() => (
                  <span className="text-gray-500 text-sm">Monthly Sales</span>
                )}
              />
              <Bar
                dataKey="sales"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              >
                {processedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.trend] || COLORS.neutral}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg mb-2">No sales data available</p>
            <p className="text-sm">
              Orders will appear here once they are placed
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Growth</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Decline</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-slate-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Neutral</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
