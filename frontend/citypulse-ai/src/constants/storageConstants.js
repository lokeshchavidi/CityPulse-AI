/**
 * Storage keys used throughout the application for browser localStorage.
 *
 * Keeping all storage keys in one place avoids hardcoded (magic) strings
 * across the project. If a key name needs to change in the future, it can
 * be updated here without modifying multiple files.
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: "citypulse_access_token",
  USER: "citypulse_user",
};

export default STORAGE_KEYS;
