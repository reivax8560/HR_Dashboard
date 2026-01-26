import Modal from "../../components/modal/Modal";
import { useDispatch } from "react-redux";
import { removeAbsence, updateAbsence } from "../../store/absencesSlice";
import { useState } from "react";

export default function DetailAbsence({
  setShowDetailModal,
  absencesForTable,
  id,
}) {
  const dispatch = useDispatch();
  const [absence, setAbsence] = useState(
    () => absencesForTable.find((item) => item.id === id) ?? {}
  );
  // le nullish coalescing operator fournit une valeur par défaut
  // si l’opérande de gauche est null ou undefined.
  // dans ce cas précis, si find() trouve un objet employé il le renvoie,
  // sinon l'opérateur renvoie un objet vide

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbsence((prev) => ({ ...prev, [name]: value }));
  };
  // [name] => name entre crochets pour que la propriété puisse prendre la valeur
  // passée (firstName, email...), sinon la propriété aurait toujours la valeur "name"

  const editAbsence = (e) => {
    e.preventDefault();
    dispatch(updateAbsence(absence));
    setShowDetailModal(false);
  };

  return (
    <Modal isBackgroundDisplayed={true} title="Détail absence">
      <form className="form" onSubmit={editAbsence}>
        <div className="input-ctnr">
          <p className="detail-absence-employee-name">{`${absence?.employeeName} (${absence?.service})`}</p>
        </div>

        <div className="input-ctnr">
          <label htmlFor="type">Type</label>
          <input
            id="type"
            name="type"
            type="text"
            value={absence?.type}
            onChange={handleChange}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="startDate">Date de début</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={absence?.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="endDate">Date de fin</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={absence?.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="status">Statut</label>
          <select
            id="status"
            name="status"
            value={absence?.status}
            onChange={handleChange}
          >
            <option>En attente</option>
            <option>Validée</option>
            <option>Refusée</option>
          </select>
        </div>

        <div className="input-ctnr">
          <label htmlFor="comment">Commentaire</label>
          <textarea
            id="comment"
            name="comment"
            value={absence?.comment}
            onChange={handleChange}
          />
        </div>

        <div className="detail-button-ctnr">
          <button
            type="button"
            className="modal-btn modal-delete-button"
            onClick={() => {
              if (window.confirm(`Supprimer cette absence ?`)) {
                dispatch(removeAbsence(id));
                setShowDetailModal(false);
              }
            }}
          >
            Supprimer absence
          </button>
          <div>
            <button
              type="button"
              className="modal-btn modal-cancel-button"
              onClick={() => {
                setShowDetailModal(false);
              }}
            >
              Retour
            </button>
            <button type="submit" className="modal-btn modal-save-button">
              Enregistrer
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
