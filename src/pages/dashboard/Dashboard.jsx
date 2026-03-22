import { useRef } from "react";
import { useSelector } from "react-redux";
import "./dashboard.css";
import EmployeeBarChart from "./EmployeeBarChart";
import AbsencesLineChart from "./AbsencesLineChart";
import getCurrentAbsences from "../../utils/getCurrentAbsences";
import getSeniorityAverage from "../../utils/getSeniorityAverage";
import getAbsenteeismRate from "../../utils/getAbsenteeismRate";
import getEmployeesPerService from "../../utils/getEmployeesPerService";
import getLastSixMonths from "../../utils/getLastSixMonths";

export default function Dashboard() {
  const liveRegionRef = useRef(null);
  const employees = useSelector((state) => state.employees.list);
  const absences = useSelector((state) => state.absences.list);
  const today = new Date();

  /////////// transmet le texte aria à lire à la région live /////////////
  const handleAriaLabel = (ariaLabel) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = ariaLabel;
    }
  };

  /////////////////////////// TOTAL EMPLOYES ///////////////////////////
  const totalEmployees = employees.length;

  /////////////////////////// ABSENCES EN COURS ////////////////////////
  const currentAbsences = getCurrentAbsences(absences, today);

  /////////////////////////// ANCIENNETÉ MOYENNE /////////////////////////
  const seniorityAverage = getSeniorityAverage(employees, today);

  /////////////////////////// TAUX ABSENTEISME ///////////////////////////
  const absenteeism = getAbsenteeismRate(absences, totalEmployees, today);

  /////////////////////////// DONNÉES DIAGRAMMES ///////////////////////
  const employeesPerService = getEmployeesPerService(employees);
  const lastSixMonths = getLastSixMonths(absences, today);

  /////////////////////////////////////////////////////////
  return (
    <div className="dashboard-page">
      {/*////////////// DESCRIPTION PAGE POUR SCREEN READER ///////////////////*/}
      <p className="sr-only" id="dashboard-description">
        Cette page affiche des indicateurs RH : le total des employés, les
        absences en cours, l'ancienneté moyenne et le taux d'absentéisme. Vous
        pouvez naviguer sur chaque indicateur avec la touche TAB. La page
        affiche également deux diagrammes indiquant la répartition des employés
        par service et l'historique des absences par mois.
      </p>

      <h1 autoFocus tabIndex={-1} aria-describedby="dashboard-description">
        Tableau de bord
      </h1>

      {/* Région live invisible qui reçoit le texte à lire à chaque focus sur une card */}
      <div
        ref={liveRegionRef} // ref react pour détecter la modif de texte à chaque focus
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      <div className="charts-grid">
        <article
          className="dashboard-card"
          tabIndex="0"
          aria-hidden="true"
          onFocus={() => handleAriaLabel(`Total employés : ${totalEmployees}`)}
        >
          <h3>Total employés</h3>
          <p>{totalEmployees}</p>
        </article>

        <article
          className="dashboard-card"
          tabIndex="0"
          aria-hidden="true"
          onFocus={() =>
            handleAriaLabel(`Absences en cours : ${currentAbsences.length}`)
          }
        >
          <h3>Absences en cours</h3>
          <p>{currentAbsences.length}</p>
        </article>

        <article
          className="dashboard-card"
          tabIndex="0"
          aria-hidden="true"
          onFocus={() =>
            handleAriaLabel(`Ancienneté moyenne : ${seniorityAverage} ans`)
          }
        >
          <h3>Ancienneté moyenne</h3>
          <p>{`${seniorityAverage} ans`}</p>
        </article>

        <article
          className="dashboard-card"
          tabIndex="0"
          aria-hidden="true"
          onFocus={() =>
            handleAriaLabel(`Taux d'absentéisme : ${absenteeism}%`)
          }
        >
          <h3>Taux d'absentéisme</h3>
          <p>{absenteeism}%</p>
        </article>

        <article
          className="dashboard-card large-card"
          tabIndex="0"
          aria-hidden="true"
          onFocus={() =>
            handleAriaLabel(
              `Répartition des employés par service, 
              ${Object.entries(employeesPerService).map(
                ([service, count]) => `${service} : ${count} employés, `,
              )}.`,
            )
          }
        >
          <h3>Répartition des employés par service</h3>
          <p className="sr-only" id="chart-employees-desc">
            Diagramme en barres comparant les effectifs par service.
          </p>
          <EmployeeBarChart />
        </article>

        <article
          className="dashboard-card large-card"
          tabIndex="0"
          aria-hidden="true"
          onFocus={() =>
            handleAriaLabel(
              `Historique des absences par mois, 
              ${lastSixMonths.map(
                (month) => `${month.month} : ${month.value} absences, `,
              )}.`,
            )
          }
        >
          <h3>Historique des absences par mois</h3>
          <p className="sr-only" id="chart-absences-desc">
            Diagramme en courbe illustrant les absences par mois.
          </p>
          <AbsencesLineChart />
        </article>
      </div>
    </div>
  );
}
