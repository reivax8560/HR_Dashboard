import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployeeThunk, updateEmployeeThunk } from "./employeesSlice";
import { deleteAbsenceThunk } from "../absences/absencesSlice";
import Modal from "../../components/modal/Modal";
import ConfirmationModal from "./ConfirmationModal";

export default function DetailEmployeeModal({ closeModal, services, id }) {
  const dispatch = useDispatch();

  ////////////////////// STATE GLOBAL ///////////////////////
  // const absences = useSelector((state) => state.absences.list);
  const {
    list: absences,
    loading: absencesLoading,
    error: absencesError,
  } = useSelector((state) => state.absences);

  // const employees = useSelector((state) => state.employees.list);
  const {
    list: employees,
    loading: employeesLoading,
    error: employeesError,
  } = useSelector((state) => state.employees);

  ////////////////////// STATE LOCAL ///////////////////////
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [employee, setEmployee] = useState(
    () => employees.find((item) => item.id === id) ?? {},
  );

  ////////////////////// GESTION MODALE ///////////////////////
  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  //////////////////// MAJ STATE EMPLOYE /////////////////////
  const updateEmployeeState = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  ////////////////////// MODIF EMPLOYE ///////////////////////
  const editEmployee = (e) => {
    e.preventDefault();
    dispatch(updateEmployeeThunk(employee));
    closeModal();
  };

  ////////////////////// SUPPR EMPLOYE ///////////////////////
  const deleteEmployee = (id) => {
    absences.forEach((item) => {
      if (item.employeeId === id) {
        dispatch(deleteAbsenceThunk(item.id));
      }
    });
    dispatch(deleteEmployeeThunk(id));
  };

  /////////////////////////////////////////////////////////////////////
  return (
    <Modal title="Détail employé" closeModal={closeModal}>
      <form className="form" onSubmit={editEmployee}>
        <div className="input-ctnr">
          <label htmlFor="firstName">Prénom</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={employee?.firstName}
            onChange={updateEmployeeState}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="lastName">Nom</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={employee?.lastName}
            onChange={updateEmployeeState}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="position">Poste</label>
          <input
            id="position"
            name="position"
            type="text"
            value={employee?.position}
            onChange={updateEmployeeState}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="service">Service</label>
          <select
            id="service"
            name="service"
            value={employee?.service}
            onChange={updateEmployeeState}
          >
            {services.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="input-ctnr">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={employee?.email}
            onChange={updateEmployeeState}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="entryDate">Date d'entrée</label>
          <input
            id="entryDate"
            name="entryDate"
            type="date"
            value={employee?.entryDate}
            onChange={updateEmployeeState}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="status">Statut</label>
          <select
            id="status"
            name="status"
            value={employee?.status}
            onChange={updateEmployeeState}
          >
            <option>Actif</option>
            <option>Inactif</option>
          </select>
        </div>

        <div className="detail-button-ctnr">
          <button
            type="button"
            className="modal-btn modal-delete-button"
            onClick={openConfirmModal}
          >
            Supprimer employé
          </button>
          <div>
            <button
              type="button"
              className="modal-btn modal-cancel-button"
              onClick={closeModal}
            >
              Retour
            </button>
            <button type="submit" className="modal-btn modal-save-button">
              Enregistrer
            </button>
          </div>
        </div>
      </form>
      {/* ////////////////////////////////// MODALE CONFIRM SUPPRESSION //////////////////////////// */}
      {showConfirmModal && (
        <ConfirmationModal
          closeModal={closeConfirmModal}
          onConfirm={() => {
            deleteEmployee(id);
            closeModal();
          }}
        />
      )}
    </Modal>
  );
}
