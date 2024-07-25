/// <reference types="Cypress" />

describe('intercept', ()=> {
    beforeEach(()=> {
      cy.intercept('GET', '**/customers?page=1&limit=10&size=All')
        .as('getCustomers')
      cy.visit('/')
  
      cy.wait('@getCustomers')
    })
  
    it('shows the customers table', ()=> {
      cy.get('table').should('be.visible')
    })
  })