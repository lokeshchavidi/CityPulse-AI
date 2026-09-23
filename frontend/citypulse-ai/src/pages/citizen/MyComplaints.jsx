import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";
import Button from "@/components/common/Button/Button";

import {
  ComplaintTable,
  ComplaintCard,
} from "@/components/citizen/Complaint/List";

import complaintService from "@/services/complaintService";

const MyComplaints = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);

      const response = await complaintService.getMyComplaints();

      setComplaints(response ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewComplaint = (complaintId) => {
    navigate(`/citizen/complaints/${complaintId}`);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title="My complaints"
        subtitle="Track the progress of all your submitted complaints."
        action={
          <Link to="/citizen/complaints/new">
            <Button
              leftIcon={<PlusCircle size={18} aria-hidden="true" />}
              className="w-full sm:w-auto"
            >
              New complaint
            </Button>
          </Link>
        }
      />

      <SectionCard
        title="All submissions"
        subtitle={
          loading
            ? "Loading your complaints…"
            : `${complaints.length} complaint${complaints.length === 1 ? "" : "s"} filed`
        }
      >
        {loading ? (
          <LoadingSkeleton rows={5} />
        ) : complaints.length === 0 ? (
          <EmptyState
            title="No complaints found"
            description="You haven't submitted any complaints yet."
            action={
              <Link to="/citizen/complaints/new">
                <Button size="sm">Create complaint</Button>
              </Link>
            }
          />
        ) : (
          <>
            <div className="hidden lg:block">
              <ComplaintTable
                complaints={complaints}
                onViewComplaint={handleViewComplaint}
              />
            </div>

            <div className="grid gap-4 lg:hidden">
              {complaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.complaintId}
                  complaint={complaint}
                  onViewComplaint={handleViewComplaint}
                />
              ))}
            </div>
          </>
        )}
      </SectionCard>
    </div>
  );
};

export default MyComplaints;
