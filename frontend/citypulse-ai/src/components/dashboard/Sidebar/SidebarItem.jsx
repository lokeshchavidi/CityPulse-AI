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
          rounded-xl
          text-sm
          font-medium
          transition-all
          duration-300

          ${collapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3"}

          ${
            isActive
              ? "bg-blue-700 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-blue-700"
          }
        `
        }
      >
        <Icon
          size={20}
          className="shrink-0 transition-transform duration-200 group-hover:scale-110"
        />

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
