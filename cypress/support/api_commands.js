
Cypress.Commands.add('api_retrieveCustomers', (page=1, limit=10, size='All') => {
    cy.api({
        method: 'GET',
        url: `http://localhost:3000/customers?$page=${page}&limit=${limit}&size=${size}`,
    })
  })
