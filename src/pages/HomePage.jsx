import React, { useState } from "react";
import {
  Package,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Users,
  Box,
  Activity,
} from "lucide-react";
import Dashboard from "../componenets/Dashboard";
import ProductsView from "../componenets/ProductsView";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("products");

  // Mock data

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-10">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">InvenTrack</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: Activity },
                { id: "products", label: "Products", icon: Package },
                { id: "inventory", label: "Inventory", icon: Box },
                { id: "users", label: "Users", icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="text-gray-600">Manage your inventory efficiently</p>
            </div>

            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "products" && <ProductsView />}
            {activeTab === "inventory" && (
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
                <Box className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Inventory View
                </h3>
                <p className="text-gray-600">
                  Inventory management features coming soon
                </p>
              </div>
            )}
            {activeTab === "users" && (
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  User Management
                </h3>
                <p className="text-gray-600">
                  User management features coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
