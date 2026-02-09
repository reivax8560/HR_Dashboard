// npm run cypress -- --spec "cypress/e2e/navigate.cy.js"

describe("Navigation", () => {
    it("navigue vers toutes les pages de l'application", () => {
        cy.visit("/");
        ///////////////////////////////// NAVIGATION VERS EMPLOYES
        cy.get("a[href='/employees']").click();
        cy.url().should("include", "/employees");
        cy.contains("Employés").should("be.visible");
        cy.get(".create-button").should("exist");
        cy.get("table").should("contain", "Dupont");
        ///////////////////////////////// NAVIGATION VERS ABSENCES
        cy.get("a[href='/absences']").click();
        cy.url().should("include", "/absences");
        cy.contains("Absences").should("be.visible");
        cy.get(".create-button").should("exist");
        cy.get("table").should("contain", "Marie Dupont");
        ///////////////////////////////// NAVIGATION VERS SERVICES
        cy.get("a[href='/services']").click();
        cy.url().should("include", "/services");
        cy.contains("Services").should("be.visible");
        cy.get(".create-button").should("exist");
        cy.get("table").should("contain", "Informatique");
        ///////////////////////////////// NAVIGATION VERS DASHBOARD
        cy.get("a[href='/']").click();
        cy.contains("Tableau de bord").should("be.visible");
        cy.contains("Total employés").should("be.visible");
        cy.contains("Absences en cours").should("be.visible");
        cy.contains("Ancienneté moyenne").should("be.visible");
        cy.contains("Taux d'absentéisme").should("be.visible");
        cy.contains("Répartition des employés par service").should("be.visible");
        cy.contains("Historique des absences par mois").should("be.visible");
        ///////////////////////////////// NAVIGATION EN ARRIERE
        cy.go("back");
        cy.url().should("include", "/services");
    })
})
