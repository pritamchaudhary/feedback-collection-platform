"use client";
import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setName(localStorage.getItem("name"));
  }, []);

  const login = (token, name) => {
    setToken(token);
    setName(name);
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
  };

  const logout = () => {
    setToken(null);
    setName(null);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider value={{ token, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);