import { aiApi } from "@/api/aiApi";

const analyzeComplaint = async (complaintId) => {
  return await aiApi.analyzeComplaint(complaintId);
};

const getAIAnalysis = async (complaintId) => {
  return await aiApi.getAIAnalysis(complaintId);
};

const aiService = {
  analyzeComplaint,
  getAIAnalysis,
};

export default aiService;
