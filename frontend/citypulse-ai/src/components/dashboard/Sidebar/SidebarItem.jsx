import { NavLink } from "react-router-dom";

import Tooltip from "@/components/common/Tooltip";
import useTooltip from "@/hooks/useTooltip";

const SidebarItem = ({
  label,
  path,
  icon: Icon,
  collapsed = false,
  onClick,
}) => {
  const { ref, position, showTooltip, hideTooltip } = useTooltip();

  return (
    <>
      <NavLink
        ref={ref}
        to={path}
        end
        onClick={onClick}
        onMouseEnter={() => collapsed && showTooltip()}
        onMouseLeave={hideTooltip}
        className={({ isActive }) =>
          `
          group
          relative
          flex
          items-center
          rounded-lg
          text-sm
          font-medium
          transition-all
          duration-200

          ${collapsed ? "justify-center px-0 py-3" : "gap-3 px-3.5 py-2.5"}

          ${
            isActive
              ? "bg-brand-700 text-white shadow-soft-sm"
              : "text-slate-600 hover:bg-canvas hover:text-brand-800"
          }
        `
        }
      >
        <Icon size={20} className="shrink-0" />

        {!collapsed && <span className="truncate">{label}</span>}
      </NavLink>

      <Tooltip
        text={label}
        x={position.x}
        y={position.y}
        visible={position.visible}
      />
    </>
  );
};

export default SidebarItem;
