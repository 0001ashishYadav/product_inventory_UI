import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Upload,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { apiClient } from "../utils/apiClient";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    try {
      await apiClient.uploadProfileImage({ image: profileImage });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle signup logic here

    try {
      const data = await apiClient.signup({
        name,
        email,
        password,
        // profileImage,
      });
      console.log(data);

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profileImage) {
      console.log(profileImage); // ✅ Logs only after state updates
    }
  }, [profileImage]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Join the Game</h2>
        <p className="text-gray-400">Create your account and start playing</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        {/* Profile Photo Upload */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-700 border-4 border-slate-600 shadow-xl transition-all duration-300 group-hover:border-purple-500">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-slate-500" />
                </div>
              )}
            </div>
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 w-10 h-10 bg-linear-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <Upload className="w-5 h-5 text-white" />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <p className="text-xs text-slate-400 mt-3">Upload your avatar</p>
        </div>

        {/* input sec : USERNAME */}
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 transition-colors group-hover:text-purple-300" />
          <input
            type="text"
            name="userName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
            className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            required
          />
          <div className="absolute inset-0 rounded-lg bg-linear-to-r from-purple-500/0 via-purple-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* input sec : EMAIL */}
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

        {/* <PasswordField
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
        /> */}

        <label className="flex items-start text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
          <input
            type="checkbox"
            className="mr-2 mt-1 w-4 h-4 accent-purple-500"
            required
          />
          <span>I agree to the Terms of Service and Privacy Policy</span>
        </label>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-purple-600 to-cyan-600 text-white py-3.5 rounded-lg font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
        >
          Create Account
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="text-center text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
