import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsArticle from "./ProductsArticle";
import BundleArticle from "./BundleArticle"; // New component for bundles
import config from "../../../libs/config.json";
import axios from "axios";
import { FiBox, FiPackage } from "react-icons/fi";

const ProductSlider = ({ setProductCount, setBundleCount }) => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [activeTab, setActiveTab] = useState("products"); // 'products' or 'bundles'

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await axios.get(`${config.BASE_URL}/api/products`);
        setProducts(productsRes.data.data);

        // Fetch bundles
        const bundlesRes = await axios.get(`${config.BASE_URL}/api/bundles`);
        setBundles(bundlesRes.data.data);

        setProductCount(productsRes.data.data.length);
        setBundleCount(bundlesRes.data.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-4">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-3 border-b border-gray-200">
          <button
            className={`flex items-center px-4 py-2 text-sm cursor-pointer font-medium ${
              activeTab === "products"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("products")}
          >
            <FiPackage className="mr-2" />
            Products ({products.length})
          </button>
          <button
            className={`flex items-center px-4 py-2 text-sm cursor-pointer font-medium ${
              activeTab === "bundles"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("bundles")}
          >
            <FiBox className="mr-2" />
            Bundles ({bundles.length})
          </button>
        </div>
        {/* Slider Content */}
        <div className="relative">
          {activeTab === "products" ? (
            <Slider {...settings}>
              {products.map((item, index) => (
                <div key={`product-${index}`} className="px-1">
                  <ProductsArticle products={item} />
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {bundles.map((item, index) => (
                <div key={`bundle-${index}`} className="px-2">
                  <BundleArticle bundle={item} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
