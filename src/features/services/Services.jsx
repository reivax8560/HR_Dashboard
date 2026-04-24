import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import useMobileResizing from "../../hooks/useMobileResizing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Table from "../../components/table/Table";
import CreateServiceModal from "../services/CreateServiceModal";
import ConfirmationModal from "../services/ConfirmationModal";
import { fetchServicesThunk, deleteServiceThunk } from "./servicesSlice";

export default function Services() {
  const dispatch = useDispatch();

  ////////////////////// STATE GLOBAL ///////////////////////
  // const services = useSelector((state) => state.services.list);
  const {
    list: services,
    loading: servicesLoading,
    error: servicesError,
  } = useSelector((state) => state.services);

  ////////////////////// REF ///////////////////////
  const titleRef = useRef(null);
  const createButtonRef = useRef(null);
  const deleteButtonRef = useRef(null);

  ////////////////////// STATE LOCAL ///////////////////////
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  ////////////////////// HOOK ///////////////////////
  const isMobile = useMobileResizing();

  ////////////////////// GESTION MODALE ///////////////////////
  const openCreateModal = () => {
    createButtonRef.current = document.getElementById("createServiceButton");
    setShowCreateModal(true);
  };
  const openConfirmModal = (serviceId) => {
    deleteButtonRef.current = serviceId;
    setSelectedService(serviceId);
    setShowConfirmModal(true);
  };
  const closeModal = () => {
    setShowCreateModal(false);
    setShowConfirmModal(false);
  };

  ////////////////////// INIT DATAS ///////////////////////
  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServicesThunk());
    }
  }, [services.length, dispatch]);

  ////////////////////// SUPPRESSION SERVICE ///////////////////////
  const deleteService = (serviceId) => {
    dispatch(deleteServiceThunk(serviceId));
    closeModal();
  };

  ////////////////////// GESTION DU FOCUS ///////////////////////
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!showCreateModal && createButtonRef.current) {
      createButtonRef.current?.focus();
    }
  }, [showCreateModal]);

  useEffect(() => {
    if (!showConfirmModal && deleteButtonRef.current) {
      const button = document.querySelector(
        `[data-absence-id="${deleteButtonRef.current}"]`,
      );
      button?.focus();
      deleteButtonRef.current = null;
    }
  }, [showConfirmModal]);

  ////////////////////// CONFIG COLONNES TABLE ///////////////////////
  const columns = [
    { header: "Nom", accessorKey: "name" },
    {
      header: "Action",
      cell: ({ row }) => (
        <button
          type="button"
          className="table-delete-button"
          aria-label={`Supprimer le service ${row.original.name}`}
          data-absence-id={row.original.id}
          onClick={() => openConfirmModal(row.original.id)}
        >
          <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
        </button>
      ),
    },
  ];

  ////////////////////////////////////////////////////////////
  return (
    <div className="pages">
      <p className="sr-only" id="services-description">
        Cette page affiche le tableau de gestion des services de l'entreprise.
        Vous pouvez lire et modifier les données.
      </p>

      <section className="services-section" aria-labelledby="services-title">
        <div className="pages-title-ctnr">
          <h2
            className="pages-title"
            id="services-title"
            ref={titleRef}
            tabIndex={-1}
            aria-describedby="services-description"
          >
            Services
          </h2>

          <button
            className="create-button"
            type="button"
            id="createServiceButton"
            aria-label="Créer un service"
            onClick={openCreateModal}
          >
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="faCirclePlus"
              aria-hidden="true"
            />
            {!isMobile && "Créer service"}
          </button>
        </div>

        <Table data={services} columns={columns} />
      </section>
      {/* ////////////////////////////////// MODALE CREATION SERVICE //////////////////////////// */}
      {showCreateModal && (
        <CreateServiceModal services={services} closeModal={closeModal} />
      )}
      {/* ////////////////////////////////// MODALE CONFIRM SUPPRESSION //////////////////////////// */}
      {showConfirmModal && (
        <ConfirmationModal
          serviceId={selectedService}
          closeModal={closeModal}
          onConfirm={() => {
            deleteService(selectedService);
            closeModal();
          }}
        />
      )}
    </div>
  );
}
