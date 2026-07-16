/**
 * Central place for reading Vite environment variables so the rest of the
 * app never touches `import.meta.env` directly.
 */
const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1",
  IS_DEV: import.meta.env.DEV,
};

export default ENV;
