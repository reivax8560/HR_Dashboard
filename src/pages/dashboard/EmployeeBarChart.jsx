import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

export default function EmployeeBarChart() {
  const employees = useSelector((state) => state.employees.list);

  const serviceCounts = employees.reduce((acc, employee) => {
    acc[employee.service] = (acc[employee.service] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(serviceCounts).map(([name, value]) => ({
    name,
    value,
  }));

  /////////////////////////// TOOLTIP ////////////////////////////
  function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || !payload.length) return null;
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: 6,
          padding: "6px 8px",
          fontSize: "1.2vw",
        }}
      >
        <div style={{ fontWeight: 600 }}>{label}</div>
        <div>{payload[0].value} employés</div>
      </div>
    );
  }

  /////////////////////////////////////////////////////////////////
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} barSize="10%">
        <Bar dataKey="value" fill="#388ae7" radius={[5, 5, 0, 0]} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: "1vw" }}
          tickFormatter={(value) => value.slice(0, 6).toUpperCase()}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          width={20}
          type="number"
          domain={[0, "dataMax + 2"]}
        />
        <CartesianGrid vertical={false} />
        <Tooltip content={<CustomTooltip />} />
      </BarChart>
    </ResponsiveContainer>
  );
}
