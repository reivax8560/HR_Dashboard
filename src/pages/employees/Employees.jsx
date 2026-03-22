import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import useMobileResizing from "../../hooks/useMobileResizing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../components/table/Table";
import CreateEmployeeModal from "./CreateEmployeeModal";
import DetailEmployeeModal from "./DetailEmployeeModal";

export default function Employees() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employees = useSelector((state) => state.employees.list);
  const services = useSelector((state) => state.services.list);
  const isMobile = useMobileResizing();
  const titleRef = useRef(null);
  const createButtonRef = useRef(null);
  const detailButtonRef = useRef(null);

  const openCreateModal = () => {
    createButtonRef.current = document.getElementById("createEmployeeButton");
    setShowCreateModal(true);
  };

  const openDetailModal = (employeeId) => {
    detailButtonRef.current = employeeId;
    setSelectedEmployee(employeeId);
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
        `[data-employee-id="${detailButtonRef.current}"]`,
      );

      if (detailButton) {
        detailButton.focus();
      } else {
        titleRef.current?.focus();
      }

      detailButtonRef.current = null;
    }
  }, [showDetailModal]);

  ///////////////////// CONFIG COLONNES TABLE //////////////////////
  let columns = [
    { header: "Prénom", accessorKey: "firstName" },
    { header: "Nom", accessorKey: "lastName" },
    { header: "Poste", accessorKey: "position" },
  ];

  if (!isMobile) {
    columns.push({ header: "Service", accessorKey: "service" });
  }

  columns.push(
    { header: "Statut", accessorKey: "status" },
    {
      header: "Détails",
      cell: ({ row }) => (
        <button
          className="table-detail-button"
          data-testid="employee-detail-button"
          data-employee-id={row.original.id}
          onClick={() => openDetailModal(row.original.id)}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} aria-hidden="true" />
        </button>
      ),
    },
  );

  ///////////////////////////////////////////////////////////////////////////
  return (
    <div className="pages">
      <p className="sr-only" id="employees-description">
        Cette page affiche le tableau de gestion des employés de l'entreprise.
        Vous pouvez lire et modifier les données.
      </p>

      <section className="employees-section" aria-labelledby="employees-title">
        <div className="pages-title-ctnr">
          <h2
            className="pages-title"
            id="employees-title"
            ref={titleRef}
            tabIndex={-1}
            aria-describedby="employees-description"
          >
            Employés
          </h2>

          <button
            className="create-button"
            type="button"
            id="createEmployeeButton"
            aria-label="Créer un employé"
            onClick={openCreateModal}
          >
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="faCirclePlus"
              aria-hidden="true"
            />
            {!isMobile && "Créer employé"}
          </button>
        </div>
      </section>

      {/********************** TABLEAU EMPLOYES *********************/}

      <Table data={employees} columns={columns} />

      {/******************** MODALE CREATION *******************/}
      {showCreateModal && (
        <CreateEmployeeModal
          closeModal={closeModal}
          services={services}
          employees={employees}
        />
      )}

      {/******************** MODALE DETAIL *******************/}
      {showDetailModal && (
        <DetailEmployeeModal
          closeModal={closeModal}
          services={services}
          id={selectedEmployee}
        />
      )}
    </div>
  );
}
