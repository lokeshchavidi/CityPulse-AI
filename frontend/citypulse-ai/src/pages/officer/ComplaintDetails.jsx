import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mail, Phone, PlayCircle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import ComplaintImageCard from "@/components/citizen/Complaint/Details/ComplaintImageCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";
import Button from "@/components/common/Button/Button";
import Textarea from "@/components/forms/Textarea";

import ComplaintInformation from "@/components/citizen/Complaint/Details/ComplaintInformation";
import ComplaintAIAnalysis from "@/components/citizen/Complaint/Details/ComplaintAIAnalysis";

import officerService from "@/services/officerService";
import { COMPLAINT_STATUS } from "@/constants/complaintStatus";

const OfficerComplaintDetails = () => {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadComplaint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadComplaint = async () => {
    try {
      setLoading(true);

      const response = await officerService.getComplaintDetails(id);

      setComplaint(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartWork = async () => {
    try {
      setActionLoading(true);

      await officerService.startWork(id);

      toast.success("Work started on this complaint.");

      await loadComplaint();
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Couldn't start work.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleResolve = async () => {
    if (!remarks.trim()) {
      toast.error("Resolution remarks are required.");
      return;
    }

    try {
      setActionLoading(true);

      await officerService.resolveComplaint(id, remarks.trim());

      toast.success("Complaint marked as resolved.");
      setRemarks("");

      await loadComplaint();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Couldn't resolve complaint.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoadingSkeleton />;

  if (!complaint) {
    return (
      <EmptyState
        title="Complaint not found"
        description="This complaint could not be found or isn't assigned to you."
      />
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={`Complaint ${complaint.complaintId}`}
        subtitle="Manage the assigned complaint and update its progress."
      />

      <SectionCard title="Citizen & Priority">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Citizen</p>
            <p className="mt-1 font-semibold text-slate-900">
              {complaint.citizenName}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Mail size={15} /> Email
            </p>
            <p className="mt-1 text-slate-700">{complaint.citizenEmail}</p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Phone size={15} /> Phone
            </p>
            <p className="mt-1 text-slate-700">
              {complaint.citizenPhoneNumber}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Priority</p>
            <div className="mt-2">
              <StatusBadge status={complaint.priority} />
            </div>
          </div>
        </div>
      </SectionCard>

      <ComplaintInformation complaint={complaint} />

      <ComplaintAIAnalysis analysis={complaint.aiAnalysis} />

      <SectionCard
        title="Update Progress"
        subtitle="Start work or mark this complaint as resolved."
      >
        {complaint.status === COMPLAINT_STATUS.ASSIGNED && (
          <Button
            leftIcon={<PlayCircle size={18} />}
            loading={actionLoading}
            onClick={handleStartWork}
          >
            Start Work
          </Button>
        )}

        {complaint.status === COMPLAINT_STATUS.IN_PROGRESS && (
          <div className="space-y-4">
            <Textarea
              label="Resolution Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Describe how the issue was resolved..."
              rows={4}
              required
            />

            <Button
              leftIcon={<CheckCircle2 size={18} />}
              loading={actionLoading}
              onClick={handleResolve}
            >
              Mark as Resolved
            </Button>
          </div>
        )}

        {(complaint.status === COMPLAINT_STATUS.RESOLVED ||
          complaint.status === COMPLAINT_STATUS.CLOSED) && (
          <p className="text-sm text-slate-500">
            This complaint has already been resolved. No further action is
            needed.
          </p>
        )}
      </SectionCard>
    </div>
  );
};

export default OfficerComplaintDetails;
