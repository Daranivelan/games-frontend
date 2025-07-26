import { useGameStore } from "../context/gameContext";
import type { Game } from "../types/games";

interface CardProps {
  game: Game;
}

const Card = (props: CardProps) => {
  const { game } = props;
  const { addFavorite, favorites, removeFavorite } = useGameStore();

  console.log("game", game);

  const tags = game.Tags
    ? game.Tags[0].split(",").map((tag) => tag.trim())
    : ["General"];

  const isFavorite = favorites.includes(game._id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(game._id);
      console.log(`Removing ${game.Name} from favorites`);
    } else {
      addFavorite(game._id);
      console.log(`Adding ${game.Name} to favorites`);
    }
  };
  return (
    <div className="w-[280px] bg-[#2d2a1f] rounded-xl shadow-lg cursor-pointer overflow-hidden border border-[#3e3b2c]/50 flex flex-col justify-center">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gray-800 rounded-t-xl">
          <div className="w-full bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse rounded-t-xl" />
          <img
            src={game["Header image"]}
            alt={game.Name}
            className={`w-full h-full object-cover rounded-t-xl transition-transform duration-300 ease-in-out hover:scale-110
            }`}
          />

          {/* Favorite Heart */}
          <button
            onClick={() => handleToggleFavorite()}
            className="absolute top-3 right-3 w-8 h-8 backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
          >
            <span className="text-lg filter drop-shadow-sm">
              {isFavorite ? "❤️" : "🤍"}
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-[#e6e5c7] font-semibold text-lg leading-tight line-clamp-2">
          {game["Name"]}
        </h3>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
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

        {/* Price Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            {game["Price"] > 0 ? game["Price"] : "Free"}
          </div>

          {/* Add to Cart Button */}
          <button className="bg-[#ff4e08] hover:bg-[#e63e00] px-4 py-2 rounded-lg text-sm text-white font-medium cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
