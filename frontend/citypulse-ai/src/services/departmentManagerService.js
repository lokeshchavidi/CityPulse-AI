import { departmentManagerApi } from "@/api/departmentManagerApi";

const getComplaintQueue = async () => {
  return await departmentManagerApi.getComplaintQueue();
};

const getComplaintDetails = async (complaintId) => {
  return await departmentManagerApi.getComplaintDetails(complaintId);
};

const acceptAIRecommendation = async (complaintId) => {
  return await departmentManagerApi.acceptAIRecommendation(complaintId);
};

const getAvailableOfficers = async () => {
  return await departmentManagerApi.getAvailableOfficers();
};

const assignOfficer = async (complaintId, officerId) => {
  return await departmentManagerApi.assignOfficer(complaintId, { officerId });
};

const getDashboard = async () => {
  return await departmentManagerApi.getDashboard();
};

const getStatistics = async () => {
  return await departmentManagerApi.getStatistics();
};

const overrideAIRecommendation = async (complaintId, overridePayload) => {
  return await departmentManagerApi.overrideAIRecommendation(
    complaintId,
    overridePayload,
  );
};

const getActiveComplaints = () => departmentManagerApi.getActiveComplaints();

const getResolvedComplaints = () =>
  departmentManagerApi.getResolvedComplaints();

const departmentManagerService = {
  getComplaintQueue,
  getComplaintDetails,
  acceptAIRecommendation,
  getAvailableOfficers,
  assignOfficer,
  getDashboard,
  getStatistics,
  overrideAIRecommendation,
  getActiveComplaints,
  getResolvedComplaints,
};

export default departmentManagerService;
