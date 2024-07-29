/// <reference types="cypress" />
describe('Validar Cabeçalho e Mudar o Tema', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Validar tema claro', () => {
        cy.get('[data-theme="light"]')
            .should('exist')
        cy.get('#theme-toggle-button')
            .click()
        cy.get('[data-theme="dark"]')
            .should('exist')
        cy.contains('h1', 'EngageSphere')
    })
})

