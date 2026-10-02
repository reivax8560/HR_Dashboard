import getCurrentAbsences from "./getCurrentAbsences";

describe("getCurrentAbsences", () => {
  test("retient les absences validées qui incluent la date donnée", () => {
    const date = new Date("2025-03-15");
    const absences = [
      {
        id: 1,
        startDate: "2025-03-15",
        endDate: "2025-03-18",
        status: "Validée",
      },
      {
        id: 2,
        startDate: "2025-03-02",
        endDate: "2025-03-15",
        status: "Validée",
      },
      {
        id: 3,
        startDate: "2025-03-14",
        endDate: "2025-03-25",
        status: "En attente",
      },
      {
        id: 4,
        startDate: "2025-03-16",
        endDate: "2025-03-25",
        status: "Validée",
      },
    ];

    expect(
      getCurrentAbsences(absences, date).map((absence) => absence.id),
    ).toEqual([1, 2]);
  });

  test("retourne une liste vide lorsqu'aucune absence ne correspond", () => {
    expect(getCurrentAbsences([], new Date("2025-03-15"))).toEqual([]);
  });
});
