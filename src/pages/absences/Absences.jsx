import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../components/table/Table";
import dateFormatFR from "../../utils/dateFormatter";
import DetailAbsence from "./DetailAbsence";
import CreateAbsenceModal from "./CreateAbsence";

export default function Absences() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const absencesFromRedux = useSelector((state) => state.absences.list);
  const employees = useSelector((state) => state.employees.list);
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
    
  ////////////////////// MODIF STRUCTURE ABSENCE POUR TABLEAU /////////////////////
  const absencesForTable = [...absencesFromRedux]
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .map((absence) => {
      const foundEmployee = employees.find(
        (employee) => employee.id === absence.employeeId
      );
      return {
        ...absence,
        employeeName: `${foundEmployee.firstName} ${foundEmployee.lastName}`,
        service: foundEmployee.service,
      };
    });
  ////////////////////////// CONFIGURATION COLONNES ////////////////////////////
  let columns = [
    { header: "Nom", accessorKey: "employeeName" },
    { header: "Service", accessorKey: "service" },
    {
      header: "Date de début",
      accessorKey: "startDate",
      cell: ({ getValue }) => dateFormatFR(getValue()),
    },
    {
      header: "Date de fin",
      accessorKey: "endDate",
      cell: ({ getValue }) => dateFormatFR(getValue()),
    }
  ];

  if (!isMobile) {
    columns.push({ header: "Statut", accessorKey: "status" });
  }
  
  columns.push(
    {
      header: "Détails",
      cell: ({ row }) => (
        <button
          className="table-detail-button"
          onClick={() => {
            setShowDetailModal(true);
            setSelectedAbsence(row.original.id);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      ),
    }
  )

  //////////////////////////////////////////////////////////////////////////////
  return (
    <div className="pages">
      <div className="pages-title-ctnr">
        <h2 className="pages-title">Absences</h2>
        <button
          className="create-button"
          onClick={() => {
            setShowCreateModal(true);
          }}
        >
          <FontAwesomeIcon icon={faCirclePlus} className="faCirclePlus" />
          {!isMobile && ("Créer absence")} 
        </button>
      </div>

      {/********************** INPUT RECHERCHE *********************/}

      <input
        type="text"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Rechercher..."
        className="search-input"
      />

      {/********************** TABLEAU ABSENCES *********************/}

      <Table
        data={absencesForTable}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      {/******************** MODALE CREATION ABSENCE *******************/}

      {showCreateModal && (
        <CreateAbsenceModal
          setShowCreateModal={setShowCreateModal}
          absences={absencesFromRedux}
          employees={employees}
        />
      )}

      {/******************** MODALE DETAIL ABSENCE *******************/}

      {showDetailModal && (
        <DetailAbsence
          setShowDetailModal={setShowDetailModal}
          absencesForTable={absencesForTable}
          id={selectedAbsence}
        />
      )}
    </div>
  );
}
