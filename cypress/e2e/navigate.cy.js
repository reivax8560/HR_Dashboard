import { stubApiRoutes } from "../support/apiStubs";

describe("Navigation", () => {
  beforeEach(() => {
    stubApiRoutes();
  });

  it("parcourt le dashboard et les trois pages de gestion", () => {
    cy.visit("/");
    cy.contains("Tableau de bord").should("be.visible");

    cy.get("a[href='/employees']").click();
    cy.contains("Employés").should("be.visible");
    cy.get("table").should("contain", "Dupont");

    cy.get("a[href='/absences']").click();
    cy.contains("Absences").should("be.visible");
    cy.get("table").should("contain", "Alice Dupont");

    cy.get("a[href='/services']").click();
    cy.contains("Services").should("be.visible");
    cy.get("table").should("contain", "Informatique");

    cy.go("back");
    cy.url().should("include", "/absences");
  });
});
