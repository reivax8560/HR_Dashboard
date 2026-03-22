import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import useMobileResizing from "../../hooks/useMobileResizing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../components/table/Table";
import dateFormatFR from "../../utils/dateFormatter";
import DetailAbsenceModal from "./DetailAbsenceModal";
import CreateAbsenceModal from "./CreateAbsenceModal";
import getAbsencesFormatted from "../../utils/getAbsencesFormatted";

export default function Absences() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const absences = useSelector((state) => state.absences.list);
  const employees = useSelector((state) => state.employees.list);
  const isMobile = useMobileResizing();
  const titleRef = useRef(null);
  const createButtonRef = useRef(null);
  const detailButtonRef = useRef(null);

  const openCreateModal = () => {
    createButtonRef.current = document.getElementById("createAbsenceButton");
    setShowCreateModal(true);
  };

  const openDetailModal = (absenceId) => {
    detailButtonRef.current = absenceId;
    setSelectedAbsence(absenceId);
    setShowDetailModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setShowDetailModal(false);
  };

  ////////////////////// GESTION FOCUS ///////////////////////
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!showCreateModal && createButtonRef.current) {
      createButtonRef.current?.focus();
    }
  }, [showCreateModal]);

  useEffect(() => {
    if (!showDetailModal && detailButtonRef.current) {
      const detailButton = document.querySelector(
        `[data-absence-id="${detailButtonRef.current}"]`,
      );
      if (detailButton) {
        detailButton.focus();
      } else {
        titleRef.current?.focus();
      }

      detailButtonRef.current = null;
    }
  }, [showDetailModal]);

  ///////////////// MODIF STRUCTURE ABSENCE POUR TABLE ////////////////
  const absencesFormatted = getAbsencesFormatted(absences, employees);

  ////////////////////////// CONFIG COLONNES TABLE ////////////////////////////
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
    },
  ];

  if (!isMobile) {
    columns.push({ header: "Statut", accessorKey: "status" });
  }

  columns.push({
    header: "Détails",
    cell: ({ row }) => (
      <button
        className="table-detail-button"
        data-testid="absence-detail-button"
        data-absence-id={row.original.id}
        onClick={() => openDetailModal(row.original.id)}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} aria-hidden="true" />
      </button>
    ),
  });

  //////////////////////////////////////////////////////////////////////////////
  return (
    <div className="pages">
      <p className="sr-only" id="absences-description">
        Cette page affiche le tableau de gestion des absences des employés. Vous
        pouvez lire et modifier les données.
      </p>

      <section className="absences-section" aria-labelledby="absences-title">
        <div className="pages-title-ctnr">
          <h2
            className="pages-title"
            id="absences-title"
            ref={titleRef}
            tabIndex={-1}
            aria-describedby="absences-description"
          >
            Absences
          </h2>

          <button
            className="create-button"
            type="button"
            id="createAbsenceButton"
            aria-label="Créer une absence"
            onClick={openCreateModal}
          >
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="faCirclePlus"
              aria-hidden="true"
            />
            {!isMobile && "Créer absence"}
          </button>
        </div>
      </section>

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
        data={absencesFormatted}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      {/******************** MODALE CREATION ABSENCE *******************/}

      {showCreateModal && (
        <CreateAbsenceModal
          closeModal={closeModal}
          absences={absences}
          employees={employees}
        />
      )}

      {/******************** MODALE DETAIL ABSENCE *******************/}

      {showDetailModal && (
        <DetailAbsenceModal
          closeModal={closeModal}
          absences={absencesFormatted}
          id={selectedAbsence}
        />
      )}
    </div>
  );
}
