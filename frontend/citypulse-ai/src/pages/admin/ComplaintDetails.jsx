import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Hash } from "lucide-react";
import toast from "react-hot-toast";

import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";
import SectionCard from "@/components/dashboard/SectionCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Button from "@/components/common/Button/Button";
import Select from "@/components/forms/Select";

import ComplaintInformation from "@/components/citizen/Complaint/Details/ComplaintInformation";
import ComplaintTimeline from "@/components/citizen/Complaint/Details/ComplaintTimeline";
import ComplaintAIAnalysis from "@/components/citizen/Complaint/Details/ComplaintAIAnalysis";
import ComplaintImageCard from "@/components/citizen/Complaint/Details/ComplaintImageCard";
import ComplaintStatusTracker from "@/components/citizen/Complaint/Details/ComplaintStatusTracker";

import complaintService from "@/services/complaintService";
import departmentService from "@/services/departmentService";
import aiService from "@/services/aiService";
import dateUtils from "@/utils/dateUtils";

const AdminComplaintDetails = () => {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [history, setHistory] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [assigning, setAssigning] = useState(false);
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

      if (complaintResponse?.needsManualAssignment) {
        const departmentResponse = await departmentService.getAllDepartments();
        setDepartments(departmentResponse ?? []);
      } else {
        setDepartments([]);
      }

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

  const handleAssignDepartment = async (event) => {
    event.preventDefault();

    if (!departmentId) {
      toast.error("Select a department.");
      return;
    }

    try {
      setAssigning(true);
      await complaintService.assignDepartment(id, Number(departmentId));
      toast.success("Department assigned. A manager can now take this complaint.");
      setDepartmentId("");
      await loadComplaintDetails();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Couldn't assign the department.",
      );
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton cards={4} />;
  }

  if (!complaint) {
    return (
      <EmptyState
        title="Complaint not found"
        description="The requested complaint could not be found."
        action={
          <Link to="/admin/complaints">
            <Button variant="outline">Back to all complaints</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Link
            to="/admin/complaints"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand-800"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to all complaints
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
            {complaint.citizenName ? ` · ${complaint.citizenName}` : ""}
            {complaint.departmentName ? ` · ${complaint.departmentName}` : ""}
          </p>
        </div>
      </div>

      <ComplaintStatusTracker status={complaint.status} />

      {complaint.needsManualAssignment && (
        <SectionCard
          title="Assign a department"
          subtitle="Automatic analysis failed, so this complaint is not in any department queue yet."
        >
          <form
            onSubmit={handleAssignDepartment}
            className="flex flex-col gap-4 sm:flex-row sm:items-end"
          >
            <div className="flex-1">
              <Select
                label="Department"
                name="departmentId"
                value={departmentId}
                onChange={(event) => setDepartmentId(event.target.value)}
                options={departments.map((department) => ({
                  value: department.departmentId,
                  label: department.departmentName,
                }))}
                placeholder="Select a department"
                required
              />
            </div>
            <Button
              type="submit"
              loading={assigning}
              className="w-full sm:w-auto"
            >
              Assign department
            </Button>
          </form>
        </SectionCard>
      )}

      <div className="grid items-stretch gap-6 xl:grid-cols-5">
        <div className="flex flex-col gap-6 xl:col-span-3">
          <ComplaintImageCard complaint={complaint} />
          <ComplaintInformation complaint={complaint} />
        </div>

        <div className="h-full xl:col-span-2">
          <ComplaintAIAnalysis
            analysis={aiAnalysis}
            emptyTitle={
              complaint.needsManualAssignment
                ? "AI analysis failed"
                : "AI analysis pending"
            }
            emptyDescription={
              complaint.needsManualAssignment
                ? "Assign a department above so a manager can take this complaint."
                : "Analysis will appear once the system has classified this complaint."
            }
          />
        </div>
      </div>

      <ComplaintTimeline history={history} />
    </div>
  );
};

export default AdminComplaintDetails;
