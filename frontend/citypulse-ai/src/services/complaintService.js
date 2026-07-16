import { complaintApi } from "@/api/complaintApi";

const createComplaint = async (formData) => {
  return await complaintApi.createComplaint(formData);
};

const getMyComplaints = async () => {
  return await complaintApi.getMyComplaints();
};

const getAllComplaints = async () => {
  return await complaintApi.getAllComplaints();
};

const getComplaintDetails = async (complaintId) => {
  return await complaintApi.getComplaintDetails(complaintId);
};

const getComplaintHistory = async (complaintId) => {
  return await complaintApi.getComplaintHistory(complaintId);
};

const assignDepartment = async (complaintId, departmentId) => {
  return await complaintApi.assignDepartment(complaintId, { departmentId });
};

const assignOfficer = async (complaintId, officerId) => {
  return await complaintApi.assignOfficer(complaintId, { officerId });
};

const updateStatus = async (complaintId, status) => {
  return await complaintApi.updateStatus(complaintId, { status });
};

const updatePriority = async (complaintId, priority) => {
  return await complaintApi.updatePriority(complaintId, { priority });
};

const complaintService = {
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

export default complaintService;
