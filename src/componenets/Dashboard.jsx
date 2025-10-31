import {
  AlertCircle,
  Box,
  Package,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import StatCard from "./StatCard";
import { productsList, recentEntriesList, recentExitsList } from "../data";

const Dashboard = () => {
  const products = productsList;
  const recentEntries = recentEntriesList;
  const recentExits = recentExitsList;

  const lowStockItems = products.filter(
    (p) => p.current_quantity <= p.min_quantity
  );
  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Package}
            title="Total Products"
            value={products.length}
            change={12}
            color="bg-blue-500"
          />
          <StatCard
            icon={Box}
            title="Total Inventory"
            value={products.reduce((sum, p) => sum + p.current_quantity, 0)}
            change={8}
            color="bg-green-500"
          />
          <StatCard
            icon={AlertCircle}
            title="Low Stock Items"
            value={lowStockItems.length}
            change={-5}
            color="bg-orange-500"
          />
          <StatCard
            icon={Activity}
            title="Recent Activities"
            value={recentEntries.length + recentExits.length}
            change={15}
            color="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Low Stock Alert
              </h3>
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Min: {item.min_quantity} | Current:{" "}
                      {item.current_quantity}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full">
                    Low Stock
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activities
            </h3>
            <div className="space-y-3">
              {recentEntries.slice(0, 3).map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{entry.product}</p>
                    <p className="text-sm text-gray-600">
                      +{entry.quantity} items added by {entry.added_by}
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
              ))}
              {recentExits.slice(0, 2).map((exit) => (
                <div
                  key={exit.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{exit.product}</p>
                    <p className="text-sm text-gray-600">
                      -{exit.quantity} items removed by {exit.removed_by}
                    </p>
                  </div>
                  <TrendingDown className="w-5 h-5 text-red-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
