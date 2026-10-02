import apiRequest from "../apiRequest";
import { isValidEmail, isValidDate } from "../datasValidation";

export default async function createEmployeeApi(employee) {
  try {
    // Vérifier si les données sont valides
    if (
      employee.firstName === "" ||
      employee.lastName === "" ||
      employee.position === "" ||
      employee.service === "" ||
      employee.email === "" ||
      employee.entryDate === ""
    ) {
      throw new Error("Des données sont manquantes pour créer l'employé.");
    }

    // Valider le format de l'email
    if (!isValidEmail(employee.email)) {
      throw new Error("Le format de l'email est invalide.");
    }

    // Valider la date d'entrée
    if (!isValidDate(employee.entryDate)) {
      throw new Error(
        "Le format de la date d'entrée est invalide (YYYY-MM-DD).",
      );
    }

    return await apiRequest("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
  } catch (error) {
    console.error("Erreur globale dans createEmployeeApi:", error);
    throw error;
  }
}
