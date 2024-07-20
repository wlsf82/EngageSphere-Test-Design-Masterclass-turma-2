/// <reference types="cypress" />

describe('Validar Cabeçalho e Mudar o Tema', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    it('Tema escuro para claro', () => {
        cy.get('#theme-toggle-button')
            .should('be.visible')
            .click()
        cy.contains('h1', 'EngageSphere')
        cy.contains('#theme-toggle-button', '☀')
        
        cy.get('#theme-toggle-button')
            .should('be.visible')
            .click()
        cy.contains('#theme-toggle-button', '☽')
    })
})
