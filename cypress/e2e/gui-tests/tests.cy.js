describe('Home Page Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Shows the default greeting (i.e., Hi there! ...)', () => {
        cy.get('[data-testid="name"]').should('have.value', '');
        cy.contains('there').should('be.visible');
        cy
    })
})