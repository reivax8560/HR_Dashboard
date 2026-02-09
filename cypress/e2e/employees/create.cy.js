// npm run cypress -- --spec "cypress/e2e/employees/create.cy.js"

describe("Création d'un employé", () => {
    it("crée un employé et l’affiche dans la liste", () => {
        cy.visit("/employees");

        cy.get(".create-button").click();
        cy.get("input[name='firstName']").type("jean");
        cy.get("input[name='lastName']").type("dupuis");
        cy.get("input[name='position']").type("comptable");
        cy.get("select[name='service']").select("Finance");
        cy.get("input[name='email']").type("jd@test.com");
        cy.get("input[name='entryDate']").type("2026-02-07");
        cy.get("button[type='submit']").click();

        cy.contains("jean").should("exist");
        cy.contains("dupuis").should("exist");
        cy.contains("comptable").should("exist");
        cy.contains("Finance").should("exist");
    })
})
