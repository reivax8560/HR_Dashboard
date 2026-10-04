export const employees = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Dupont",
    position: "Analyste",
    service: "Informatique",
    email: "alice.dupont@example.test",
    entryDate: "2020-06-15",
    status: "Actif",
    deleted: false,
  },
];

export const services = [
  { id: 1, name: "Informatique", deleted: false },
  { id: 2, name: "Finance", deleted: false },
  { id: 3, name: "Communication", deleted: false },
  { id: 8, name: "Ancien service", deleted: true },
];

export const absences = [
  {
    id: 10,
    employeeId: 1,
    type: "Congés payés",
    startDate: "2026-08-10",
    endDate: "2026-08-15",
    status: "Validée",
    comment: "",
    deleted: false,
  },
];

const replyWithBody = (statusCode) => (request) => {
  request.reply({
    statusCode,
    body: { ...request.body, deleted: false },
  });
};

export function stubApiRoutes() {
  cy.intercept("GET", "/api/employees", { body: employees }).as("getEmployees");
  cy.intercept("GET", "/api/services", {
    body: services.filter((service) => !service.deleted),
  }).as("getServices");
  cy.intercept(
    {
      method: "GET",
      pathname: "/api/services",
      query: { idsOnly: "true" },
    },
    { body: services.map((service) => service.id) },
  ).as("getServiceIds");
  cy.intercept("GET", "/api/absences", { body: absences }).as("getAbsences");

  cy.intercept("POST", "/api/employees", replyWithBody(201)).as(
    "createEmployee",
  );
  cy.intercept("PUT", "/api/employees/*", replyWithBody(200)).as(
    "updateEmployee",
  );
  cy.intercept("DELETE", "/api/employees/*", (request) => {
    request.reply({
      statusCode: 200,
      body: { ...employees[0], deleted: true },
    });
  }).as("deleteEmployee");

  cy.intercept("POST", "/api/absences", replyWithBody(201)).as("createAbsence");
  cy.intercept("PUT", "/api/absences/*", replyWithBody(200)).as(
    "updateAbsence",
  );
  cy.intercept("DELETE", "/api/absences/*", (request) => {
    request.reply({
      statusCode: 200,
      body: { ...absences[0], deleted: true },
    });
  }).as("deleteAbsence");

  cy.intercept("POST", "/api/services", replyWithBody(201)).as("createService");
  cy.intercept("PUT", "/api/services/*", replyWithBody(200)).as(
    "updateService",
  );
  cy.intercept("DELETE", "/api/services/*", (request) => {
    request.reply({
      statusCode: 200,
      body: { ...services[0], deleted: true },
    });
  }).as("deleteService");
}
