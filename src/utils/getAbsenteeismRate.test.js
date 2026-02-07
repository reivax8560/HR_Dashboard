import getAbsenteeismRate from "./getAbsenteeismRate";

describe("getAbsenteeismRate", () => {
  test("calcule correctement le taux t'absentéisme", () => {
    const date = new Date("2026-01-01");
    const totalEmployees = 2;
    const absences = [
      {
        startDate: "2025-12-24",
        endDate: "2025-12-31",
      },
      {
        startDate: "2025-12-12",
        endDate: "2025-12-14",
      },
      {
        startDate: "2025-12-03",
        endDate: "2025-12-05",
      },
      {
        startDate: "2025-11-01",
        endDate: "2025-11-02",
      },
      {
        startDate: "2025-10-13",
        endDate: "2025-10-15",
      },
    ];
    // (3 abs / 19 j x 2 empl) x 100 = 7,89
    expect(getAbsenteeismRate(absences, totalEmployees, date)).toBe("7.9");
  });
});
