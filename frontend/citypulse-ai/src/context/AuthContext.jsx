import { createContext, useState, useEffect } from "react";

import authService from "@/services/authService";
import userService from "@/services/userService";
import storageUtils from "@/utils/storageUtils";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null); // used to store the jwt
  const [user, setUser] = useState(null); // use to store the user data when profile is loaded
  const [loading, setLoading] = useState(true); // Tracks the progress of authentication-related operations.

  /**
   * Indicates whether a user is currently authenticated.
   */
  const isAuthenticated = !!accessToken;

  /**
   * Authenticates the user and initializes the application session.
   *
   * Workflow:
   * 1. Authenticate the user and receive a JWT.
   * 2. Store the JWT in localStorage.
   * 3. Retrieve the authenticated user's profile.
   * 4. Store the user information in localStorage.
   * 5. Update the authentication context.
   *
   * @param {Object} loginRequest - User login credentials.
   * @returns {Promise<Object>} Authenticated user's profile.
   */
  const login = async (loginRequest) => {
    return performLogin(authService.login, loginRequest);
  };

  /**
   * Authenticates a staff member (Officer, Department Manager, Admin).
   * Mirrors login() exactly, just against the staff-only backend endpoint.
   */
  const loginAsStaff = async (loginRequest) => {
    return performLogin(authService.staffLogin, loginRequest);
  };

  const performLogin = async (authenticateFn, loginRequest) => {
    try {
      const loginResponse = await authenticateFn(loginRequest);

      const accessToken = loginResponse.accessToken;

      storageUtils.setAccessToken(accessToken);

      const user = await userService.getProfile();

      storageUtils.setUser(user);

      setAccessToken(accessToken);
      setUser(user);

      return user;
    } catch (error) {
      storageUtils.clearStorage();

      setAccessToken(null);
      setUser(null);

      throw error;
    }
  };

  /**
   * Initializes the authentication state when the application starts.
   *
   * Workflow:
   * 1. Retrieve the stored JWT from localStorage.
   * 2. If no JWT exists, keep the user logged out.
   * 3. Validate the JWT by requesting the authenticated user's profile.
   * 4. Restore the authentication context if the token is valid.
   * 5. Clear the session if the token is invalid or expired.
   */
  const initializeAuth = async () => {
    try {
      const accessToken = storageUtils.getAccessToken();

      // No previous session found
      if (!accessToken) {
        return;
      }

      // Validate the stored token by retrieving the current user's profile
      const user = await userService.getProfile();

      // Restore authentication state
      setAccessToken(accessToken);
      setUser(user);
    } catch (error) {
      // Stored token is invalid or expired
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

  /**
   * Terminates the current user session.
   *
   * Removes all authentication-related data from browser storage
   * and resets the authentication context.
   */
  /**
   * Registers a new citizen account.
   *
   * Registration does not authenticate the user automatically — the caller
   * is expected to redirect to the login page afterwards.
   *
   * @param {Object} registerRequest - New citizen's registration details.
   * @returns {Promise<Object>} Newly created user profile.
   */
  const register = async (registerRequest) => {
    return await userService.register(registerRequest);
  };

  /**
   * Reload the authenticated user's profile.
   * Used after updating profile information.
   */
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
    // Remove authentication data from browser storage
    storageUtils.clearStorage();

    // Reset authentication context
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
