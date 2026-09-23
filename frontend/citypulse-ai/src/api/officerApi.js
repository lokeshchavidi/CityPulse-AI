import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/endpoints";

const getMyAssignedComplaints = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.OFFICER.COMPLAINTS);

  return response.data.data;
};

const getComplaintDetails = async (complaintId) => {
  const response = await axiosClient.get(
    API_ENDPOINTS.OFFICER.COMPLAINT_DETAILS(complaintId),
  );

  return response.data.data;
};

const startWork = async (complaintId) => {
  const response = await axiosClient.patch(
    API_ENDPOINTS.OFFICER.START_WORK(complaintId),
  );

  return response.data.data;
};

const resolveComplaint = async (complaintId, resolveRequest) => {
  const response = await axiosClient.post(
    API_ENDPOINTS.OFFICER.RESOLVE(complaintId),
    resolveRequest,
  );

  return response.data.data;
};

const getDashboard = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.OFFICER.DASHBOARD);

  return response.data.data;
};

const getStatistics = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.OFFICER.STATISTICS);

  return response.data.data;
};

export const officerApi = {
  getMyAssignedComplaints,
  getComplaintDetails,
  startWork,
  resolveComplaint,
  getDashboard,
  getStatistics,
};
