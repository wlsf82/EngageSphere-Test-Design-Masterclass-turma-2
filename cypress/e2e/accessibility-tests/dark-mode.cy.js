describe('Dark Mode Accessibility Tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.injectAxe()
        cy.get('[data-theme="light"]').should('exist')
        cy.get('#theme-toggle-button').click()
        cy.get('[data-theme="dark"]').should('exist')
    })

    context('Customer Table', () => {
        it('should not find any accessibility issues in dark mode', () => {
            cy.checkA11y()
        })
    })

    context('Customer Details', () => {
        beforeEach(() => {
            cy.get('tbody tr').first().click()
        })

        it('should not find any accessibility issues in dark mode', () => {
            cy.checkA11y()
        })

        it('should not find any accessibility issues in dark mode when viewing address details', () => {
            cy.contains('button', 'Show address').click()
            cy.checkA11y()
        })
    })
})
