import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import EmptyState from "@/components/dashboard/EmptyState";
import { PRIORITY_COLORS, CHART_COLORS } from "./chartTheme";

const PriorityBarChart = ({ data = [] }) => {
  const chartData = data ?? [];
  const hasValues = chartData.some((item) => (item.value ?? 0) > 0);

  if (!chartData.length || !hasValues) {
    return (
      <EmptyState
        title="No priority data yet"
        description="Priority breakdown will appear once complaints are prioritized."
      />
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={80}
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="value" name="Complaints" radius={[0, 6, 6, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={
                  PRIORITY_COLORS[entry.name] ??
                  CHART_COLORS[index % CHART_COLORS.length]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityBarChart;
