import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import logo from "../assets/Frame.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useAuth();

  const hideNavbarRoutes = ["/login", "/signup"];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-[#ff4b04] to-[#ff6b35] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate("/")}
              className="text-white text-2xl font-bold hover:text-[#e6e5c7] transition-colors duration-200 flex items-center gap-2"
            >
              <img
                src={logo}
                alt="GameStore Logo"
                className="h-16 rounded-full"
              />
              <span>PLAYTHRU</span>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search games, genres, platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-[#3e3b2c] bg-white/90 backdrop-blur-sm rounded-full border-2 border-transparent focus:border-white focus:outline-none focus:ring-0 transition-all duration-200 placeholder-[#3e3b2c]/60"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-[#3e3b2c]/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#ff4e08] hover:text-[#e63e00] transition-colors duration-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5-5 5M6 12h12"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => navigate("/")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/")
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigate("/cart")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/cart")
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Cart
            </button>

            <button
              onClick={() => navigate("/favourites")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/favourites")
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Favourites
            </button>

            {user ? (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white/90 text-sm font-medium">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={() => navigate("/profile")}
                  className="px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-all duration-200"
                >
                  Profile
                </button>
                <button
                  onClick={logoutUser}
                  className="px-3 py-1.5 bg-white/10 text-white hover:bg-white/20 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-white/20">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#e6e5c7] focus:outline-none focus:text-[#e6e5c7] transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#e63e00]/20 backdrop-blur-sm rounded-lg mt-2 mb-4">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 text-[#3e3b2c] bg-white/90 rounded-full border-2 border-transparent focus:border-white focus:outline-none placeholder-[#3e3b2c]/60"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-[#3e3b2c]/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    navigate("/games");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  Games
                </button>
                <button
                  onClick={() => {
                    navigate("/categories");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  Categories
                </button>

                {user ? (
                  <div className="border-t border-white/20 pt-3 mt-3">
                    <div className="flex items-center space-x-2 px-3 py-2 text-white/90">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {user.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm">{user.username}</span>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      Profile
                    </button>
                    <button
                      onClick={logoutUser}
                      className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-white/20 pt-3 mt-3 space-y-2">
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate("/signup");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-all duration-200"
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
    </nav>
  );
};

export default Navbar;
