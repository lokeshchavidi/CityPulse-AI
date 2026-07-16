/**
 * Utility class for interacting with browser localStorage.
 *
 * This utility centralizes all localStorage operations, providing a single
 * place to save, retrieve, and remove authentication-related data.
 *
 * Benefits:
 * - Avoids duplicate localStorage code across the application.
 * - Keeps storage logic separate from business logic.
 * - Makes future changes (e.g., switching to sessionStorage or encrypted storage)
 *   possible by modifying only this file.
 */

import STORAGE_KEYS from "@/constants/storageConstants";

/**
 * Saves the JWT access token in browser localStorage.
 *
 * @param {string} accessToken - JWT token received after successful authentication.
 */
const setAccessToken = (accessToken) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
};

/**
 * Retrieves the JWT access token from browser localStorage.
 *
 * @returns {string | null} The stored JWT access token if available,
 * otherwise null.
 */
const getAccessToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Removes the JWT access token from browser localStorage.
 *
 * This method is typically used during logout to ensure the user's
 * authentication token is no longer stored in the browser.
 */
const removeAccessToken = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Clears all authentication-related data from browser localStorage.
 *
 * This method is primarily used during logout to ensure the application
 * starts with a clean authentication state.
 */
const clearStorage = () => {
  removeAccessToken();
  removeUser();
};

/**
 * Stores the authenticated user's information in browser localStorage.
 *
 * Since localStorage can only store strings, the user object is converted
 * into a JSON string before being saved.
 *
 * @param {Object} user - Logged-in user's profile information.
 */
const setUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

/**
 * Retrieves the authenticated user's information from browser localStorage.
 *
 * The stored JSON string is converted back into a JavaScript object.
 *
 * @returns {Object | null} The authenticated user or null if not available.
 */
const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);

  return user ? JSON.parse(user) : null;
};

/**
 * Removes the authenticated user's information from browser localStorage.
 */
const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

const storageUtils = {
  setAccessToken,
  getAccessToken,
  removeAccessToken,

  setUser,
  getUser,
  removeUser,

  clearStorage,
};

export default storageUtils;
