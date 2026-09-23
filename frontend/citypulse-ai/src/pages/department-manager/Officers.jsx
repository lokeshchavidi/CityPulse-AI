import { useEffect, useState } from "react";
import { Mail, Phone, UserRound } from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";

import departmentManagerService from "@/services/departmentManagerService";

const Officers = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOfficers();
  }, []);

  const loadOfficers = async () => {
    try {
      setLoading(true);

      const response = await departmentManagerService.getAvailableOfficers();

      setOfficers(response ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title="Department officers"
        subtitle="Officers available for complaint assignment in your department."
      />

      <SectionCard
        title="Available officers"
        subtitle={
          loading
            ? "Loading roster…"
            : `${officers.length} officer${officers.length === 1 ? "" : "s"} in your department`
        }
      >
        {loading ? (
          <LoadingSkeleton cards={3} />
        ) : officers.length === 0 ? (
          <EmptyState
            title="No officers found"
            description="There are no officers available in your department yet."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {officers.map((officer) => (
              <div
                key={officer.officerId}
                className="rounded-xl border border-slate-200 bg-canvas p-4 transition hover:border-brand-200 hover:bg-surface hover:shadow-soft-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
                    <UserRound size={20} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {officer.officerName}
                    </p>
                    <p className="text-xs text-slate-500">{officer.officerId}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2 truncate">
                    <Mail size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
                    <span className="truncate">{officer.email}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
                    {officer.phoneNumber}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default Officers;
