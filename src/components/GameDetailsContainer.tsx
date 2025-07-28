import { useEffect, useState } from "react";
import { useGameStore } from "../context/gameContext";
import type { Game } from "../types/games";
import { Carousel } from "react-responsive-carousel";

const GameDetailsContainer = ({ gameId }: { gameId: string }) => {
  const [game, setGame] = useState<Game | null>(null);

  const screenshots = game?.Screenshots[0]
    .split(",")
    .map((screenshot) => screenshot.trim())
    .slice(0, 5);
  console.log("screenshots", screenshots);

  const { fetchGame } = useGameStore();

  useEffect(() => {
    const getGame = async () => {
      const fetchedGames = await fetchGame(gameId);
      setGame(fetchedGames[0] || null);
    };
    getGame();
  }, [gameId]);

  return (
    <div className="flex ">
      <div className="flex-1 w-1/3 mr-4">
        <Carousel autoPlay infiniteLoop stopOnHover={false}>
          {screenshots?.map((screenshot, index) => (
            <div key={index}>
              <img src={screenshot} alt={`Screenshot ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex-1 w-2/3 bg-[#2d2a1f] p-4 rounded-lg shadow-md text-[#e6e5c7]">
        {game ? (
          <>
            <div className="border-b border-[#/50] pb-4 mb-4">
              <h2 className="text-2xl font-bold text-[#ff4e08]">{game.Name}</h2>
            </div>
            <div>
              <p className="text-[#e6e5c7] text-xl font-bold pb-2">
                About the game
              </p>
              <p className="text-[#a8a594] text-sm leading-relaxed">
                {game["About the game"]}
              </p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default GameDetailsContainer;
