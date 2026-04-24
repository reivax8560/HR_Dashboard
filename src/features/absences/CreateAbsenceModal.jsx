import { useDispatch } from "react-redux";
import { useState } from "react";
import { createAbsenceThunk } from "./absencesSlice";
import Modal from "../../components/modal/Modal";

export default function CreateAbsenceModal({
  closeModal,
  absences,
  employees,
}) {
  const dispatch = useDispatch();
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  ////////////////////// CREATION ABSENCE ///////////////////////
  const createAbsence = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    //////////////////// GESTION ERREUR DATE
    const currentEmployee = employees.find(
      (item) => item.id === Number(formData.get("employeeId")),
    );
    if (
      new Date(formData.get("startDate")) < new Date(currentEmployee.entryDate)
    ) {
      setStartDateError(true);
      return;
    }
    if (
      new Date(formData.get("endDate")) < new Date(formData.get("startDate"))
    ) {
      setEndDateError(true);
      return;
    } else {
      //////////////////// CREATION ID ABSENCE
      const newId =
        absences.length > 0
          ? Math.max(...absences.map((item) => item.id)) + 1
          : 1;
      //////////////////// DISPATCH
      dispatch(
        createAbsenceThunk({
          id: newId,
          employeeId: Number(formData.get("employeeId")),
          type: formData.get("type"),
          startDate: formData.get("startDate"),
          endDate: formData.get("endDate"),
          status: formData.get("status"),
          comment: formData.get("comment"),
        }),
      );
      form.reset();
      closeModal();
    }
  };

  ///////////////////////////////////////////////////////////////////
  return (
    <Modal title="Création absence" closeModal={closeModal}>
      <form className="form" onSubmit={createAbsence}>
        <div className="input-ctnr">
          <label htmlFor="employeeId">Employé</label>
          <select id="employeeId" name="employeeId" required>
            {employees.map((item) => (
              <option key={item.id} value={item.id}>
                {`${item.firstName} ${item.lastName}`}
              </option>
            ))}
          </select>
        </div>

        <div className="input-ctnr">
          <label htmlFor="type">Type</label>
          <input id="type" name="type" type="text" required />
        </div>

        <div className="input-ctnr">
          <label htmlFor="startDate">Date de début</label>
          <input id="startDate" name="startDate" type="date" required />
        </div>

        <div className="input-ctnr">
          <label htmlFor="endDate">Date de fin</label>
          <input id="endDate" name="endDate" type="date" required />
        </div>

        <div className="input-ctnr">
          <label htmlFor="status">Statut</label>
          <select id="status" name="status" required>
            <option>En attente</option>
            <option>Validée</option>
            <option>Refusée</option>
          </select>
        </div>

        <div className="input-ctnr">
          <label htmlFor="comment">Commentaire</label>
          <textarea id="comment" name="comment" />
        </div>

        {startDateError && (
          <p className="error-message">
            La date de début est antérieure à la date d'embauche de l'employé !
          </p>
        )}
        {endDateError && (
          <p className="error-message">
            La date de fin est antérieure à la date de début !
          </p>
        )}

        <div className="button-ctnr">
          <button
            type="button"
            className="modal-btn modal-cancel-button"
            onClick={closeModal}
          >
            Annuler
          </button>

          <button className="modal-btn modal-save-button" type="submit">
            Enregistrer
          </button>
        </div>
      </form>
    </Modal>
  );
}
