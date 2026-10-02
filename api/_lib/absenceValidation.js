export function validateAbsencePayload(absence = {}) {
  const start = new Date(absence.startDate);
  const end = new Date(absence.endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    const error = new Error("Dates invalides pour l'absence.");
    error.statusCode = 400;
    throw error;
  }

  if (start >= end) {
    const error = new Error(
      "La date de début doit être antérieure à la date de fin.",
    );
    error.statusCode = 400;
    throw error;
  }

  return absence;
}

export function getAbsenceErrorStatus(error) {
  if (error.statusCode) return error.statusCode;
  if (error.code === "23505" || error.code === "PGRST116") return 409;
  if (error.code === "23503" || error.code === "22P02") return 400;
  return 500;
}
