import { useState } from "react";
import type { Game } from "../types/games";
import { useGameStore } from "../context/gameContext";

interface CartCardProps {
  cartGame: Game;
}

const CartCard = (props: CartCardProps) => {
  const { cartGame } = props;
  const { deleteCartItem, addFavorite, favorites } = useGameStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  const tags = cartGame.Tags
    ? cartGame.Tags[0].split(",").map((tag) => tag.trim())
    : ["General"];

  const isFavorite = favorites.includes(cartGame._id);

  const handleRemove = (gameId: string) => {
    deleteCartItem(gameId);
  };

  const handleAddToFavorites = () => {
    if (!isFavorite) {
      addFavorite(cartGame._id);
    }
  };

  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `$${price.toFixed(2)}`;
  };

  return (
    <div className="bg-[#2d2a1f] rounded-xl shadow-lg border border-[#3e3b2c]/50 overflow-hidden hover:border-[#ff4e08]/30 transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-48 w-full h-32 md:h-auto relative overflow-hidden group">
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse" />
          )}
          <img
            src={cartGame["Header image"]}
            alt={cartGame.Name}
            className={`w-full h-full object-cover cursor-pointer transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = "/placeholder-game.jpg";
              setImageLoaded(true);
            }}
          />

          {/* Discount Badge */}
          {cartGame.Price > 50 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-bold">
              PREMIUM
            </div>
          )}

          {/* Free Badge */}
          {cartGame.Price === 0 && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-bold">
              FREE
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Title and Actions */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-[#e6e5c7] font-semibold text-xl cursor-pointer hover:text-[#ff4e08] transition-colors duration-200 line-clamp-2">
                  {cartGame.Name}
                </h3>

                {/* Release Year or Additional Info */}
                <p className="text-[#a8a594] text-sm mt-1">
                  Published by Game Studio
                </p>
              </div>

              {/* Favorite Button */}
              <button
                onClick={handleAddToFavorites}
                disabled={isFavorite}
                className={`ml-4 p-2 rounded-full transition-all duration-200 ${
                  isFavorite
                    ? "bg-red-600/20 text-red-400 cursor-not-allowed"
                    : "bg-[#3e3b2c] hover:bg-[#ff4e08]/20 text-[#a8a594] hover:text-[#ff4e08]"
                }`}
                title={isFavorite ? "Already in favorites" : "Add to favorites"}
              >
                <svg
                  className="w-5 h-5"
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

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#3e3b2c] text-[#a8a594] px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-[#a8a594] text-xs py-1">
                    +{tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Description or Features */}
            <div className="text-[#a8a594] text-sm">
              <p className="line-clamp-2">
                Experience this amazing game with stunning graphics and
                immersive gameplay. Perfect for gamers who love adventure and
                action-packed scenarios.
              </p>
            </div>
          </div>

          {/* Price and Actions Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mt-6 pt-4 border-t border-[#3e3b2c]">
            {/* Quantity and Price */}
            <div className="flex items-center space-x-6">
              {/* Quantity Controls */}

              {/* Price */}
              <div className="text-right">
                <div className="text-[#ff4e08] font-bold text-xl">
                  {formatPrice(cartGame.Price)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Move to Favorites */}

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(cartGame._id)}
                className="bg-red-600/10 hover:bg-red-600 border border-red-600/30 hover:border-red-600 px-4 py-2 rounded-lg text-sm text-red-400 hover:text-white font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
