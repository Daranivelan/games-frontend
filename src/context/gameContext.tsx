import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./authContext";
import type { Game } from "../types/games";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

type GameContextType = {
  favorites: string[];
  cartItems: string[];
  games: Game[];
  loading: boolean;
  addFavorite: (gameId: string) => Promise<void>;
  addCartItem: (gameId: string) => Promise<void>;
  removeFavorite: (gameId: string) => Promise<void>;
  deleteCartItem: (gameId: string) => Promise<void>;
  removeAllFavorites: () => Promise<void>;
  fetchGame: (gameId: string) => Promise<any>;
};

const gameContext = createContext<GameContextType>({
  favorites: [],
  cartItems: [],
  games: [],
  loading: false,
  addFavorite: async () => {},
  addCartItem: async () => {},
  removeFavorite: async () => {},
  deleteCartItem: async () => {},
  removeAllFavorites: async () => {},
  fetchGame: async () => ({}),
});
export const GameProvider = ({ children }: { children: ReactNode }) => {
  //   const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchGames();
    getFavorites();
    getCartItems();
  }, [user]);

  //   const handleFavoriteToggle = (gameId: string) => {};

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await api.get("/games");
      setGames(response.data.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGame = async (gameId: string) => {
    try {
      const response = await api.get(`/games/${gameId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching game:", error);
    }
  };

  const addFavorite = async (gameId: string) => {
    // const game = await fetchGame(gameId);
    const token = localStorage.getItem("token");

    // if (!game) return;
    try {
      const response = await api.post(
        "/favourites",
        {
          gameId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFavorites((prev) => [...prev, gameId]);
      console.log("Favorite added:", response.data);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  //remove favorite
  const removeFavorite = async (gameId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await api.delete(`/favourites/${gameId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setFavorites((prev) => prev.filter((id) => id !== gameId));
      console.log("Favorite removed:", response.data);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const removeAllFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await api.delete("/favourites", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setFavorites([]);
      console.log("All favorites removed:", response.data);
    } catch (error) {
      console.error("Error removing all favorites:", error);
    }
  };

  const getFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await api.get("/favourites", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const gameIds = response.data.gameIds;
      setFavorites(gameIds);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const getCartItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const gameIds = response.data.game;
      setCartItems(gameIds);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const addCartItem = async (gameId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.post(
        "/cart",
        { gameId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCartItems((prev) => [...prev, gameId]);
      console.log("Game added to cart:", response.data);
    } catch (error) {
      console.error("Error adding game to cart:", error);
    }
  };

  const deleteCartItem = async (gameId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.delete(`/cart/${gameId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCartItems((prev) => prev.filter((id) => id !== gameId));
      console.log("Game removed from cart:", response.data);
    } catch (error) {
      console.error("Error removing game from cart:", error);
    }
  };

  return (
    <gameContext.Provider
      value={{
        favorites,
        cartItems,
        games,
        loading,
        addFavorite,
        fetchGame,
        removeFavorite,
        removeAllFavorites,
        addCartItem,
        deleteCartItem,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

export const useGameStore = () => {
  const context = useContext(gameContext);
  if (!context) {
    throw new Error("useGameStore must be used within a GameProvider");
  }
  return context;
};
