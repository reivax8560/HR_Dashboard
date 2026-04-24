import Modal from "../../components/modal/Modal";

export default function ConfirmationModal({ closeModal, onConfirm }) {
  return (
    <Modal title="Confirmer suppression" closeModal={closeModal}>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
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
