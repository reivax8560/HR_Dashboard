import "./dashboard.css";
import { useSelector } from "react-redux";
import EmployeeBarChart from "./EmployeeBarChart";
import AbsencesLineChart from "./AbsencesLineChart";

export default function Dashboard() {
  const employees = useSelector((state) => state.employees.list);
  const totalEmployees = employees.length;
  const absences = useSelector((state) => state.absences.list);
  /////////////////////////// ABSENCES EN COURS ///////////////////////////
  const currentAbsences = absences.filter((item) => {
    const today = new Date();
    return (
      today >= new Date(item.startDate) &&
      today <= new Date(item.endDate) &&
      item.status === "Validée"
    );
  });
  /////////////////////////// ANCIENNETÉ MOYENNE /////////////////////////
  /* total ancienneté employés / nb d'employés */
  const today = new Date();

  const seniorityCount = employees.reduce((acc, employee) => {
    const entryDate = new Date(employee.entryDate);
    return acc + (today - entryDate);
  }, 0);

  const seniorityAverageInMs = seniorityCount / totalEmployees;
  const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
  const seniorityAverage = (seniorityAverageInMs / MS_PER_YEAR).toFixed(1);

  /////////////////////////// TAUX ABSENTEISME ///////////////////////////
  /* 
  (total jours absence / total jours travaillés) × 100 
  nb total jours absence => total employés sur année passée
  nb total jours travaillés => 365 - 137 = 228 x 10 employés
  */
  const lastYearAbsences = absences.filter((item) => {
    const absenceStart = new Date(item.startDate);
    const absenceEnd = new Date(item.endDate);
    const yearStart = new Date("2025-01-01");
    const yearEnd = new Date("2025-12-31");
    return absenceStart <= yearEnd && absenceEnd >= yearStart;
  });
  const daysWorkedInYear = (365 - 137) * totalEmployees;
  const absenteeism = (
    (lastYearAbsences.length / daysWorkedInYear) *
    100
  ).toFixed(1);

  /////////////////////////////////////////////////////////

  return (
    <div className="dashboard-page">
      <h1>Tableau de bord</h1>

      <main className="charts-grid">
        <div className="dashboard-card">
          <h3>Total employés</h3>
          <p>{totalEmployees}</p>
        </div>

        <div className="dashboard-card">
          <h3>Absences en cours</h3>
          <p>{currentAbsences.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>Ancienneté moyenne</h3>
          <p>{`${seniorityAverage} ans`}</p>
        </div>

        <div className="dashboard-card">
          <h3>Taux d'absentéisme</h3>
          <p>{absenteeism}%</p> {/*stats sur année passée */}
        </div>

        <div className="dashboard-card large-card">
          <h3>Répartition des employés par service</h3>
          <EmployeeBarChart />
        </div>

        <div className="dashboard-card large-card">
          <h3>Historique des absences par mois</h3>
          <AbsencesLineChart /> {/* stats sur 6 derniers mois */}
        </div>
      </main>
    </div>
  );
}
