// src/context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getUserId } from '../services/api';

// Define the shape of the context state
interface UserContextType {
  user: string | null;
  login: (string: string) => void;
  logout: () => void;
}

// Create the UserContext with an initial default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// UserContext Provider to wrap around your app
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<string | null>(null);

  // Check for the stored token and validate on initial load
  //  useEffect(() => {
    useEffect(() => {
      // console.log('i fire once');
      // Get user data from localStorage if available
      const storedUser = localStorage.getItem('authToken');
      if (!storedUser) {
        console.log("no stored user")// setUser(storedUser); // Set user data if it exists in localStorage
      } else {
        // Optionally, validate the token here by calling an API (e.g., getUserId)
        (async () => {
          try {
            const response = await getUserId();
            if (response) {
              const data = response;
              setUser(data.userName); // Store the user in state
              localStorage.setItem('user', JSON.stringify(data)); // Persist user data in localStorage
            } else {
              localStorage.removeItem('user');
            }
          } catch (error) {
            localStorage.removeItem('user');
          }
        })();
      }
    }, []);

  const login = (userData: string) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
