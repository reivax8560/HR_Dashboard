export default function getCurrentAbsences(absences, today) {
  const currentAbsences = absences.filter((item) => {
    return (
      today >= new Date(item.startDate) &&
      today <= new Date(item.endDate) &&
      item.status === "Validée"
    );
  });
  return currentAbsences;
}
