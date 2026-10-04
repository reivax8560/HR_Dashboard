export function validateEmployeePayload(employee = {}) {
  const requiredFields = [
    "firstName",
    "lastName",
    "position",
    "service",
    "email",
    "entryDate",
  ];

  if (
    requiredFields.some(
      (field) => employee[field] === "" || employee[field] == null,
    )
  ) {
    const error = new Error(
      "Des données sont manquantes pour créer l'employé.",
    );
    error.statusCode = 400;
    throw error;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
    const error = new Error("Le format de l'email est invalide.");
    error.statusCode = 400;
    throw error;
  }

  const parsedDate = new Date(employee.entryDate);
  if (
    Number.isNaN(parsedDate.getTime()) ||
    !/^\d{4}-\d{2}-\d{2}/.test(employee.entryDate)
  ) {
    const error = new Error(
      "Le format de la date d'entrée est invalide (YYYY-MM-DD).",
    );
    error.statusCode = 400;
    throw error;
  }

  return {
    id: employee.id,
    firstName: employee.firstName.trim(),
    lastName: employee.lastName.trim(),
    position: employee.position.trim(),
    service: employee.service.trim(),
    email: employee.email.trim(),
    entryDate: employee.entryDate,
    status: employee.status || "actif",
  };
}

export function getEmployeeErrorStatus(error) {
  if (error.statusCode) return error.statusCode;
  if (error.code === "23505") return 409;
  if (error.code === "23503" || error.code === "22P02") return 400;
  if (error.code === "PGRST116") return 409;
  return 500;
}
