/*
CALCUL TAUX ABSENTEISME 
=> (nb jours absence / nb jours travaillés) × 100 

CALCUL TAUX ABSENTEISME SUR UN MOIS
nb jours travaillés annuel : 228 jours travaillés en moyenne
nb jours travaillés mensuel : 228 / 12 = 19 jours x 10 employés = 190 jours
=> (total absences du mois / 190) x 100
*/

export default function getAbsenteeismRate(absences, totalEmployees, today) {
  let currentDate = new Date(today);
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const lastMonthAbsences = absences.filter((absence) => {
    const absenceStart = new Date(absence.startDate);
    const absenceEnd = new Date(absence.endDate);
    return absenceStart <= currentDate && absenceEnd >= oneMonthAgo;
  });

  const daysWorkedInAMonth = 19;
  const lastMonthWorkingDays = daysWorkedInAMonth * totalEmployees;
  const absenteeism = (
    (lastMonthAbsences.length / lastMonthWorkingDays) *
    100
  ).toFixed(1);
  return absenteeism;
}
