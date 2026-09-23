import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import EmptyState from "@/components/dashboard/EmptyState";

const MonthlyTrendChart = ({ data = [] }) => {
  const chartData = data ?? [];
  const hasValues = chartData.some(
    (point) => (point.filed ?? 0) > 0 || (point.resolved ?? 0) > 0,
  );

  if (!chartData.length || !hasValues) {
    return (
      <EmptyState
        title="No trend data yet"
        description="Monthly filing and resolution trends will show once activity starts."
      />
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barGap={6}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
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
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="filed" name="Filed" fill="#2563eb" radius={[6, 6, 0, 0]} />
          <Bar dataKey="resolved" name="Resolved" fill="#16a34a" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendChart;
