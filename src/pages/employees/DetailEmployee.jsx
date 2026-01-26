import Modal from "../../components/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { removeEmployee, updateEmployee } from "../../store/employeesSlice";
import { removeAbsence } from "../../store/absencesSlice";
import { useState } from "react";

export default function DetailEmployee({ setShowDetailModal, services, id }) {
  const dispatch = useDispatch();
  const absences = useSelector((state) => state.absences.list);
  const employees = useSelector((state) => state.employees.list);
  const [employee, setEmployee] = useState(
    () => employees.find((item) => item.id === id) ?? {}
  );
  // le nullish coalescing operator fournit une valeur par défaut
  // si l’opérande de gauche est null ou undefined.
  // dans ce cas précis, si find() trouve un objet employé il le renvoie,
  // sinon l'opérateur renvoie un objet vide

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };
  // [name] => name entre crochets pour que la propriété puisse prendre la valeur
  // passée (firstName, email...), sinon la propriété aurait toujours la valeur "name"

  const editEmployee = (e) => {
    e.preventDefault();
    dispatch(updateEmployee(employee));
    setShowDetailModal(false);
  };

  const deleteEmployee = (e) => {
    if (
      window.confirm(
        `Supprimer "${employee?.firstName} ${employee?.lastName}" ?`
      )
    ) {
      e.preventDefault();
      dispatch(removeEmployee(id));
      absences.forEach((item) => {
        if (item.employeeId === id) {
          dispatch(removeAbsence(item.id));
        }
      });
      setShowDetailModal(false);
    }
  };

  return (
    <Modal isBackgroundDisplayed={true} title="Détail employé">
      <form className="form" onSubmit={editEmployee}>
        <div className="input-ctnr">
          <label htmlFor="firstName">Prénom</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={employee?.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="lastName">Nom</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={employee?.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="position">Poste</label>
          <input
            id="position"
            name="position"
            type="text"
            value={employee?.position}
            onChange={handleChange}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="service">Service</label>
          <select
            id="service"
            name="service"
            value={employee?.service}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="entryDate">Date d'entrée</label>
          <input
            id="entryDate"
            name="entryDate"
            type="date"
            value={employee?.entryDate}
            onChange={handleChange}
          />
        </div>

        <div className="input-ctnr">
          <label htmlFor="status">Statut</label>
          <select
            id="status"
            name="status"
            value={employee?.status}
            onChange={handleChange}
          >
            <option>Actif</option>
            <option>Inactif</option>
          </select>
        </div>

        <div className="detail-button-ctnr">
          <button
            type="button"
            className="modal-btn modal-delete-button"
            onClick={deleteEmployee}
          >
            Supprimer employé
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
