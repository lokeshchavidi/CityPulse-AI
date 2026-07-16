import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/endpoints";

const getDashboard = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.ADMIN.DASHBOARD);

  return response.data.data;
};

const getAllUsers = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.ADMIN.USERS);

  return response.data.data;
};

const getUserByUserId = async (userId) => {
  const response = await axiosClient.get(API_ENDPOINTS.ADMIN.USER_DETAILS(userId));

  return response.data.data;
};

const createStaffUser = async (createStaffUserRequest) => {
  const response = await axiosClient.post(
    API_ENDPOINTS.ADMIN.CREATE_STAFF_USER,
    createStaffUserRequest,
  );

  return response.data.data;
};

const updateUserDepartment = async (userId, updateDepartmentRequest) => {
  const response = await axiosClient.patch(
    API_ENDPOINTS.ADMIN.UPDATE_USER_DEPARTMENT(userId),
    updateDepartmentRequest,
  );

  return response.data.data;
};

const enableUser = async (userId) => {
  const response = await axiosClient.patch(API_ENDPOINTS.ADMIN.ENABLE_USER(userId));

  return response.data.data;
};

const disableUser = async (userId) => {
  const response = await axiosClient.patch(API_ENDPOINTS.ADMIN.DISABLE_USER(userId));

  return response.data.data;
};

export const adminApi = {
  getDashboard,
  getAllUsers,
  getUserByUserId,
  createStaffUser,
  updateUserDepartment,
  enableUser,
  disableUser,
};
