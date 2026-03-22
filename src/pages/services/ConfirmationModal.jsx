import Modal from "../../components/modal/Modal";
import { useDispatch } from "react-redux";
import { removeService } from "../../store/servicesSlice";

export default function ConfirmationModal({ serviceId, closeModal }) {
  const dispatch = useDispatch();

  ////////////////////// SUPPRESSION SERVICE ///////////////////////
  const deleteService = (serviceId) => {
    dispatch(removeService(serviceId));
    closeModal();
  };

  return (
    <Modal title="Confirmer suppression" closeModal={closeModal}>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          deleteService(serviceId);
        }}
      >
        <div className="button-ctnr">
          <button
            type="button"
            className="modal-btn modal-cancel-button"
            onClick={closeModal}
          >
            Annuler
          </button>
          <button type="submit" className="modal-btn modal-save-button">
            Confirmer
          </button>
        </div>
      </form>
    </Modal>
  );
}
