import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, change, color }) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
            {change && (
              <div
                className={`flex items-center mt-2 text-sm ${
                  change > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {change > 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span>{Math.abs(change)}% from last month</span>
              </div>
            )}
          </div>
          <div className={`${color} p-4 rounded-xl`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatCard;
