export interface AuthContextType {
  user: User | null;
  // isAuthenticated: boolean;
  loginUser: (formData: Omit<AuthFormData, "username">) => Promise<boolean>;
  createUser: (formData: AuthFormData) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  loading: boolean;
  token: string | null;
}

// Define user type
export interface User {
  _id: string;
  username: string;
  email: string;
}

// Define signup data type
export interface AuthFormData {
  username: string;
  email: string;
  password: string;
}

// Define props type for AuthProvider
