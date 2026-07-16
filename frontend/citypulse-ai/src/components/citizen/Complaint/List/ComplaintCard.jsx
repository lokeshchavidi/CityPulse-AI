import { Eye, MapPin } from "lucide-react";

import Button from "@/components/common/Button/Button";
import StatusBadge from "@/components/dashboard/StatusBadge";

const ComplaintCard = ({ complaint, onViewComplaint }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {complaint.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">{complaint.complaintId}</p>
        </div>

        <StatusBadge status={complaint.status} />
      </div>

      <div className="mt-5 flex items-start gap-2 text-slate-600">
        <MapPin size={18} className="mt-0.5" />

        <p className="text-sm leading-6">{complaint.address}</p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-slate-500">
          {new Date(complaint.createdAt).toLocaleDateString()}
        </span>

        <Button
          size="sm"
          variant="outline"
          leftIcon={<Eye size={16} />}
          onClick={() => onViewComplaint?.(complaint.complaintId)}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default ComplaintCard;
