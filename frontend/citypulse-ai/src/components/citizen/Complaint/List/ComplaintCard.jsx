import { Eye, MapPin } from "lucide-react";

import Button from "@/components/common/Button/Button";
import StatusBadge from "@/components/dashboard/StatusBadge";
import dateUtils from "@/utils/dateUtils";

const ComplaintCard = ({ complaint, onViewComplaint }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-surface p-4 shadow-soft-sm transition hover:border-brand-200 hover:shadow-soft-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900">
            {complaint.title}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">{complaint.complaintId}</p>
        </div>

        <StatusBadge status={complaint.status} />
      </div>

      <div className="mt-4 flex items-start gap-2 text-slate-600">
        <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
        <p className="text-sm leading-relaxed">{complaint.address}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-500">
          {dateUtils.formatDate(complaint.createdAt)}
        </span>

        <Button
          size="sm"
          variant="outline"
          leftIcon={<Eye size={16} aria-hidden="true" />}
          onClick={() => onViewComplaint?.(complaint.complaintId)}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default ComplaintCard;
