import getEmployeesPerService from "./getEmployeesPerService";

describe("getEmployeesPerService", () => {
  test("calcule correctement le nombre d'employés par service", () => {
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
    expect(getEmployeesPerService(employees).Design).toBe(2);
  });
});
