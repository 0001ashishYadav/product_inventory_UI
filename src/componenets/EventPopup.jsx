import { CheckCircle } from "lucide-react";

const EventPopup = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center transform scale-100 animate-scale-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Product Added!
          </h2>
          <p className="text-gray-600 mb-6">
            Your product has been successfully added to the inventory.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            Redirecting...
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPopup;
