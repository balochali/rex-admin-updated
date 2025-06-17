import React from "react";
import { FiPlus } from "react-icons/fi";
import { satoshiMedium } from "@/libs/fonts";
import VariantBlock from "./variantBlock";

const VariantSection = ({ variants, setVariants }) => {
  const addVariant = () =>
    setVariants((prev) => [
      ...prev,
      {
        name: "",
        sizes: [],
        stock: "",
        FrontImage: null,
        frontPreview: "",
        BackImage: null,
        backPreview: "",
      },
    ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3
          className={`${satoshiMedium.className} text-base font-medium text-gray-900`}
        >
          Product Variants
        </h3>
        <span className="text-xs text-gray-500">
          {variants.length} {variants.length === 1 ? "variant" : "variants"}
        </span>
      </div>

      <div className="space-y-4">
        {variants.map((variant, index) => (
          <VariantBlock
            key={index}
            variant={variant}
            index={index}
            setVariants={setVariants}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addVariant}
        className={`
          ${satoshiMedium.className} w-full py-2.5 px-4 rounded-lg border border-gray-300
          text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-400
          bg-white hover:bg-gray-50 transition-all duration-200
          flex items-center justify-center gap-2
        `}
      >
        <FiPlus className="w-4 h-4" />
        <span>Add Variant</span>
      </button>
    </div>
  )
};

export default VariantSection;
