import {
  Box,
  Calendar,
  Download,
  Edit,
  Filter,
  Package,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo } from "react";
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

  const [filterType, setFilterType] = useState("all"); // all, week, month, date-range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter entries based on selected filter
  const filteredEntries = useMemo(() => {
    const today = new Date();

    switch (filterType) {
      case "week": {
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return allEnteries.filter((entry) => new Date(entry.date) >= weekAgo);
      }
      case "month": {
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return allEnteries.filter((entry) => new Date(entry.date) >= monthAgo);
      }
      case "date-range": {
        if (!startDate && !endDate) return allEnteries;

        return allEnteries.filter((entry) => {
          const entryDate = new Date(entry.date);
          const start = startDate
            ? new Date(startDate)
            : new Date("1900-01-01");
          const end = endDate ? new Date(endDate) : new Date("2100-12-31");

          return entryDate >= start && entryDate <= end;
        });
      }
      default:
        return allEnteries;
    }
  }, [allEnteries, filterType, startDate, endDate]);

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

    const headers = [
      "Product",
      "Added By",
      "Quantity",
      "Price/Unit",
      "Date",
      "Note",
    ];

    // Create CSV rows with proper escaping
    const rows = allEnteries.map((entry) =>
      [
        escapeCSVField(entry.product.name),
        escapeCSVField(entry.user.name),
        escapeCSVField(entry.quantity),
        escapeCSVField(entry.price),
        escapeCSVField(entry.date),
        escapeCSVField(entry.notes),
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
                    onClick={() => setFilterType("all")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterType === "all"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>

                  <button
                    onClick={() => setFilterType("week")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterType === "week"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Last Week
                  </button>

                  <button
                    onClick={() => setFilterType("month")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterType === "month"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Last Month
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFilterType("date-range")}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                        filterType === "date-range"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Calendar size={16} />
                      Date Range
                    </button>
                    {filterType === "date-range" && (
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-600 mb-1">
                            From
                          </label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-600 mb-1">
                            To
                          </label>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        {(startDate || endDate) && (
                          <button
                            onClick={() => {
                              setStartDate("");
                              setEndDate("");
                            }}
                            className="mt-5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Export Button */}
                <button
                  onClick={downloadCSV}
                  className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Download size={18} />
                  <span className="text-sm"> CSV</span>
                </button>
              </div>

              {/* Results Count */}
              <div className="mt-3 text-sm text-gray-600">
                Showing {filteredEntries.length} of {filteredEntries.length}{" "}
                items
              </div>
            </div>
          </div>

          {/* main content */}
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
                      {filteredEntries?.map((product) => (
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
