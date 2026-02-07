import getCurrentAbsences from "./getCurrentAbsences";

describe("getCurrentAbsences", () => {
  test("calcule correctement les absences en cours", () => {
    const date = new Date("2025-03-15");
    const absences = [
      { startDate: "2025-03-10", endDate: "2025-03-18", status: "Validée" },
      { startDate: "2025-03-02", endDate: "2025-03-16", status: "Validée" },
      { startDate: "2025-03-14", endDate: "2025-03-25", status: "Validée" },
    ];
    expect(getCurrentAbsences(absences, date)).toHaveLength(3);
  });
});
