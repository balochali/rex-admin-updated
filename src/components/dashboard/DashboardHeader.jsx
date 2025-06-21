import React from "react";
import { FiTrendingUp, FiTrendingDown, FiPlus } from "react-icons/fi";

const DashboardHeader = ({
  title,
  productCount = 0,
  bundleCount = 0,
  totalSales = 0,
  newCustomers = 0,
  showForm,
  setShowForm,
  showBundleForm,
  setShowBundleForm,
}) => {
  // Format numbers for display
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Mock data for charts
  const productTrendData = [30, 40, 60, 70, 90, productCount];
  const bundleTrendData = [10, 15, 20, 25, 30, bundleCount];
  const salesTrendData = [5000, 8000, 12000, 15000, 18000, totalSales / 100];
  const customerTrendData = [50, 70, 90, 110, 130, newCustomers];

  return (
    <div className="font-sans">
      {/* Main Title */}
      <h1 className="text-3xl font-light text-gray-800">{title}</h1>

      {/* Analytics Cards Grid */}
      <div className="flex flex-wrap items-stretch gap-4 mt-2">
        {/* Products Card */}
        <div className="flex-1 min-w-[240px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between h-full">
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs font-medium mb-1 tracking-wider">
                PRODUCTS
              </p>
              <p className="text-4xl font-light text-gray-800 mb-2">
                {formatNumber(productCount)}
              </p>
              <div className="flex items-center text-emerald-500 text-xs font-medium">
                <FiTrendingUp className="w-3 h-3 mr-1" />
                12% growth
              </div>
            </div>
            <div className="w-20 flex items-end">
              <div className="flex items-end space-x-1 h-14 w-full">
                {productTrendData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-sm hover:from-gray-400 hover:to-gray-300 transition-all"
                    style={{ height: `${Math.min(100, value)}%` }}
                    title={`Month ${i + 1}: ${value} products`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bundles Card */}
        <div className="flex-1 min-w-[240px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between h-full">
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs font-medium mb-1 tracking-wider">
                BUNDLES
              </p>
              <p className="text-4xl font-light text-gray-800 mb-2">
                {formatNumber(bundleCount)}
              </p>
              <div className="flex items-center text-gray-500 text-xs font-medium">
                <FiTrendingUp className="w-3 h-3 mr-1" />
                5% growth
              </div>
            </div>
            <div className="w-20 flex items-end">
              <div className="flex items-end space-x-1 h-14 w-full">
                {bundleTrendData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-sm hover:from-gray-400 hover:to-gray-300 transition-all"
                    style={{ height: `${Math.min(100, value * 3)}%` }}
                    title={`Month ${i + 1}: ${value} bundles`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sales Card */}
        <div className="flex-1 min-w-[240px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between h-full">
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs font-medium mb-1 tracking-wider">
                TOTAL SALES
              </p>
              <p className="text-4xl font-light text-gray-800 mb-2">
                ${formatNumber(totalSales)}
              </p>
              <div className="flex items-center text-emerald-500 text-xs font-medium">
                <FiTrendingUp className="w-3 h-3 mr-1" />
                18% growth
              </div>
            </div>
            <div className="w-20 flex items-end">
              <div className="flex items-end space-x-1 h-14 w-full">
                {salesTrendData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-sm hover:from-gray-400 hover:to-gray-300 transition-all"
                    style={{ height: `${Math.min(100, value / 200)}%` }}
                    title={`Month ${i + 1}: $${value}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customers Card */}
        <div className="flex-1 min-w-[240px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between h-full">
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs font-medium mb-1 tracking-wider">
                NEW CUSTOMERS
              </p>
              <p className="text-4xl font-light text-gray-800 mb-2">
                {formatNumber(newCustomers)}
              </p>
              <div className="flex items-center text-amber-500 text-xs font-medium">
                <FiTrendingDown className="w-3 h-3 mr-1" />
                2% decrease
              </div>
            </div>
            <div className="w-20 flex items-end">
              <div className="flex items-end space-x-1 h-14 w-full">
                {customerTrendData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-sm hover:from-gray-400 hover:to-gray-300 transition-all"
                    style={{ height: `${Math.min(100, value)}%` }}
                    title={`Month ${i + 1}: ${value} customers`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        {setShowForm && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-40 bg-white cursor-pointer hover:bg-gray-50 border border-gray-100 rounded-2xl p-5 transition-all flex flex-col items-center justify-center group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center mb-2 transition-colors">
              <FiPlus className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-gray-600 font-medium text-sm group-hover:text-gray-800 transition-colors">
              New Product
            </p>
          </button>
        )}

        {setShowBundleForm && (
          <button
            onClick={() => setShowBundleForm(!showBundleForm)}
            className="w-40 bg-white cursor-pointer hover:bg-gray-50 border border-gray-100 rounded-2xl p-5 transition-all flex flex-col items-center justify-center group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center mb-2 transition-colors">
              <FiPlus className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-gray-600 font-medium text-sm group-hover:text-gray-800 transition-colors">
              New Bundle
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
