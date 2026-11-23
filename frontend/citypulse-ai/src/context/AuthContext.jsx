import { createContext, useState, useEffect } from "react";

import authService from "@/services/authService";
import userService from "@/services/userService";
import storageUtils from "@/utils/storageUtils";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Hydrate from localStorage so protected pages can render immediately
  // while the token is revalidated in the background.
  const [accessToken, setAccessToken] = useState(() => storageUtils.getAccessToken());
  const [user, setUser] = useState(() => storageUtils.getUser());
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!accessToken;

  const login = async (loginRequest) => {
    return performLogin(authService.login, loginRequest);
  };

  const loginAsStaff = async (loginRequest) => {
    return performLogin(authService.staffLogin, loginRequest);
  };

  const performLogin = async (authenticateFn, loginRequest) => {
    try {
      const loginResponse = await authenticateFn(loginRequest);

      const nextAccessToken = loginResponse.accessToken;

      storageUtils.setAccessToken(nextAccessToken);
      setAccessToken(nextAccessToken);

      const nextUser = await userService.getProfile();

      storageUtils.setUser(nextUser);
      setUser(nextUser);

      return nextUser;
    } catch (error) {
      storageUtils.clearStorage();

      setAccessToken(null);
      setUser(null);

      throw error;
    }
  };

  const initializeAuth = async () => {
    try {
      const storedToken = storageUtils.getAccessToken();

      if (!storedToken) {
        setAccessToken(null);
        setUser(null);
        return;
      }

      setAccessToken(storedToken);

      const cachedUser = storageUtils.getUser();
      if (cachedUser) {
        setUser(cachedUser);
      }

      const freshUser = await userService.getProfile();

      storageUtils.setUser(freshUser);
      setUser(freshUser);
    } catch (error) {
      storageUtils.clearStorage();

      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const register = async (registerRequest) => {
    return await userService.register(registerRequest);
  };

  const refreshUser = async () => {
    try {
      const updatedUser = await userService.getProfile();

      storageUtils.setUser(updatedUser);

      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    storageUtils.clearStorage();

    setAccessToken(null);
    setUser(null);
  };

  const value = {
    accessToken,
    user,
    loading,
    isAuthenticated,

    login,
    loginAsStaff,
    register,

    refreshUser,

    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
