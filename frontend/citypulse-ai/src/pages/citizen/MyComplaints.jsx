import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";

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
    <div className="space-y-8">
      <DashboardHeader
        title="My Complaints"
        subtitle="Track the progress of all your submitted complaints."
      />

      <SectionCard>
        {loading ? (
          <LoadingSkeleton />
        ) : complaints.length === 0 ? (
          <EmptyState
            title="No complaints found"
            description="You haven't submitted any complaints yet."
          />
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden lg:block">
              <ComplaintTable
                complaints={complaints}
                onViewComplaint={handleViewComplaint}
              />
            </div>

            {/* Mobile & Tablet */}
            <div className="grid gap-5 lg:hidden">
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
