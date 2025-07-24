import { useState, type FormEvent } from "react";
import type { AuthFormData } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import logoImage from "../assets/logo.png";
import bgImage from "../assets/backgorund.jpeg"; // Adjust the path as necessary
import "../index.css";

const Signup = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = await createUser(formData);
    if (success) {
      navigate("/login");
    } else {
      setError("Failed to create account. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-center w-[80%] bg-white/80 rounded-3xl">
        <div className="flex-1 flex items-center justify-center">
          <img src={logoImage} alt="GameStore Logo" />
        </div>
        <div className="flex-1 py-8 px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#3e3b2c] mb-2">
              Join the Game! 🚀
            </h1>
            <p className="text-lg text-[#3e3b2c]/80 font-medium">
              Create your GameStore account
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ff4e08] to-[#ff6b35] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-[#f8f7f0] border-2 border-[#3e3b2c]/20 rounded-xl focus:border-[#ff4e08] focus:outline-none focus:ring-0 transition-colors duration-200 placeholder-[#3e3b2c]/60"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-[#f8f7f0] border-2 border-[#3e3b2c]/20 rounded-xl focus:border-[#ff4e08] focus:outline-none focus:ring-0 transition-colors duration-200 placeholder-[#3e3b2c]/60"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-[#f8f7f0] border-2 border-[#3e3b2c]/20 rounded-xl focus:border-[#ff4e08] focus:outline-none focus:ring-0 transition-colors duration-200 placeholder-[#3e3b2c]/60"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#ff4e08] to-[#ff6b35] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#e63e00] hover:to-[#ff4e08] focus:outline-none focus:ring-4 focus:ring-[#ff4e08]/30 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#3e3b2c]/10 text-center">
            <p className="text-[#3e3b2c]/60 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#ff4e08] hover:text-[#e63e00] font-medium transition-colors duration-200"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
