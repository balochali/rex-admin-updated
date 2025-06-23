import React from "react";
import Image from "next/image";
import { satoshiMedium } from "@/libs/fonts";
import config from "../../../libs/config.json";
import { useRouter } from "next/navigation";
import { FiBox, FiPlus } from "react-icons/fi";

const BundleArticle = ({ bundle }) => {
  const baseUrl = `${config.BASE_URL}/uploads/bundles`;
  const router = useRouter();

  const updatedImageUrl = () => {
    const relativeUrl = bundle?.images?.[0]?.url;

    if (!relativeUrl) return "/placeholder-bundle.jpg"; // Different fallback for bundles

    // If the URL is already absolute, return it as-is
    if (relativeUrl.startsWith("http")) return relativeUrl;

    // If the URL starts with "/uploads", remove that part
    const cleanPath = relativeUrl.replace("/uploads", "");

    return `${baseUrl}${cleanPath}`;
  };

  const updateForm = () => {
    router.push("/bundles/update");
  };

  console.log("Update URL", updatedImageUrl())

  return (
    <div
      className={`${satoshiMedium.className} group m-4 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer relative`}
      onClick={updateForm}
    >
      {/* Bundle badge */}
      <div className="absolute top-3 left-3 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium z-10 flex items-center">
        <FiBox className="mr-1" />
        Bundle
      </div>

      <div className="relative aspect-square overflow-hidden">
        <Image
          src={updatedImageUrl()}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          alt={bundle?.name || "Bundle image"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            e.target.src = "/placeholder-bundle.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="text-gray-800 font-medium line-clamp-1 mb-1">
          {bundle?.name}
        </h3>

        {/* Bundle products preview */}
        {bundle?.products?.length > 0 && (
          <div className="flex -space-x-2 mb-2">
            {bundle.products.slice(0, 4).map((product, index) => (
              <div
                key={index}
                className="relative w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden"
              >
                {product.images?.[0]?.url ? (
                  <Image
                    src={`${
                      config.BASE_URL
                    }/uploads/products${product.images[0].url.replace(
                      "/uploads",
                      ""
                    )}`}
                    fill
                    className="object-cover"
                    alt=""
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FiPlus size={10} />
                  </div>
                )}
              </div>
            ))}
            {bundle.products.length > 4 && (
              <div className="relative w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                +{bundle.products.length - 4}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-emerald-600 font-medium">
            Rs. {bundle?.discountedPrice || bundle?.price}
          </span>
          {bundle?.originalPrice && (
            <span className="text-gray-400 text-sm line-through">
              Rs. {bundle?.originalPrice}
            </span>
          )}
        </div>

        {/* Savings badge if applicable */}
        {bundle?.originalPrice && (
          <div className="mt-2 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full inline-block">
            Save Rs.{" "}
            {bundle.originalPrice - (bundle.discountedPrice || bundle.price)}
          </div>
        )}
      </div>
    </div>
  );
};

export default BundleArticle;
