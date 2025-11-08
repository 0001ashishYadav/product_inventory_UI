import {
  Search,
  Filter,
  Plus,
  Package,
  Eye,
  Edit,
  Trash2,
  Loader,
  Box,
} from "lucide-react";
import { useState } from "react";
import NoProduct from "../componenets/NoProduct";
import { useEffect } from "react";
import { apiClient } from "../utils/apiClient";
import { Link } from "react-router";
import { useGlobalContext } from "../context/globalContext";

const ProductsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isSmallDevice } = useGlobalContext();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.getProducts();
        setProducts(response.products);
      } catch (error) {
        console.error("Frontend caught error:", error);
        alert(`Error ${error.status}: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
          <Box className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Product Loading
          </h3>
          <p className="text-gray-600">
            Loading Product data from server, please wait...
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-20 sm:min-w-0">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <Link to="/addProduct" className="flex-1 sm:flex-none">
                <button className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </Link>
            </div>
          </div>

          {!products || products.length === 0 ? (
            <NoProduct />
          ) : (
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
                            SKU id
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
                            Min Qty
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
                        {products?.map((product) => (
                          <tr
                            key={product.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                </div>
                                <span className="font-medium text-gray-900 text-xs sm:text-sm md:text-base">
                                  {product.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-gray-600 text-xs sm:text-sm md:text-base">
                              {product.skuId}
                            </td>
                            <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap">
                              <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                                {product?.category}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-gray-600 text-xs sm:text-sm md:text-base">
                              {product.minQuantity}
                            </td>
                            <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-1 sm:gap-2">
                                <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                                </button>
                                <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                                </button>
                                <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
          )}
        </div>
      )}
    </>
  );
};

export default ProductsView;
