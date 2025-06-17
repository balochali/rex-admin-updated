import React from "react";

const SizeSelector = ({ selectedSizes, toggleSize, options }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {options.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => toggleSize(size)}
          className={`
            w-full px-3 py-2 rounded-lg border-2 transition-all
            text-sm font-medium uppercase tracking-wide
            hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300
            ${
              selectedSizes.includes(size)
                ? "bg-gray-900 text-white border-gray-900 hover:border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }
          `}
        >
          {size}
        </button>
      ))}
    </div>
  )
};

export default SizeSelector;
