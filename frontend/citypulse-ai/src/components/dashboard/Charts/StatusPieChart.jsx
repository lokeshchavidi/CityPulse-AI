import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import EmptyState from "@/components/dashboard/EmptyState";
import { STATUS_COLORS, CHART_COLORS } from "./chartTheme";

const StatusPieChart = ({ data = [] }) => {
  const chartData = (data ?? []).filter((item) => (item.value ?? 0) > 0);

  if (!chartData.length) {
    return (
      <EmptyState
        title="No status data yet"
        description="Complaint status distribution will appear once cases are filed."
      />
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={92}
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={STATUS_COLORS[entry.name] ?? CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}`, name]}
            contentStyle={{
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              fontSize: "12px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;
