import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import logo from "../assets/Frame.png";
import { useGameStore } from "../context/gameContext";
import {
  ArrowRight,
  Search,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Gamepad2,
} from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useAuth();
  const { searchGames, cartItems } = useGameStore();

  const hideNavbarRoutes = ["/login", "/signup"];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  const handleSearch = async (e: React.FormEvent) => {
    navigate("/games");
    e.preventDefault();
    if (searchQuery.trim()) {
      const gameName = await searchGames(searchQuery.trim());
      console.log(gameName);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-[#ff4b04] via-[#ff5722] to-[#ff6b35] shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate("/")}
              className="text-white text-2xl font-bold hover:text-yellow-200 transition-all duration-300 flex items-center gap-3 group"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="GameStore Logo"
                  className="h-14 w-14 rounded-full shadow-lg group-hover:shadow-yellow-200/50 transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent font-extrabold tracking-wide">
                PLAYTHRU
              </span>
            </button>
          </div>

          {/* Enhanced Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search games, genres, platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 pl-12 pr-14 text-gray-800 bg-white/95 backdrop-blur-sm rounded-full border-2 border-white/50 focus:border-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200/30 transition-all duration-300 placeholder-gray-500 shadow-lg group-hover:shadow-xl"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500 group-focus-within:text-orange-500 transition-colors duration-200" />
              </div>
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-orange-500 hover:text-orange-600 transition-all duration-200 hover:scale-110"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Enhanced Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => navigate("/")}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isActive("/")
                  ? "bg-white/10 text-white shadow-lg scale-105"
                  : "text-white/90 hover:text-white hover:bg-white/15 hover:scale-105"
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </button>

            {/* Enhanced Cart Button */}
            <div className="relative">
              {cartItems.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-bounce">
                  {cartItems.length}
                </div>
              )}
              <button
                onClick={() => navigate("/cart")}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive("/cart")
                    ? "bg-white/10 text-white shadow-lg scale-105"
                    : "text-white/90 hover:text-white hover:bg-white/15 hover:scale-105"
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                Cart
              </button>
            </div>

            <button
              onClick={() => navigate("/favourites")}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isActive("/favourites")
                  ? "bg-white/10 text-white shadow-lg scale-105"
                  : "text-white/90 hover:text-white hover:bg-white/15 hover:scale-105"
              }`}
            >
              <Heart className="h-4 w-4" />
              Favourites
            </button>

            {user ? (
              <div className="relative ml-6 pl-6 border-l border-white/30">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-white/15 hover:bg-white/10 rounded-xl px-4 py-2.5 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-yellow-400/50">
                    <span className="text-white font-bold text-sm">
                      {user.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white font-semibold text-sm">
                      {user.username}
                    </span>
                    <span className="text-white/70 text-xs">Online</span>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => {
                        logoutUser();
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-white/30">
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2.5 text-white/90 hover:text-white hover:bg-white/15 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-2.5 bg-white/20 text-white hover:bg-white/30 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-yellow-200 focus:outline-none transition-all duration-300 p-2 rounded-lg hover:bg-white/15"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-2xl mt-4 mb-6 border border-white/20 shadow-2xl">
            <div className="px-6 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 pl-12 text-gray-800 bg-white/95 rounded-full border-2 border-white/50 focus:border-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200/30 placeholder-gray-500 shadow-lg"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300"
                >
                  <Home className="h-5 w-5" />
                  Home
                </button>
                <button
                  onClick={() => {
                    navigate("/games");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300"
                >
                  <Gamepad2 className="h-5 w-5" />
                  Games
                </button>
                <div className="relative">
                  <button
                    onClick={() => {
                      navigate("/cart");
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Cart
                    {cartItems.length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                </div>
                <button
                  onClick={() => {
                    navigate("/favourites");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300"
                >
                  <Heart className="h-5 w-5" />
                  Favourites
                </button>

                {user ? (
                  <div className="border-t border-white/30 pt-4 mt-4">
                    <div className="flex items-center space-x-3 px-4 py-3 text-white/90 bg-white/10 rounded-xl mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {user.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold">
                          {user.username}
                        </span>
                        <div className="text-xs text-white/70">Online</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300"
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        logoutUser();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-white/30 pt-4 mt-4 space-y-3">
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300 font-semibold"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate("/signup");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-center px-4 py-3 bg-white/20 text-white hover:bg-white/30 rounded-xl transition-all duration-300 font-semibold shadow-lg"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Close user menu when clicking outside */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
