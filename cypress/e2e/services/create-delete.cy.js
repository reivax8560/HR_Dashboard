import { stubApiRoutes } from "../../support/apiStubs";

describe("Gestion des services", () => {
  beforeEach(() => {
    stubApiRoutes();
  });

  it("crée un service puis confirme sa suppression", () => {
    cy.visit("/services");
    cy.get(".create-button").click();
    cy.get("input[name='name']").type("Juridique");
    cy.get("button[type='submit']").click();

    cy.wait("@createService").then(({ request, response }) => {
      expect(request.body).to.deep.equal({ id: 9, name: "Juridique" });
      expect(response.statusCode).to.equal(201);
    });
    cy.contains("Juridique").should("be.visible");

    cy.get("button[aria-label='Supprimer le service Informatique']").click();
    cy.contains("button", "Confirmer").click();
    cy.wait("@deleteService").then(({ response }) => {
      expect(response.body.deleted).to.equal(true);
    });
  });
});
