/// <reference types="cypress" />

describe('Página inicial - Saudação', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('Saudação Padrão', () => {
        cy.contains('p', 'Hi there! It is now')
            .should('be.visible')
    });
    it('Saudação Personalizada', () => {
        cy.get('[data-testid="name"]')
            .type('Eduarda')
        cy.contains('p', 'Hi Eduarda! It is now')
            .should('be.visible')
    })
})
