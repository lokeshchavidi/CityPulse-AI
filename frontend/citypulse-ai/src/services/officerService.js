import { officerApi } from "@/api/officerApi";

const getMyAssignedComplaints = async () => {
  return await officerApi.getMyAssignedComplaints();
};

const getComplaintDetails = async (complaintId) => {
  return await officerApi.getComplaintDetails(complaintId);
};

const startWork = async (complaintId) => {
  return await officerApi.startWork(complaintId);
};

const resolveComplaint = async (complaintId, remarks) => {
  return await officerApi.resolveComplaint(complaintId, { remarks });
};

const getDashboard = async () => {
  return await officerApi.getDashboard();
};

const getStatistics = async () => {
  return await officerApi.getStatistics();
};

const officerService = {
  getMyAssignedComplaints,
  getComplaintDetails,
  startWork,
  resolveComplaint,
  getDashboard,
  getStatistics,
};

export default officerService;
