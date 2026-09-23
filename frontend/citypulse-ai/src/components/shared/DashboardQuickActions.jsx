import { Link } from "react-router-dom";

const DashboardQuickActions = ({ actions = [] }) => {
  return (
    <div className="grid gap-3">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.title}
            to={action.path}
            className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-canvas px-4 py-3 transition duration-200 hover:border-brand-200 hover:bg-surface hover:shadow-soft-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
              {Icon && <Icon size={18} aria-hidden="true" />}
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-brand-800">
                {action.title}
              </h3>
              {action.description && (
                <p className="text-xs text-slate-500">{action.description}</p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardQuickActions;
