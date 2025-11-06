import {
  Eye,
  Edit,
  Trash2,
  Package,
  Loader,
  Box,
  Download,
  Filter,
} from "lucide-react";
import { productsList } from "../data";
import ManageInventory from "../componenets/ManageInventory";
import { useState } from "react";
import { useEffect } from "react";
import { apiClient } from "../utils/apiClient";
import NoProduct from "../componenets/NoProduct";
import { useGlobalContext } from "../context/globalContext";

const Inventory = () => {
  const [allInventories, setAllInventories] = useState([]);

  const [isManageInventoryOpen, setIsManageInventoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState(null);

  const [isLowStockItemActive, setIsLowStockIemActive] = useState(false);

  const [lowStockItems, setLowStockItems] = useState([]);

  const { isSmallDevice } = useGlobalContext();

  const handleManageInventoryClose = () => {
    setIsManageInventoryOpen(!isManageInventoryOpen);
  };

  const handleManageInventoryOpen = (userId, productId, productName) => {
    setUserId(userId);
    setProductId(productId);
    setProductName(productName);
    setIsManageInventoryOpen(!isManageInventoryOpen);
  };

  useEffect(() => {
    const fetchAllInventories = async () => {
      setIsLoading(true);
      const inventoryResponse = await apiClient.getAllInventory();
      console.log(inventoryResponse.inventories);

      setAllInventories(inventoryResponse.inventories);
      setIsLoading(false);
    };

    fetchAllInventories();
  }, []);

  const filteredData = () => {
    if (isLowStockItemActive) {
      const filtered = allInventories.filter(
        (product) => product.quantity <= product.product.minQuantity
      );

      console.log(filtered); // ✅ Logs correct data
      return filtered;
    }
    return allInventories;
  };

  const downloadCSV = () => {
    // Function to escape CSV fields properly
    const escapeCSVField = (field) => {
      if (field === null || field === undefined) return "";
      const stringField = String(field);
      // If field contains comma, newline, or quote, wrap in quotes and escape internal quotes
      if (
        stringField.includes(",") ||
        stringField.includes("\n") ||
        stringField.includes('"')
      ) {
        return `"${stringField.replace(/"/g, '""')}"`;
      }
      return stringField;
    };

    const headers = ["Product", "Category", "Current Stock", "Min Quantity"];

    // Create CSV rows with proper escaping
    const rows = filteredData().map((product) =>
      [
        escapeCSVField(product.product.name),
        escapeCSVField(product.product.category),
        escapeCSVField(product.quantity),
        escapeCSVField(product.product.minQuantity),
      ].join(",")
    );

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Add BOM for proper Excel UTF-8 support
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `inventory_entries_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {isManageInventoryOpen ? (
        <ManageInventory
          onClose={handleManageInventoryClose}
          userId={userId}
          productId={productId}
          productName={productName}
        />
      ) : isLoading ? (
        <>
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
            <Box className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Inventory Loading
            </h3>
            <p className="text-gray-600">
              Loading Inventory data from server, please wait...
            </p>
          </div>
        </>
      ) : !allInventories || allInventories.length === 0 ? (
        <NoProduct />
      ) : (
        <>
          {/* filter */}

          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Filter Options */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Filter size={18} />
                    <span className="font-medium">Filter:</span>
                  </div>

                  <button
                    onClick={() =>
                      setIsLowStockIemActive(!isLowStockItemActive)
                    }
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isLowStockItemActive
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {isLowStockItemActive ? "All" : "Low Stock Items"}
                  </button>
                </div>

                {/* Export Button */}
                {isLowStockItemActive && (
                  <button
                    onClick={downloadCSV}
                    className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Download size={18} />
                    <span className="text-sm"> CSV</span>
                  </button>
                )}
              </div>

              {/* Results Count */}
              <div className="mt-3 text-sm text-gray-600">
                {/* Showing {filteredEntries.length} of {data.length} items */}
              </div>
            </div>
          </div>

          {isSmallDevice ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                {filteredData().map((product) => (
                  <div
                    key={product.id}
                    onClick={() =>
                      handleManageInventoryOpen(
                        1,
                        product.productId,
                        product.product.name
                      )
                    }
                    className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl mb-4"
                  >
                    {/* Header with gradient */}
                    <div className="bg-linear-to-r from-blue-500 to-purple-600 p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>

                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Package className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white text-[10px] font-light opacity-60">
                              Product
                            </h3>
                            <p className="text-white text-[12px] font-bold">
                              {product.product.name}
                            </p>
                          </div>
                        </div>

                        {/* Stock Badge */}
                        <div
                          className={`px-2 py-1 rounded-full grid gap-4 font-semibold transition-all duration-300 ml-5 text-white`}
                        >
                          <Edit
                            className="h-4"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          />
                          <Trash2
                            className="h-4"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-500 font-medium">SKU</span>
                          <span className="text-gray-900 font-semibold">
                            {product.product.skuId}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-500 font-medium">
                            Category
                          </span>
                          <span className="text-gray-900 font-semibold">
                            {product.product.category}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-3">
                          <span className="text-gray-500 font-medium">
                            Min Quantity
                          </span>
                          <span className="text-gray-900 font-semibold">
                            {product.product.minQuantity}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-500 font-medium">
                            Price / Unit
                          </span>
                          <span className="text-gray-900 font-semibold">
                            ₹{product.product.entry[0]?.price || 0}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-500 font-medium">
                            Status
                          </span>
                          <span className="text-gray-900 font-semibold">
                            {product.quantity <= product.product.minQuantity ? (
                              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                                Low Stock
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                In Stock
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Current Stock
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Min Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Price / Unit
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData().map((product) => (
                      <tr
                        key={product.id}
                        onClick={() =>
                          handleManageInventoryOpen(
                            1,
                            product.productId,
                            product.product.name
                          )
                        }
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <Package className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">
                              {product.product.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {product.product.category}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">
                            {product.quantity || 0} Units
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {product.product.minQuantity}
                        </td>
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          ₹{product.product.entry[0]?.price || 0}
                        </td>
                        <td className="px-6 py-4">
                          {product.quantity <= product.product.minQuantity ? (
                            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              In Stock
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Inventory;
