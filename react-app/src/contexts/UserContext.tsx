// src/context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AuthService } from '../services/auth';
import { AuthState, LoginFormData, RegistrationFormData, User } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegistrationFormData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      AuthService.getUserProfile(token)
        .then((user) => {
          setAuthState({
            user,
            token,
            isAuthenticated: true,
          });
        })
        .catch(() => {
          localStorage.removeItem('authToken');
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        });
    }
  }, []);

  const login = async (data: LoginFormData) => {
    const { user, token } = await AuthService.login(data);
    localStorage.setItem('authToken', token);
    setAuthState({
      user,
      token,
      isAuthenticated: true,
    });
  };

  const register = async (data: RegistrationFormData) => {
    await AuthService.register(data);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};