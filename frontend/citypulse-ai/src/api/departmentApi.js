import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/endpoints";

const getAllDepartments = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.DEPARTMENT.ALL);

  return response.data.data;
};

const createDepartment = async (createDepartmentRequest) => {
  const response = await axiosClient.post(
    API_ENDPOINTS.DEPARTMENT.CREATE,
    createDepartmentRequest,
  );

  return response.data.data;
};

export const departmentApi = {
  getAllDepartments,
  createDepartment,
};
