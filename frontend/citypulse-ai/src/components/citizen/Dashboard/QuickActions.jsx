import { Bell, ClipboardList, PlusCircle, User } from "lucide-react";

import { Link } from "react-router-dom";

const actions = [
  {
    title: "Create Complaint",
    description: "Report a new civic issue",
    icon: PlusCircle,
    path: "/citizen/complaints/new",
  },
  {
    title: "My Complaints",
    description: "Track your submissions",
    icon: ClipboardList,
    path: "/citizen/complaints",
  },
  {
    title: "Notifications",
    description: "View recent updates",
    icon: Bell,
    path: "/notifications",
  },
  {
    title: "Profile",
    description: "Manage your account",
    icon: User,
    path: "/profile",
  },
];

const QuickActions = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.title}
            to={action.path}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
              <Icon size={22} className="text-blue-700" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
              {action.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">{action.description}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default QuickActions;
