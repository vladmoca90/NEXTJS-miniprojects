import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export const useAuthComponent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const loggedInUser: User = {
        id: 1,
        name: "Vlad",
        email,
      };

      setUser(loggedInUser);
    } catch (err) {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
    error,
  };
};