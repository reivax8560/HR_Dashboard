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
import { useState, useEffect } from "react";

export default function AbsencesLineChart() {
  const absences = useSelector((state) => state.absences.list);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );

  ///////////////// GESTION TAILLE POLICE FORMAT MOBILE //////////////////
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  ///////////////////// CREATION ARRAY 6 DERNIERS MOIS
  function getLastSixMonths(absencesData) {
    let datas = [];
    const today = new Date();

    for (let i = 5; i > 0; i--) {
      let currentDate = new Date(today);
      currentDate.setMonth(today.getMonth() - i);
      const currentMonth = new Intl.DateTimeFormat("fr-FR", {
        month: "short",
      }).format(currentDate);
      datas.push({ month: currentMonth, value: 0 });
    }

    //////////////////////// AJOUT DES VALEURS AU ARRAY
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    absencesData.forEach((absence) => {
      const endDate = new Date(absence.endDate);
      if (endDate >= sixMonthsAgo) {
        const endDateMonth = new Intl.DateTimeFormat("fr-FR", {
          month: "short",
        }).format(endDate);
        datas.forEach((data) => {
          if (data.month === endDateMonth) data.value += 1;
        });
      }
    });
    return datas;
  }
  const chartData = getLastSixMonths(absences);
  
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
      <LineChart data={chartData}>
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
