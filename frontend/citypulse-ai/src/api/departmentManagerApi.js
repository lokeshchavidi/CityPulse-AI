import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/endpoints";

const getComplaintQueue = async () => {
  const response = await axiosClient.get(
    API_ENDPOINTS.DEPARTMENT_MANAGER.COMPLAINT_QUEUE,
  );

  return response.data.data;
};

const getComplaintDetails = async (complaintId) => {
  const response = await axiosClient.get(
    API_ENDPOINTS.DEPARTMENT_MANAGER.COMPLAINT_DETAILS(complaintId),
  );

  return response.data.data;
};

const acceptAIRecommendation = async (complaintId) => {
  const response = await axiosClient.post(
    API_ENDPOINTS.DEPARTMENT_MANAGER.ACCEPT_AI(complaintId),
  );

  return response.data.data;
};

const getAvailableOfficers = async () => {
  const response = await axiosClient.get(
    API_ENDPOINTS.DEPARTMENT_MANAGER.OFFICERS,
  );

  return response.data.data;
};

const assignOfficer = async (complaintId, assignOfficerRequest) => {
  const response = await axiosClient.post(
    API_ENDPOINTS.DEPARTMENT_MANAGER.ASSIGN_OFFICER(complaintId),
    assignOfficerRequest,
  );

  return response.data.data;
};

const getDashboard = async () => {
  const response = await axiosClient.get(
    API_ENDPOINTS.DEPARTMENT_MANAGER.DASHBOARD,
  );

  return response.data.data;
};

const getStatistics = async () => {
  const response = await axiosClient.get(
    API_ENDPOINTS.DEPARTMENT_MANAGER.STATISTICS,
  );

  return response.data.data;
};

const overrideAIRecommendation = async (complaintId, overrideRequest) => {
  const response = await axiosClient.patch(
    API_ENDPOINTS.DEPARTMENT_MANAGER.OVERRIDE_AI(complaintId),
    overrideRequest,
  );

  return response.data.data;
};

const getActiveComplaints = async () => {
  const response = await axiosClient.get(
    API_ENDPOINTS.DEPARTMENT_MANAGER.ACTIVE_COMPLAINTS,
  );

  return response.data.data;
};

const getResolvedComplaints = async () => {
  const response = await axiosClient.get(
    API_ENDPOINTS.DEPARTMENT_MANAGER.RESOLVED_COMPLAINTS,
  );

  return response.data.data;
};

export const departmentManagerApi = {
  getComplaintQueue,
  getActiveComplaints,
  getResolvedComplaints,
  getComplaintDetails,
  acceptAIRecommendation,
  getAvailableOfficers,
  assignOfficer,
  getDashboard,
  getStatistics,
  overrideAIRecommendation,
};
