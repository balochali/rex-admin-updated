import React from "react";
import Image from "next/image";
import { FiTrash2, FiImage } from "react-icons/fi";
import SizeSelector from "./sizeSelector";

const VariantBlock = ({ variant, index, setVariants }) => {
  const sizeOptions = ["Small", "Medium", "Large", "XL"];
  const updateVariant = (updater) =>
    setVariants((prev) => {
      const next = [...prev];
      next[index] = updater({ ...prev[index] });
      return next;
    });

  const handleVariantChange = (field, e) =>
    updateVariant((v) =>
      field === "name"
        ? { ...v, name: e.target.value }
        : {
            ...v,
            [field]: e.target.files?.[0] || null,
            [field === "FrontImage" ? "frontPreview" : "backPreview"]: e.target
              .files?.[0]
              ? URL.createObjectURL(e.target.files[0])
              : "",
          }
    );

  const toggleVariantSize = (size) =>
    updateVariant((v) => ({
      ...v,
      sizes: v.sizes.includes(size)
        ? v.sizes.filter((s) => s !== size)
        : [...v.sizes, size],
    }));

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs relative group transition-all hover:shadow-sm">
      {/* Variant Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Variant Name
        </label>
        <input
          type="text"
          placeholder="e.g. Red Cotton, Blue Denim"
          value={variant.name}
          onChange={(e) => handleVariantChange("name", e)}
          className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors text-sm"
        />
      </div>

      {/* Sizes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Sizes
        </label>
        <SizeSelector
          selectedSizes={variant.sizes}
          toggleSize={toggleVariantSize}
          options={sizeOptions}
        />
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 gap-4 mb-2">
        {["FrontImage", "BackImage"].map((type) => {
          const preview =
            type === "FrontImage" ? variant.frontPreview : variant.backPreview;
          const label = type.replace("Image", " View");

          return (
            <div key={type} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-gray-400 transition-colors relative overflow-hidden flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleVariantChange(type, e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {preview ? (
                  <>
                    <Image
                      src={preview}
                      alt={`${label} preview`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 p-2 rounded-full">
                        <FiImage className="w-4 h-4 text-gray-700" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <FiImage className="w-6 h-6 mb-2" />
                    <span className="text-xs text-center">
                      Click to upload {label.toLowerCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Button */}
      <button
        type="button"
        onClick={() =>
          setVariants((prev) => prev.filter((_, i) => i !== index))
        }
        className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        title="Delete variant"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default VariantBlock;
