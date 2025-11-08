import { Box, Edit, Package, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

import { apiClient } from "../utils/apiClient";
import Pagination from "../componenets/Pagination";
import FilterAndDownloadCSV from "../componenets/FilterAndDownloadCSV";
import NoProduct from "../componenets/NoProduct";

const Entries = () => {
  const [allEnteries, setAllEnteries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);

  const [totalPages, setTotalPages] = useState();

  const [fData, setFdata] = useState();

  console.log("fData", fData);

  useEffect(() => {
    const fetchAllEnteries = async () => {
      setIsLoading(true);
      try {
        const enteriesResponse = await apiClient.getAllEntries(page, limit);
        console.log(enteriesResponse);
        setAllEnteries(enteriesResponse.data);
        setTotalPages(enteriesResponse.pagination.totalPages);
      } catch (error) {
        console.log(error);
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllEnteries();
  }, [page, limit]);

  return (
    <>
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100 text-center">
          <Box className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Entries Loading
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Loading Entries data from server, please wait...
          </p>
        </div>
      ) : !allEnteries || allEnteries.length === 0 ? (
        <NoProduct />
      ) : (
        <>
          <FilterAndDownloadCSV data={allEnteries} filteredData={setFdata} />

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
                          Added By
                        </th>
                        <th
                          scope="col"
                          className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          Quantity
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
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fData?.map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-50 transition-colors"
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
                            {product.user.name}
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap">
                            <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                              {product.quantity || 0}
                              <span className="hidden sm:inline"> Units</span>
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap text-gray-900 font-medium text-xs sm:text-sm md:text-base">
                            ₹{product?.price || 0}
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 whitespace-nowrap">
                            <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                              {product.date.split("T")[0]}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-right">
                            <span className="text-gray-600 text-xs sm:text-sm md:text-base block max-w-[150px] sm:max-w-[200px] md:max-w-none truncate ml-auto">
                              {product.notes}
                            </span>
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

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
};

export default Entries;
