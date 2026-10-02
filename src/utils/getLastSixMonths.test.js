import getLastSixMonths from "./getLastSixMonths";

describe("getLastSixMonths", () => {
  test("retourne les six mois précédents et ignore les absences hors période", () => {
    const date = new Date("2025-03-15");
    const absences = [
      { endDate: "2025-03-05" },
      { endDate: "2025-02-18" },
      { endDate: "2024-09-25" },
      { endDate: "2024-08-25" },
    ];
    const result = getLastSixMonths(absences, date);

    expect(result).toHaveLength(6);
    expect(result.map(({ value }) => value)).toEqual([1, 0, 0, 0, 0, 1]);
  });
});
