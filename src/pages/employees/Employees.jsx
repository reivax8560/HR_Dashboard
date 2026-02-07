import { useSelector } from "react-redux";
import { useState } from "react";
import useMobileResizing from "../../hooks/useMobileResizing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../components/table/Table";
import CreateEmployee from "./CreateEmployee";
import DetailEmployee from "./DetailEmployee";

export default function Employees() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employees = useSelector((state) => state.employees.list);
  const services = useSelector((state) => state.services.list);
  const isMobile = useMobileResizing(); 
  
  ///////////////////// CONFIG COLONNES TABLEAU //////////////////////
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
          onClick={() => {
            setShowDetailModal(true);
            setSelectedEmployee(row.original.id);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      ),
    }
  );

  /////////////////////////////////////////////////////////////
  return (
    <div className="pages">
      <div className="pages-title-ctnr">
        <h2 className="pages-title">Employés</h2>
        <button
          className="create-button"
          onClick={() => {
            setShowCreateModal(true);
          }}
        >
          <FontAwesomeIcon icon={faCirclePlus} className="faCirclePlus" />
          {!isMobile && ("Créer employé")}
        </button>
      </div>

      {/********************** TABLEAU EMPLOYES *********************/}

      <Table data={employees} columns={columns} />

      {/******************** MODALE CREATION EMPLOYE *******************/}
      {showCreateModal && (
        <CreateEmployee
          setShowCreateModal={setShowCreateModal}
          services={services}
          employees={employees}
        />
      )}

      {/******************** MODALE DETAIL EMPLOYE *******************/}
      {showDetailModal && (
        <DetailEmployee
          setShowDetailModal={setShowDetailModal}
          services={services}
          id={selectedEmployee}
        />
      )}
    </div>
  );
}
