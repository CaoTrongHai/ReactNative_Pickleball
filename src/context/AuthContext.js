import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: null,
    isLoading: true,
    isSignedIn: false,
  });

  // Load auth state on mount
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      setAuthState({
        username,
        isLoading: false,
        isSignedIn: !!username,
      });
    } catch (error) {
      setAuthState({
        username: null,
        isLoading: false,
        isSignedIn: false,
      });
    }
  };

  const signIn = async (token, user) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("username", user.username);
      await AsyncStorage.setItem("userId", user._id);

      setAuthState({
        username: user.username,
        isLoading: false,
        isSignedIn: true,
      });

      return user.username;
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("userId");

      setAuthState({
        username: null,
        isLoading: false,
        isSignedIn: false,
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signOut,
        refreshAuth: loadAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
