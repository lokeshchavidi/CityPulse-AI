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
import ComplaintStatusTracker from "@/components/citizen/Complaint/Details/ComplaintStatusTracker";

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

  if (loading) return <LoadingSkeleton variant="detail" />;

  if (!complaint) {
    return (
      <EmptyState
        title="Complaint not found"
        description="This complaint could not be found or isn't assigned to you."
      />
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title={`Complaint ${complaint.complaintId}`}
        subtitle="Manage the assigned complaint and update its progress."
        action={<StatusBadge status={complaint.status} />}
      />

      <ComplaintStatusTracker status={complaint.status} />

      <SectionCard title="Citizen & priority">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Citizen
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {complaint.citizenName}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              <Mail size={13} aria-hidden="true" /> Email
            </p>
            <p className="mt-1 text-sm text-slate-700">{complaint.citizenEmail}</p>
          </div>

          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              <Phone size={13} aria-hidden="true" /> Phone
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {complaint.citizenPhoneNumber}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Priority
            </p>
            <div className="mt-2">
              <StatusBadge status={complaint.priority} />
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid items-stretch gap-6 xl:grid-cols-5">
        <div className="flex flex-col gap-6 xl:col-span-3">
          <ComplaintImageCard complaint={complaint} />
          <ComplaintInformation complaint={complaint} />
        </div>

        <div className="h-full xl:col-span-2">
          <ComplaintAIAnalysis analysis={complaint.aiAnalysis} />
        </div>
      </div>

      <SectionCard
        title="Update progress"
        subtitle="Start work or mark this complaint as resolved."
      >
        {complaint.status === COMPLAINT_STATUS.ASSIGNED && (
          <div className="flex flex-col gap-4 rounded-lg border border-brand-100 bg-brand-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Ready to begin field work
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Mark this complaint as in progress when you start addressing the
                issue.
              </p>
            </div>
            <Button
              leftIcon={<PlayCircle size={18} aria-hidden="true" />}
              loading={actionLoading}
              onClick={handleStartWork}
              className="w-full sm:w-auto"
            >
              Start work
            </Button>
          </div>
        )}

        {complaint.status === COMPLAINT_STATUS.IN_PROGRESS && (
          <div className="space-y-5">
            <Textarea
              label="Resolution remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Describe how the issue was resolved..."
              rows={4}
              required
            />

            <div className="flex justify-end border-t border-slate-100 pt-4">
              <Button
                leftIcon={<CheckCircle2 size={18} aria-hidden="true" />}
                loading={actionLoading}
                onClick={handleResolve}
                className="w-full sm:w-auto"
              >
                Mark as resolved
              </Button>
            </div>
          </div>
        )}

        {(complaint.status === COMPLAINT_STATUS.RESOLVED ||
          complaint.status === COMPLAINT_STATUS.CLOSED) && (
          <div className="rounded-lg border border-green-200 bg-green-50/70 px-4 py-3 text-sm text-green-800">
            This complaint has already been resolved. No further action is
            needed.
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default OfficerComplaintDetails;
