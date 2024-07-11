/// <reference types="Cypress" />

describe('intercept', ()=> {
    beforeEach(()=> {
        cy.intercept({
            method: 'GET',
            pathname: '**/customers',
            query:{
                page: '1',
                limit: '10',
                size: 'Small'
            }
        }).as('getCustomers')
        cy.visit('/')

        cy.wait('@getCustomers')
    })

    it('asdasd', ()=> {
        cy.get('#filter').should('be.visible')
    })
})