import apiRequest from "../apiRequest";

export default async function createAbsenceApi(absence) {
  // Validation des dates
  const start = new Date(absence.startDate);
  const end = new Date(absence.endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error("Dates invalides pour l'absence.");
  }
  if (start >= end) {
    throw new Error("La date de début doit être antérieure à la date de fin.");
  }

  return apiRequest("/api/absences", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(absence),
  });
}
