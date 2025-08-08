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
import type { Review } from "../types/review";
import { toast } from "react-toastify";
import { Ticket } from "lucide-react";
import { showSnackbar } from "../utils/snackbar";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

type GameContextType = {
  favorites: string[];
  cartItems: string[];
  games: Game[];
  searchedGame: Game[];
  reviews: Review[];
  loading: boolean;
  addFavorite: (gameId: string) => Promise<void>;
  addCartItem: (gameId: string) => Promise<void>;
  removeFavorite: (gameId: string) => Promise<void>;
  deleteCartItem: (gameId: string) => Promise<void>;
  removeAllFavorites: () => Promise<void>;
  fetchGame: (gameId: string) => Promise<Game[]>;
  searchGames: (name: string) => Promise<Game[]>;
  addReview: (gameId: string, comment: string, rating: number) => Promise<void>;
  getReviews: (gameId: string) => Promise<Review[]>;
  deleteReview: (reviewId: string) => Promise<void>;
  updateReview: (
    reviewId: string,
    updatedData: Partial<Review>
  ) => Promise<void>;
};

const gameContext = createContext<GameContextType>({
  favorites: [],
  cartItems: [],
  games: [],
  searchedGame: [],
  reviews: [],
  loading: false,
  addFavorite: async () => {},
  addCartItem: async () => {},
  removeFavorite: async () => {},
  deleteCartItem: async () => {},
  removeAllFavorites: async () => {},
  fetchGame: async () => [],
  searchGames: async () => [],
  addReview: async () => {},
  getReviews: async () => [],
  deleteReview: async () => {},
  updateReview: async () => {},
});
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchedGame, setSearchedGame] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchGames();
    getFavorites();
    getCartItems();
  }, [user]);

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

  const searchGames = async (name: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/games/search?name=${name}`);
      setSearchedGame(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (gameId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add favorites.");
      return;
    }
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
      toast.success("Game added to favorites!");
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add game to favorites.");
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
      toast.success("Game removed from favorites!");
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove game from favorites.");
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
      toast.success("All favorites removed successfully!");
    } catch (error) {
      console.error("Error removing all favorites:", error);
      toast.error("Failed to remove all favorites.");
    }
  };

  const getFavorites = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const getCartItems = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const addCartItem = async (gameId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }
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
      toast.success("Game added to cart!");
    } catch (error) {
      console.error("Error adding game to cart:", error);
      toast.error("Failed to add game to cart.");
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
      toast.success("Game removed from cart!");
    } catch (error) {
      console.error("Error removing game from cart:", error);
      toast.error("Failed to remove game from cart.");
    }
  };

  const getReviews = async (gameId: string) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await api.get(`/review/${gameId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const fetchedReviews = response.data.review;
      setReviews(fetchedReviews);
      return fetchedReviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (gameId: string, comment: string, rating: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add a review.");
      return;
    }
    try {
      const response = await api.post(
        `/review/${gameId}`,
        { comment, rating, gameId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const newReview: Review = response.data.review;
      setReviews((prev) => [...prev, newReview]);
      toast.success("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review.");
    }
  };

  const deleteReview = async (reviewId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.delete(`/review/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      showSnackbar("Review deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting review:", error);
      showSnackbar("Failed to delete review.", "error");
    }
  };

  const updateReview = async (
    reviewId: string,
    updatedData: Partial<Review>
  ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.put(`/review/${reviewId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const updatedReview: Review = response.data.review;
      setReviews((prev) =>
        prev.map((review) => (review._id === reviewId ? updatedReview : review))
      );
      toast.success("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review.");
    }
  };

  return (
    <gameContext.Provider
      value={{
        favorites,
        cartItems,
        games,
        searchedGame,
        reviews,
        loading,
        addFavorite,
        fetchGame,
        searchGames,
        removeFavorite,
        removeAllFavorites,
        addCartItem,
        deleteCartItem,
        addReview,
        getReviews,
        deleteReview,
        updateReview,
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
