import Card from "../components/Card";
import Carosel from "../components/Carosel";
import Loading from "../components/Loading";
import { useGameStore } from "../context/gameContext";

const Home = () => {
  const { games, loading } = useGameStore();

  return (
    <div className="bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] min-h-screen">
      <Carosel />

      {/* Featured Games Section */}
      {loading ? (
        <div className="w-full">
          <Loading />
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#e6e5c7] mb-3 sm:mb-4 leading-tight">
              Featured Games
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#a8a594] max-w-xs sm:max-w-md lg:max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
              Discover the latest and greatest games in our collection. From
              epic adventures to indie gems, find your next favorite game.
            </p>
            <div className="h-0.5 sm:h-1 w-16 sm:w-20 lg:w-24 bg-gradient-to-r from-[#ff4e08] to-[#e63e00] mx-auto mt-4 sm:mt-6 rounded-full"></div>
          </div>

          {/* Games Grid - Responsive Grid System */}
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
            {games.map((game) => (
              <div key={game._id} className="w-full max-w-[280px]">
                <Card game={game} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {games.length > 0 && (
            <div className="text-center mt-8 sm:mt-12 lg:mt-16">
              <button className="bg-[#ff4e08] hover:bg-[#e63e00] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                Load More Games
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
