import React from "react";
import { FiTrendingUp, FiTrendingDown, FiPlus } from "react-icons/fi";
import { useProducts } from "@/context/ProductContext";

const DashboardHeader = ({ title }) => {
  // Format numbers for display
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const { products, orders, bundles } = useProducts();

  // Handle null/undefined products and orders
  const safeProducts = products || [];
  const safeOrders = orders || [];

  // Calculate product metrics
  const productCount = safeProducts.length + bundles.length;
  const totalStock = safeProducts.reduce(
    (sum, product) => sum + (product.stock || 0),
    0
  );
  const totalSalesValue = safeProducts.reduce((sum, product) => {
    const price = parseFloat(
      product.discountedPrice || product.originalPrice || 0
    );
    return sum + price * (product.sold || 0);
  }, 0);

  const variantCount = safeProducts.reduce((sum, product) => {
    return sum + (product.variants?.length || 0);
  }, 0);

  // Calculate order metrics
  const totalOrders = safeOrders.length;
  const totalRevenue = safeOrders.reduce((sum, order) => {
    return sum + parseFloat(order.finalAmount || 0);
  }, 0);

  const pendingOrders = safeOrders.filter(
    (order) =>
      order.orderStatus === "ORDER_PLACED"
  ).length;

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Generate trend data for orders
  const generateOrderTrendData = () => {
    if (totalOrders === 0) return [0, 0, 0, 0, 0, 0];
    const baseOrders = Math.max(1, Math.floor(totalOrders / 3));
    return [
      baseOrders,
      baseOrders + Math.floor(totalOrders / 5),
      baseOrders + Math.floor(totalOrders / 4),
      baseOrders + Math.floor(totalOrders / 3),
      totalOrders - Math.floor(totalOrders / 6),
      totalOrders,
    ];
  };

  const generateRevenueTrendData = () => {
    if (totalRevenue === 0) return [0, 0, 0, 0, 0, 0];
    const baseRevenue = Math.max(1, Math.floor(totalRevenue / 3));
    return [
      baseRevenue,
      baseRevenue + Math.floor(totalRevenue / 5),
      baseRevenue + Math.floor(totalRevenue / 4),
      baseRevenue + Math.floor(totalRevenue / 3),
      totalRevenue - Math.floor(totalRevenue / 6),
      totalRevenue,
    ];
  };

  // Generate existing trend data
  const generateProductTrendData = () => {
    if (productCount === 0) return [0, 0, 0, 0, 0, 0];
    const baseCount = Math.max(1, Math.floor(productCount / 2));
    return [
      baseCount,
      baseCount + Math.floor(productCount / 4),
      baseCount + Math.floor(productCount / 3),
      baseCount + Math.floor(productCount / 2),
      productCount - 1,
      productCount,
    ];
  };

  const generateStockTrendData = () => {
    if (totalStock === 0) return [0, 0, 0, 0, 0, 0];
    const baseStock = Math.max(1, Math.floor(totalStock / 3));
    return [
      baseStock,
      baseStock + Math.floor(totalStock / 4),
      baseStock + Math.floor(totalStock / 3),
      baseStock + Math.floor(totalStock / 2),
      totalStock - Math.floor(totalStock / 5),
      totalStock,
    ];
  };

  const productTrendData = generateProductTrendData();
  const stockTrendData = generateStockTrendData();
  const orderTrendData = generateOrderTrendData();
  const revenueTrendData = generateRevenueTrendData();

  return (
    <div style={{ fontFamily: "satoshiMedium" }}>
      {/* Main Title */}
      <h1 className="text-3xl font-light text-gray-800">{title}</h1>

      {/* Analytics Cards Grid */}
      <div className="flex flex-wrap items-stretch gap-4 mt-2">
        {/* Total Orders Card */}
        <div className="flex-1 min-w-[240px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between h-full">
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs font-medium mb-1 tracking-wider">
                TOTAL ORDERS
              </p>
              <p className="text-4xl font-light text-gray-800 mb-2">
                {formatNumber(totalOrders)}
              </p>
              <div className="flex items-center text-blue-500 text-xs font-medium">
                <FiTrendingUp className="w-3 h-3 mr-1" />
                {pendingOrders} pending
              </div>
            </div>
            <div className="w-20 flex items-end">
              <div className="flex items-end space-x-1 h-14 w-full">
                {orderTrendData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-sm hover:from-gray-400 hover:to-gray-300 transition-all"
                    style={{
                      height: `${
                        totalOrders > 0
                          ? Math.min(100, (value / totalOrders) * 100)
                          : 0
                      }%`,
                      backgroundColor:
                        i === orderTrendData.length - 1 ? "#3B82F6" : "#E5E7EB",
                    }}
                    title={`${
                      i < orderTrendData.length - 1 ? "Previous" : "Current"
                    }: ${value} orders`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="flex-1 min-w-[240px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between h-full">
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs font-medium mb-1 tracking-wider">
                TOTAL REVENUE
              </p>
              <div className="flex items-center">
                <p className="text-xl font-light text-gray-800 items-center">
                  PKR{" "}
                </p>
                <p className="text-3xl font-light text-gray-800 mb-2 ml-2">
                  {formatNumber(Math.round(totalRevenue))}
                </p>
              </div>
              <div className="flex items-center text-emerald-500 text-xs font-medium">
                <FiTrendingUp className="w-3 h-3 mr-1" />
                PKR {formatNumber(Math.round(averageOrderValue))} avg order
              </div>
            </div>
            <div className="w-20 flex items-end">
              <div className="flex items-end space-x-1 h-14 w-full">
                {revenueTrendData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-sm hover:from-gray-400 hover:to-gray-300 transition-all"
                    style={{
                      height: `${
                        totalRevenue > 0
                          ? Math.min(100, (value / totalRevenue) * 100)
                          : 0
                      }%`,
                      backgroundColor:
                        i === revenueTrendData.length - 1
                          ? "#10B981"
                          : "#E5E7EB",
                    }}
                    title={`${
                      i < revenueTrendData.length - 1 ? "Previous" : "Current"
                    }: PKR ${Math.round(value)}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="flex-1 min-w-[240px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between h-full">
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs font-medium mb-1 tracking-wider">
                TOTAL PRODUCTS
              </p>
              <p className="text-4xl font-light text-gray-800 mb-2">
                {formatNumber(productCount)}
              </p>
              <div className="flex items-center text-purple-500 text-xs font-medium">
                <FiTrendingUp className="w-3 h-3 mr-1" />
                {formatNumber(variantCount)} variants
              </div>
            </div>
            <div className="w-20 flex items-end">
              <div className="flex items-end space-x-1 h-14 w-full">
                {productTrendData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-sm hover:from-gray-400 hover:to-gray-300 transition-all"
                    style={{
                      height: `${
                        productCount > 0
                          ? Math.min(100, (value / productCount) * 100)
                          : 0
                      }%`,
                      backgroundColor:
                        i === productTrendData.length - 1
                          ? "#8B5CF6"
                          : "#E5E7EB",
                    }}
                    title={`${
                      i < productTrendData.length - 1 ? "Previous" : "Current"
                    }: ${value} products`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stock Card */}
        <div className="flex-1 min-w-[240px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between h-full">
            <div className="flex flex-col">
              <p className="text-gray-400 text-xs font-medium mb-1 tracking-wider">
                TOTAL STOCK
              </p>
              <p className="text-4xl font-light text-gray-800 mb-2">
                {formatNumber(totalStock)}
              </p>
              <div className="flex items-center text-orange-500 text-xs font-medium">
                <FiTrendingUp className="w-3 h-3 mr-1" />
                {productCount > 0
                  ? Math.round(totalStock / productCount)
                  : 0}{" "}
                avg per product
              </div>
            </div>
            <div className="w-20 flex items-end">
              <div className="flex items-end space-x-1 h-14 w-full">
                {stockTrendData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-sm hover:from-gray-400 hover:to-gray-300 transition-all"
                    style={{
                      height: `${
                        totalStock > 0
                          ? Math.min(100, (value / totalStock) * 100)
                          : 0
                      }%`,
                      backgroundColor:
                        i === stockTrendData.length - 1 ? "#F97316" : "#E5E7EB",
                    }}
                    title={`${
                      i < stockTrendData.length - 1 ? "Previous" : "Current"
                    }: ${value} stock`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
