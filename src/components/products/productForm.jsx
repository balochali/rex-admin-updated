"use client";
import React, { useState } from "react";
import axios from "axios";
import ProductImageUpload from "./productImageUpload";
import SizeSelector from "./sizeSelector";
import VariantSection from "./variantSection";
import { sizeOptions } from "./types";
import config from "../../libs/config.json";
import { toast } from "react-toastify";

const ProductForm = () => {
  /* ---------- MAIN FORM STATE ---------- */
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    featured: false,
    description: "",
    originalPrice: "",
    discountedPrice: "",
    stock: "",
    color: "",
    sizes: [],
    FrontImage: null,
    BackImage: null,
  });

  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* ---------- VARIANT STATE ---------- */
  const [variants, setVariants] = useState([
    { name: "", sizes: [], FrontImage: null, backPreview: "", BackImage: null },
  ]);

  /* ---------- HELPERS (MAIN PRODUCT) ---------- */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleFeatured = () =>
    setFormData((prev) => ({ ...prev, featured: !prev.featured }));

  const toggleSize = (size) =>
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));

  const handleImageChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData((p) => ({ ...p, [type]: file }));
    if (type === "FrontImage") setFrontPreview(url);
    if (type === "BackImage") setBackPreview(url);
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();

    // Main product
    data.append("categoryId", formData.categoryId);
    data.append(
      "slug",
      formData.name.trim().toLowerCase().replace(/\s+/g, "-")
    );
    data.append("name", formData.name);
    data.append("featured", String(formData.featured));
    data.append("description", formData.description);
    data.append("originalPrice", formData.originalPrice);
    data.append("discountedPrice", formData.discountedPrice);
    data.append("stock", formData.stock);
    data.append("color", formData.color);
    data.append("sizes", JSON.stringify(formData.sizes));

    if (formData.FrontImage) data.append("FrontImage", formData.FrontImage);
    if (formData.BackImage) data.append("BackImage", formData.BackImage);

    // Variants - first append the JSON data
    data.append(
      "variants",
      JSON.stringify(
        variants.map((v) => ({
          name: v.name,
          sizes: v.sizes,
        }))
      )
    );

    // Then append each variant's images with correct field names
    variants.forEach((v, i) => {
      if (v.FrontImage) data.append(`variants[${i}][FrontImage]`, v.FrontImage);
      if (v.BackImage) data.append(`variants[${i}][BackImage]`, v.BackImage);
    });

    try {
      await axios.post(`${config.BASE_URL}/api/products`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Product created successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to create product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-2 w-full max-w-3xl mx-auto"
    >
      <div className="space-y-6">
        {/* categoryId */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category ID
          </label>
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            placeholder="e.g. 2"
            className="w-full px-4 text-black py-2 rounded-lg bg-white border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
            disabled={isLoading}
          />
        </div>

        {/* product name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className="w-full px-4 text-black py-2 rounded-lg bg-white border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
            disabled={isLoading}
          />
        </div>

        {/* featured button */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Product
          </label>
          <button
            type="button"
            onClick={toggleFeatured}
            disabled={isLoading}
            className={`w-full px-4 text-black py-3 rounded-lg border transition-all ${
              formData.featured
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {formData.featured ? "⭐ Featured Product" : "Set as Featured"}
          </button>
        </div>

        {/* description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows={4}
            className="w-full px-4 py-2 text-black rounded-lg bg-white border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors resize-none"
            disabled={isLoading}
          />
        </div>

        {/* prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Price
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              placeholder="Original price"
              required
              className="w-full px-4 py-2 text-black rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discounted Price
            </label>
            <input
              type="number"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleChange}
              placeholder="Discounted price"
              required
              className="w-full px-4 py-2 text-black rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* stock & color */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Available quantity"
              required
              className="w-full px-4 py-2 text-black rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g. Black or #000000"
              required
              className="w-full px-4 text-black py-2 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Sizes
          </label>
          <SizeSelector
            selectedSizes={formData.sizes}
            toggleSize={toggleSize}
            options={sizeOptions}
          />
        </div>

        {/* product images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>
          <div className="grid grid-cols-2 gap-4">
            <ProductImageUpload
              preview={frontPreview}
              type="FrontImage"
              onImageChange={handleImageChange}
            />
            <ProductImageUpload
              preview={backPreview}
              type="BackImage"
              onImageChange={handleImageChange}
            />
          </div>
        </div>

        {/* variants */}
        <VariantSection variants={variants} setVariants={setVariants} />

        {/* submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner />
              <span>Creating Product...</span>
            </div>
          ) : (
            "Create Product"
          )}
        </button>
      </div>
    </form>
  );
};

const Spinner = () => {
  return (
    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
  );
};

export default ProductForm;
