import React from "react";

const ProductHeader = ({
  productCount,
  showForm,
  setShowForm,
  showBundleForm,
  setShowBundleForm,
}) => {
  // Mock data for charts
  const productTrendData = [30, 40, 60, 70, 90, productCount];
  const bundleTrendData = [10, 15, 20, 25, 30, 0];
  
  return (
    <div className="flex items-stretch gap-5 mb-8 font-sans">
      {/* Products Analytics Card */}
      <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between h-full">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs font-medium mb-1 tracking-wider">
              PRODUCTS
            </p>
            <p className="text-4xl font-light text-gray-800 mb-2">
              {productCount}
            </p>
            <div className="flex items-center text-emerald-500 text-xs font-medium">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                   fillRule="evenodd"
                   d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z"
                   clipRule="evenodd"
                 />
              </svg>
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

      {/* Add Product Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-40 bg-white cursor-pointer hover:bg-gray-50 border border-gray-100 rounded-2xl p-5 transition-all flex flex-col items-center justify-center group"
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center mb-2 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <p className="text-gray-600 font-medium text-sm group-hover:text-gray-800 transition-colors">
          New Product
        </p>
      </button>

      {/* Bundle Analytics Card */}
      <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between h-full">
          <div className="flex flex-col">
            <p className="text-gray-400 text-xs font-medium mb-1 tracking-wider">
              BUNDLES
            </p>
            <p className="text-4xl font-light text-gray-800 mb-2">
              {0}
            </p>
            <div className="flex items-center text-gray-500 text-xs font-medium">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                   fillRule="evenodd"
                   d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                   clipRule="evenodd"
                 />
              </svg>
              No change
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

      {/* Add Bundle Button */}
      <button
        onClick={() => setShowBundleForm(!showBundleForm)}
        className="w-40 bg-white cursor-pointer hover:bg-gray-50 border border-gray-100 rounded-2xl p-5 transition-all flex flex-col items-center justify-center group"
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center mb-2 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <p className="text-gray-600 font-medium text-sm group-hover:text-gray-800 transition-colors">
          New Bundle
        </p>
      </button>
    </div>
  )
};

export default ProductHeader;
