/// <reference types="cypress" />

describe('Detalhes do cliente', () => {
    it('Campo entrada de texto deve estar desabilitado', () => {
        cy.visit('http://localhost:3000/')

        cy.get('button')
            .contains('Lowe Co')
            .click()

        cy.get('[data-testid="name"]')
            .should('be.disabled')
    })
    it('Voltar para página inicial', () => {
        cy.visit('http://localhost:3000/')

        cy.get('button')
            .contains('Lowe Co')
            .click()

        cy.get(':nth-child(7) > button')
            .click()            

    })
})