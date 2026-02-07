import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import useMobileResizing from "../../hooks/useMobileResizing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Table from "../../components/table/Table";
import Modal from "../../components/modal/Modal";
import { addService, removeService } from "../../store/servicesSlice";

  
export default function Services() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const services = useSelector((state) => state.services.list);
  const isMobile = useMobileResizing();

////////////////////// CONFIG COLONNES ///////////////////////
  const columns = [
    { header: "Nom", accessorKey: "name" },
    {
      header: "Action",
      cell: ({ row }) => (
        <button
          type="button"
          className="table-delete-button"
          onClick={() => {
            if (
              window.confirm(`Supprimer le service "${row.original.name}" ?`)
            ) {
              dispatch(removeService(row.original.id));
            }
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      ),
    },
  ];

  ////////////////////// CREATION SERVICE ///////////////////////
  const createService = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const serviceName = formData.get("name");
    const newId =
      services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
    dispatch(
      addService({
        id: newId,
        name: serviceName,
      })
    );
    form.reset();
    setIsModalOpen(false);
  };

  ////////////////////////////////////////////////////////////
  return (
    <div className="pages">
      <div className="pages-title-ctnr">
        <h2 className="pages-title">Services</h2>
        <button
          className="create-button"
          type="button"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faCirclePlus} className="faCirclePlus" />
          {!isMobile && "Créer service"}
        </button>
      </div>

      <Table data={services} columns={columns} />

      {isModalOpen && (
        <Modal isBackgroundDisplayed={true} title="Création service">
          <form className="form" onSubmit={createService}>
            <div className="input-ctnr">
              <label htmlFor="name">Nom</label>
              <input id="name" name="name" type="text" required />
            </div>

            <div className="button-ctnr">
              <button
                type="button"
                className="modal-btn modal-cancel-button"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Annuler
              </button>

              <button type="submit" className="modal-btn modal-save-button">
                Enregistrer
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
