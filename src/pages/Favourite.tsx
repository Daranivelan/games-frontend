import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useGameStore } from "../context/gameContext";
import type { Game } from "../types/games";

const Favourite = () => {
  const { favorites, removeAllFavorites, games } = useGameStore();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchFavoriteGames = async () => {
      if (favorites.length === 0) {
        setFavoriteGames([]);
        return;
      }
      try {
        // Option 2: Alternative - filter from existing games array (more efficient if all games are already loaded)
        const favoriteGameDetails = games.filter((game) =>
          favorites.includes(game._id)
        );
        console.log("favoriteGameDetails", favoriteGameDetails);

        setFavoriteGames(favoriteGameDetails);
        console.log("favoriteGames", favoriteGames);
      } catch (error) {
        console.error("Error fetching favorite games:", error);
      } finally {
      }
    };

    fetchFavoriteGames();
  }, [favorites, games]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] text-[#e6e5c7]">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#ff4e08] to-[#e63e00] bg-clip-text text-transparent">
                My Favorite Games
              </h1>
              <p className="text-[#a8a594] text-lg">
                {favoriteGames.length > 0
                  ? `You have ${favoriteGames.length} favorite ${
                      favoriteGames.length === 1 ? "game" : "games"
                    }`
                  : "Start building your collection of favorite games"}
              </p>
            </div>

            {favoriteGames.length > 0 && (
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-[#a8a594] text-sm">View:</span>
                  <div className="flex border border-[#3e3b2c] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-2 text-sm transition-colors duration-200 ${
                        viewMode === "grid"
                          ? "bg-[#ff4e08] text-white"
                          : "text-[#a8a594] hover:bg-[#3e3b2c]"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-2 text-sm transition-colors duration-200 ${
                        viewMode === "list"
                          ? "bg-[#ff4e08] text-white"
                          : "text-[#a8a594] hover:bg-[#3e3b2c]"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Clear All Button */}
                <button
                  onClick={removeAllFavorites}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
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
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#3e3b2c] to-transparent"></div>
        </div>

        {/* Content Section */}
        {favoriteGames.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-[#2d2a1f] rounded-full flex items-center justify-center border border-[#3e3b2c]">
                <svg
                  className="w-12 h-12 text-[#a8a594]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-[#e6e5c7]">
                  No Favorite Games Yet
                </h2>
                <p className="text-[#a8a594] max-w-md">
                  Discover amazing games and add them to your favorites by
                  clicking the heart icon on any game card.
                </p>
              </div>
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-[#ff4e08] hover:bg-[#e63e00] px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
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
                <span>Browse Games</span>
              </button>
            </div>
          </div>
        ) : (
          /* Games Grid/List */
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {favoriteGames.map((game) => (
              <div
                key={game._id}
                className={viewMode === "list" ? "max-w-none" : ""}
              >
                <Card key={game._id} game={game} />
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        {favoriteGames.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-4 bg-[#2d2a1f] border border-[#3e3b2c] rounded-lg p-4">
              <span className="text-[#a8a594]">Love what you see?</span>
              <button
                onClick={() => console.log("Add all to cart")}
                className="bg-[#ff4e08] hover:bg-[#e63e00] px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Add All to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
