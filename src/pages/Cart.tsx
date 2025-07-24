import CartCard from "../components/CartCard";

const Cart = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a1814] to-[#2d2a1f]">
      <CartCard
        game={gameData}
        quantity={2}
        // centered={true}
        onRemoveFromCart={(id) => console.log("Remove:", id)}
        onViewDetails={(id) => console.log("View details:", id)}
      />
    </div>
  );
};

export default Cart;
