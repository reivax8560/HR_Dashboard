export function formatEmployeeForDb(employee) {
  return {
    id: employee.id,
    first_name: employee.firstName,
    last_name: employee.lastName,
    position: employee.position,
    service: employee.service,
    email: employee.email,
    entry_date: employee.entryDate,
    status: employee.status,
  };
}

export function formatEmployeeForFrontend(employee) {
  return {
    id: employee.id,
    firstName: employee.first_name,
    lastName: employee.last_name,
    position: employee.position,
    service: employee.service,
    email: employee.email,
    entryDate: employee.entry_date,
    status: employee.status,
  };
}

export function formatAbsenceForDb(absence) {
  return {
    id: absence.id,
    employee_id: absence.employeeId,
    type: absence.type,
    start_date: absence.startDate,
    end_date: absence.endDate,
    status: absence.status,
    comment: absence.comment,
  };
}

export function formatAbsenceForFrontend(absence) {
  return {
    id: absence.id,
    employeeId: absence.employee_id,
    type: absence.type,
    startDate: absence.start_date,
    endDate: absence.end_date,
    status: absence.status,
    comment: absence.comment,
  };
}
