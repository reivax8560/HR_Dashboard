export function mapToDb(employee) {
  return {
    first_name: employee.firstName,
    last_name: employee.lastName,
    position: employee.position,
    service: employee.service,
    email: employee.email,
    entry_date: employee.entryDate,
    status: employee.status,
  };
}

export function mapFromDb(employee) {
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
