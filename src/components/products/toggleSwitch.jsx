import React from "react";

const ToggleSwitch = ({ label, isChecked, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={onChange}
          />
          <div
            className={`block w-14 h-8 rounded-full transition-colors duration-300 ${
              isChecked ? "bg-black" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
              isChecked ? "transform translate-x-6" : ""
            }`}
          ></div>
        </div>
        <div className="ml-3 font-medium text-sm">{label}</div>
      </label>
    </div>
  )
};

export default ToggleSwitch;
