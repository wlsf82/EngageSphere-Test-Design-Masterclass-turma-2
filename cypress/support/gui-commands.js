Cypress.Commands.add('simulateNoCustomers', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers**`,
      { body: '' }
    ).as('getEmptyCustomers');
  
    cy.visit('/');
    cy.wait('@getEmptyCustomers');
  });