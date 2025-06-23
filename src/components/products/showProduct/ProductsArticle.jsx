import React from "react";
import Image from "next/image";
import { satoshiMedium } from "@/libs/fonts";
import config from "../../../libs/config.json";
import { useRouter } from "next/navigation";

const ProductsArticle = ({ products }) => {

  const baseUrl = `${config.BASE_URL}/uploads/products`;
  const router = useRouter();

  const updatedImageUrl = () => {
    const relativeUrl = products?.images?.[0]?.url;

    if (!relativeUrl) return "/placeholder.jpg"; // Fallback image

    // If the URL is already absolute, return it as-is
    if (relativeUrl.startsWith("http")) return relativeUrl;

    // If the URL starts with "/uploads", remove that part
    const cleanPath = relativeUrl.replace("/uploads", "");

    return `${baseUrl}${cleanPath}`;
  };

  const updateForm = () => {
    router.push("/products/update");
  };
  
  return (
    <div
      className={`${satoshiMedium.className} group m-4 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
      onClick={updateForm}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={updatedImageUrl()}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          alt={products?.name || "Product image"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            e.target.src = "/placeholder-product.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="text-gray-800 font-medium line-clamp-1 mb-1">
          {products?.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-emerald-600 font-medium">
            Rs. {products?.discountedPrice}
          </span>
          {products?.originalPrice && (
            <span className="text-gray-400 text-sm line-through">
              Rs. {products?.originalPrice}
            </span>
          )}

        </div>
      </div>
    </div>
  )
};

export default ProductsArticle;
