"use client";
import React from "react";
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

const data = [
  { name: "Jan", sales: 4000, trend: "up" },
  { name: "Feb", sales: 3000, trend: "down" },
  { name: "Mar", sales: 2000, trend: "down" },
  { name: "Apr", sales: 2780, trend: "up" },
  { name: "May", sales: 3890, trend: "up" },
  { name: "Jun", sales: 4390, trend: "up" },
  { name: "July", sales: 1390, trend: "down" },
  { name: "Aug", sales: 5390, trend: "up" },
  { name: "Sept", sales: 3390, trend: "up" },
  { name: "Oct", sales: 1790, trend: "down" },
  { name: "Nov", sales: 3349, trend: "up" },
  { name: "Dec", sales: 4390, trend: "up" },
];

const COLORS = {
  up: "#10b981", // emerald-500
  down: "#ef4444", // red-500
  neutral: "#64748b", // slate-500
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const trend = payload[0].payload.trend;
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium text-gray-700">{label}</p>
        <p className="flex items-center">
          <span className="text-2xl font-bold mr-2">
            ${payload[0].value.toLocaleString()}
          </span>
          {trend === "up" ? (
            <FiTrendingUp className="text-emerald-500" />
          ) : (
            <span className="text-red-500">↓</span>
          )}
        </p>
        <p className="text-sm text-gray-500">
          {trend === "up" ? "Increased" : "Decreased"} from last month
        </p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Sales Performance
        </h3>
        <div className="flex items-center text-sm bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
          <FiTrendingUp className="mr-1" />
          <span>12% overall growth</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="text-gray-500 text-sm">Monthly Sales</span>
              )}
            />
            <Bar dataKey="sales" radius={[4, 4, 0, 0]} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.trend] || COLORS.neutral}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Growth</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Decline</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
