import { CalendarDays, MapPin, User } from "lucide-react";

import SectionCard from "@/components/dashboard/SectionCard";
import StatusBadge from "@/components/dashboard/StatusBadge";

const ComplaintInformation = ({ complaint }) => {
  if (!complaint) return null;

  return (
    <SectionCard
      title="Complaint Information"
      subtitle="Basic details about the submitted complaint."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-slate-500">Complaint ID</p>

          <p className="mt-1 font-semibold text-slate-900">
            {complaint.complaintId}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">Status</p>

          <div className="mt-2">
            <StatusBadge status={complaint.status} />
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-medium text-slate-500">Title</p>

          <p className="mt-1 text-slate-900">{complaint.title}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-medium text-slate-500">Description</p>

          <p className="mt-1 whitespace-pre-line text-slate-700">
            {complaint.description}
          </p>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <MapPin size={16} />
            Address
          </p>

          <p className="mt-1 text-slate-700">{complaint.address}</p>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <CalendarDays size={16} />
            Submitted On
          </p>

          <p className="mt-1 text-slate-700">
            {new Date(complaint.createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">Department</p>

          <p className="mt-1 text-slate-700">
            {complaint.departmentName || "Pending AI Assignment"}
          </p>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <User size={16} />
            Assigned Officer
          </p>

          <p className="mt-1 text-slate-700">
            {complaint.assignedOfficerName || "Not Assigned"}
          </p>
        </div>
      </div>
    </SectionCard>
  );
};

export default ComplaintInformation;
