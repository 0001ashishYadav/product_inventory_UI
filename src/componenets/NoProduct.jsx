import { Package, Plus, FileText } from "lucide-react";

const NoProduct = () => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 pt-10">
        <div className="max-w-6xl mx-auto">
          {/* Floating Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          {/* Main Content */}
          <div className="relative">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 blur-2xl opacity-30 animate-pulse-slow"></div>
                <div className="relative w-32 h-32 bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <Package className="w-16 h-16 text-white" />
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                No Products Yet
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Start building your inventory by adding your first product. It
                only takes a few seconds!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                {/* <button className="group px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3">
                  <Plus className="w-6 h-6" />
                  <span>Add Your First Product</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button> */}

                {/* <button className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-gray-50 transition-all flex items-center gap-3 shadow-lg">
                  <FileText className="w-5 h-5" />
                  <span>Import from CSV</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoProduct;
