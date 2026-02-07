export default function getAbsencesFormatted(absences, employees) {
  const absencesFormatted = [...absences]
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .map((absence) => {
      const foundEmployee = employees.find(
        (employee) => employee.id === absence.employeeId
      );
      return {
        ...absence,
        employeeName: `${foundEmployee.firstName} ${foundEmployee.lastName}`,
        service: foundEmployee.service,
      };
    });
  return absencesFormatted;
}
