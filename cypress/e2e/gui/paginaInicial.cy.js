/// <reference types="cypress" />

describe('Página inicial - Saudação', () => {
    it('Saudação Padrão', () => {
        cy.visit('http://localhost:3000/')

        cy.get('[data-testid="table"] > :nth-child(1)')
            .should('contain', 'Hi there! It is now')
    });
    it('Saudação Personalizada', () => {
        cy.visit('http://localhost:3000/')

        cy.get('[data-testid="name"]')
            .type('Eduarda')

        cy.get('[data-testid="table"] > :nth-child(1)')
            .should('contain', 'Hi Eduarda! It is now')
    })
})
