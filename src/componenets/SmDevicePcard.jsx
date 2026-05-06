import { useState } from "react";
import { Package, Edit2, Trash2 } from "lucide-react";

const SmDevicePcard = ({ name, skuId, category, minQuantity }) => {
  const [inStock, setInStock] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl mb-4">
      {/* Header with gradient */}
      <div className="bg-linear-to-r from-blue-500 to-purple-600 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white text-[10px] font-light opacity-60">
                Product
              </h3>
              <p className="text-white text-[12px] font-bold">{name}</p>
            </div>
          </div>

          {/* Stock Badge */}
          <button
            onClick={() => setInStock(!inStock)}
            className={`px-4 py-2 rounded-full text-[10px] font-semibold transition-all duration-300 ${
              inStock
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500 font-medium">SKU</span>
            <span className="text-gray-900 font-semibold">{skuId}</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Category</span>
            <span className="text-gray-900 font-semibold">{category}</span>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-gray-500 font-medium">Min Quantity</span>
            <span className="text-gray-900 font-semibold">{minQuantity}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="pt-4 flex gap-3">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                <Edit2 className="w-5 h-5" />
                Edit
              </button>
              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                <Trash2 className="w-5 h-5" />
                Delete
              </button>
            </div> */}
      </div>
    </div>
  );
};

export default SmDevicePcard;
