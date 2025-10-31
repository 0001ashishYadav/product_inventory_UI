import { Gamepad2 } from "lucide-react";
import AuthHeader from "../componenets/AuthHeader";

const AuthLaout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation tabs for demo */}

      <AuthHeader />

      {/* Main card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/30 p-8 relative overflow-hidden">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-50" />
              <div className="relative bg-gradient-to-br from-purple-600 to-cyan-600 p-4 rounded-2xl">
                <Gamepad2 className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="relative z-10">
            {/* {currentPage === "login" && <LoginPage />}
            {currentPage === "signup" && <SignupPage />}
            {currentPage === "forgot" && <ForgotPasswordPage />}
            {currentPage === "reset" && <ResetPasswordPage />} */}

            <div>{children}</div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Gaming Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLaout;
