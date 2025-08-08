import { Search } from "lucide-react";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useGameStore } from "../context/gameContext";

const Games = () => {
  const { searchedGame, loading } = useGameStore();
  return (
    <div className="bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-between  p-10 items-center">
          {searchedGame.length > 0 ? (
            searchedGame.map((game) => <Card key={game._id} game={game} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 mx-auto">
              <div className="text-center max-w-md">
                {/* Search Icon */}
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-500" />
                </div>

                {/* No Results Message */}
                <h2 className="text-2xl font-bold text-white mb-3">
                  No Games Found
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  We couldn't find any games matching your search. Try adjusting
                  your search terms or browse our full collection.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Browse All Games
                  </button>
                  <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Go Back
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="mt-12 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Popular categories:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Action", "Adventure", "RPG", "Strategy", "Sports"].map(
                    (category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 cursor-pointer transition-colors"
                      >
                        {category}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Games;
