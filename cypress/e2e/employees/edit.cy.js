import { stubApiRoutes } from "../../support/apiStubs";

describe("Edition d'un employé", () => {
  beforeEach(() => {
    stubApiRoutes();
  });

  it("met à jour un employé avec son identifiant", () => {
    cy.visit("/employees");
    cy.get("[data-testid='employee-detail-button']").first().click();
    cy.get("input[name='firstName']").clear().type("Bob");
    cy.get("input[name='lastName']").clear().type("Morane");
    cy.get("input[name='position']").clear().type("Aventurier");
    cy.get("select[name='service']").select("Communication");
    cy.get("input[name='email']").clear().type("bob.morane@example.test");
    cy.get("input[name='entryDate']").clear().type("2011-01-01");
    cy.get("select[name='status']").select("Inactif");
    cy.get("button[type='submit']").click();

    cy.wait("@updateEmployee").then(({ request, response }) => {
      expect(request.url).to.include("/api/employees/1");
      expect(request.body).to.include({
        id: 1,
        firstName: "Bob",
        lastName: "Morane",
        status: "Inactif",
      });
      expect(response.statusCode).to.equal(200);
    });

    cy.contains("Bob").should("be.visible");
    cy.contains("Morane").should("be.visible");
    cy.contains("Aventurier").should("be.visible");
  });
});
