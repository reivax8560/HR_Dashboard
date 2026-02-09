// npm run cypress -- --spec "cypress/e2e/employees/edit.cy.js"

describe("Edition d'un employé", () => {
    it("modifie un employé et l’affiche dans le tableau", () => {
        cy.visit("/employees");
        ///////////////////////////////// CLIC BOUTON DETAIL
        cy.get("button[data-testid='employee-detail-button']").eq(0).click();
        ///////////////////////////////// MODIF DETAIL EMPLOYE (MODALE)
        cy.get("input[name='firstName']").clear().type("bob");
        cy.get("input[name='lastName']").clear().type("morane");
        cy.get("input[name='position']").clear().type("aventurier");
        cy.get("select[name='service']").select("Communication");
        cy.get("input[name='email']").clear().type("moraneb@test.com");
        cy.get("input[name='entryDate']").clear().type("2011-01-01");
        cy.get("select[name='status']").select("Inactif");
        cy.get("button[type='submit']").click();
        ///////////////////////////////// VERIF AFFICHAGE TABLEAU
        cy.contains("bob").should("exist");
        cy.contains("morane").should("exist");
        cy.contains("aventurier").should("exist");
        cy.contains("Communication").should("exist");
        cy.contains("Inactif").should("exist");
    })
})
