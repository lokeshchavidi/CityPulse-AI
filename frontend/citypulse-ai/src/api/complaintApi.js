import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/endpoints";

const createComplaint = async (formData) => {
  // Let the browser set Content-Type (including the multipart boundary)
  // automatically — manually setting "multipart/form-data" without a
  // boundary breaks the request.
  const response = await axiosClient.post(
    API_ENDPOINTS.COMPLAINT.CREATE,
    formData,
  );

  return response.data.data;
};

const getMyComplaints = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.COMPLAINT.MY_COMPLAINTS);

  return response.data.data;
};

const getAllComplaints = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.COMPLAINT.ALL);

  return response.data.data;
};

const getComplaintDetails = async (complaintId) => {
  const response = await axiosClient.get(
    API_ENDPOINTS.COMPLAINT.DETAILS(complaintId),
  );

  return response.data.data;
};

const getComplaintHistory = async (complaintId) => {
  const response = await axiosClient.get(
    API_ENDPOINTS.COMPLAINT.HISTORY(complaintId),
  );

  return response.data.data;
};

const assignDepartment = async (complaintId, departmentRequest) => {
  const response = await axiosClient.put(
    API_ENDPOINTS.COMPLAINT.ASSIGN_DEPARTMENT(complaintId),
    departmentRequest,
  );

  return response.data.data;
};

const assignOfficer = async (complaintId, officerRequest) => {
  const response = await axiosClient.put(
    API_ENDPOINTS.COMPLAINT.ASSIGN_OFFICER(complaintId),
    officerRequest,
  );

  return response.data.data;
};

const updateStatus = async (complaintId, statusRequest) => {
  const response = await axiosClient.put(
    API_ENDPOINTS.COMPLAINT.UPDATE_STATUS(complaintId),
    statusRequest,
  );

  return response.data.data;
};

const updatePriority = async (complaintId, priorityRequest) => {
  const response = await axiosClient.put(
    API_ENDPOINTS.COMPLAINT.UPDATE_PRIORITY(complaintId),
    priorityRequest,
  );

  return response.data.data;
};

export const complaintApi = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintDetails,
  getComplaintHistory,
  assignDepartment,
  assignOfficer,
  updateStatus,
  updatePriority,
};
