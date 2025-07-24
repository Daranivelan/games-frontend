import { useState } from "react";

interface Game {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  discount?: number;
  rating?: number;
  tags?: string[];
}

interface CardProps {
  game: Game;
  onAddToCart?: (gameId: string) => void;
  onViewDetails?: (gameId: string) => void;
  onToggleFavorite?: (gameId: string) => void;
  isFavorite?: boolean;
}

const Card = ({
  game,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(game.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(game.id);
  };

  const handleCardClick = () => {
    onViewDetails?.(game.id);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div
      className="w-[280px] bg-[#2d2a1f] rounded-xl shadow-lg cursor-pointer overflow-hidden border border-[#3e3b2c]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gray-800 rounded-t-xl">
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse rounded-t-xl" />
          )}
          <img
            src={game.imageUrl}
            alt={game.title}
            className={`w-full h-full object-cover rounded-t-xl transition-transform duration-300 ease-in-out hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = "/placeholder-game.jpg";
              setImageLoaded(true);
            }}
          />

          {/* Discount Badge */}
          {game.discount && (
            <div className="absolute top-3 left-3 bg-[#ff4e08] text-white px-2 py-1 rounded-md text-xs font-bold">
              -{game.discount}%
            </div>
          )}

          {/* Favorite Heart */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 w-8 h-8 backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
          >
            <span className="text-lg filter drop-shadow-sm">
              {isFavorite ? "💛" : "🤍"}
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-[#e6e5c7] font-semibold text-lg leading-tight line-clamp-2">
          {game.title}
        </h3>

        {/* Tags */}
        {game.tags && game.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {game.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-[#3e3b2c] text-[#a8a594] px-2 py-1 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Rating */}
        {game.rating && (
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(game.rating!)
                      ? "text-yellow-400"
                      : "text-gray-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[#a8a594] text-sm">
              ({game.rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            {game.originalPrice && game.originalPrice > game.price ? (
              <>
                <span className="text-[#a8a594] text-sm line-through">
                  {formatPrice(game.originalPrice)}
                </span>
                <span className="text-[#ff4e08] font-bold text-lg">
                  {formatPrice(game.price)}
                </span>
              </>
            ) : (
              <span className="text-[#e6e5c7] font-bold text-lg">
                {formatPrice(game.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-[#ff4e08] hover:bg-[#e63e00] px-4 py-2 rounded-lg text-sm text-white font-medium cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
