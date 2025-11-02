import React, { useState } from "react";
import { X, Package, TrendingUp, TrendingDown } from "lucide-react";
import ProductEntry from "./ProductEntry";
import ProductExit from "./ProductExit";

const ManageInventory = ({ onClose, userId, productId, productName }) => {
  const [activeTab, setActiveTab] = useState("entry");

  console.log("user Id ", userId, "product Id", productId);

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl border border-purple-500/20 animate-in zoom-in-95 duration-300">
            <div className="relative p-6 border-b border-purple-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Inventory Management
                    </h2>
                    <p className="text-sm text-slate-400">
                      Track your stock movements
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setActiveTab("entry")}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === "entry"
                      ? "bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                      : "bg-slate-700/50 text-slate-400 hover:bg-slate-700/70"
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  Stock Entry
                </button>
                <button
                  onClick={() => setActiveTab("exit")}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === "exit"
                      ? "bg-linear-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30"
                      : "bg-slate-700/50 text-slate-400 hover:bg-slate-700/70"
                  }`}
                >
                  <TrendingDown className="w-5 h-5" />
                  Stock Exit
                </button>
              </div>
            </div>
            {activeTab === "entry" ? (
              <ProductEntry
                userId={userId}
                productId={productId}
                productName={productName}
              />
            ) : (
              <ProductExit
                userId={userId}
                productId={productId}
                productName={productName}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageInventory;
