import getEmployeesPerService from "./getEmployeesPerService";

describe("getEmployeesPerService", () => {
  test("compte les employés dans chaque service", () => {
    const employees = [
      { service: "Informatique" },
      { service: "Informatique" },
      { service: "Ressources Humaines" },
      { service: "Ressources Humaines" },
      { service: "Ressources Humaines" },
      { service: "Marketing" },
      { service: "Design" },
      { service: "Design" },
    ];
    expect(getEmployeesPerService(employees)).toEqual({
      Informatique: 2,
      "Ressources Humaines": 3,
      Marketing: 1,
      Design: 2,
    });
  });

  test("retourne un objet vide sans employés", () => {
    expect(getEmployeesPerService([])).toEqual({});
  });
});
