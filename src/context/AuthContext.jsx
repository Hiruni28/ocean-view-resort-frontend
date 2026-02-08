import React, { createContext, useState, useEffect } from "react";
import authApi from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null); // Logged-in user info
  const [loading, setLoading] = useState(true);

  // Load logged user details if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await authApi.getLoggedUser();
          setUser(response.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Login function
  const login = async (credentials) => {
    const response = await authApi.login(credentials);

    const jwt = response.data.token;

    localStorage.setItem("token", jwt);
    setToken(jwt);

    // fetch logged user
    const userResp = await authApi.getLoggedUser();
    setUser(userResp.data);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
