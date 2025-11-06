import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import {
  Package,
  Users,
  Box,
  Activity,
  Inbox,
  MinusSquare,
  MenuIcon,
  Cross,
  X,
} from "lucide-react";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPhoneNavbarOpen, setIsPhoneNavbarOpen] = useState(false);

  const location = useLocation();
  const pathName = location.pathname.split("/")[1]; // e.g., '/products' → 'products'
  const pageTitle =
    pathName.charAt(0).toUpperCase() + pathName.slice(1) || "Dashboard";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Run on initial render
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 relative">
        {/* Sidebar */}

        {isSidebarOpen && (
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-10">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    InvenTrack
                  </h1>
                  <p className="text-xs text-gray-500">Management System</p>
                </div>
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

        {/* phone nav bar */}

        {!isSidebarOpen && (
          <>
            <div className="w-full bg-white shadow-md relative z-20">
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      InvenTrack
                    </h1>
                    <p className="text-xs text-gray-500">Management System</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsPhoneNavbarOpen(!isPhoneNavbarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isPhoneNavbarOpen ? (
                    <X className="w-6 h-6 text-gray-700" />
                  ) : (
                    <MenuIcon className="w-6 h-6 text-gray-700" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
              className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
                isPhoneNavbarOpen
                  ? "opacity-50 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setIsPhoneNavbarOpen(false)}
            />

            {/* Mobile Menu */}
            <div
              className={`fixed top-0 left-0 right-0 bg-white shadow-xl z-50 transform transition-transform duration-500 ease-out ${
                isPhoneNavbarOpen ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">
                        InvenTrack
                      </h1>
                      <p className="text-xs text-gray-500">Management System</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPhoneNavbarOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {isPhoneNavbarOpen ? (
                      <X className="w-6 h-6 text-gray-700" />
                    ) : (
                      <MenuIcon className="w-6 h-6 text-gray-700" />
                    )}
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
                        onClick={() => setIsPhoneNavbarOpen(false)}
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
          </>
        )}

        {/* Main Content */}
        <div
          className={
            isSidebarOpen ? "ml-64 p-8" : "ml-0 p-8 transition-all duration-380"
          }
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {pageTitle}
              </h2>
              <p className="text-gray-600">Manage your inventory efficiently</p>
            </div>

            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
