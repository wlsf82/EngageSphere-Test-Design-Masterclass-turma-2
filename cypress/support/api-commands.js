Cypress.Commands.add('getRequest', (url, failOnStatusCode = true) => {
  cy.request({
    method: 'GET',
    url: url,
    failOnStatusCode: failOnStatusCode
  });
});

