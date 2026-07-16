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
    <div className="space-y-8">
      <DashboardHeader
        title="Department Officers"
        subtitle="Officers available for complaint assignment in your department."
      />

      <SectionCard>
        {loading ? (
          <LoadingSkeleton cards={4} />
        ) : officers.length === 0 ? (
          <EmptyState
            title="No officers found"
            description="There are no officers available in your department yet."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {officers.map((officer) => (
              <div
                key={officer.officerId}
                className="rounded-2xl border border-slate-200 p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <UserRound size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {officer.officerName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {officer.officerId}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    {officer.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={14} />
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
