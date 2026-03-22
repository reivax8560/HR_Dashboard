import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import useMobileResizing from "../../hooks/useMobileResizing";
import getLastSixMonths from "../../utils/getLastSixMonths";

export default function AbsencesLineChart() {
  const absences = useSelector((state) => state.absences.list);
  const isMobile = useMobileResizing();
  const today = new Date();

  //////////// RECUP ABSENCES 6 DERNIERS MOIS ////////////
  const chartData = getLastSixMonths(absences, today);

  ///////////////////////// TOOLTIP ///////////////////////////
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
        <div>{payload[0].value} absences</div>
      </div>
    );
  }

  /////////////////////////////////////////////////////////////////
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={chartData} tabIndex={-1}>
        <Line
          dataKey="value"
          dot={false}
          activeDot={false}
          stroke="#388ae7"
          strokeWidth={3}
          type="natural"
        />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={isMobile ? { fontSize: 11 } : { fontSize: "1.2vw" }}
          padding={{ left: 20 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={isMobile ? { fontSize: 11 } : { fontSize: "1.2vw" }}
          width={20}
          type="number"
          domain={[0, "dataMax + 1"]}
        />
        <CartesianGrid vertical={false} />
        <Tooltip content={CustomTooltip} />
      </LineChart>
    </ResponsiveContainer>
  );
}
