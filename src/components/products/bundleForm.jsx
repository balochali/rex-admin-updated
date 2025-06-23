import React, { useState } from "react";
import { FiUpload, FiPlus, FiTrash2, FiLoader } from "react-icons/fi";
import { satoshiMedium } from "@/libs/fonts";
import SizeSelector from "./sizeSelector";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import config from "@/libs/config.json";

const BundleForm = () => {
  const router = useRouter();
  const [variants, setVariants] = useState([{ color: "", sizes: [] }]);
  const [images, setImages] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const addVariant = () => {
    setVariants([...variants, { color: "", sizes: [] }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index)); 
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    // Append variants as JSON
    formData.append("variants", JSON.stringify(variants));

    // Append each image file
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/bundles/create`,
        formData
      );

      toast.success("Bundle created successfully!");
      router.push("/bundles");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to create bundle. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${satoshiMedium?.className} bg-white p-2 w-full max-w-3xl mx-auto space-y-6`}
    >
      {/* Bundle Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Bundle Name*
        </label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Summer Essentials Pack"
          required
          className="w-full px-4 py-2.5 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all hover:border-gray-300"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Describe this bundle..."
          rows={3}
          className="w-full text-gray-900 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all resize-none hover:border-gray-300"
        />
      </div>

      {/* Bundle Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pack */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Items in Pack*
          </label>
          <input
            type="number"
            name="pack"
            placeholder="e.g. 3"
            required
            min="1"
            className="w-full text-gray-900 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all hover:border-gray-300"
          />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Available Stock*
          </label>
          <input
            type="number"
            name="stock"
            placeholder="e.g. 50"
            required
            min="0"
            className="w-full text-gray-900 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all hover:border-gray-300"
          />
        </div>

        {/* Design */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Design
          </label>
          <input
            type="text"
            name="design"
            placeholder="Printed, Plain, etc."
            className="w-full text-gray-900 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all hover:border-gray-300"
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Original Price */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Original Price*
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              Rs.
            </span>
            <input
              type="number"
              name="originalPrice"
              placeholder="1000"
              required
              min="0"
              step="0.01"
              className="w-full text-gray-900 pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all hover:border-gray-300"
            />
          </div>
        </div>

        {/* Discounted Price */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Discounted Price*
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              Rs.
            </span>
            <input
              type="number"
              name="discountedPrice"
              placeholder="800"
              required
              min="0"
              step="0.01"
              className="w-full text-gray-900 pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all hover:border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Variants Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium text-gray-900">
            Color Variants
          </h3>
          <button
            type="button"
            onClick={addVariant}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <FiPlus className="w-4 h-4" />
            Add Variant
          </button>
        </div>

        {variants.map((variant, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group"
          >
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove variant"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color*
              </label>
              <input
                type="text"
                value={variant.color}
                onChange={(e) => updateVariant(index, "color", e.target.value)}
                placeholder="e.g. Black, White, Red"
                className="w-full text-gray-900 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all hover:border-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Sizes
              </label>
              <SizeSelector
                selectedSizes={variant.sizes}
                toggleSize={(size) => {
                   const newSizes = variant.sizes.includes(size)
                    ? variant.sizes.filter((s) => s !== size)
                    : [...variant.sizes, size];
                   updateVariant(index, "sizes", newSizes);
                 }}
                options={["Small", "Medium", "Large", "XL"]}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bundle Images */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Bundle Images
        </label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
          <label className="flex flex-col items-center justify-center cursor-pointer">
            <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPEG, PNG (max 5MB each, up to 10 images)
            </p>
            <input
              type="file"
              name="bundleImages"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {images.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              {images.length} {images.length === 1 ? "file" : "files"} selected
            </div>
          )}

        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <FiPlus className="w-4 h-4" />
              Create Bundle
            </>
          )}

        </button>
      </div>
    </form>
  );
};

export default BundleForm;
