import { useState } from "react";
import { useGameStore } from "../context/gameContext";
import type { Game } from "../types/games";
import { useNavigate } from "react-router-dom";

interface CardProps {
  game: Game;
}

const Card = (props: CardProps) => {
  const navigate = useNavigate();
  const { game } = props;
  const {
    addFavorite,
    favorites,
    removeFavorite,
    addCartItem,
    cartItems,
    deleteCartItem,
  } = useGameStore();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const tags = game.Tags
    ? game.Tags[0].split(",").map((tag) => tag.trim())
    : ["General"];

  const isFavorite = favorites.includes(game._id);
  const inCart = cartItems.includes(game._id);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isFavorite) {
        await removeFavorite(game._id);
      } else {
        await addFavorite(game._id);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleCartToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      if (inCart) {
        await deleteCartItem(game._id);
      } else {
        await addCartItem(game._id);
      }
    } catch (error) {
      console.error("Error toggling cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `$${price.toFixed(2)}`;
  };

  const handleCardClick = () => {
    navigate(`/game/${game._id}`);
    console.log(`Navigate to game details: ${game._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full max-w-[280px] mx-auto bg-[#2d2a1f] rounded-xl shadow-lg cursor-pointer overflow-hidden border border-[#3e3b2c]/50 hover:border-[#ff4e08]/30 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gray-800 rounded-t-xl relative">
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse rounded-t-xl absolute inset-0" />
          )}
          <img
            src={game["Header image"]}
            alt={game.Name}
            className={`w-full h-full object-cover rounded-t-xl transition-all duration-300 ease-in-out group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = "/placeholder-game.jpg";
              setImageLoaded(true);
            }}
          />

          {/* Price Badge */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <span
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs font-bold shadow-lg ${
                game.Price === 0
                  ? "bg-green-600 text-white"
                  : game.Price > 50
                  ? "bg-purple-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {game.Price === 0 ? "FREE" : game.Price > 50 ? "PREMIUM" : "DEAL"}
            </span>
          </div>

          {/* Favorite Heart */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-7 sm:w-8 h-7 sm:h-8 backdrop-blur-md border rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
              isFavorite
                ? "bg-red-500/80 border-red-400/50 text-white"
                : "bg-white/20 hover:bg-white/30 border-white/20 text-white"
            }`}
          >
            <svg
              className="w-3.5 sm:w-4 h-3.5 sm:h-4"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Title */}
        <h3 className="text-[#e6e5c7] font-semibold text-base sm:text-lg leading-tight line-clamp-2 group-hover:text-[#ff4e08] transition-colors duration-200">
          {game.Name}
        </h3>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-[#3e3b2c] text-[#a8a594] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs hover:bg-[#ff4e08]/20 hover:text-[#ff4e08] transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-[#a8a594] text-xs py-0.5 sm:py-1">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Rating Stars */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${
                i < 4 ? "text-yellow-400" : "text-gray-600"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[#a8a594] text-xs ml-1">4.2</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <div className="flex flex-col">
            <span className="text-[#ff4e08] font-bold text-lg sm:text-xl">
              {formatPrice(game.Price)}
            </span>
            {game.Price > 0 && (
              <span className="text-[#a8a594] text-xs sm:text-sm line-through">
                ${(game.Price * 1.2).toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleCartToggle}
            disabled={isLoading}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
              inCart
                ? "bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600 hover:text-white"
                : "bg-[#ff4e08] hover:bg-[#e63e00] text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className="w-3 sm:w-4 h-3 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      inCart
                        ? "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        : "M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 4H4m4 9v6a1 1 0 001 1h10a1 1 0 001-1v-6M9 19.5h.01M20 19.5h.01"
                    }
                  />
                </svg>
                <span className="hidden xs:inline">
                  {inCart ? "Remove" : "Add"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
