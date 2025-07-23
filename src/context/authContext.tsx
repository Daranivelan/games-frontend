import { createContext, useContext, useState } from "react";
import type {
  AuthContextType,
  AuthFormData,
  AuthProviderProps,
  User,
} from "../types/auth";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});
const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const createUser = async (formData: AuthFormData): Promise<boolean> => {
    try {
      const response = await api.post("/signup", formData);
      if (response.status === 201) {
        console.log("User created successfully:", response.data);
        toast.success(response.data.message);
        return true;
      }
      toast.error(response.data.message);
      return false;
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user");
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
        toast.success(response.data.message);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error("Error logging in user");
      return false;
    }
  };

  return (
    <authContext.Provider
      value={{ user, isAuthenticated, loading, token, createUser, loginUser }}
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
