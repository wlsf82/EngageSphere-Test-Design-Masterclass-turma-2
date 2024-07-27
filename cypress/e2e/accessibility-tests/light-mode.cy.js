describe('Light Mode Accessibility Tests', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-theme="light"]').should('exist')
        cy.injectAxe()
    })

    context('Customer Table', () => {
        it('should not find any accessibility issues in light mode', () => {
            cy.checkA11y()
        })
    })

    context('Customer Details', () => {
        beforeEach(() => {
            cy.get('tbody tr').first().click()
        })

        it('should not find any accessibility issues in light mode', () => {
            cy.checkA11y()
        })

        it('should not find any accessibility issues in light mode when viewing address details', () => {
            cy.contains('button', 'Show address').click()
            cy.checkA11y()
        })
    })
})
