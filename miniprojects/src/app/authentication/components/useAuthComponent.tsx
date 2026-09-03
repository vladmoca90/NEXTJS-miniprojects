import { useState } from "react";

export const useAuthComponent = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Example login logic
      const loggedInUser = {
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
