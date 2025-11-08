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

  const handleManageInventoryClose = () => {
    setIsManageInventoryOpen(!isManageInventoryOpen);
    window.location.reload();
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
      try {
        const inventoryResponse = await apiClient.getAllInventory();
        console.log(inventoryResponse.inventories);

        setAllInventories(inventoryResponse.inventories.reverse());
      } catch (error) {
        console.log(error);
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllInventories();
  }, []);

  const filteredData = () => {
    if (isLowStockItemActive) {
      const filtered = allInventories.filter(
        (product) => product.quantity <= product.product.minQuantity
      );

      console.log(filtered);
      return filtered;
    }
    return allInventories;
  };

  const downloadCSV = () => {
    const escapeCSVField = (field) => {
      if (field === null || field === undefined) return "";
      const stringField = String(field);
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

    const rows = filteredData().map((product) =>
      [
        escapeCSVField(product.product.name),
        escapeCSVField(product.product.category),
        escapeCSVField(product.quantity),
        escapeCSVField(product.product.minQuantity),
      ].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");

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
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100 text-center">
            <Box className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Inventory Loading
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
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
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                {/* Filter Options */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Filter size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="font-medium text-sm sm:text-base">
                      Filter:
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setIsLowStockIemActive(!isLowStockItemActive)
                    }
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
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
                    className="w-full sm:w-auto px-4 sm:px-5 py-1.5 sm:py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm sm:text-base transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span>Export CSV</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden px-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          Stock
                        </th>
                        <th
                          scope="col"
                          className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          Min Qty
                        </th>
                        <th
                          scope="col"
                          className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
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
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 shrink-0">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                              </div>
                              <span className="font-medium text-gray-900 text-xs sm:text-sm md:text-base">
                                {product.product.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-gray-600 text-xs sm:text-sm md:text-base">
                            {product.product.category}
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap">
                            <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                              {product.quantity || 0}
                              <span className="hidden sm:inline"> Units</span>
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-gray-600 text-xs sm:text-sm md:text-base">
                            {product.product.minQuantity}
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-gray-900 font-medium text-xs sm:text-sm md:text-base">
                            ₹{product.product.entry[0]?.price || 0}
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap">
                            {product.quantity <= product.product.minQuantity ? (
                              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-red-100 text-red-700 text-[10px] sm:text-xs font-semibold rounded-full whitespace-nowrap">
                                Low Stock
                              </span>
                            ) : (
                              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-100 text-green-700 text-[10px] sm:text-xs font-semibold rounded-full whitespace-nowrap">
                                In Stock
                              </span>
                            )}
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1 sm:gap-2">
                              <button
                                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                              </button>
                              <button
                                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                              </button>
                              <button
                                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Scroll indicator for mobile */}
            <div className="sm:hidden px-4 py-2 bg-gray-50 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">← Swipe to see more →</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Inventory;
