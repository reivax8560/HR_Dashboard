import "./dashboard.css";
import { useSelector } from "react-redux";
import EmployeeBarChart from "./EmployeeBarChart";
import AbsencesLineChart from "./AbsencesLineChart";
import getCurrentAbsences from "../../utils/getCurrentAbsences";
import getSeniorityAverage from "../../utils/getSeniorityAverage";
import getAbsenteeismRate from "../../utils/getAbsenteeismRate";

export default function Dashboard() {
  const employees = useSelector((state) => state.employees.list);
  const absences = useSelector((state) => state.absences.list);
  const today = new Date();

  /////////////////////////// TOTAL EMPLOYES ///////////////////////////
  const totalEmployees = employees.length;

  /////////////////////////// ABSENCES EN COURS ////////////////////////
  const currentAbsences = getCurrentAbsences(absences, today);

  /////////////////////////// ANCIENNETÉ MOYENNE /////////////////////////
  const seniorityAverage = getSeniorityAverage(employees, today);

  /////////////////////////// TAUX ABSENTEISME ///////////////////////////
  const absenteeism = getAbsenteeismRate(absences, totalEmployees, today);

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
          <p>{absenteeism}%</p>
        </div>

        <div className="dashboard-card large-card">
          <h3>Répartition des employés par service</h3>
          <EmployeeBarChart />
        </div>

        <div className="dashboard-card large-card">
          <h3>Historique des absences par mois</h3>
          <AbsencesLineChart />
        </div>
      </main>
    </div>
  );
}
