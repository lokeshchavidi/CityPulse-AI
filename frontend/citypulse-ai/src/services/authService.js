import { authApi } from "@/api/authApi"; // api layer to communicate with the spring boot application

/**
 * Authenticates a citizen using the provided credentials.
 *
 * @param {Object} loginRequest - User login credentials.
 * @returns {Promise<Object>} Login response containing the JWT.
 */
const login = async (loginRequest) => {
  return await authApi.login(loginRequest);
};

/**
 * Authenticates a staff member (Officer, Department Manager, Admin) using
 * the provided credentials.
 *
 * @param {Object} loginRequest - Staff login credentials.
 * @returns {Promise<Object>} Login response containing the JWT.
 */
const staffLogin = async (loginRequest) => {
  return await authApi.staffLogin(loginRequest);
};

const authService = {
  // exposing the whole service object instead of many functions individually
  login,
  staffLogin,
};

export default authService;
