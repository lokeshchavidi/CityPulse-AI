import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mail, Phone, Sparkles, UserCheck, PencilLine } from "lucide-react";
import toast from "react-hot-toast";

// Add this import with the other imports
import ComplaintImageCard from "@/components/citizen/Complaint/Details/ComplaintImageCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";
import Button from "@/components/common/Button/Button";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";

import ComplaintInformation from "@/components/citizen/Complaint/Details/ComplaintInformation";
import ComplaintAIAnalysis from "@/components/citizen/Complaint/Details/ComplaintAIAnalysis";

import departmentManagerService from "@/services/departmentManagerService";
import departmentService from "@/services/departmentService";
import { COMPLAINT_PRIORITY_OPTIONS } from "@/constants/complaintPriority";
import { COMPLAINT_STATUS } from "@/constants/complaintStatus";

const ReviewComplaint = () => {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [selectedOfficerId, setSelectedOfficerId] = useState("");

  const [overrideForm, setOverrideForm] = useState({
    departmentId: "",
    priority: "",
    remarks: "",
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);

      const [complaintResponse, officersResponse, departmentsResponse] =
        await Promise.all([
          departmentManagerService.getComplaintDetails(id),
          departmentManagerService.getAvailableOfficers(),
          departmentService.getAllDepartments(),
        ]);

      setComplaint(complaintResponse);
      setOfficers(officersResponse ?? []);
      setDepartments(departmentsResponse ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptAI = async () => {
    try {
      setActionLoading(true);

      await departmentManagerService.acceptAIRecommendation(id);

      toast.success("AI recommendation accepted.");

      await loadData();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Couldn't accept AI recommendation.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleAssignOfficer = async () => {
    if (!selectedOfficerId) {
      toast.error("Please select an officer.");
      return;
    }

    try {
      setActionLoading(true);

      await departmentManagerService.assignOfficer(id, selectedOfficerId);

      toast.success("Officer assigned successfully.");

      await loadData();
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Couldn't assign officer.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOverride = async (e) => {
    e.preventDefault();

    if (
      !overrideForm.departmentId ||
      !overrideForm.priority ||
      !overrideForm.remarks.trim()
    ) {
      toast.error("Please fill in all override fields.");
      return;
    }

    try {
      setActionLoading(true);

      await departmentManagerService.overrideAIRecommendation(id, {
        departmentId: Number(overrideForm.departmentId),
        priority: overrideForm.priority,
        remarks: overrideForm.remarks.trim(),
      });

      toast.success("AI recommendation overridden.");
      setOverrideForm({ departmentId: "", priority: "", remarks: "" });

      await loadData();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Couldn't override AI recommendation.",
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
        description="This complaint could not be found."
      />
    );
  }

  const officerOptions = officers.map((officer) => ({
    value: officer.officerId,
    label: officer.officerName,
  }));

  console.log("Complaint:", complaint);
  console.log("Complaint Status:", complaint.status);
  console.log("OPEN:", COMPLAINT_STATUS.OPEN);
  console.log("UNDER_REVIEW:", COMPLAINT_STATUS.UNDER_REVIEW);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={`Complaint ${complaint.complaintId}`}
        subtitle="Review AI analysis, assign an officer, or override the recommendation."
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

      {/* Image + AI Analysis */}
      <div className="grid gap-8 lg:grid-cols-2">
        <ComplaintImageCard complaint={complaint} />

        <ComplaintAIAnalysis analysis={complaint.aiAnalysis} />
      </div>

      {/* Complaint Information */}
      <ComplaintInformation complaint={complaint} />

      {complaint.status === COMPLAINT_STATUS.OPEN && (
        <SectionCard
          title="AI Recommendation Action"
          subtitle="Accept the AI's suggested department and priority, or override it manually."
        >
          <div className="flex flex-wrap gap-3">
            <Button
              leftIcon={<Sparkles size={18} />}
              loading={actionLoading}
              onClick={handleAcceptAI}
            >
              Accept AI Recommendation
            </Button>
          </div>

          <form
            onSubmit={handleOverride}
            className="mt-8 space-y-5 border-t border-slate-200 pt-6"
          >
            <div className="flex items-center gap-2 text-slate-900">
              <PencilLine size={18} />
              <h3 className="font-semibold">Or Override Manually</h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Select
                label="Department"
                name="departmentId"
                value={overrideForm.departmentId}
                onChange={(e) =>
                  setOverrideForm((prev) => ({
                    ...prev,
                    departmentId: e.target.value,
                  }))
                }
                options={departments.map((department) => ({
                  value: department.departmentId,
                  label: department.departmentName,
                }))}
                placeholder="Select a department"
                required
              />

              <Select
                label="Priority"
                name="priority"
                value={overrideForm.priority}
                onChange={(e) =>
                  setOverrideForm((prev) => ({
                    ...prev,
                    priority: e.target.value,
                  }))
                }
                options={COMPLAINT_PRIORITY_OPTIONS}
                required
              />
            </div>

            <Textarea
              label="Remarks"
              value={overrideForm.remarks}
              onChange={(e) =>
                setOverrideForm((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
              placeholder="Explain the reason for overriding the AI recommendation..."
              required
            />

            <Button type="submit" variant="outline" loading={actionLoading}>
              Submit Override
            </Button>
          </form>
        </SectionCard>
      )}

      {complaint.status === COMPLAINT_STATUS.UNDER_REVIEW && (
        <SectionCard
          title="Assign Officer"
          subtitle="Assign or reassign the officer responsible for this complaint."
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Select
                label="Officer"
                name="officerId"
                value={selectedOfficerId}
                onChange={(e) => setSelectedOfficerId(e.target.value)}
                options={officerOptions}
                placeholder="Select an officer"
              />
            </div>

            <Button
              leftIcon={<UserCheck size={18} />}
              loading={actionLoading}
              onClick={handleAssignOfficer}
            >
              Assign Officer
            </Button>
          </div>
        </SectionCard>
      )}
    </div>
  );
};

export default ReviewComplaint;
