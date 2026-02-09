// npm run cypress -- --spec "cypress/e2e/employees/delete.cy.js"

describe("Suppression d'un employé", () => {
    it("supprime un employé et met à jour le tableau", () => {
        cy.visit("/employees");
        ///////////////////////////////// CLIC BOUTON DETAIL
        cy.get("button[data-testid='employee-detail-button']").eq(0).click();
        ///////////////////////////////// CLIC BOUTON SUPPR
        cy.get(".modal-delete-button").click();
        ///////////////////////////////// VERIF TABLEAU EMMPLOYES
        cy.contains("Marie").should("not.exist");
        cy.contains("Dupont").should("not.exist");
        ///////////////////////////////// VERIF TABLEAU ABSENCES
        cy.visit("/absences");
        cy.contains("Marie Dupont").should("not.exist");
    })
})
