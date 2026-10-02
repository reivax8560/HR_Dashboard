import { stubApiRoutes } from "../../support/apiStubs";

describe("Création d'un employé", () => {
  beforeEach(() => {
    stubApiRoutes();
  });

  it("envoie les données attendues et affiche l'employé créé", () => {
    cy.visit("/employees");
    cy.contains("Alice").should("be.visible");

    cy.get(".create-button").click();
    cy.get("input[name='firstName']").type("Jean");
    cy.get("input[name='lastName']").type("Dupuis");
    cy.get("input[name='position']").type("Comptable");
    cy.get("select[name='service']").select("Finance");
    cy.get("input[name='email']").type("jean.dupuis@example.test");
    cy.get("input[name='entryDate']").type("2022-02-07");
    cy.get("button[type='submit']").click();

    cy.wait("@createEmployee").then(({ request, response }) => {
      expect(request.body).to.include({
        id: 2,
        firstName: "Jean",
        lastName: "Dupuis",
        position: "Comptable",
        service: "Finance",
        email: "jean.dupuis@example.test",
        entryDate: "2022-02-07",
      });
      expect(response.statusCode).to.equal(201);
    });

    cy.contains("Jean").should("be.visible");
    cy.contains("Dupuis").should("be.visible");
    cy.contains("Comptable").should("be.visible");
  });
});
