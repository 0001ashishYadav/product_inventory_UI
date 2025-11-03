import { Box, Package } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

import { apiClient } from "../utils/apiClient";
import Pagination from "../componenets/Pagination";

const Entries = () => {
  const [allEnteries, setAllEnteries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [limit, setLimit] = useState(7);

  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const fetchAllEnteries = async () => {
      setIsLoading(true);
      try {
        const enteriesResponse = await apiClient.getAllEntries(page, limit);
        console.log(enteriesResponse);
        setAllEnteries(enteriesResponse.data);
        setTotalPages(enteriesResponse.pagination.totalPages);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllEnteries();
  }, [page, limit]);
  return (
    <>
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
          <Box className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Enteries Loading
          </h3>
          <p className="text-gray-600">
            Loading Enteries data from server, please wait...
          </p>
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
                    Added By
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price / Unit
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allEnteries?.map((product) => (
                  <tr
                    key={product.id}
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
                      {product.user.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {product.quantity || 0} Units
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-900 font-medium">
                      ₹{product?.price || 0}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {product.entryDate.split("T")[0]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className=" text-gray-600">{product.notes}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </>
  );
};

export default Entries;
