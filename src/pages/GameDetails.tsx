import { useEffect } from "react";
import ReviewCard from "../components/ReviewCard";
import { useParams } from "react-router-dom";
import { useGameStore } from "../context/gameContext";
import ReviewContainer from "../components/ReviewContainer";
import GameDetailsContainer from "../components/GameDetailsContainer";

const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  if (!id) {
    return (
      <div className="bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] min-h-screen p-6 flex items-center justify-center">
        <div className="text-[#e6e5c7] text-center">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <p className="text-[#a8a594]">Invalid game ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] text-[#e6e5c7] min-h-screen p-6">
      <GameDetailsContainer gameId={id} />
      <ReviewCard gameId={id} />
      <ReviewContainer gameId={id} />
    </div>
  );
};

export default GameDetails;
