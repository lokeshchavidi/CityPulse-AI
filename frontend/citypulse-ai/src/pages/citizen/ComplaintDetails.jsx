import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";

import ComplaintInformation from "@/components/citizen/Complaint/Details/ComplaintInformation";
import ComplaintTimeline from "@/components/citizen/Complaint/Details/ComplaintTimeline";
import ComplaintAIAnalysis from "@/components/citizen/Complaint/Details/ComplaintAIAnalysis";
import ComplaintImageCard from "@/components/citizen/Complaint/Details/ComplaintImageCard";

import complaintService from "@/services/complaintService";
import aiService from "@/services/aiService";

const ComplaintDetails = () => {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [history, setHistory] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaintDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadComplaintDetails = async () => {
    try {
      setLoading(true);

      const [complaintResponse, historyResponse] = await Promise.all([
        complaintService.getComplaintDetails(id),
        complaintService.getComplaintHistory(id),
      ]);

      setComplaint(complaintResponse);
      setHistory(historyResponse ?? []);

      try {
        const analysisResponse = await aiService.getAIAnalysis(id);
        setAiAnalysis(analysisResponse);
      } catch {
        setAiAnalysis(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!complaint) {
    return (
      <EmptyState
        title="Complaint not found"
        description="The requested complaint could not be found."
      />
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={`Complaint ${complaint.complaintId}`}
        subtitle="View complaint information, AI analysis and complete activity history."
      />

      {/* Image + AI Analysis */}
      <div className="grid gap-8 lg:grid-cols-2">
        <ComplaintImageCard complaint={complaint} />

        <ComplaintAIAnalysis analysis={aiAnalysis} />
      </div>

      {/* Complaint Details */}
      <ComplaintInformation complaint={complaint} />

      {/* Timeline */}
      <ComplaintTimeline history={history} />
    </div>
  );
};

export default ComplaintDetails;
