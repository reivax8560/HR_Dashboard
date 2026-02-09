import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/employeesSlice";
import Modal from "../../components/modal/Modal";

export default function CreateEmployeeModal({
  setShowCreateModal,
  services,
  employees,
}) {
  const dispatch = useDispatch();

  const createEmployee = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newId =
      employees.length > 0
        ? Math.max(...employees.map((item) => item.id)) + 1
        : 1;
    dispatch(
      addEmployee({
        id: newId,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        position: formData.get("position"),
        service: formData.get("service"),
        email: formData.get("email"),
        entryDate: formData.get("entryDate"),
        status: "Actif",
      }),
    );
    form.reset();
    setShowCreateModal(false);
  };

  return (
    <Modal title="Création employé" setShowModal={setShowCreateModal}>
      <form className="form" onSubmit={createEmployee}>
        <div className="input-ctnr">
          <label htmlFor="firstName">Prénom</label>
          <input id="firstName" name="firstName" type="text" required />
        </div>

        <div className="input-ctnr">
          <label htmlFor="lastName">Nom</label>
          <input id="lastName" name="lastName" type="text" required />
        </div>

        <div className="input-ctnr">
          <label htmlFor="position">Poste</label>
          <input id="position" name="position" type="text" required />
        </div>

        <div className="input-ctnr">
          <label htmlFor="service">Service</label>
          <select id="service" name="service" required>
            <option>Sélectionnez un service</option>
            {services.map((item) => {
              return <option key={item.id}>{item.name}</option>;
            })}
          </select>
        </div>

        <div className="input-ctnr">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div className="input-ctnr">
          <label htmlFor="entryDate">Date d'entrée</label>
          <input id="entryDate" name="entryDate" type="date" required />
        </div>

        <div className="button-ctnr">
          <button
            type="button"
            className="modal-btn modal-cancel-button"
            onClick={() => {
              setShowCreateModal(false);
            }}
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
