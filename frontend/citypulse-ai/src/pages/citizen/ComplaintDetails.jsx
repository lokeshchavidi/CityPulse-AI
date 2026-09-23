import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Hash } from "lucide-react";

import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Button from "@/components/common/Button/Button";

import ComplaintInformation from "@/components/citizen/Complaint/Details/ComplaintInformation";
import ComplaintTimeline from "@/components/citizen/Complaint/Details/ComplaintTimeline";
import ComplaintAIAnalysis from "@/components/citizen/Complaint/Details/ComplaintAIAnalysis";
import ComplaintImageCard from "@/components/citizen/Complaint/Details/ComplaintImageCard";
import ComplaintStatusTracker from "@/components/citizen/Complaint/Details/ComplaintStatusTracker";

import complaintService from "@/services/complaintService";
import aiService from "@/services/aiService";
import dateUtils from "@/utils/dateUtils";

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
      setComplaint(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton cards={4} />;
  }

  if (!complaint) {
    return (
      <EmptyState
        title="Complaint not found"
        description="The requested complaint could not be found or you don't have access."
        action={
          <Link to="/citizen/complaints">
            <Button variant="outline">Back to My Complaints</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Link
            to="/citizen/complaints"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand-800"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to My Complaints
          </Link>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
              <Hash size={12} aria-hidden="true" />
              {complaint.complaintId}
            </span>
            <StatusBadge status={complaint.status} />
            {complaint.priority && <StatusBadge status={complaint.priority} />}
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {complaint.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Filed {dateUtils.formatDateTime(complaint.createdAt)}
            {complaint.departmentName ? ` · ${complaint.departmentName}` : ""}
          </p>
        </div>
      </div>

      <ComplaintStatusTracker status={complaint.status} />

      {/* Left: image + details | Right: AI stretched to match column height */}
      <div className="grid items-stretch gap-6 xl:grid-cols-5">
        <div className="flex flex-col gap-6 xl:col-span-3">
          <ComplaintImageCard complaint={complaint} />
          <ComplaintInformation complaint={complaint} />
        </div>

        <div className="h-full xl:col-span-2">
          <ComplaintAIAnalysis analysis={aiAnalysis} />
        </div>
      </div>

      <ComplaintTimeline history={history} />
    </div>
  );
};

export default ComplaintDetails;
