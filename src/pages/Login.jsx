import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { apiClient } from "../utils/apiClient";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { setCookie } from "../utils/cookies";
import { useGlobalContext } from "../context/globalContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { isLogin, setIsLogin, setUserProfile } = useGlobalContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await apiClient.login({ email, password });
      console.log(data);

      const tokenExpiresIn = data.expiresIn;
      const currentMilies = Date.now();

      dayjs.extend(duration);

      function convertExpiryToSeconds(expiryString) {
        const unit = expiryString.slice(-1).toUpperCase(); // e.g. "H"
        const value = parseInt(expiryString.slice(0, -1), 10); // e.g. 1

        const expiryDuration = dayjs
          .duration(value, unit === "H" ? "hour" : unit)
          .asSeconds();
        return expiryDuration;
      }

      setCookie("token", data.token, convertExpiryToSeconds(tokenExpiresIn));

      setIsLogin(true);

      setUserProfile(data);

      navigate(from, { replace: true });

      console.log(currentMilies, convertExpiryToSeconds(tokenExpiresIn) * 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSocialLogin = () => {
    window.location.href = "#";
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
        <p className="text-gray-400">Login to continue your adventure</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* input sec */}
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 transition-colors group-hover:text-purple-300" />
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            required
          />
          <div className="absolute inset-0 rounded-lg bg-linear-to-r from-purple-500/0 via-purple-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* password sec */}

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 transition-colors group-hover:text-purple-300" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg pl-12 pr-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
            <input type="checkbox" className="mr-2 w-4 h-4 accent-purple-500" />
            Remember me
          </label>
          <Link
            to="/forgotPassword"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-purple-600 to-cyan-600 text-white py-3.5 rounded-lg font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
        >
          Login
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
      <button
        onClick={() => handleSocialLogin()}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="text-center text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/signUp"
          className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
