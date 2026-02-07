import getLastSixMonths from "./getLastSixMonths";

describe("getLastSixMonths", () => {
  test("récupère correctement les 6 derniers mois", () => {
    const date = new Date("2025-03-15");
    const absences = [
      { endDate: "2025-03-05" },
      { endDate: "2025-02-18" },
      { endDate: "2025-01-16" },
      { endDate: "2024-12-25" },
      { endDate: "2024-11-25" },
      { endDate: "2024-10-25" },
      { endDate: "2024-09-25" },
      { endDate: "2024-08-25" },
      { endDate: "2024-07-25" },
    ];
    expect(getLastSixMonths(absences, date)).toHaveLength(6);
  });
});
