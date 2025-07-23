import React from "react";
import Card from "../components/Card";

const Home = () => {
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
  return (
    <div className=" text-[#e6e5c7] min-h-screen flex items-center justify-center">
      <Card
        game={gameData}
        onAddToCart={(id) => console.log("Added to cart:", id)}
        onViewDetails={(id) => console.log("View details:", id)}
      />
    </div>
  );
};

export default Home;
