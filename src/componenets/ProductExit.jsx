import React from "react";
import { apiClient } from "../utils/apiClient";
import { useState } from "react";

import { Minus } from "lucide-react";

const ProductExit = ({ userId, productId, productName }) => {
  const [formData, setFormData] = useState({
    productName: productName,
    removedBy: userId,
    productId: productId,
    quantity: "",
    price: "",
    reason: "",
  });

  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      type: "exit",
    };

    try {
      await apiClient.productExit(payload);

      setFormData({
        productName: "",
        quantity: "",
        price: "",
        reason: "",
      });

      //   onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const totalValue = (formData.quantity || 0) * (formData.price || 0);
  return (
    <div className="p-6 space-y-5 max-h-[calc(100vh-280px)] overflow-y-auto">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          Product Name
          <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="productName"
          readOnly={true}
          value={productName}
          onChange={handleInputChange}
          placeholder="Enter item name"
          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Quantity
            <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              min="0"
              step="1"
              placeholder="0"
              className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />

            <Minus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Price per Unit
            <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
              ₹
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleInputChange}
          rows="3"
          placeholder="Additional information..."
          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
        />
      </div>

      {totalValue > 0 && (
        <div className="bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-medium">Total Value:</span>
            <span className="text-2xl font-bold text-white">
              ₹{totalValue.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="flex-1 px-6 py-3 rounded-xl bg-slate-700/50 text-slate-300 font-medium hover:bg-slate-700 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 shadow-lg bg-linear-to-r from-red-600 to-rose-600 hover:shadow-red-500/50 hover:scale-[1.02]"
        >
          Remove from Inventory
        </button>
      </div>
    </div>
  );
};

export default ProductExit;
