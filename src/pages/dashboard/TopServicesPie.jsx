import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useSelector } from "react-redux";

export default function TopServicesPie() {
  const employees = useSelector((state) => state.employees.list);

  const serviceCounts = employees.reduce((acc, employee) => {
    acc[employee.service] = (acc[employee.service] || 0) + 1;
    return acc;
  }, {});
  /*
  reducer qui créé un objet { RH: 1, informatique: 4, Finance: 1 }
  RH = 1 si initial, sinon total + 1
  */

  const data = Object.entries(serviceCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);
  /* 
  Object.entries transforme { RH: 1, informatique: 4, Finance: 1 } en : 
  [ ['RH', '1'], ['IT', 4], ['Finance', 1]... ]
  map transforme en :
  [{ name: "IT", value: 5 },{ name: "RH", value: 3 },{ name: "Finance", value: 4 }...]
  sort trie les valeurs les plus fortes
  slice ne garde que les 3 premiers
  */

  const COLORS = ["#388ae7", "#83aedf", "#0864ce"];

  return (
    <ResponsiveContainer width="100%" aspect={1}>
      {/* aspect={1} => rapport largeur/hauteur = 1 (carré) */}
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius="80%"
          innerRadius="50%"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
//
/* 
ALTERNATIVE SERVICECOUNTS
const serviceCounts = employees.reduce((acc, employee) => {
  if (!acc[employee.service]) {
    acc[employee.service] = 1;
  } else {
    acc[employee.service]++;
  }
  return acc;
}, {});
*/

/*
ALTERNATIVE DATA
const dataArray = [];

for (const service in serviceCounts) {
  dataArray.push({
    name: service,
    value: serviceCounts[service],
  });
}

dataArray.sort((a, b) => {
  return b.value - a.value;
});

const data = dataArray.slice(0, 3);

*/
