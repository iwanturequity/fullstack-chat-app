import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-b from-base-100 to-base-200">
        <div className="w-full max-w-md space-y-8 backdrop-blur-sm bg-white/50 dark:bg-black/20 p-8 rounded-2xl shadow-xl border border-base-300">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 shadow-md shadow-primary/30">
                <MessageSquare className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Welcome Back</h1>
              <p className="text-base-content/70 text-lg">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-primary/70" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-12 py-6 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary/70" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12 py-6 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/60 hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 text-lg font-medium" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-base-content/70">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};

export default LoginPage;