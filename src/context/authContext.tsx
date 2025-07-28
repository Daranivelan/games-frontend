import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextType, AuthFormData, User } from "../types/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});
const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

      getCurrentUser();
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await api.get("/current");
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error: any) {
      console.error("Error fetching current user:", error);
    }
  };

  const createUser = async (formData: AuthFormData): Promise<boolean> => {
    try {
      const response = await api.post("/signup", formData);
      if (response.status === 201) {
        console.log("User created successfully:", response.data);
        toast.success(response.data.message);
        navigate("/login");
        return true;
      }
      toast.error(response.data.message);
      return false;
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.response?.data?.message || "Error creating user");
      return false;
    }
  };

  const loginUser = async (
    formData: Omit<AuthFormData, "username">
  ): Promise<boolean> => {
    try {
      const response = await api.post("/login", formData);
      if (response.status === 201) {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate("/");
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Error logging in user:", error);
      toast.error(error.response?.data?.message || "Error logging in user");
      return false;
    }
  };

  const logoutUser = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <authContext.Provider
      value={{ user, loading, token, createUser, loginUser, logoutUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
