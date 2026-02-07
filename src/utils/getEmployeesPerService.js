export default function getEmployeesPerService(employees) {
  const datas = employees.reduce((acc, employee) => {
    acc[employee.service] = (acc[employee.service] || 0) + 1;
    return acc;
  }, {});
  return datas;
}
