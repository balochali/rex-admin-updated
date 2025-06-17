import React from "react";
import { FiCamera, FiUpload } from "react-icons/fi";

const ProductImageUpload = ({ preview, type, onImageChange }) => {
  return (
    <div className="w-full">
      <div className="relative group">
        <div
          className={`w-full aspect-square border-2 border-dashed rounded-lg ${
            preview
              ? "border-transparent"
              : "border-gray-300 group-hover:border-gray-400"
          } transition-all duration-200 overflow-hidden bg-gray-50 flex items-center justify-center relative cursor-pointer`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onImageChange(e, type)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {preview ? (
            <>
              <img
                src={preview}
                alt={type}
                className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 p-2 rounded-full">
                   <FiUpload className="w-5 h-5 text-gray-700" />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-gray-400 group-hover:text-gray-600 transition-colors">
              <FiCamera className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">
                Upload {type.split("I")[0]} Image
              </span>
              <span className="text-xs mt-1 text-gray-500">
                JPEG, PNG (max 5MB)
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  )
};

export default ProductImageUpload;
