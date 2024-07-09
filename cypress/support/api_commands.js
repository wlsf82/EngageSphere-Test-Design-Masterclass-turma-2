
Cypress.Commands.add('api_retrieveCustomers', (page = 1, limit = 10, size = 'All') => {
    cy.request({
        method: 'GET',
        url: `http://localhost:3001/customers?$page=${page}&limit=${limit}&size=${size}`
    })
})
