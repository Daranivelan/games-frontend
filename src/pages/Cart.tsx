import { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import { useGameStore } from "../context/gameContext";
import type { Game } from "../types/games";

const Cart = () => {
  const { cartItems, games } = useGameStore();
  const [cartGames, setCartGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartGames = () => {
      if (cartItems.length === 0) {
        setCartGames([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const cartGameDetails = games.filter((game) =>
          cartItems.includes(game._id)
        );
        setCartGames(cartGameDetails);
      } catch (error) {
        console.error("Error fetching cart games:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartGames();
  }, [cartItems, games]);

  const totalPrice = cartGames.reduce((sum, game) => sum + game.Price, 0);
  const totalItems = cartGames.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] text-[#e6e5c7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#ff4e08] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a8a594]">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartGames.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] text-[#e6e5c7]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#ff4e08] to-[#e63e00] bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-[#2d2a1f] rounded-full flex items-center justify-center border border-[#3e3b2c]">
                <svg
                  className="w-12 h-12 text-[#a8a594]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 4H4m4 9v6a1 1 0 001 1h10a1 1 0 001-1v-6M9 19.5h.01M20 19.5h.01"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-[#e6e5c7]">
                  Your Cart is Empty
                </h2>
                <p className="text-[#a8a594] max-w-md">
                  Discover amazing games and add them to your cart to get
                  started.
                </p>
              </div>
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-[#ff4e08] hover:bg-[#e63e00] px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Browse Games</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1814] to-[#2d2a1f] text-[#e6e5c7]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#ff4e08] to-[#e63e00] bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-[#a8a594] text-lg">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-[#3e3b2c] to-transparent mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartGames.map((game) => (
              <CartCard key={game._id} cartGame={game} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#2d2a1f] rounded-xl border border-[#3e3b2c]/50 p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6 text-[#e6e5c7]">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#a8a594]">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#a8a594]">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="h-px bg-[#3e3b2c]"></div>
                <div className="flex justify-between text-xl font-semibold text-[#e6e5c7]">
                  <span>Total</span>
                  <span>${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-[#ff4e08] hover:bg-[#e63e00] px-6 py-3 rounded-lg font-semibold transition-colors duration-200 mb-3">
                Proceed to Checkout
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-transparent border border-[#3e3b2c] hover:bg-[#3e3b2c] px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-[#a8a594] hover:text-[#e6e5c7]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
