/// <reference types="cypress" />

describe('Validar Cabeçalho e Mudar o Tema', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')

    });

    it('Tema escuro para claro', () => {

        cy.get('#theme-toggle-button')
            .should('be.visible')
            .click()

        cy.get('h1').should('exist') // Verifica que o h1 existe dentro do cabeçalho
            .and('be.visible') // Verifica que o h1 está visível
            .and('contain.text', 'EngageSphere') // Verifica que o h1 contém o texto esperado (substitua pelo texto correto)

        cy.get('#theme-toggle-button')
            .and('contain', '☀')

        cy.get('#theme-toggle-button')
            .should('be.visible')
            .click()

        cy.get('#theme-toggle-button')
            .and('contain', '☽')

    })

})
