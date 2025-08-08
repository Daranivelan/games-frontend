import { useState, type FormEvent } from "react";
import type { AuthFormData } from "../types/auth";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo2.png";
import eldenRingBg from "../assets/Elden_Ring.jpg";
import "../index.css";

const Login = () => {
  const [formData, setFormData] = useState<Omit<AuthFormData, "username">>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    await loginUser(formData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Elden Ring Background with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${eldenRingBg})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-amber-900/40 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl flex items-center backdrop-blur-sm">
          {/* Left Side - Logo and Branding */}
          <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-full blur-xl"></div>
              <img
                src={logoImage}
                alt="GameStore Logo"
                className="relative z-10 w-48 h-48 object-contain drop-shadow-2xl"
              />
            </div>
            <div className="mt-8 text-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-4">
                Welcome Back, Tarnished
              </h2>
              <p className="text-amber-100/80 text-lg font-medium leading-relaxed max-w-md">
                Return to the Lands Between and continue your legendary journey
              </p>
            </div>
          </div>

          {/* Right Side - Enhanced Form */}
          <div className="flex-1 max-w-md mx-auto lg:mx-0">
            <div className="bg-gradient-to-br from-slate-900/95 via-amber-900/20 to-slate-900/95 backdrop-blur-lg rounded-2xl border border-amber-600/30 shadow-2xl p-8">
              {/* Header with Elden Ring Styling */}
              <div className="text-center mb-8">
                <div className="mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto rounded-full mb-4"></div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mb-2">
                    ⚔️ Return, Tarnished ⚔️
                  </h1>
                  <p className="text-amber-100/70 text-sm font-medium">
                    Reclaim your place in the Lands Between
                  </p>
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4"></div>
                </div>
              </div>

              {/* Enhanced Error Message */}
              {error && (
                <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm backdrop-blur-sm">
                  <div className="flex items-center">
                    <span className="mr-2">⚠️</span>
                    {error}
                  </div>
                </div>
              )}

              {/* Enhanced Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Email Field */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <input
                      type="email"
                      required
                      className="relative w-full px-4 py-4 bg-slate-800/60 border border-amber-600/30 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all duration-300 placeholder-amber-200/40 text-amber-100 backdrop-blur-sm"
                      placeholder="� Your sacred scroll address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <input
                      type="password"
                      required
                      className="relative w-full px-4 py-4 bg-slate-800/60 border border-amber-600/30 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all duration-300 placeholder-amber-200/40 text-amber-100 backdrop-blur-sm"
                      placeholder="�️ Your secret rune"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 rounded-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative px-6 py-4 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-xl font-bold text-slate-900 transform group-hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-slate-800/30 border-t-slate-800 rounded-full animate-spin mr-3"></div>
                        <span>Awakening Tarnished...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="mr-2">⚔️</span>
                        Return to Battle
                        <span className="ml-2">🛡️</span>
                      </div>
                    )}
                  </div>
                </button>
              </form>

              {/* Enhanced Footer */}
              <div className="mt-8 pt-6 border-t border-amber-600/20 text-center">
                <p className="text-amber-200/60 text-sm">
                  New to the Lands Between?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-amber-400 hover:text-yellow-300 font-medium transition-colors duration-200 underline decoration-amber-400/30 hover:decoration-yellow-300/50"
                  >
                    Begin your quest here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Animation Elements */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
