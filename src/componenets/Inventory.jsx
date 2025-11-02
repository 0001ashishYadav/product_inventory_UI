import { Eye, Edit, Trash2, Package, Loader, Box } from "lucide-react";
import { productsList } from "../data";
import ManageInventory from "./ManageInventory";
import { useState } from "react";
import { useEffect } from "react";
import { apiClient } from "../utils/apiClient";

const Inventory = () => {
  const products = productsList;

  const [allInventories, setAllInventories] = useState([]);

  const [isManageInventoryOpen, setIsManageInventoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState(null);

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
                {allInventories.map((product) => (
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
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
  );
};

export default Inventory;
