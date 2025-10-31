import { useState, useEffect } from "react";
import { Home, Search, AlertCircle } from "lucide-react";

const NotFoundPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div
        className={`max-w-2xl w-full text-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Animated Illustration */}
        <div className="relative mb-8 inline-block">
          <div className="relative">
            {/* Large 404 */}
            <div className="text-[180px] md:text-[250px] font-black leading-none">
              <span className="text-transparent bg-clip-text bg-linear-to-br from-indigo-600 to-purple-600">
                4
              </span>
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-liner-to-br from-purple-600 to-pink-600">
                  0
                </span>
                {/* Animated Search Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse">
                    <Search
                      className="w-20 md:w-32 h-20 md:h-32 text-purple-400"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </span>
              <span className="text-transparent bg-clip-text bg-linear-to-br from-pink-600 to-indigo-600">
                4
              </span>
            </div>
          </div>

          {/* Floating Elements */}
          <div
            className="absolute -top-4 -right-4 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <AlertCircle className="w-12 h-12 text-indigo-400" />
          </div>
          <div
            className="absolute -bottom-4 -left-4 animate-bounce"
            style={{ animationDuration: "2s", animationDelay: "0.5s" }}
          >
            <AlertCircle className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-3 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <p className="text-base text-gray-500 mb-8 max-w-lg mx-auto">
          The page might have been moved, deleted, or perhaps the URL was
          mistyped.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => (window.location.href = "/")}
            className="group relative px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Back to Home
          </button>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Try These Instead
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <button
              onClick={() => (window.location.href = "/")}
              className="px-4 py-3 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Homepage
            </button>
            <button
              onClick={() => (window.location.href = "/about")}
              className="px-4 py-3 bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-700 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              About Us
            </button>
            <button
              onClick={() => (window.location.href = "/contact")}
              className="px-4 py-3 bg-gray-50 hover:bg-pink-50 text-gray-700 hover:text-pink-700 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-400 mt-8">
          Error Code: 404 • Page Not Found
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
