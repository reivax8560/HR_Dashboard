import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Employees from "./Employees.jsx";

// --- création des states employees & services ---
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
  list: [],
});

// ------ configuration du store Redux ------
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

describe("Employees page", () => {
  /////////////////////// TEST TITRE ET BOUTON ////////////////////////
  test("affiche le titre et le bouton de création", () => {
    renderWithStore(<Employees />);
    expect(screen.getByText("Employés")).toBeInTheDocument();
    expect(screen.getByText("Créer employé")).toBeInTheDocument();
  });
  ////////////////////// TEST DONNEES TABLEAU ////////////////////////
  test("affiche les données du tableau", () => {
    renderWithStore(<Employees />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Dupont")).toBeInTheDocument();
    expect(screen.getByText("Développeuse")).toBeInTheDocument();
    expect(screen.getByText("Informatique")).toBeInTheDocument();
    expect(screen.getByText("Actif")).toBeInTheDocument();
  });
  /////////////////////// TEST OUVERTURE MODALE CREATION /////////////////////////
  test("ouvre la modale de création au clic sur le bouton", async () => {
    renderWithStore(<Employees />);
    const createButton = screen.getByText("Créer employé");
    await userEvent.click(createButton);
    expect(screen.getByText("Création employé")).toBeInTheDocument();
  });
  /////////////////////// TEST OUVERTURE MODALE DETAIL /////////////////////////
  test("ouvre la modale de détail au clic sur le bouton", async () => {
    renderWithStore(<Employees />);
    const detailButton = screen.getByTestId("employee-detail-button");
    await userEvent.click(detailButton);
    expect(screen.getByText("Détail employé")).toBeInTheDocument();
  });
});
