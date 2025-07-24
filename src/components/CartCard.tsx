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

interface CartCardProps {
  game: Game;
  quantity?: number;
  onRemoveFromCart?: (gameId: string) => void;
  onUpdateQuantity?: (gameId: string, quantity: number) => void;
  onViewDetails?: (gameId: string) => void;
  centered?: boolean;
}

const CartCard = ({
  game,
  onRemoveFromCart,
  onViewDetails,
  centered = false,
}: CartCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleRemove = () => {
    onRemoveFromCart?.(game.id);
  };

  const handleViewDetails = () => {
    onViewDetails?.(game.id);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const cardContent = (
    <div className="bg-[#2d2a1f] rounded-xl shadow-lg border border-[#3e3b2c]/50 overflow-hidden max-w-4xl">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-48 w-full h-32 md:h-auto relative overflow-hidden">
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse" />
          )}
          <img
            src={game.imageUrl}
            alt={game.title}
            className={`w-full h-full object-cover cursor-pointer transition-all duration-300 hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onClick={handleViewDetails}
            onError={(e) => {
              e.currentTarget.src = "/placeholder-game.jpg";
              setImageLoaded(true);
            }}
          />

          {/* Discount Badge */}
          {game.discount && (
            <div className="absolute top-2 left-2 bg-[#ff4e08] text-white px-2 py-1 rounded-md text-xs font-bold">
              -{game.discount}%
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Title and Rating */}
            <div>
              <h3
                className="text-[#e6e5c7] font-semibold text-lg cursor-pointer hover:text-[#ff4e08] transition-colors duration-200"
                onClick={handleViewDetails}
              >
                {game.title}
              </h3>

              {/* Rating */}
              {game.rating && (
                <div className="flex items-center space-x-1 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${
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
                  <span className="text-[#a8a594] text-xs">
                    ({game.rating.toFixed(1)})
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {game.tags && game.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {game.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#3e3b2c] text-[#a8a594] px-2 py-1 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price and Actions Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 mt-4">
            {/* Price Section */}
            <div className="space-y-1">
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
              <div className="text-[#a8a594] text-sm">
                Total:{" "}
                <span className="text-[#e6e5c7] font-semibold">
                  {formatPrice(game.price)}
                </span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center space-x-3">
              {/* Quantity Controls */}

              {/* Remove Button */}
              <button
                onClick={handleRemove}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm text-white font-medium transition-colors duration-200 flex items-center space-x-1"
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

  return centered ? (
    <div className="flex justify-center items-center min-h-screen p-4">
      {cardContent}
    </div>
  ) : (
    cardContent
  );
};

export default CartCard;
