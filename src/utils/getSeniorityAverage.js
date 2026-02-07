/* total ancienneté employés / nb d'employés */

export default function getSeniorityAverage(employees, today) {
  const totalEmployees = employees.length;

  const seniorityCount = employees.reduce((acc, employee) => {
    const entryDate = new Date(employee.entryDate);
    return acc + (today - entryDate);
  }, 0);

  const seniorityAverageInMs = seniorityCount / totalEmployees;
  const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
  const seniorityAverage = (seniorityAverageInMs / MS_PER_YEAR).toFixed(1);
  return seniorityAverage;
}
