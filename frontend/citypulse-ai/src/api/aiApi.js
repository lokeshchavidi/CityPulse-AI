import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/endpoints";

const analyzeComplaint = async (complaintId) => {
  const response = await axiosClient.post(
    API_ENDPOINTS.AI.ANALYZE(complaintId),
  );

  return response.data.data;
};

const getAIAnalysis = async (complaintId) => {
  const response = await axiosClient.get(API_ENDPOINTS.AI.DETAILS(complaintId));

  return response.data.data;
};

export const aiApi = {
  analyzeComplaint,
  getAIAnalysis,
};
