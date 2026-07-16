import { departmentApi } from "@/api/departmentApi";

const getAllDepartments = async () => {
  return await departmentApi.getAllDepartments();
};

const createDepartment = async (departmentName, description) => {
  return await departmentApi.createDepartment({ departmentName, description });
};

const departmentService = {
  getAllDepartments,
  createDepartment,
};

export default departmentService;
