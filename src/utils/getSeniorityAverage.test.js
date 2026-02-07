import getSeniorityAverage from "./getSeniorityAverage";

describe("getSeniorityAverage", () => {
  test("calcule correctement l'ancienneté moyenne des employés", () => {
    const today = new Date("2025-01-01");
    const employees = [
      { entryDate: "2020-01-01" },
      { entryDate: "2022-01-01" },
      { entryDate: "2024-01-01" },
    ];
    expect(getSeniorityAverage(employees, today)).toBe("3.0");
  });
});
