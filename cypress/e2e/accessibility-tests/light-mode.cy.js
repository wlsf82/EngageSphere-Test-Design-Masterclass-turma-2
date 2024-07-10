describe('Dark mode Tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.injectAxe()
        cy.get('[data-theme="light"]').should('exist')
    })

    it('Does not find any accessibility issues in dark mode at customer table ', () => {
        cy.checkA11y()
    })

    it('Does not find any accessibility issues in dark mode at customer details ', () => {
        cy.get('tbody tr').first().click()

        cy.checkA11y()
    })

    it('Does not find any accessibility issues in dark mode at customer address datails ', () => {
        cy.get('tbody tr').first().click()
        cy.contains('button', 'Show address').click()

        cy.checkA11y()
    })
})