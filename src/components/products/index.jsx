// src/components/Products/index.jsx
"use client";
import React, { useState } from "react";
import ProductForm from "./productForm";
import ProductSlider from "./showProduct/ProductSlider";
import ProductHeader from "./showProduct/ProductHeader";
import { Modal } from "./Modal";
import BundleForm from "./bundleForm";

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [showBundleForm, setShowBundleForm] = useState(false);

  return (
    <div className="w-full p-6 text-white">
      {/* toggle form */}
      <ProductToggleButton
        showForm={showForm}
        setShowForm={setShowForm}
        showBundleForm={showBundleForm}
        setShowBundleForm={setShowBundleForm}
      />

      {showForm && (
        <Modal
          onClose={() => setShowForm(false)}
          title="Add New Product"
          size="lg"
          isOpen={showForm}
        >
          <ProductForm />
        </Modal>
      )}

      {showBundleForm && (
        <Modal
          onClose={() => setShowBundleForm(false)}
          title="Add New Bundle"
          size="lg"
          isOpen={showBundleForm}
        >
          <BundleForm />
        </Modal>
      )}

    </div>
  );
};

const ProductToggleButton = ({
  showForm,
  setShowForm,
  showBundleForm,
  setShowBundleForm,
}) => {
  const [productCount, setProductCount] = useState(0);
  const [bundleCount, setBundleCount] = useState(0);

  return (
    <>
      <ProductHeader
        productCount={productCount}
        bundleCount={bundleCount}
        showForm={showForm}
        setShowForm={setShowForm}
        showBundleForm={showBundleForm}
        setShowBundleForm={setShowBundleForm}
      />
      <ProductSlider setProductCount={setProductCount} setBundleCount={setBundleCount} />
    </>
  );
};

export default Products;
