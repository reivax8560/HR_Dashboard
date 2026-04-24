import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Absences from "./Absences.jsx";

const employeesReducer = () => ({
  list: [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Dupont",
      position: "Développeuse",
      service: "Informatique",
      email: "alice.dupont@entreprise.com",
      entryDate: "2023-08-12",
      status: "Actif",
    },
  ],
});

const servicesReducer = () => ({
  list: [{ id: 1, name: "Informatique" }],
});

const absencesReducer = () => ({
  list: [
    {
      id: 1,
      employeeId: 1,
      type: "Congés payés",
      startDate: "2025-12-24",
      endDate: "2025-12-31",
      status: "En attente",
      comment: "Vacances de fin d’année",
    },
    {
      id: 2,
      employeeId: 1,
      type: "Maladie",
      startDate: "2025-11-01",
      endDate: "2025-11-04",
      status: "Validée",
      comment: "",
    },
    {
      id: 3,
      employeeId: 1,
      type: "RTT",
      startDate: "2025-11-15",
      endDate: "2025-11-16",
      status: "Refusée",
      comment: "",
    },
  ],
});

function renderWithStore(ui) {
  const store = configureStore({
    reducer: {
      employees: employeesReducer,
      services: servicesReducer,
      absences: absencesReducer,
    },
  });
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("Absences page", () => {
  ////////////////////// TEST DONNEES TABLEAU ////////////////////////
  test("affiche les données du tableau", () => {
    renderWithStore(<Absences />);
    expect(screen.getAllByText("Alice Dupont")).toHaveLength(3);
    expect(screen.getAllByText("Informatique")).toHaveLength(3);
    expect(screen.getByText("24/12/2025")).toBeInTheDocument();
    expect(screen.getByText("31/12/2025")).toBeInTheDocument();
    expect(screen.getByText("En attente")).toBeInTheDocument();
    expect(screen.queryByText("Vacances de fin d’année")).toEqual(null);
  });
});
