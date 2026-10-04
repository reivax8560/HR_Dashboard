import Modal from "../../components/modal/Modal";
import { useDispatch } from "react-redux";
import { createServiceThunk } from "./servicesSlice";

export default function CreateServiceModal({ serviceIds, closeModal }) {
  const dispatch = useDispatch();

  ////////////////////// CREATION SERVICE ///////////////////////
  const createService = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const serviceName = formData.get("name");
    const newId =
      serviceIds.length > 0 ? Math.max(...serviceIds) + 1 : 1;
    dispatch(
      createServiceThunk({
        id: newId,
        name: serviceName,
      }),
    );
    form.reset();
    closeModal();
  };

  ///////////////////////////////////////////////////////////////
  return (
    <Modal title="Création service" closeModal={closeModal}>
      <form className="form" onSubmit={createService}>
        <div className="input-ctnr">
          <label htmlFor="name">Nom</label>
          <input id="name" name="name" type="text" required />
        </div>

        <div className="button-ctnr">
          <button
            type="button"
            className="modal-btn modal-cancel-button"
            onClick={closeModal}
          >
            Annuler
          </button>

          <button type="submit" className="modal-btn modal-save-button">
            Enregistrer
          </button>
        </div>
      </form>
    </Modal>
  );
}
