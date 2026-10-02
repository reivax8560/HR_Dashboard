import { stubApiRoutes } from "../../support/apiStubs";

describe("Création d'une absence", () => {
  beforeEach(() => {
    stubApiRoutes();
  });

  it("envoie une absence valide et l'affiche dans le tableau", () => {
    cy.visit("/employees");
    cy.wait("@getEmployees");
    cy.get("a[href='/absences']").click();
    cy.wait("@getAbsences");
    cy.get(".create-button").click();
    cy.get("input[name='type']").type("Formation");
    cy.get("input[name='startDate']").type("2026-09-01");
    cy.get("input[name='endDate']").type("2026-09-03");
    cy.get("select[name='status']").select("En attente");
    cy.get("textarea[name='comment']").type("Formation sécurité");
    cy.get("button[type='submit']").click();

    cy.wait("@createAbsence").then(({ request, response }) => {
      expect(request.body).to.include({
        id: 11,
        employeeId: 1,
        type: "Formation",
        startDate: "2026-09-01",
        endDate: "2026-09-03",
        status: "En attente",
        comment: "Formation sécurité",
      });
      expect(response.statusCode).to.equal(201);
    });

    cy.contains("01/09/2026").should("be.visible");
    cy.contains("03/09/2026").should("be.visible");
  });
});
