import React, { createContext, ReactNode, useContext, useState } from "react";
import { axios } from "../../axios";
import { Nullable } from "../../types";
import { UserType } from "../../types/User";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  error: null,
  user: null,
};

type AuthStateType = {
  token: Nullable<string>;
  isAuthenticated: Nullable<boolean>;
  loading: Nullable<boolean>;
  error: Nullable<string>;
  user: Nullable<UserType>;
};

type AuthContextType = {
  clearErrors: () => void;
  logout: () => void;
  login: (formData: { email: string; password: string }) => void;
  register: (formData: UserType) => void;
  loadUser: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType & AuthStateType);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthStateType>(initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    axios
      .get("/api/auth")
      .then((response) => {
        console.log(response);
        if (response.data) {
          setState({
            ...state,
            isAuthenticated: true,

            user: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("weszlo blad");
        localStorage.removeItem("token");
        setState({
          ...state,
          token: null,
          isAuthenticated: false,

          user: null,
          error,
        });
      });
  };

  // Register User

  const register = async (formData: UserType) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios
      .post("/api/users", formData, config)
      .then(async (response) => {
        await localStorage.setItem("token", response.data.token);
        setState({
          ...state,
          ...response.data,
          isAuthenticated: true,
          loading: false,
        });
      })
      .catch(async (error) => {
        await localStorage.removeItem("token");
        setState({
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: error.response.data.msg,
        });
      });
  };

  // Login User

  const login = async (formData: { email: string; password: string }) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios
      .post("/api/auth", formData, config)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setState({
          ...state,
          ...response.data,
          isAuthenticated: true,
          loading: false,
        });
      })
      .catch((error) => {
        localStorage.removeItem("token");
        setState({
          ...state,
          token: null,
          isAuthenticated: false,
          user: null,
          error: error.response?.data?.msg || "",
          loading: false,
        });
      });
  };

  // Logout

  const logout = () => {
    localStorage.removeItem("token");
    setState({
      ...state,
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
  };

  const clearErrors = () => {
    setState({ ...state, error: null });
  };

  const { token, isAuthenticated, loading, error, user } = state;

  const value: AuthContextType & AuthStateType = {
    clearErrors,
    logout,
    login,
    register,
    loadUser,
    token,
    isAuthenticated,
    loading,
    error,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
