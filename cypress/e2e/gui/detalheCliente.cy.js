/// <reference types="cypress" />
describe('Detalhes do cliente', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Campo entrada de texto deve estar desabilitado', () => {
        cy.get('tbody tr')
            .first()  // seleciona o primeiro elemento da lista
            .click()  // clica no primeiro elemento da lista
        cy.get('[data-testid="name"]')
            .should('be.disabled')
    })

    it('Voltar para página inicial', () => {
        cy.get('tbody tr')
            .first()  // seleciona o primeiro elemento da lista
            .click()
        cy.contains('button', 'Back')
            .click()
        cy.get('[data-testid="name"]')
            .should('be.visible')
    })
})
