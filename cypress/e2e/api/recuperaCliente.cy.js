/// <reference types="cypress" />
describe('Teste de API', () => {
  it('GET - Recupera clientes com sucesso', () => {
    const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

    cy.request('GET', CUSTOMERS_API_URL).as('getCustumers')
    cy.get('@getCustumers')
      .its('status')
      .should('eq', 200)
  })
})
