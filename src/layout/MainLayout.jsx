import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import {
  Package,
  Users,
  Box,
  Activity,
  Inbox,
  MinusSquare,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useGlobalContext } from "../context/globalContext";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isSmallDevice } = useGlobalContext();

  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  const pageTitle =
    pathName.charAt(0).toUpperCase() + pathName.slice(1) || "Dashboard";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
        {/* Mobile Overlay */}
        {isSmallDevice && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        {(isSidebarOpen || !isSmallDevice) && (
          <div
            className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ${
              isSmallDevice
                ? `z-30 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }`
                : `z-10 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }`
            }`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    InvenTrack
                  </h1>
                  <p className="text-xs text-gray-500">Management System</p>
                </div>

                <button
                  className="p-2 rounded-xl hover:bg-gray-300/70 transition-all duration-360"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  {isSmallDevice ? <X /> : <ChevronLeft />}
                </button>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: Activity },
                  { id: "products", label: "Products", icon: Package },
                  { id: "inventory", label: "Inventory", icon: Box },
                  { id: "users", label: "Users", icon: Users },
                  { id: "entries", label: "Entries", icon: Inbox },
                  { id: "exits", label: "Exits", icon: MinusSquare },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.id}
                      to={`/${item.id}`}
                      onClick={() => isSmallDevice && setIsSidebarOpen(false)}
                      className={({ isActive }) =>
                        `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-gray-600 hover:bg-gray-50"
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          className={`transition-all duration-380 ${
            !isSmallDevice && isSidebarOpen ? "ml-64" : "ml-0"
          } p-4 sm:p-6 md:p-8`}
        >
          <div className="max-w-7xl sm:w-full mx-auto">
            <div className="mb-6 md:mb-8 flex gap-3 md:gap-4">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                  {pageTitle}
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Manage your inventory efficiently
                </p>
              </div>

              {!isSidebarOpen && (
                <button
                  className="p-2 h-fit rounded-xl bg-gray-300/70 transition-all duration-360"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  {isSmallDevice ? <Menu /> : <ChevronRight />}
                </button>
              )}
            </div>

            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
