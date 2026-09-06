"use client";
import { useAuthComponent } from "./components/useAuthComponent";

export default function Profile() {
  const {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
    error,
  } = useAuthComponent();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {isAuthenticated && user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login("vlad@email.com", "password")}>
          Login
        </button>
      )}
    </div>
  );
};