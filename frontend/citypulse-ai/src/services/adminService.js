import { adminApi } from "@/api/adminApi";

const getDashboard = async () => {
  return await adminApi.getDashboard();
};

const getAllUsers = async () => {
  return await adminApi.getAllUsers();
};

const getUserByUserId = async (userId) => {
  return await adminApi.getUserByUserId(userId);
};

/**
 * Creates an Officer, Department Manager, or Admin account. Citizens can
 * never be created through this — they self-register.
 */
const createStaffUser = async (staffUserPayload) => {
  return await adminApi.createStaffUser(staffUserPayload);
};

const updateUserDepartment = async (userId, departmentId) => {
  return await adminApi.updateUserDepartment(userId, { departmentId });
};

const enableUser = async (userId) => {
  return await adminApi.enableUser(userId);
};

const disableUser = async (userId) => {
  return await adminApi.disableUser(userId);
};

const adminService = {
  getDashboard,
  getAllUsers,
  getUserByUserId,
  createStaffUser,
  updateUserDepartment,
  enableUser,
  disableUser,
};

export default adminService;
