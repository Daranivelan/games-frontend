import Card from "../components/Card";
import Carosel from "../components/Carosel";
import { useGameStore } from "../context/gameContext";

const Home = () => {
  const { games } = useGameStore();
  console.log("games", games);
  return (
    <div className="bg-gradient-to-br from-[#1a1814] to-[#2d2a1f]">
      <Carosel />
      <div className=" text-[#e6e5c7] min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {games.map((game) => (
            <Card key={game._id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
