import { userApi } from "@/api/userApi";

/**
 * Registers a new citizen.
 *
 * @param {Object} registerRequest - Registration details.
 * @returns {Promise<Object>} Registration response.
 */
const register = async (registerRequest) => {
  return await userApi.register(registerRequest);
};

/**
 * Retrieves the authenticated user's profile.
 *
 * @returns {Promise<Object>} User profile.
 */
const getProfile = async () => {
  return await userApi.getProfile();
};

/**
 * Updates the authenticated user's profile.
 *
 * @param {Object} updateProfileRequest - Updated profile details.
 * @returns {Promise<Object>} Updated profile.
 */
const updateProfile = async (updateProfileRequest) => {
  return await userApi.updateProfile(updateProfileRequest);
};

/**
 * Changes the authenticated user's password.
 *
 * @param {Object} changePasswordRequest - Password change request.
 * @returns {Promise<Object>} API response.
 */
const changePassword = async (changePasswordRequest) => {
  return await userApi.changePassword(changePasswordRequest);
};

/**
 * Retrieves the citizen dashboard summary.
 *
 * @returns {Promise<Object>} Dashboard data.
 */
const getDashboard = async () => {
  return await userApi.getDashboard();
};

const getStatistics = async () => {
  return await userApi.getStatistics();
};

const userService = {
  register,
  getProfile,
  updateProfile,
  changePassword,
  getDashboard,
  getStatistics,
};

export default userService;
