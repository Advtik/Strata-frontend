import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  console.log("AUTH CONTEXT RENDER");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {
      console.log("CHECK AUTH START");

      try {

        const res = await apiClient.get("/auth/me");
        console.log("AUTH RESPONSE:", res.data);

        if (res.data.error) {

          setUser(null);

        } else {

          setUser(res.data);

        }

      } catch (error) {

        setUser(null);

      } finally {

        setLoading(false);
        console.log("SETTING LOADING FALSE");

      }
      

    };
    checkAuth()

  }, []);

  const logout = () => {

    setUser(null);

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);