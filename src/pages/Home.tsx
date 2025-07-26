import Card from "../components/Card";
import Carosel from "../components/Carosel";
import { useGameStore } from "../context/gameContext";

const Home = () => {
  const { games } = useGameStore();
  return (
    <div className="bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] min-h-screen">
      <Carosel />

      {/* Featured Games Section */}
      <div className="container mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#e6e5c7] mb-4">
            Featured Games
          </h2>
          <p className="text-lg text-[#a8a594] max-w-2xl mx-auto">
            Discover the latest and greatest games in our collection. From epic
            adventures to indie gems, find your next favorite game.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-[#ff4e08] to-[#e63e00] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Card key={game._id} game={game} />
          ))}
        </div>

        {/* Load More Button */}
        {games.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-[#ff4e08] hover:bg-[#e63e00] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Load More Games
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
