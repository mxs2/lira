import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  // Check if user is already logged in from localStorage
  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Signup function with proper error handling
  const signup = async (name, email, password) => {
    try {
      // Validate inputs
      if (!name || !email || !password) {
        setAuthError("All fields are required");
        return false;
      }

      // Name validation
      if (name.length < 2) {
        setAuthError("Name must be at least 2 characters");
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setAuthError("Please enter a valid email address");
        return false;
      }

      // Password validation (minimum 6 characters)
      if (password.length < 6) {
        setAuthError("Password must be at least 6 characters");
        return false;
      }

      // Mock API call - in a real app, this would be an actual API request
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For demo purposes, we'll create a new user
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        joinDate: new Date().toISOString(),
        profilePicture: null,
      };

      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthError("");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      setAuthError("An unexpected error occurred. Please try again.");
      return false;
    }
  };

  // Login function with proper error handling
  const login = async (email, password) => {
    try {
      // Validate inputs
      if (!email || !password) {
        setAuthError("Email and password are required");
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setAuthError("Please enter a valid email address");
        return false;
      }

      // Password validation (minimum 6 characters)
      if (password.length < 6) {
        setAuthError("Password must be at least 6 characters");
        return false;
      }

      // Mock API call - in a real app, this would be an actual API request
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For demo purposes, we'll accept any valid email with password >= 6 chars
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        joinDate: new Date().toISOString(),
        profilePicture: null,
      };

      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthError("");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("An unexpected error occurred. Please try again.");
      return false;
    }
  };

  const logout = () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUserProfile = (updates) => {
    try {
      if (!currentUser) return false;

      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error("Update profile error:", error);
      return false;
    }
  };

  const clearError = () => {
    setAuthError("");
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateUserProfile,
    authError,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
