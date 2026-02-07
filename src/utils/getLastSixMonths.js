export default function getLastSixMonths(absencesData, today) {
  let datas = [];

  //////////////////////// CREATION ARRAY 6 DERNIERS MOIS
  for (let i = 6; i > 0; i--) {
    let currentDate = new Date(today);
    currentDate.setMonth(today.getMonth() - i);
    const currentMonth = new Intl.DateTimeFormat("fr-FR", {
      month: "short",
    }).format(currentDate);
    datas.push({ month: currentMonth, value: 0 });
  }
  //////////////////////// AJOUT DES VALEURS AU ARRAY
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  absencesData.forEach((absence) => {
    const endDate = new Date(absence.endDate);
    if (endDate >= sixMonthsAgo) {
      const endDateMonth = new Intl.DateTimeFormat("fr-FR", {
        month: "short",
      }).format(endDate);
      datas.forEach((data) => {
        if (data.month === endDateMonth) data.value += 1;
      });
    }
  });
  return datas;
}
