import { useState } from "react";
import Card from "../components/Card";
import Carosel from "../components/Carosel";

const Home = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const gameData = {
    id: "1",
    title: "Hollow Knight: Silksong",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    imageUrl:
      "https://cdn.akamai.steamstatic.com/steam/apps/1139950/header.jpg",
    rating: 4.8,
    tags: ["Metroidvania", "Indie", "Action"],
  };

  const handleToggleFavorite = (gameId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(gameId)) {
        newFavorites.delete(gameId);
      } else {
        newFavorites.add(gameId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1814] to-[#2d2a1f]">
      <Carosel />
      <div className=" text-[#e6e5c7] min-h-screen flex items-center justify-center">
        <Card
          game={gameData}
          onAddToCart={(id) => console.log("Added to cart:", id)}
          onViewDetails={(id) => console.log("View details:", id)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.has(gameData.id)}
        />
      </div>
    </div>
  );
};

export default Home;
