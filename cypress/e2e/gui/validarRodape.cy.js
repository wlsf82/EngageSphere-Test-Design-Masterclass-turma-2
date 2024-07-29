/// <reference types="cypress" />
describe('Validação do Rodapé', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('Validar Rodapé e Links', () => {
        cy.get('footer')
            .should('exist')
            .within(() => {
                cy.contains('p', 'Copyright 2024 - Talking About Testing').should('be.visible')
                cy.contains('a', 'Hotmart').should('have.attr', 'href', 'https://hotmart.com/pt-br/club/talking-about-testing')
                cy.contains('a', 'Udemy').should('have.attr', 'href', 'https://udemy.com/user/walmyr')
                cy.contains('a', 'Blog').should('have.attr', 'href', 'https://talkingabouttesting.com')
                cy.contains('a', 'YouTube').should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
            })
    })
})
