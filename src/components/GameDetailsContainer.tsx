import { useEffect, useState } from "react";
import { useGameStore } from "../context/gameContext";
import type { Game } from "../types/games";
import { Carousel } from "react-responsive-carousel";
import { ShoppingCart } from "lucide-react";

const GameDetailsContainer = ({ gameId }: { gameId: string }) => {
  const [game, setGame] = useState<Game | null>(null);
  const [readmore, setReadmore] = useState<boolean>(false);

  const { fetchGame } = useGameStore();

  useEffect(() => {
    const getGame = async () => {
      const fetchedGames = await fetchGame(gameId);
      setGame(fetchedGames[0] || null);
    };
    getGame();
  }, [gameId]);

  // Add safety checks for the data processing
  const movies = game?.Movies?.[0]
    ? game.Movies[0]
        .split(",")
        .map((movie) => movie.trim())
        .slice(0, 1)
        .filter((movie) => movie.length > 0) // Remove empty strings
    : [];

  const screenshots = game?.Screenshots?.[0]
    ? game.Screenshots[0]
        .split(",")
        .map((screenshot) => screenshot.trim())
        .slice(0, 4)
        .filter((screenshot) => screenshot.length > 0) // Remove empty strings
    : [];

  const genres = game?.Genres?.[0]
    ? game.Genres[0]
        .split(",")
        .map((genre) => genre.trim())
        .filter((genre) => genre.length > 0) // Remove empty strings
    : [];

  return (
    <div className="flex ">
      <div className="flex-1 w-1/3 mr-4">
        <Carousel infiniteLoop showArrows={false}>
          {movies?.map((movie, index) => (
            <div key={index}>
              <video
                src={movie}
                controls
                muted
                className="w-full h-auto rounded-lg shadow-md"
                autoPlay={true}
              />
            </div>
          ))}
          {screenshots?.map((screenshot, index) => (
            <div key={index}>
              <img src={screenshot} alt={`Screenshot ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex-1 w-2/3 bg-[#2d2a1f] p-4 rounded-lg shadow-md text-[#e6e5c7]">
        {game ? (
          <div className="flex flex-col justify-between h-full">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-[#ff4e08]">{game.Name}</h2>
            </div>
            <div className="mb-4 h-[200px] overflow-scroll">
              <p className="text-[#e6e5c7] text-xl font-bold pb-2">
                About the game
              </p>
              <span className="text-[#a8a594]  text-sm leading-relaxed">
                {readmore
                  ? game["About the game"]
                  : game["About the game"].substring(0, 500)}
              </span>
              <span
                onClick={() => setReadmore(!readmore)}
                className="text-[#ff4e08] cursor-pointer ml-2"
              >
                {readmore ? "read less..." : "read more..."}
              </span>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-[#e6e5c7] font-bold">Developer</p>
                <p className="text-[#a8a594] text-sm leading-relaxed">
                  {game.Developers}
                </p>
              </div>
              <div>
                <p className="text-[#e6e5c7] font-bold">Release Date</p>
                <p className="text-[#a8a594] text-sm leading-relaxed">
                  {game["Release date"]}
                </p>
              </div>
              <div>
                <p className="text-[#e6e5c7] font-bold">Genres</p>
                <p className="text-[#a8a594] text-sm leading-relaxed">
                  {genres.join(", ")}
                </p>
              </div>
            </div>
            <div>
              <button className="flex items-center mt-4 bg-[#ff4e08] text-white py-2 px-4 rounded-lg cursor-pointer">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default GameDetailsContainer;
