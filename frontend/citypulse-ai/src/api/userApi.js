import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/endpoints";

/**
 * Registers a new citizen account.
 *
 * @param {Object} registerRequest - User registration request.
 * @returns {Promise<Object>} API response containing registered user details.
 */
const register = async (registerRequest) => {
  const response = await axiosClient.post(
    API_ENDPOINTS.USER.REGISTER,
    registerRequest,
  );

  return response.data.data;
};

/**
 * Retrieves the profile of the currently authenticated user.
 *
 * @returns {Promise<Object>} API response containing the user's profile.
 */
const getProfile = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.USER.PROFILE);

  return response.data.data;
};

/**
 * Updates the authenticated user's profile.
 *
 * @param {Object} updateProfileRequest - Updated profile information.
 * @returns {Promise<Object>} Updated profile response.
 */
const updateProfile = async (updateProfileRequest) => {
  const response = await axiosClient.put(
    API_ENDPOINTS.USER.PROFILE,
    updateProfileRequest,
  );

  return response.data.data;
};

/**
 * Changes the authenticated user's password.
 *
 * @param {Object} changePasswordRequest - Password change request.
 * @returns {Promise<Object>} API response.
 */
const changePassword = async (changePasswordRequest) => {
  const response = await axiosClient.put(
    API_ENDPOINTS.USER.CHANGE_PASSWORD,
    changePasswordRequest,
  );

  return response.data.data;
};

/**
 * Retrieves the citizen dashboard summary.
 *
 * @returns {Promise<Object>} Dashboard statistics.
 */
const getDashboard = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.USER.DASHBOARD);

  return response.data.data;
};

export const userApi = {
  register,
  getProfile,
  updateProfile,
  changePassword,
  getDashboard,
};
