// src/context/UserContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { AuthService } from "../services/auth";
import {
  AuthState,
  LoginFormData,
  ProfileFormData,
  RegistrationFormData,
  User,
} from "../types/auth";
import { useNavigate } from "react-router-dom";
import { ERROR_CODES } from "../hooks/ErrorCodes";

interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegistrationFormData) => Promise<void>;
  updateUserProfile:  (data: ProfileFormData) => Promise<void>;
  logout: () => void;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      AuthService.getUserProfile(token)
        .then((user) => {
          setAuthState({
            user,
            token,
            isAuthenticated: true,
          });
        })
        .catch((error) => {
          console.log(error.message)
          if (error.message === ERROR_CODES.PROFILE_NOT_EXIST) {
            setAuthState({
              user: null,
              token,
              isAuthenticated: true,
            });
            return;
          }
          localStorage.removeItem("authToken");
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        });
    }
  }, []);

  const updateUserProfile = async (data: ProfileFormData) => {
    // const token = localStorage.getItem("authToken");
    if (authState.token) {
      const token = authState.token;
      AuthService.updateUserProfile(token, data)
      .then((res) => {
        setAuthState({
          user: res,
          token: token,
          isAuthenticated: true
        });
      }).catch((error) => {
        localStorage.removeItem("authToken");
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false
        });
        console.log("something bad happened", error);
        throw error;
      });
    };


  }

  const login = async (data: LoginFormData) => {
    const { user, token } = await AuthService.login(data);
    localStorage.setItem("authToken", token);
    if (!user) {
      console.log("user profile does not exist yet for this account");
      setAuthState({
        user: null,
        token,
        isAuthenticated: true,
      });
    } else {
      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
    }
    
  };

  const register = async (data: RegistrationFormData) => {
    await AuthService.register(data);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    alert("You are now logged out")
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
