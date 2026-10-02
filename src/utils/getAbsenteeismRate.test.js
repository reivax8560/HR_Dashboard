import getAbsenteeismRate from "./getAbsenteeismRate";

describe("getAbsenteeismRate", () => {
  test("calcule le taux à partir des absences qui chevauchent le mois écoulé", () => {
    const date = new Date("2025-03-15T12:00:00");
    const totalEmployees = 4;
    const absences = [
      { startDate: "2025-02-10", endDate: "2025-03-16" },
      { startDate: "2025-03-10", endDate: "2025-03-18" },
      { startDate: "2025-03-16", endDate: "2025-03-20" },
      { startDate: "2025-02-01", endDate: "2025-02-14" },
    ];

    expect(getAbsenteeismRate(absences, totalEmployees, date)).toBe("2.6");
  });

  test("retourne zéro quand aucune absence ne chevauche la période", () => {
    const absences = [
      { startDate: "2025-01-01", endDate: "2025-02-01" },
      { startDate: "2025-03-16", endDate: "2025-03-20" },
    ];

    expect(
      getAbsenteeismRate(absences, 3, new Date("2025-03-15T12:00:00")),
    ).toBe("0.0");
  });
});
