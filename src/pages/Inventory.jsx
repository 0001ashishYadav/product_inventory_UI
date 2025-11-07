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
      const inventoryResponse = await apiClient.getAllInventory();
      console.log(inventoryResponse.inventories);

      setAllInventories(inventoryResponse.inventories.reverse());
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
        </>
      )}
    </>
  );
};

export default Inventory;
